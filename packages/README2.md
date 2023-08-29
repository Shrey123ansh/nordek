Few details about the project -

The project uses both hardhat and foundry make sure both are installed

Uses scaffold eth for easy integration with contracts.
Scoffold eth uses - wagmi and viem for easy interaction.

A lot of functions like parseEther are available in viem, so no need to install ethers unless necessary

please install all frontend dependencies in packages/nextjs and contract related in packages/foundry

Project uses prisma with postgress for easier backend deployment

For interacting with contracts, use wagmi hooks and hooks available in scaffold-eth
example in - packages/nextjs/components/example-ui for both getting data and sending data to contracts

For chart, table I have forked https://friendmex.com/?address=0x4e5f7e4a774bd30b9bdca7eb84ce3681a71676e1
follow that repo for inegrating with prisma database

The swap contracts are written for Uni V2,
when you run yarn deploy, it runs generateTsAbis.js script to automatically generate abi to interact with frontend. Check for deployed contracts in deployedContrats.js file it automatically handles deployment and integration with all networks for frontend

Steps to run -
yarn chain - start local chain
yarn deploy - deploy all contracts
yarn start
