import { useEffect, useState } from "react";
import { ClaimPopup } from "./ClaimPopup";
import GradientComponent from "./GradientContainer";
import { readContract } from "@wagmi/core";
import axios from "axios";
import { formatEther } from "viem";
import { useAccount } from "wagmi";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { ClaimButton, RestakeButton } from "~~/components/StakingComponents/StakeButtons";
import { useDeployedContractInfo, useScaffoldEventSubscriber } from "~~/hooks/scaffold-eth";
import { formatTx } from "~~/utils/formatStuff";
import { notification } from "~~/utils/scaffold-eth";
import { timeAgoUnix } from "~~/utils/time";

async function getStakes(address: string) {
  const apiUrl = `api/stakes?address=${address}`;

  try {
    const response = await axios.get(apiUrl);
    console.log(response);

    return response.data.userStakes;
  } catch (error) {
    console.log(error);
  }
}

export const StakesTable = () => {
  type stakesType = {
    stakedAt: number;
    stakedAmount: number;
    apy: number;
    address: string;
    hash: string;
    slotId: number;
  };
  const { address } = useAccount();
  const [isClaim, setIsClaim] = useState(true);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(0);
  const [stakesLoading, setStakesLoading] = useState(true);
  const [stakes, setStakes] = useState<stakesType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const { data: deployedContractInfo } = useDeployedContractInfo("StakingContract");

  useEffect(() => {
    const callGetStakes = async () => {
      try {
        const data = await getStakes(address || "");
        console.log("Loaded Data", data);

        if (data) {
          for (let i = 0; i < data.length; i++) {
            try {
              console.log(i);
              const rewards = await readContract({
                address: deployedContractInfo?.address!,
                abi: deployedContractInfo?.abi!,
                functionName: "getUserRewards",
                args: [BigInt(i)],
                chainId: 31337,
                account: address,
              });
              console.log("rewards", rewards);
              data[i].apy = formatEther(rewards);
            } catch (e) {
              console.log("changing rewards failed");
            }
          }

          setStakes(data);
          setStakesLoading(false);
        } else {
          setStakesLoading(false);
        }
      } catch (e) {
        console.log("getting data failed", e);
      }
    };

    callGetStakes();
  }, [address]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const saveStakeToDb = async (newStake: {
    stakedAt: number;
    stakedAmount: number;
    apy: number;
    address: string;
    hash: string;
    slotId: number;
  }) => {
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

  const startIndex = (currentPage - 1) * 5;
  const endIndex = startIndex + 5;

  // Slice the data to show only items for the current page
  const paginatedData = stakes.slice(startIndex, endIndex);
  console.log("Stakes after slicing", stakes);
  useScaffoldEventSubscriber({
    contractName: "StakingContract",
    eventName: "Staked",
    listener: logs => {
      logs.map(log => {
        // TODO save to db

        const { user, amount, stakeTime, slotId } = log.args;
        console.log("📡 Staked", user, amount, stakeTime, slotId);
        console.log(stakes);
        if (user && amount && stakeTime) {
          const newStake = {
            stakedAt: stakeTime,
            stakedAmount: Number(amount),
            apy: 18, //TODO change this to current apy
            address: user,
            hash: log.transactionHash ? log.transactionHash?.toString() : "",
            slotId: Number(slotId),
          };

          const isDuplicate = stakes.some(stake => stake.hash === newStake.hash);

          console.log("isDuplicate", isDuplicate, stakes.length);
          if (!isDuplicate || stakes.length == 0) {
            // If it's not a duplicate, add the new stake
            console.log("Saving to DB");
            saveStakeToDb(newStake);

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

  // const { data: apy, isLoading: isApyLoading } = useScaffoldContractRead({
  //   contractName: "StakingContract",
  //   functionName: "getCurrentApy",
  // });

  useScaffoldEventSubscriber({
    contractName: "StakingContract",
    eventName: "UnstakedTokens",
    listener: logs => {
      logs.map(log => {
        const { user, amount, unstakeTime } = log.args;
        console.log("📡 Unstaked", user, amount, unstakeTime);
        if (user && amount && unstakeTime) {
          const hash = log.transactionHash ? log.transactionHash?.toString() : "";
          // const updatedStakes = stakes.filter(stake => stake.slotId !== slotId);
          // setStakes(updatedStakes);
          //removeStakeInDb();
        }
      });
    },
  });

  useScaffoldEventSubscriber({
    contractName: "StakingContract",
    eventName: "RewardClaimed",
    listener: logs => {
      logs.map(log => {
        const { user, totalReward, timeOfClaim } = log.args;
        console.log("📡 Claimed", user, totalReward, timeOfClaim);
        if (user && totalReward && timeOfClaim) {
          notification.success(<div> claimed {formatEther(totalReward)} </div>);
        }
      });
    },
  });

  const updateRestakedDB = async (newStake: {
    rewardsLeft: number;
    newStakedAmount: number;
    newStakedAt: number;
    hash: string;
    addr: string;
    slotId: number;
  }) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: "JWT fefege...",
    };
    try {
      const response = axios.put("/api/stakes", newStake, {
        headers: headers,
      });

      console.log(response);
      console.log("Restaked");
    } catch (error) {
      console.log(error);
    }

    console.log("Saved to DB");
  };

  useScaffoldEventSubscriber({
    contractName: "StakingContract",
    eventName: "ReStaked",
    listener: logs => {
      logs.map(log => {
        const { user, amount, stakeTime, slotId, rewardsLeft } = log.args;
        console.log("📡 Restaked", user, amount, stakeTime, slotId, rewardsLeft);

        console.log("RESTAKED", user && stakeTime);
        if (user && stakeTime) {
          const updatedStake = {
            rewardsLeft: Number(rewardsLeft),
            newStakedAmount: Number(amount),
            newStakedAt: Number(stakeTime),
            hash: log.transactionHash ? log.transactionHash?.toString() : "",
            addr: user,
            slotId: Number(slotId),
          };

          console.log("Updating restaked db");
          updateRestakedDB(updatedStake);

          notification.success(<div> Restaked {formatEther(amount)} </div>);
        }
      });
    },
  });

  return (
    <section className="mt-8 w-full">
      <GradientComponent>
        <div className="relative p-8 flex flex-col space-y-2 bg-gradient-to-r from-[#141525] to-[#140B1E] rounded-2xl w-full">
          <div className="flex justify-between mb-4">
            <h1 className="text-2xl font-bold text-left"> Your Staked Positions </h1>
            <div className="flex space-x-4">
              <ClaimButton></ClaimButton>

              <RestakeButton></RestakeButton>
            </div>
          </div>

          {stakesLoading ? (
            <div className="justify-center">
              <button type="button" className="bg-base-200 rounded-2xl" disabled>
                <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24"></svg>
                Processing...
              </button>
            </div>
          ) : (
            <table className="w-full bg-base-200 shadow-lg rounded-lg overflow-hidden">
              <thead className="w-full">
                <tr className="bg-[#11101A] ">
                  <th className="px-4 py-4 border border-white">ID</th>
                  <th className="px-4 py-4 border border-white">Amount Staked</th>
                  <th className="px-4 py-4 border border-white">Txn Hash</th>
                  <th className="px-4 py-4 border border-white">Staked At</th>
                  <th className="px-4 py-4 border border-white">Rewards</th>
                  <th className="px-4 py-4 border border-white">Actions</th>
                </tr>
              </thead>
              <tbody>
                {/* Sample Data */}
                {paginatedData.map((stake: any, idx: any) => {
                  return (
                    <tr
                      className="w-full p-4 my-2 items-center justify-center border border-white bg-[#11101A]"
                      key={stake.hash}
                    >
                      <td className="px-4 py-2 text-center">{stake.slotId}</td>
                      <td className="px-4 py-2 text-center">{formatEther(stake.stakedAmount)}</td>
                      <td className="px-4 py-2 text-center">{formatTx(stake.hash)}</td>
                      <td className="px-4 py-2 text-center">{timeAgoUnix(stake.stakedAt)}</td>
                      <td className="px-4 py-2 text-center">{stake.apy}</td>

                      <td className="px-4 py-2 text-center flex justify-center space-x-4">
                        {/* <ActionButton text="Claim" onClick={() => openClaimPopup()}></ActionButton> */}

                        <button
                          className="bg-gradient-to-r from-[#4F56FF] to-[#9D09E3] text-sm text-white py-0 px-8 rounded-full"
                          onClick={() => {
                            setIsClaim(true);
                            handlePopup();
                            setSelectedSlot(stake.slotId);
                          }}
                        >
                          Claim
                        </button>
                        <div className="p-0.5 text-sm rounded-full bg-gradient-to-r from-[#4F56FF] to-[#9D09E3]">
                          <button
                            type="button"
                            className="px-4 py-2 border-1 rounded-full bg-gray-800"
                            onClick={() => {
                              setIsClaim(false);
                              handlePopup();
                              setSelectedSlot(stake.slotId);
                            }}
                          >
                            Restake
                          </button>
                        </div>
                        {/* <UnStake unstakeAmount={stake.stakedAmount} slotId={stake.slotId}></UnStake> */}
                      </td>
                    </tr>
                  );
                })}
                {/* Add more rows with similar structure */}
                <ClaimPopup
                  isOpen={isPopupOpen}
                  onClose={handlePopup}
                  slotId={BigInt(selectedSlot)}
                  isClaim={isClaim}
                ></ClaimPopup>
              </tbody>
            </table>
          )}

          <div className="flex pagination space-x-4 justify-end">
            <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
              <ArrowLeftIcon className="inline-block h-4 w-4" />
            </button>
            <span className="text-accent font-bold">{currentPage}</span>
            <button onClick={() => handlePageChange(currentPage + 1)} disabled={endIndex >= stakes.length}>
              <ArrowRightIcon className="inline-block h-4 w-4" />
            </button>
          </div>
        </div>
      </GradientComponent>
    </section>
  );
};
