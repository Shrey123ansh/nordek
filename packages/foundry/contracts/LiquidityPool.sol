// SPDX-License-Identifier: MIT

pragma solidity ^0.8.10;

import "openzeppelin/access/Ownable.sol";
import "openzeppelin/security/ReentrancyGuard.sol";
import "openzeppelin/proxy/transparent/TransparentUpgradeableProxy.sol";
import "./ILiquidityPool.sol";

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
