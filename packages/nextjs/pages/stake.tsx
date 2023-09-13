import { SetStateAction, useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { expect } from "chai";
import type { NextPage } from "next";
import { formatEther } from "viem";
import { useAccount, useBalance, useBlockNumber, useContractRead } from "wagmi";
import GradientComponent from "~~/components/StakingComponents/GradientContainer";
import { ClaimButton, UnstakeButton } from "~~/components/StakingComponents/StakeButtons";
import { StakeInfo } from "~~/components/StakingComponents/StakeInfo";
import StakeInfoBox from "~~/components/StakingComponents/StakeInfoBox";
import { StakesTable } from "~~/components/StakingComponents/StakesTable";
import ActionButton from "~~/components/ui/actionButton";
import StakeHeader from "~~/components/StakingComponents/StakeHeader";
import {
  useDeployedContractInfo,
  useScaffoldContractRead,
  useScaffoldContractWrite,
  useScaffoldEventSubscriber,
} from "~~/hooks/scaffold-eth";
import clientPromise from "~~/lib/mongoDb";
//import { connectToDatabase } from "~~/lib/mongoDb";
import { formatTx } from "~~/utils/formatStuff";
import { getTargetNetwork } from "~~/utils/scaffold-eth";

const StakeBox = () => {
  const [stakeAmount, setStakeAmount] = useState(0);
  const { address } = useAccount();
  const [isStaking, setIsStaking] = useState(true);

  const { data: balanceData } = useBalance({
    address,
    watch: true,
    chainId: getTargetNetwork().id,
  });

  const balance = balanceData ? parseFloat(balanceData.formatted).toFixed(2) : "";

  function setStakeAmountMax() {
    setStakeAmount(Number(balance));
  }

  const { writeAsync, isLoading } = useScaffoldContractWrite({
    contractName: "StakingContract",
    functionName: "stake",
    value: `${stakeAmount}`,
    onBlockConfirmation: txnReceipt => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
    },
  });

  const { data: userTotalStakes, isLoading: isUserTotalStakes } = useScaffoldContractRead({
    contractName: "StakingContract",
    functionName: "getUserTotalStakes",
    account: address,
  });

  const { data: apy, isLoading: isApyLoading } = useScaffoldContractRead({
    contractName: "StakingContract",
    functionName: "getCurrentApy",
  });

  const handleStaking = async () => {
    if (stakeAmount <= 0) {
      console.log("can't be lt 0");
      return;
    }

    if (!address) {
      console.log("notConnected");
      return;
    }

    await writeAsync();

    // const res = await fetch("http://localhost:3000/api/stakes", {
    //   method: "POST",
    //   body: JSON.stringify(stakeData),
    // });

    // save data to database
  };

  const { data: minStake, isLoading: isMinStake } = useScaffoldContractRead({
    contractName: "StakingContract",
    functionName: "minimumStake",
  });

  const { data: frequency, isLoading: isFrequency } = useScaffoldContractRead({
    contractName: "StakingContract",
    functionName: "frequency",
  });

  const { data: userRewards, isLoading: isUserTotalRewards } = useScaffoldContractRead({
    contractName: "StakingContract",
    functionName: "getTotalRewards",
    account: address,
  });

  const statsH1Class = "flex w-full justify-between space-x-12";

  const handleStakeButtonClick = () => {
    if (isStaking) {
      handleStaking();
    } else {
    }
  };

  return (
    <section className="flex justify-between w-full mt-8">
      <div className="w-[40%] mr-8">
        <GradientComponent>
          <div className="relative flex flex-col w-full space-y-8 px-2 bg-gradient-to-r from-[#141525] to-[#140B1E] rounded-xl py-8 px-8">
            <h1 className="text-2xl font-semibold"> Stake </h1>

            {/* <div>Min Stake: {minStake ? formatEther(minStake) : ""}</div>
            <div>Frequency: {frequency ? Number(frequency) / 86400 : ""} Days</div>
            <div>Your total staked Amount: {userTotalStake ? formatEther(userTotalStake) : ""}</div>
            <div>Total User Rewards: {userRewards ? formatEther(userRewards) : ""} NRK</div> */}

            <h1 className="text-xl font-semibold">Standard</h1>
            <h1 className={statsH1Class}>
              {" "}
              <span>Min Stake</span> <span>{minStake ? formatEther(minStake) : ""}</span>
            </h1>
            <h1 className={statsH1Class}>
              {" "}
              <span>Frequency</span> <span>{frequency ? Number(frequency) / 86400 : ""} Days</span>
            </h1>
            <h1 className={statsH1Class}>
              <span>Current Apy</span>
              <span>{apy ? apy.toString() : ""}</span>
            </h1>

            <h1 className="text-xl font-semibold">Your Position</h1>

            <h1 className={statsH1Class}>
              <span>Your Staked Amount</span>
              <span> {userTotalStakes ? formatEther(userTotalStakes) : ""} NRK</span>
            </h1>

            <h1 className={statsH1Class}>
              <span>Your Rewards</span>
              <span> {userRewards ? formatEther(userRewards) : ""} NRK </span>
            </h1>
            <h1 className={statsH1Class}>
              <span>NRK in Wallet</span>
              <span>
                {balance} {balanceData?.symbol}
              </span>
            </h1>
          </div>
        </GradientComponent>
      </div>
      <div className="w-[60%] ml-8 h-full">
        <GradientComponent>
          <div className="relative p-8 flex flex-col items-center space-y-8 rounded-lg bg-gradient-to-r from-[#141525] to-[#140B1E] w-full h-full">
            <h1 className="text-2xl font-semibold w-full text-left"> Order Summary </h1>
            <div className="flex justify-between w-full mb-8">
              <button
                className={
                  isStaking
                    ? "w-full bg-transparent border-b-2 border-purple-500"
                    : "w-full bg-transparent border-b-2 border-base-300 hover:border-purple-500"
                }
                onClick={() => setIsStaking(!isStaking)}
              >
                Stake
              </button>
              <button
                className={
                  !isStaking
                    ? "w-full bg-transparent border-b-2 border-purple-500"
                    : "w-full bg-transparent border-b-2 border-base-300 hover:border-purple-500"
                }
                onClick={() => setIsStaking(!isStaking)}
              >
                Unstake
              </button>
            </div>
            <div className="flex flex-col w-full text-left justify-center">
              <label htmlFor="" className="mb-4">
                {" "}
                Enter Amount
              </label>
              <div className="flex w-full">
                <input
                  type="number"
                  placeholder="0"
                  className="px-2 py-2 w-full rounded-lg text-left appearance-none bg-base-200 border border-snow-300 text-white bg-transparent w-[90%]"
                  value={stakeAmount}
                  onChange={e => setStakeAmount(Number(e.target.value))}
                />
                <button
                  className="bg-gradient-to-r from-[#4F56FF] to-[#9D09E3] text-sm text-white py-0 px-8 rounded-full"
                  onClick={setStakeAmountMax}
                >
                  Max
                </button>
              </div>
            </div>
            <br />
            <br />
            <br />
            <button
              className="bg-gradient-to-r from-[#4F56FF] to-[#9D09E3] font-bold text-white py-2 w-full rounded-lg"
              onClick={handleStakeButtonClick}
            >
              {isStaking ? "Stake" : "Unstake"}
            </button>
          </div>
        </GradientComponent>
      </div>
    </section>
  );
};

// const UnStake = ({ unstakeAmount, slotId }: { unstakeAmount: number; slotId: number }) => {
//   const { writeAsync, isLoading } = useScaffoldContractWrite({
//     contractName: "StakingContract",
//     functionName: "unstake",
//     args: [BigInt(unstakeAmount), BigInt(slotId)],
//     onBlockConfirmation: txnReceipt => {
//       console.log("📦 Transaction blockHash", txnReceipt.blockHash);
//     },
//   });

//   return (
//     <div className="p-0.5 text-sm rounded-full bg-gradient-to-r from-[#4F56FF] to-[#9D09E3]">
//       <button
//         type="button"
//         className="px-4 py-2 border-1 rounded-full bg-gray-800"
//         onClick={() => {
//           writeAsync();
//         }}
//       >
//         Unstake
//       </button>
//     </div>
//   );
// };

// const Claim = ({ ClaimAmount, slotId }: { ClaimAmount: number; slotId: number }) => {
//   const { address } = useAccount();
//   const { writeAsync, isLoading } = useScaffoldContractWrite({
//     contractName: "StakingContract",
//     functionName: "claimRewards",
//     account: address,
//     args: [BigInt(ClaimAmount), BigInt(slotId)],
//     onBlockConfirmation: txnReceipt => {
//       console.log("📦 Transaction blockHash", txnReceipt.blockHash);
//     },
//   });

//   return (
//     <button
//       className="bg-gradient-to-r from-[#4F56FF] to-[#9D09E3] text-sm text-white py-2 px-8 rounded-full w-full"
//       onClick={() => {
//         writeAsync;
//       }}
//     >
//       Claim
//     </button>
//   );
// };

// const Restake = ({ RestakeAmount, slotId }: { RestakeAmount: number; slotId: number }) => {
//   const { address } = useAccount();
//   const { writeAsync, isLoading } = useScaffoldContractWrite({
//     contractName: "StakingContract",
//     functionName: "restake",
//     account: address,
//     args: [BigInt(RestakeAmount), BigInt(slotId)],
//     onBlockConfirmation: txnReceipt => {
//       console.log("📦 Transaction blockHash", txnReceipt.blockHash);
//     },
//   });

//   return (
//     <button
//       className="bg-gradient-to-r from-[#4F56FF] to-[#9D09E3] text-sm text-white py-2 px-8 rounded-full w-full"
//       onClick={() => {
//         writeAsync;
//       }}
//     >
//       Restake
//     </button>
//   );
// };

// const Claim = ({ claimAmount, slotId }: { unstakeAmount: number; slotId: number }) => {
//   const { writeAsync, isLoading } = useScaffoldContractWrite({
//     contractName: "StakingContract",
//     functionName: "unstake",
//     args: [BigInt(unstakeAmount), BigInt(slotId)],
//     onBlockConfirmation: txnReceipt => {
//       console.log("📦 Transaction blockHash", txnReceipt.blockHash);
//     },
//   });

//   return (
//     <button
//       className="btn btn-sm btn-outline btn-accent"
//       onClick={() => {
//         writeAsync();
//       }}
//     >
//       Unstake
//     </button>
//   );
// };

const Stake: NextPage = () => {
  //const [stakeAmount, setStakeAmount] = useState(0);

  return (
    <>
      <div className="container flex items-center flex-col flex-grow pt-10 justify-center m-auto font-inter">
        {/* <StakeInfoBox></StakeInfoBox> */}
        <StakeHeader/>
        <StakeInfo></StakeInfo>
        <StakeBox></StakeBox>
        <StakesTable></StakesTable>
      </div>
    </>
  );
};

export default Stake;
