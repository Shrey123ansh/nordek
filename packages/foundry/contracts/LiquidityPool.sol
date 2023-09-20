// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import "openzeppelin/access/Ownable.sol";
import "openzeppelin/security/ReentrancyGuard.sol";
import "openzeppelin/proxy/transparent/TransparentUpgradeableProxy.sol";
import "./ILiquidityPool.sol";

/**
 * @title Liqudity provider contract for rewards staking contract
 * @author https://anmol-dhiman.netlify.app/
 * @notice Provide NRK tokens only to verified address
 */
contract LiquidityPool is Ownable, ReentrancyGuard, ILiquidityPool {
    event ContractVerified(address contractAddress, uint32 timeStamp);
    event AccessedFunds(
        address contractAddress,
        string action,
        uint32 timeStamp
    );

    mapping(address => bool) public verifiedContract;

    modifier isVerified() {
        require(verifiedContract[msg.sender], "contract is not verified");
        _;
    }

    /**
     * @dev verficy the contract for access rewards
     * @notice this function can only accessed by owner
     * @param _contract is the contract address which can access NRK tokens
     */
    function verifyContract(address _contract) external onlyOwner {
        verifiedContract[_contract] = true;
        emit ContractVerified(_contract, uint32(block.timestamp));
    }

    function accessFunds(
        uint256 _amount,
        string memory _action
    ) external isVerified nonReentrant {
        address _contract = msg.sender;
        require(address(this).balance >= _amount, "No NRK tokens in pool");

        (bool success, ) = _contract.call{value: _amount}("");
        require(success, "failed to send NRK tokens");
        emit AccessedFunds(_contract, _action, uint32(block.timestamp));
    }

    fallback() external payable {}

    receive() external payable {}
}
