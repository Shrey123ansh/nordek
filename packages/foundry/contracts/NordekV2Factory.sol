pragma solidity ^0.8.20;

import "./interfaces/INordekV2Factory.sol";
import "./NordekV2Pair.sol";
import "openzeppelin-contracts-upgradeable/proxy/utils/Initializable.sol";
import "openzeppelin-contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "openzeppelin-contracts-upgradeable/access/OwnableUpgradeable.sol";

contract NordekV2Factory is
    Initializable,
    UUPSUpgradeable,
    OwnableUpgradeable,
    INordekV2Factory
{
    address public feeTo;
    address public feeToSetter;
    uint256 public nDev = 1;
    uint256 public dDev = 1;
    uint32 public devFee = 5; // uses 0.04% default from swap fee

    mapping(address => mapping(address => address)) public getPair;
    address[] public allPairs;

    event PairCreated(
        address indexed token0,
        address indexed token1,
        address pair,
        uint
    );

    function initialize(
        address _owner,
        address _feeToSetter
    ) external initializer {
        __UUPSUpgradeable_init();
        __Ownable_init();
        transferOwnership(_owner);
        feeToSetter = _feeToSetter;
        devFee = 5; // Default dev fee
    }

    function _authorizeUpgrade(address) internal override onlyOwner {}

    function allPairsLength() external view returns (uint) {
        return allPairs.length;
    }

    function createPair(
        address tokenA,
        address tokenB
    ) external returns (address pair) {
        require(tokenA != tokenB, "NordekV2: IDENTICAL_ADDRESSES");
        (address token0, address token1) = tokenA < tokenB
            ? (tokenA, tokenB)
            : (tokenB, tokenA);
        require(token0 != address(0), "NordekV2: ZERO_ADDRESS");
        require(getPair[token0][token1] == address(0), "NordekV2: PAIR_EXISTS"); // single check is sufficient
        bytes memory bytecode = type(NordekV2Pair).creationCode;
        bytes32 salt = keccak256(abi.encodePacked(token0, token1));
        assembly {
            pair := create2(0, add(bytecode, 32), mload(bytecode), salt)
        }
        INordekV2Pair(pair).initialize(token0, token1, nDev, dDev, devFee);
        getPair[token0][token1] = pair;
        getPair[token1][token0] = pair; // populate mapping in the reverse direction
        allPairs.push(pair);
        emit PairCreated(token0, token1, pair, allPairs.length);
    }

    function setFeeTo(address _feeTo) external {
        require(msg.sender == feeToSetter, "NordekV2: FORBIDDEN");
        feeTo = _feeTo;
    }

    function setFeeToSetter(address _feeToSetter) external {
        require(msg.sender == feeToSetter, "NordekV2: FORBIDDEN");
        feeToSetter = _feeToSetter;
    }

    function setPercentForAllPairs(uint256 _ndev, uint256 _ddev) external {
        require(msg.sender == feeToSetter, "NordekV2: FORBIDDEN");
        nDev = _ndev;
        dDev = _ddev;
        for (uint256 i = 0; i < allPairs.length; i++) {
            NordekV2Pair(allPairs[i]).setPercent(_ndev, _ddev);
        }
    }

    // Function to set dev fee for all pairs
    function setDevFeeForAllPairs(uint32 _devFee) external {
        require(msg.sender == feeToSetter, "NordekV2: FORBIDDEN");
        require(_devFee <= 10000, "NordekV2: FORBIDDEN_FEE");
        devFee = _devFee;
        for (uint256 i = 0; i < allPairs.length; i++) {
            NordekV2Pair(allPairs[i]).setDevFee(_devFee);
        }
    }
}
