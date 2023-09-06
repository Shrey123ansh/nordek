import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import type { NextPage } from "next";
import { formatEther } from "viem";
import { useAccount, useBlockNumber, useContractRead } from "wagmi";
import ActionButton from "~~/components/ui/actionButton";
import {
  useDeployedContractInfo,
  useScaffoldContractRead,
  useScaffoldContractWrite,
  useScaffoldEventHistory,
  useScaffoldEventSubscriber,
} from "~~/hooks/scaffold-eth";
import clientPromise from "~~/lib/mongoDb";

const StakeBox = () => {
  const [stakeAmount, setStakeAmount] = useState(0);
  const { address } = useAccount();

  const { writeAsync, isLoading } = useScaffoldContractWrite({
    contractName: "StakingContract",
    functionName: "stake",
    value: `${stakeAmount}`,
    onBlockConfirmation: txnReceipt => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
    },
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
    <div className="p-8 mb-8 flex flex-col space-y-4 items-center rounded-lg bg-base-300">
      <label htmlFor=""> Enter Stake Amount</label>
      <input
        type="number"
        placeholder="0"
        className="px-2 py-2 bg-purple-800 rounded-lg text-right appearance-none"
        value={stakeAmount}
        onChange={e => setStakeAmount(Number(e.target.value))}
      />
      <ActionButton text={"Stake"} onClick={handleStaking}></ActionButton>
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

  const {
    data,
    isError,
    isLoading,
    isSuccess,
    refetch: refetchProjects,
  } = useContractRead({
    address: deployedContract?.address,
    abi: deployedContract?.abi,
    functionName: "getUserTotalStakes",
    watch: true,
    onSuccess(data) {
      console.log(data);
    },
  });

  const { data: userStakesArray, isLoading: isUserStakesArray } = useScaffoldContractRead({
    contractName: "StakingContract",
    functionName: "getUserStakesInfo",
  });
  console.log("userStakesArray", isUserStakesArray, userStakesArray);

  const { data: userStakes, isLoading: isUserStakes } = useScaffoldContractRead({
    contractName: "StakingContract",
    functionName: "stakes",
    args: [address],
    watch: true,
  });

  console.log("USER STAKES", userStakes);

  const { data: userTotalRewards, isLoading: isTotalUserRewardsLoading } = useScaffoldContractRead({
    contractName: "StakingContract",
    functionName: "getUserRewards",
    //args: [BigInt(userStakesArr[0] - 1)],
    args: [BigInt(1)],
  });
  console.log("userTotalRewards", userTotalRewards);
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

  useScaffoldEventSubscriber({
    contractName: "StakingContract",
    eventName: "Staked",
    listener: logs => {
      logs.map(log => {
        const { user, amount, stakeTime } = log.args;
        console.log("📡 Staked", user, amount, stakeTime);
      });
    },
  });

  const {
    data: Staked,
    isLoading: isLoadingEvents,
    error: errorReadingEvents,
  } = useScaffoldEventHistory({
    contractName: "StakingContract",
    eventName: "Staked",
    fromBlock: blockNumber ? BigInt(blockNumber) : 0n,
    filters: { user: address },
    blockData: true,
  });

  useScaffoldEventSubscriber({
    contractName: "StakingContract",
    eventName: "Unstaked",
    listener: logs => {
      logs.map(log => {
        const { user, amount, unstakeTime } = log.args;
        console.log("📡 Staked", user, amount, unstakeTime);
      });
    },
  });

  const {
    data: Unstaked,
    isLoading: isLoadingUnstakedEvents,
    error: errorReadingUnstakedEvents,
  } = useScaffoldEventHistory({
    contractName: "StakingContract",
    eventName: "Staked",
    fromBlock: blockNumber ? BigInt(blockNumber) : 0n,
    filters: { user: address },
    blockData: true,
  });

  useEffect(() => {
    const saveStakeToDb = async (newStake: {
      stakedAt: any;
      stakedAmount: string;
      apy: number; //TODO change this to current apy
      address: any;
      hash: any;
    }) => {
      await axios
        .post("/api/stakes", newStake)
        .then(function (response) {
          console.log(response);
          console.log("Staked");
        })
        .catch(function (error) {
          console.log(error);
        });

      console.log("Saved to DB");
    };

    if (Staked && Staked[0] && Staked[0].args) {
      const stakeValue = Staked[0].args;
      const transactionDtls = Staked[0].block;
      const newStake = {
        stakedAt: stakeValue.stakeTime,
        stakedAmount: stakeValue.amount,
        apy: 18, //TODO change this to current apy
        address: stakeValue.user,
        hash: transactionDtls.hash,
        slotId: Number(stakeValue.slotId) - 1,
      };

      const isDuplicate = stakes.some(stake => stake.hash === newStake.hash);

      if (!isDuplicate) {
        // If it's not a duplicate, add the new stake
        setStakes([...stakes, newStake]);
        //saveStakeToDb(newStake); // TODO uncomment
      }
    }
  }, [Staked]);

  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10 justify-center ">
        <StakeBox></StakeBox>

        <section className="mt-8">
          <div className="p-8  flex flex-col space-y-2 bg-base-300 rounded-lg">
            <h1 className="text-xl text-center mb-4"> Your Staked Positions </h1>
            <div>Min Stake: {minStake ? formatEther(minStake) : ""}</div>
            <div>Frequency: {frequency ? frequency.toString() : ""}</div>
            <div>Your total staked Amount: {userTotalStake ? formatEther(userTotalStake) : ""}</div>
            <div>Total User Rewards: {userTotalRewards ? formatEther(userTotalRewards) : ""}</div>
            {stakes.map((stake: any) => {
              return (
                <div
                  className="flex bg-base-100 rounded-lg w-full justify-between space-x-20 p-4 items-center"
                  key={stake.hash}
                >
                  <h1>{formatEther(stake.stakedAmount)}</h1>
                  <h1>{stake.stakedAt}</h1>
                  <h1>{stake.apy}</h1>
                  <UnStake unstakeAmount={stake.stakedAmount} slotId={stake.slotId}></UnStake>
                </div>
              );
            })}
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
