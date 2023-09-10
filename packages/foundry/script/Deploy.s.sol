//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "../contracts/YourContract.sol";
import "./DeployHelpers.s.sol";
import "../contracts/StakingContract.sol";

contract DeployScript is ScaffoldETHDeploy {
    error InvalidPrivateKey(string);

    // ERC20Mintable tokenA;
    // ERC20Mintable tokenB;
    // ERC20Mintable tokenC;
    // ERC20Mintable tokenD;

    StakingContract stakingContract;

    function run() external {
        uint256 deployerPrivateKey = setupLocalhostEnv();
        if (deployerPrivateKey == 0) {
            revert InvalidPrivateKey(
                "You don't have a deployer account. Make sure you have set DEPLOYER_PRIVATE_KEY in .env or use `yarn generate` to generate a new random account"
            );
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

        stakingContract = new StakingContract(18, 10000000000000000, 31536000);

        console.logString(
            string.concat(
                "staking contract deployed at: ",
                vm.toString(address(stakingContract))
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

        YourContract yourContract = new YourContract(
            vm.addr(deployerPrivateKey)
        );
        console.logString(
            string.concat(
                "YourContract deployed at: ",
                vm.toString(address(yourContract))
            )
        );

        vm.stopBroadcast();

        /**
         * This function generates the file containing the contracts Abi definitions.
         * These definitions are used to derive the types needed in the custom scaffold-eth hooks, for example.
         * This function should be called last.
         */
        exportDeployments();
    }

    function test() public {}
}
