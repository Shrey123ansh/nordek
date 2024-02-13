//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./DeployHelpers.s.sol";
import "../contracts/StakingContract.sol";
import "../contracts/LiquidityPool.sol";
import "openzeppelin/proxy/transparent/TransparentUpgradeableProxy.sol";
import {NordekV2Factory} from "../contracts/NordekV2Factory.sol";
import {NordekV2Router02} from "../contracts/NordekV2Router02.sol";
import {WNRK} from "../contracts/WNRK.sol";
import {PracticeSupplyERC20} from "../contracts/PracticeSupplyERC20.sol";

contract DeployScript is ScaffoldETHDeploy {
    error InvalidPrivateKey(string);
    error InvalidOwnerAddress();

    // ERC20Mintable tokenA;
    // ERC20Mintable tokenB;
    // ERC20Mintable tokenC;
    // ERC20Mintable tokenD;

    StakingContract stakingContract;
    LiquidityPool liquidityPool;
    TransparentUpgradeableProxy liquidityPoolProxy;
    TransparentUpgradeableProxy stakingContractProxy;
    NordekV2Factory factory;
    NordekV2Router02 router;
    PracticeSupplyERC20 practiceERC20;
    WNRK wnrk;

    function run() external {
        uint256 deployerPrivateKey = vm.envUint("ADMIN_PRIVATE_KEY");
        uint256 owner = vm.envUint("OWNER_ADDRESS");
        address admin = vm.addr(deployerPrivateKey);

        if (deployerPrivateKey == 0) {
            revert InvalidPrivateKey(
                "You don't have a deployer account. Make sure you have set DEPLOYER_PRIVATE_KEY in .env or use `yarn generate` to generate a new random account"
            );
        }
        if (owner == 0) {
            revert InvalidOwnerAddress();
        }
        vm.startBroadcast(deployerPrivateKey);
        address setter = vm.addr(deployerPrivateKey);
        // _staking(admin, owner);
        factory = new NordekV2Factory(setter);
        factory.setFeeTo(setter);
        wnrk = new WNRK();
        router = new NordekV2Router02(address(factory), address(wnrk));

        practiceERC20 = new PracticeSupplyERC20();
        console.logString(
            string.concat(
                "factory contract deployed at: ",
                vm.toString(address(factory))
            )
        );
        console.logString(
            string.concat(
                "wnrk contract deployed at: ",
                vm.toString(address(wnrk))
            )
        );
        console.logString(
            string.concat(
                "router contract deployed at: ",
                vm.toString(address(router))
            )
        );
        console.logString(
            string.concat(
                "PracticeERC20 contract deployed at: ",
                vm.toString(address(practiceERC20))
            )
        );
        vm.stopBroadcast();
        exportDeployments();
    }

    function test() public {}

    // function _NordekV2(address setter) internal {

    // }

    function _staking(address admin, uint256 owner) internal {
        liquidityPool = new LiquidityPool();

        liquidityPoolProxy = new TransparentUpgradeableProxy(
            address(liquidityPool),
            admin,
            abi.encodeWithSignature(
                "initialize(address)",
                address(uint160(owner))
            )
        );

        stakingContract = new StakingContract();

        /**
         * _apy = 18%
         * minimum stake amount =  1 NRK
         * frequency = 31536000
         * liquidity pool contract address = address(liquidityPoolProxy)
         */

        stakingContractProxy = new TransparentUpgradeableProxy(
            address(stakingContract),
            admin,
            abi.encodeWithSignature(
                "initialize(uint16,uint256,uint256,address,address)",
                18,
                1000000000000000000,
                31536000,
                address(liquidityPoolProxy),
                address(uint160(owner))
            )
        );

        console.logString(
            string.concat(
                "staking contract deployed at: ",
                vm.toString(address(stakingContractProxy))
            )
        );
        console.logString(
            string.concat(
                "balance of liquidity : ",
                vm.toString(address(liquidityPoolProxy).balance)
            )
        );
        console.logString(
            string.concat(
                "liquidity pool contract at: ",
                vm.toString(address(liquidityPoolProxy))
            )
        );
    }
}
