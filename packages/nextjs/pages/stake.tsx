import { SetStateAction, useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { expect } from "chai";
import type { NextPage } from "next";
import { formatEther } from "viem";
import { useAccount, useBalance, useBlockNumber, useContractRead } from "wagmi";
import StakeInfoBox from "~~/components/StakingComponents/StakeInfoBox";
import ActionButton from "~~/components/ui/actionButton";
import {
  useDeployedContractInfo,
  useScaffoldContractRead,
  useScaffoldContractWrite,
  useScaffoldEventSubscriber,
} from "~~/hooks/scaffold-eth";
import clientPromise from "~~/lib/mongoDb";
import { formatTx } from "~~/utils/formatStuff";
import { getTargetNetwork } from "~~/utils/scaffold-eth";

const StakeBox = () => {
  const [stakeAmount, setStakeAmount] = useState(0);
  const { address } = useAccount();

  const { data: balanceData } = useBalance({
    address,
    watch: true,
    chainId: getTargetNetwork().id,
  });

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

  return (
    <div className="w-full flex flex-col p-8 bg-base-100 rounded-lg">
      <div className="flex w-full justify-between px-2 mb-8">
        <span> Stake </span>
        <span> i </span>
      </div>
      <div className="py-8 px-6 mb-8 flex items-center justify-between rounded-lg bg-base-200 w-full">
        <div className="flex">
          <img src="/icon.svg" alt="Your Logo" className=" h-8 w-8 mr-6" />
          <label htmlFor="" className="flex flex-col">
            Amount <span>NRK </span>
          </label>
        </div>
        <input
          type="number"
          placeholder="0"
          className="px-2 py-2 w-full mx-8 rounded-lg text-right appearance-none bg-base-200"
          value={stakeAmount}
          onChange={e => setStakeAmount(Number(e.target.value))}
        />
        <ActionButton text={"Stake"} onClick={handleStaking}></ActionButton>
      </div>

      <div className="flex flex-col mt-4 w-full space-y-8 px-2">
        <div className="flex w-full justify-between">
          <span>APR</span>
          <span>{apy ? apy.toString() : ""}</span>
        </div>
        <div className="flex w-full justify-between">
          <span>NRK in Wallet</span>
          <span>
            {balanceData ? parseFloat(balanceData.formatted).toFixed(2) : ""} {balanceData?.symbol}
          </span>
        </div>
        <div className="flex w-full justify-between">
          <span>Amount Staked</span>
          <span> {userTotalStakes ? formatEther(userTotalStakes) : ""} NRK</span>
        </div>
      </div>
    </div>
  );
};

const UnStake = ({ unstakeAmount, slotId }: { unstakeAmount: number; slotId: number }) => {
  const { writeAsync, isLoading } = useScaffoldContractWrite({
    contractName: "StakingContract",
    functionName: "unstake",
    args: [BigInt(unstakeAmount), BigInt(slotId)],
    onBlockConfirmation: txnReceipt => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
    },
  });

  return (
    <button
      className="btn btn-sm btn-outline btn-accent"
      onClick={() => {
        writeAsync();
      }}
    >
      Unstake
    </button>
  );
};

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

const ClaimPopup = ({ isOpen, onClose, slotId }: { isOpen: boolean; onClose: () => void; slotId: bigint }) => {
  const [amount, setAmount] = useState("0");
  const [selectedPercentage, setSelectedPercentage] = useState(0);
  const { address } = useAccount();

  const { data: userSlotStake, isLoading: isGetUserSlotStake } = useScaffoldContractRead({
    contractName: "StakingContract",
    functionName: "getUserStake",
    account: address,
    args: [slotId],
  });

  const { data: userSlotReward, isLoading: isGetUserSlotReward } = useScaffoldContractRead({
    contractName: "StakingContract",
    functionName: "getUserRewards",
    account: address,
    args: [slotId],
  });
  //const userSlotStake = userSlotStakeDtls? userSlotStakeDtls[0]
  console.log("Slot Details", userSlotStake, userSlotReward);

  const handlePercentageClick = (percentage: number) => {
    setSelectedPercentage(percentage);
    // Calculate the amount based on the selected percentage and total balance
    // Replace the following line with your own logic
    const calculatedAmount = (BigInt(percentage) * (userSlotReward ? userSlotReward : BigInt(0))) / BigInt(100);
    setAmount(`${calculatedAmount}`);
  };

  const { writeAsync: restake, isRestakeLoading } = useScaffoldContractWrite({
    contractName: "StakingContract",
    functionName: "restake",
    args: [BigInt(amount), slotId],
    account: address,
    onBlockConfirmation: txnReceipt => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
    },
  });

  const { writeAsync: claim, isClaimLoading } = useScaffoldContractWrite({
    contractName: "StakingContract",
    functionName: "claimRewards",
    args: [BigInt(amount), slotId],
    account: address,
    onBlockConfirmation: txnReceipt => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
    },
  });

  const handleClaim = () => {
    // Perform the "Claim" action here
    console.log("Claiming", amount);
    claim();
    onClose();
  };

  const handleRestake = () => {
    // Perform the "Restake" action here
    console.log("Restaking", amount);
    restake();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 bg-gray-800">
      <div className="bg-base-200 p-4 rounded-md shadow-md">
        <div className="text-center mb-4 flex justify-center items-center text-center">
          <h2 className="text-lg font-semibold">Claim or Restake</h2>
          <button className="relative top-0 right-0 m-2 p-2 text-white-600 hover:text-gray-400" onClick={onClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex flex-col">
          <span>Your Stake: {userSlotStake ? formatEther(userSlotStake[0]) : ""} NRK</span>
          <span>Your Rewards: {userSlotReward ? formatEther(userSlotReward) : ""} NRK</span>
        </div>

        <input
          type="text"
          placeholder="Enter amount"
          className="w-full p-2 border border-gray-300 rounded-md mb-4 text-black"
          value={amount}
          onChange={e => setAmount(e.target.value)}
        />
        <div className="flex justify-between mb-4">
          <button
            className={`flex-1 border border-gray-300 p-2 rounded-md ${selectedPercentage === 25 ? "bg-blue-200" : ""}`}
            onClick={() => handlePercentageClick(25)}
          >
            25%
          </button>
          <button
            className={`flex-1 border border-gray-300 p-2 rounded-md ${selectedPercentage === 50 ? "bg-blue-200" : ""}`}
            onClick={() => handlePercentageClick(50)}
          >
            50%
          </button>
          <button
            className={`flex-1 border border-gray-300 p-2 rounded-md ${selectedPercentage === 75 ? "bg-blue-200" : ""}`}
            onClick={() => handlePercentageClick(75)}
          >
            75%
          </button>
          <button
            className={`flex-1 border border-gray-300 p-2 rounded-md ${
              selectedPercentage === 100 ? "bg-blue-200" : ""
            }`}
            onClick={() => handlePercentageClick(100)}
          >
            100%
          </button>
        </div>
        <div className="flex justify-between">
          <button className="flex-1 bg-blue-500 text-white p-2 rounded-md mr-2" onClick={handleClaim}>
            Claim
          </button>
          <button className="flex-1 bg-green-500 text-white p-2 rounded-md" onClick={handleRestake}>
            Restake
          </button>
        </div>
      </div>
    </div>
  );
};

const Stake: NextPage = (props: any) => {
  //const [stakeAmount, setStakeAmount] = useState(0);
  const [stakes, setStakes] = useState(props.stakes);
  const { address } = useAccount();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handlePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const openClaimPopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const { data: minStake, isLoading: isMinStake } = useScaffoldContractRead({
    contractName: "StakingContract",
    functionName: "minimumStake",
  });

  const { data: frequency, isLoading: isFrequency } = useScaffoldContractRead({
    contractName: "StakingContract",
    functionName: "frequency",
  });

  const { data: userTotalStake, isLoading: isUserTotalStake } = useScaffoldContractRead({
    contractName: "StakingContract",
    functionName: "getUserTotalStakes",
    account: address,
  });

  const { data: userRewards, isLoading: isUserTotalRewards } = useScaffoldContractRead({
    contractName: "StakingContract",
    functionName: "getTotalRewards",
  });

  const saveStakeToDb = async (newStake: {
    stakedAt: number;
    stakedAmount: number;
    apy: number;
    address: string;
    hash: string;
    slotId: number;
  }) => {
    console.log("SAVING TO DB");
    const headers = {
      "Content-Type": "application/json",
      Authorization: "JWT fefege...",
    };
    try {
      const response = await axios.post("/api/stakes", newStake, {
        headers: headers,
      });
      console.log(response);
      console.log("Staked");
    } catch (error) {
      console.log(error);
    }

    console.log("Saved to DB");
  };

  useScaffoldEventSubscriber({
    contractName: "StakingContract",
    eventName: "Staked",
    listener: logs => {
      logs.map(log => {
        // TODO save to db

        const { user, amount, stakeTime, slotId } = log.args;
        console.log("📡 Staked", user, amount, stakeTime, slotId);

        if (user && amount && stakeTime && slotId) {
          const newStake = {
            stakedAt: stakeTime,
            stakedAmount: Number(amount),
            apy: 18, //TODO change this to current apy
            address: user,
            hash: log.transactionHash ? log.transactionHash?.toString() : "",
            slotId: Number(slotId) - 1,
          };

          const isDuplicate = stakes.some(stake => stake.hash === newStake.hash);

          if (!isDuplicate) {
            // If it's not a duplicate, add the new stake
            console.log("Saving to DB");
            saveStakeToDb(newStake);
            console.log("setting state");
            setStakes([...stakes, newStake]);
          }
        }
      });
    },
  });

  const removeStakeInDb = async (hash: { hash: string }) => {
    console.log("REMOVING FROM DB");
    await axios
      .delete(`/api/stakes/${hash}`)
      .then(function (response) {
        console.log(response);
        console.log("Removed");
      })
      .catch(function (error) {
        console.log(error);
      });

    console.log("Removed from DB");
  };

  useScaffoldEventSubscriber({
    contractName: "StakingContract",
    eventName: "Unstaked",
    listener: logs => {
      logs.map(log => {
        const { user, amount, unstakeTime, slotId } = log.args;
        console.log("📡 Staked", user, amount, unstakeTime, slotId);
        if (user && amount && unstakeTime) {
          const updatedStakes = stakes.filter(stake => stake.slotId !== slotId);
          setStakes(updatedStakes);
          //removeStakeInDb();
        }
      });
    },
  });

  return (
    <>
      <div className="container flex items-center flex-col flex-grow pt-10 justify-center m-auto">
        <StakeInfoBox></StakeInfoBox>
        <br />
        <br />
        <br />
        <StakeBox></StakeBox>

        <section className="mt-8 w-full">
          <div className="p-8  flex flex-col space-y-2 bg-base-100 rounded-lg w-full">
            <h1 className="text-xl text-center mb-4"> Your Staked Positions </h1>
            <div>Min Stake: {minStake ? formatEther(minStake) : ""}</div>
            <div>Frequency: {frequency ? Number(frequency) / 86400 : ""} Days</div>
            <div>Your total staked Amount: {userTotalStake ? formatEther(userTotalStake) : ""}</div>
            <div>Total User Rewards: {userRewards ? formatEther(userRewards) : ""} NRK</div>

            <table className="w-full bg-base-200 shadow-lg rounded-lg overflow-hidden">
              <thead className="w-full">
                <tr className="bg-base-200">
                  <th className="px-4 py-2">ID</th>
                  <th className="px-4 py-2">Txn Hash</th>
                  <th className="px-4 py-2">Staked Amount</th>
                  <th className="px-4 py-2">Rewards</th>
                  <th className="px-4 py-2">Staked At</th>
                  <th className="px-4 py-2">Claim/Unstake</th>
                </tr>
              </thead>
              <tbody>
                {/* Sample Data */}
                {stakes.map((stake: any, idx: any) => {
                  return (
                    <tr className="w-full p-4 my-2 items-center justify-center" key={idx}>
                      <td className="px-4 py-2 text-center">{idx}</td>
                      <td className="px-4 py-2 text-center">{formatTx(stake.hash)}</td>
                      <td className="px-4 py-2 text-center">{formatEther(stake.stakedAmount)}</td>
                      <td className="px-4 py-2 text-center">{stake.apy}</td>
                      <td className="px-4 py-2 text-center">{stake.stakedAt}</td>
                      <td className="px-4 py-2 text-center">
                        <ActionButton text="Claim" onClick={() => openClaimPopup()}></ActionButton>
                        <UnStake unstakeAmount={stake.stakedAmount} slotId={stake.slotId}></UnStake>
                        <ClaimPopup isOpen={isPopupOpen} onClose={handlePopup} slotId={stake.slotId}></ClaimPopup>
                      </td>
                    </tr>
                  );
                })}
                {/* Add more rows with similar structure */}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </>
  );
};

export default Stake;

export async function getServerSideProps() {
  try {
    const client = await clientPromise;
    const db = client.db("Norswap");

    const stakes = await db.collection("stakes").find({}).sort({ time: -1 }).toArray();

    return {
      props: {
        stakes: JSON.parse(JSON.stringify(stakes)),
      },
    };
  } catch (e) {
    console.log("ERROR");
    console.error(e);
  }
}
