import { useEffect, useState } from "react";
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
  const [apy, setApy] = useState(0);
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
  });

  console.log("User Total Stakes", userTotalStakes);

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

  console.log("NRK BALANCE", balanceData);

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
          <span>{apy}</span>
        </div>
        <div className="flex w-full justify-between">
          <span>NRK in Wallet</span>
          <span>
            {balanceData ? parseFloat(balanceData.formatted).toFixed(2) : 0} {balanceData?.symbol}
          </span>
        </div>
        <div className="flex w-full justify-between">
          <span>Amount Staked</span>
          <span> {stakeAmount} NRK</span>
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

const Stake: NextPage = (props: any) => {
  //const [stakeAmount, setStakeAmount] = useState(0);
  const [stakes, setStakes] = useState(props.stakes);
  const { address } = useAccount();
  const { data: deployedContract } = useDeployedContractInfo("StakingContract");
  const { data: blockNumber, isError: blockError, isLoading: blockLoading } = useBlockNumber();
  //const handleStaking = () => {};

  // const { data: apy, isLoading: isApyLoading } = useScaffoldContractRead({
  //   contractName: "StakingContract",
  //   functionName: "apy",
  // });

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
  });

  const { data: userStakes, isLoading: isUserStakes } = useScaffoldContractRead({
    contractName: "StakingContract",
    functionName: "stakes",
    args: [address],
    watch: true,
  });

  const { data: userRewards, isLoading: isUserTotalRewards } = useScaffoldContractRead({
    contractName: "StakingContract",
    functionName: "getTotalRewards",
  });

  console.log("USER TOTAL REWARDS", userRewards);

  // useScaffoldEventSubscriber({
  //   contractName: "StakingContract",
  //   eventName: "GreetingChange",
  //   listener: logs => {
  //     logs.map(log => {
  //       const { greetingSetter, value, premium, newGreeting } = log.args;
  //       console.log("📡 GreetingChange event", greetingSetter, value, premium, newGreeting);
  //     });
  //   },
  // });

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
    await axios
      .post("/api/stakes", newStake, {
        headers: headers,
      })
      .then(function (response) {
        console.log(response);
        console.log("Staked");
      })
      .catch(function (error) {
        console.log(error);
      });

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
            console.log(newStake);
            saveStakeToDb(newStake);
            console.log("RAN SAVE TO DB FUNC");
            setStakes([...stakes, newStake]);
            console.log("UPDATED REACT STATE");

            //saveStakeToDb(newStake); // TODO uncomment
          }
        }
      });
    },
  });

  // const {
  //   data: Staked,
  //   isLoading: isLoadingEvents,
  //   error: errorReadingEvents,
  // } = useScaffoldEventHistory({
  //   contractName: "StakingContract",
  //   eventName: "Staked",
  //   fromBlock: blockNumber ? BigInt(blockNumber) : 0n,
  //   filters: { user: address },
  //   blockData: true,
  // });

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
            <div>Frequency: {frequency ? frequency.toString() : ""}</div>
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
                        <UnStake unstakeAmount={stake.stakedAmount} slotId={stake.slotId}></UnStake>
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
