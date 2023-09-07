// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "openzeppelin/access/Ownable.sol";
import "openzeppelin/security/ReentrancyGuard.sol";
import "openzeppelin/proxy/utils/Initializable.sol";
import "openzeppelin/utils/math/SafeMath.sol";

/**
 * @title StakingContract
 * @dev A contract for staking and earning rewards.
 */
contract StakingContract is Ownable, ReentrancyGuard, Initializable {
    using SafeMath for uint256; // Using SafeMath for safe arithmetic operations

    // Flag to pause staking
    bool public pause;

    // Annual Percentage Yield in divid of 100
    // uint16 public apy;

    // minimum nrk token to be staked by user
    uint256 public minimumStake;

    uint256 public frequency;

    // this is the old struct block
    struct Stake {
        uint256 amount; // Amount of tokens staked
        uint32 startTime; // Timestamp when staking occurred
        uint256 rewards; // Accumulated rewards for the stake
    }

    struct APY {
        uint16 value;
        uint32 changeTime;
    }

    struct Slot {
        uint256 amount;
        uint32 startTime;
        uint256 id;
    }

    struct SlotStake {
        uint256 counter;
        uint256 rewards;
        // using 0 base indexing to store the staking slots
        mapping(uint256 => Slot) slotStake;
    }

    // Maps users to their stakes
    // mapping(address => Stake) public stakes;
    mapping(address => SlotStake) public stakes;

    APY[] public apy;

    event Staked(
        address indexed user,
        uint256 amount,
        uint32 stakeTime,
        uint slotId
    );
    event Unstaked(
        address indexed user,
        uint256 amount,
        uint32 unstakeTime,
        uint slotId
    );
    event RewardClaimed(
        address indexed user,
        uint256 totalReward,
        uint32 timeOfClaim
    );

    /**
    
     * @dev Constructor to set the initial APY.
     * @param _apy The Annual Percentage Yield in divid of 100.
     */
    //  _apy = 18
    // _minimumStake = 100000000000000000000
    constructor(uint16 _apy, uint256 _minimumStake, uint256 _frequency) {
        apy.push(APY(_apy, uint32(block.timestamp)));
        minimumStake = _minimumStake;
        frequency = _frequency;
    }

    /**
     * @dev Stake tokens into the contract.
     * @notice Tokens must be transferred before calling this function.
     */
    function stake() external payable {
        require(
            msg.value >= minimumStake,
            "Amount must be greater than minimum value NRK Tokens"
        );
        require(!pause, "Please wait until the staking is unpaused");

        address user = msg.sender;
        // uint256 currentReward = calculateRewards(stakes[user], stakes[user].counter);

        stakes[user].slotStake[stakes[user].counter].amount = stakes[user]
            .slotStake[stakes[user].counter]
            .amount
            .add(msg.value);
        // stakes[user].rewards = stakes[user].rewards.add(currentReward);
        stakes[user].slotStake[stakes[user].counter].startTime = uint32(
            block.timestamp
        );
        stakes[user].slotStake[stakes[user].counter].id = stakes[user].counter;
        stakes[user].counter++;
        emit Staked(
            user,
            msg.value,
            uint32(block.timestamp),
            stakes[user].counter
        );
    }

    /**
     * @dev Unstake a specific amount of tokens from a stake and claim rewards.
     * @param _amount The amount of tokens to be unstaked.
     * @notice Unstaked tokens and rewards will be transferred to the user's address.
     */
    function unstake(uint256 _amount, uint256 _slotId) external nonReentrant {
        require(!pause, "Please wait until the staking is unpaused");

        address user = msg.sender;
        require(
            stakes[user].slotStake[_slotId].amount >= _amount,
            "Insufficient staked amount"
        );

        uint256 currentReward = calculateRewards(stakes[user], _slotId);
        uint256 remainingStake = stakes[user].slotStake[_slotId].amount.sub(
            _amount
        );

        // making the stake completely empty
        stakes[user].slotStake[_slotId].amount = remainingStake;
        stakes[user].slotStake[_slotId].startTime = uint32(block.timestamp);
        stakes[user].rewards = stakes[user].rewards.add(currentReward);

        require(
            address(this).balance >= _amount,
            "Contract insufficient balance"
        );
        (bool success, ) = user.call{value: _amount}("");
        require(success, "Unable to send value or recipient may have reverted");

        emit Unstaked(user, _amount, uint32(block.timestamp), _slotId);
    }

    /**
     * @dev Claim a specific amount of rewards from accumulated rewards.
     * @param _rewardAmount The amount of rewards to be claimed.
     * @notice Claimed rewards will be transferred to the user's address.
     */
    function claimRewards(
        uint256 _rewardAmount,
        uint256 _slotId
    ) external nonReentrant {
        address user = msg.sender;

        stakes[user].rewards = stakes[user].rewards.add(
            calculateRewards(stakes[user], _slotId)
        ); // Use SafeMath

        require(
            stakes[user].rewards >= _rewardAmount,
            "Insufficient rewards to claim"
        );

        stakes[user].rewards = stakes[user].rewards.sub(_rewardAmount);
        stakes[user].slotStake[_slotId].startTime = uint32(block.timestamp);

        require(
            address(this).balance >= _rewardAmount,
            "Contract insufficient balance"
        );
        (bool success, ) = user.call{value: _rewardAmount}("");
        require(success, "Unable to send value or recipient may have reverted");

        emit RewardClaimed(user, _rewardAmount, uint32(block.timestamp));
    }

    /**
     * @dev Calculate the accumulated rewards for a specific stake in a specific slot.
     * @param _stake The stake for which to calculate rewards.
     * @return The calculated rewards for the given stake of specific slot .
     **/
    function calculateRewards(
        SlotStake storage _stake,
        uint256 _slotId
    ) internal view returns (uint256) {
        uint256 index;

        uint256 rewards;

        uint32 startTime = _stake.slotStake[_slotId].startTime;

        uint256 initialAmount = _stake.slotStake[_slotId].amount;

        // example apy changing format
        // 18 -> 16 -> 14 -> 20(current)
        // here we have to find at which point user staked his assets

        if (apy.length > 1) {
            for (uint256 i = 0; i < apy.length; i++) {
                if (startTime <= apy[i].changeTime) {
                    index = i;
                    break;
                }
            }
            // 18 -> 16 -> (staking point of user)
            // this means that user staked after apy updated
            if (index == 0) {
                // calculate reward with current apy value
                return
                    initialAmount.mul(apy[apy.length - 1].value).mul(
                        block.timestamp - startTime
                    ) / (10000 * frequency);
            }
            // 18-> (staking point of user) -> 16
            // this means user staked before apy updation
            else {
                for (uint256 i = index; i < apy.length; i++) {
                    uint256 _value = initialAmount.mul(apy[i - 1].value).mul(
                        apy[i].changeTime - startTime
                    ) / (10000 * frequency);
                    // rewards.add(_value);
                    rewards += _value;
                    startTime = apy[i].changeTime;
                }
                rewards +=
                    initialAmount.mul(apy[apy.length - 1].value).mul(
                        block.timestamp - startTime
                    ) /
                    (10000 * frequency);

                return rewards;
            }
        }
        // single apy value in array
        else {
            return
                initialAmount.mul(apy[0].value).mul(
                    block.timestamp - startTime
                ) / (10000 * frequency);
        }
    }

    // /**
    //  * @dev Restake a specific amount of rewards and update stake.
    //  * @param _amount The amount of rewards to be restaked.
    //  */
    function restake(uint256 _amount, uint256 _slotId) external nonReentrant {
        address user = msg.sender;

        stakes[user].rewards = stakes[user].rewards.add(
            calculateRewards(stakes[user], _slotId)
        ); // Use SafeMath
        require(
            stakes[user].rewards >= _amount,
            "Insufficient rewards to restake"
        );

        uint256 totalStake = stakes[user].slotStake[_slotId].amount.add(
            _amount
        );

        stakes[user].slotStake[_slotId].amount = totalStake;
        stakes[user].slotStake[_slotId].startTime = uint32(block.timestamp);
        stakes[user].rewards = stakes[user].rewards.sub(_amount);

        emit RewardClaimed(user, _amount, uint32(block.timestamp));

        emit Staked(user, _amount, uint32(block.timestamp), _slotId);
    }

    // /**
    //  * @dev Get the staked amount and start time for sender.
    //  * @return amount The amount of tokens staked.
    //  * @return startTime The timestamp when staking occurred.
    //  */
    function getUserStake(
        uint256 _slotId
    ) external view returns (uint256 amount, uint32 startTime) {
        Slot storage userStake = stakes[msg.sender].slotStake[_slotId];
        return (userStake.amount, userStake.startTime);
    }

    function getUserTotalStakes() external view returns (uint256 amount) {
        SlotStake storage userSlotStakes = stakes[msg.sender];
        for (uint256 i = 0; i < userSlotStakes.counter; i++) {
            amount += userSlotStakes.slotStake[i].amount;
        }
    }

    function getUserStakesInfo()
        external
        view
        returns (Slot[] memory userStakeSlots)
    {
        userStakeSlots = new Slot[](stakes[msg.sender].counter - 1);
        SlotStake storage userStakes = stakes[msg.sender];
        for (uint256 i = 0; i < userStakes.counter; i++) {
            userStakeSlots[i] = userStakes.slotStake[i];
        }
    }

    // /**
    //  * @dev Get the total accumulated rewards for sender.
    //  * @return The total amount of accumulated rewards.
    //  */
    function getUserRewards(uint256 _slotId) external view returns (uint256) {
        uint256 rewards = calculateRewards(stakes[msg.sender], _slotId).add(
            stakes[msg.sender].rewards
        ); // Use SafeMath
        return rewards;
    }

    // /**
    //  * @dev Update the staking pause status.
    //  * @param _pause The new staking pause status.
    //  * @notice This function can only be called by the contract owner.
    //  */
    function updateStakingPause(bool _pause) external onlyOwner {
        pause = _pause;
    }

    // /**
    //  * @dev Set the APY (Annual Percentage Yield).
    //  * @param _newAPY The new APY value.
    //  * @notice This function can only be called by the contract owner.
    //  */
    function setAPY(uint16 _newAPY) external onlyOwner {
        apy.push(APY(_newAPY, uint32(block.timestamp)));
    }

    function setMinimumStake(uint256 _newMinimumStake) external onlyOwner {
        minimumStake = _newMinimumStake;
    }

    function setFrequency(uint256 _frequency) external onlyOwner {
        frequency = _frequency;
    }

    // // Receive Function
    receive() external payable {
        // Sending deposited currency to the contract address
    }

    // /**
    //  * @dev Migrate funds to a new contract address.
    //  * @param amount The amount of funds to migrate.
    //  * @param newAddress The address of the new contract to receive the funds.
    //  * @notice This function is non-reentrant and can only be called by the contract owner.
    //  */
    function migration(
        uint256 amount,
        address newAddress
    ) external nonReentrant onlyOwner {
        require(
            address(this).balance >= amount,
            "Contract insufficient balance"
        );
        (bool success, ) = newAddress.call{value: amount}("");
        require(success, "Unable to send value or recipient may have reverted");
    }
}
