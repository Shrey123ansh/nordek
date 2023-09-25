//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "../contracts/YourContract.sol";
import "./DeployHelpers.s.sol";
import "../contracts/StakingContract.sol";
import "../contracts/LiquidityPool.sol";
import "openzeppelin/proxy/transparent/TransparentUpgradeableProxy.sol";

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

    function run() external {
        uint256 deployerPrivateKey = vm.envUint("ADMIN_PRIVATE_KEY");
        uint256 owner = vm.envUint("OWNER_ADDRESS");
        if (deployerPrivateKey == 0) {
            revert InvalidPrivateKey(
                "You don't have a deployer account. Make sure you have set DEPLOYER_PRIVATE_KEY in .env or use `yarn generate` to generate a new random account"
            );
        }
        if (owner == 0) {
            revert InvalidOwnerAddress();
        }
        vm.startBroadcast(deployerPrivateKey);

        // tokenA = new ERC20Mintable("Ethereum", "ETH");
        // tokenB = new ERC20Mintable("Bitcoin", "WBTC");
        // tokenC = new ERC20Mintable("Chainlink", "LINK");
        // tokenD = new ERC20Mintable("USDC", "USDC");

        // console.logString(
        //     string.concat(
        //         "Ethereum deployed at: ",
        //         vm.toString(address(tokenA))
        //     )
        // );

        // console.logString(
        //     string.concat("Bitcoin deployed at: ", vm.toString(address(tokenB)))
        // );
        // console.logString(
        //     string.concat(
        //         "Chainlink deployed at: ",
        //         vm.toString(address(tokenC))
        //     )
        // );
        // console.logString(
        //     string.concat("USDC deployed at: ", vm.toString(address(tokenD)))
        // );

        // factory = new ZuniswapV2Factory();
        // console.logString(
        //     string.concat(
        //         "factory deployed at: ",
        //         vm.toString(address(factory))
        //     )
        // );

        // tokenA.mint(20 ether, vm.addr(deployerPrivateKey));
        // tokenB.mint(20 ether, vm.addr(deployerPrivateKey));
        // tokenC.mint(20 ether, vm.addr(deployerPrivateKey));
        // tokenD.mint(20 ether, vm.addr(deployerPrivateKey));

        // console.logString("Minted and recevied tokens");

        address admin = vm.addr(deployerPrivateKey);

        // vm.deal(vm.addr(deployerPrivateKey), 1 ether);

        liquidityPool = new LiquidityPool();
        // address(liquidityPool).call{value: 1 ether}("");
        // need to add some ether for liquidity at start
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

        // stakingContract = new StakingContract(
        //     18,
        //     10000000000000000,
        //     31536000,
        //     address(liquidityPool)
        // );

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

        // router = new ZuniswapV2Router(address(factory));
        // console.logString(
        //     string.concat("router deployed at: ", vm.toString(address(router)))
        // );

        // tokenA.approve(address(router), 10 ether);
        // tokenB.approve(address(router), 10 ether);
        // tokenC.approve(address(router), 10 ether);
        // tokenD.approve(address(router), 10 ether);

        // router.addLiquidity(
        //     address(tokenA),
        //     address(tokenB),
        //     1 ether,
        //     1 ether,
        //     1 ether,
        //     1 ether,
        //     vm.addr(deployerPrivateKey)
        // );

        // router.addLiquidity(
        //     address(tokenB),
        //     address(tokenC),
        //     1 ether,
        //     1 ether,
        //     1 ether,
        //     1 ether,
        //     vm.addr(deployerPrivateKey)
        // );

        // router.addLiquidity(
        //     address(tokenC),
        //     address(tokenD),
        //     1 ether,
        //     1 ether,
        //     1 ether,
        //     1 ether,
        //     vm.addr(deployerPrivateKey)
        // );

        // YourContract yourContract = new YourContract(
        //     vm.addr(deployerPrivateKey)
        // );
        // console.logString(
        //     string.concat(
        //         "YourContract deployed at: ",
        //         vm.toString(address(yourContract))
        //     )
        // );

        /**
         * This function generates the file containing the contracts Abi definitions.
         * These definitions are used to derive the types needed in the custom scaffold-eth hooks, for example.
         * This function should be called last.
         */
        vm.stopBroadcast();
        exportDeployments();
    }

    function test() public {}
}
