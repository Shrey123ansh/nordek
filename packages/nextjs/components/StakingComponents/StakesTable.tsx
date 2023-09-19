import { useEffect, useState } from "react";
import { TransactionHash } from "../blockexplorer";
import {
  getPlatformDetails,
  getStakes,
  removeAllStakesForUser,
  removeStakeInDb,
  saveStakeToDb,
  setPlatformDetails,
  updateRestakedAllDB,
  updateRestakedDB,
  updateUserData,
} from "./APICallFunctions";
import { ClaimPopup } from "./ClaimPopup";
import GradientComponent from "./GradientContainer";
import { readContract } from "@wagmi/core";
import { Timestamp } from "mongodb";
import useSWR from "swr";
import { formatEther } from "viem";
import { useAccount } from "wagmi";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { ClaimButton, TransactionsButton } from "~~/components/StakingComponents/StakeButtons";
import { RestakeButton } from "~~/components/StakingComponents/StakeButtons";
import { useDeployedContractInfo, useScaffoldContractRead, useScaffoldEventSubscriber } from "~~/hooks/scaffold-eth";
import { calculateRewards } from "~~/utils/Norswap";
import { notification } from "~~/utils/scaffold-eth";
import { unixTimestampToDate } from "~~/utils/time";

export const StakesTable = ({ platformDetails }) => {
  type stakesType = {
    stakedAt: number;
    stakedAmount: number;
    address: string;
    hash: string;
    slotId: number;
    rewards?: string;
  };
  const { address } = useAccount();
  const [isClaim, setIsClaim] = useState(true);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const { data: deployedContractInfo } = useDeployedContractInfo("StakingContract");

  const { data: frequency, isLoading: isFrequency } = useScaffoldContractRead({
    contractName: "StakingContract",
    functionName: "frequency",
    account: address,
  });

  console.log("PLATFORM DETAILS", platformDetails);

  const stakesFetcher = async () => {
    const data = await getStakes(address || "");
    console.log("Loaded SWR Data", data);
    return data;
  };

  // const platformApyFetcher = async () => {
  //   const data = await getPlatformDetails();
  //   return data;
  // };

  // const {
  //   data: platformDetails,
  //   isLoading: isPlatformDetailsLoading,
  //   error: isPlatformDetailsError,
  //   mutate: mutatePlatformDetails,
  // } = useSWR(`/api/platformDetails`, platformApyFetcher);

  function updateWithRewards(
    data: stakesType[],
    frequency,
    platformDetails: { apy: string; timestamp: string; hash: string }[],
  ) {
    const apyData = platformDetails.map(details => ({
      value: Number(details.apy),
      timestamp: Number(details.timestamp),
    }));

    data.map(stake => {
      stake.rewards = calculateRewards({
        amount: stake.stakedAmount,
        startTime: stake.stakedAt,
        frequency: frequency,
        apy: apyData,
      }).toString();
    });
  }

  const {
    data: stakes,
    isLoading: isStakesLoading,
    error: isStakesError,
    mutate: mutateStakes,
  } = useSWR(address && frequency && platformDetails ? `/api/stakes` : null, stakesFetcher, {
    onSuccess: data => updateWithRewards(data, Number(frequency), platformDetails),
  });

  if (isStakesError) {
    console.log("Stakes Error", isStakesError);
    return "An Error Occured";
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const startIndex = (currentPage - 1) * 5;
  const endIndex = startIndex + 5;

  // const addPlatformDetailsMutation = async details => {
  //   try {
  //     await setPlatformDetails(details);
  //     mutatePlatformDetails();
  //   } catch (e) {
  //     console.log("Error in saving new stake", e);
  //   }
  // };

  const addStakesMutation = async newStake => {
    console.log("Called mutation");
    try {
      await saveStakeToDb(newStake);
      mutateStakes();
    } catch (e) {
      console.log("Error in saving new stake", e);
    }
  };

  const removeStakesMutation = async updateInfo => {
    console.log("Called mutation");
    try {
      await removeStakeInDb(updateInfo);
      mutateStakes();
    } catch (e) {
      console.log("Error in removing stake on unstake", e);
    }
  };

  const removeAllStakesMutation = async user => {
    console.log("Called mutation");
    try {
      await removeAllStakesForUser(user);

      mutateStakes();
    } catch (e) {
      console.log("Error in removing stake on unstake", e);
    }
  };

  const updateRestakedMutation = async updatedStake => {
    console.log("Called mutation");
    try {
      await updateRestakedDB(updatedStake);

      mutateStakes();
    } catch (e) {
      console.log("Error in removing stake on unstake", e);
    }
  };

  const updateAllRestakedMutation = async (user, updatedStakes) => {
    console.log("Called mutation");
    try {
      await updateRestakedAllDB(user, updatedStakes);

      mutateStakes();
    } catch (e) {
      console.log("Error in removing stake on unstake", e);
    }
  };

  // APY Updated
  // useScaffoldEventSubscriber({
  //   contractName: "StakingContract",
  //   eventName: "ApyUpdated",
  //   listener: logs => {
  //     logs.map(log => {
  //       // TODO save to db

  //       const { apy, timeStamp } = log.args;
  //       console.log("📡 New APY set", apy, timeStamp);

  //       if (apy != undefined && Timestamp != undefined) {
  //         console.log("saving new apy");
  //         const details = {
  //           apy: apy,
  //           timestamp: Number(timeStamp),
  //           hash: log.transactionHash ? log.transactionHash?.toString() : "",
  //         };

  //         console.log("Saving to DB from event");
  //         addPlatformDetailsMutation(details);
  //       }
  //     });
  //   },
  // });

  // Staked
  useScaffoldEventSubscriber({
    contractName: "StakingContract",
    eventName: "Staked",
    listener: logs => {
      logs.map(log => {
        // TODO save to db

        const { user, amount, stakeTime, slotId } = log.args;
        console.log("📡 Staked", user, amount, stakeTime, slotId);

        if (user && amount != undefined && stakeTime != undefined) {
          console.log("saving new stake");
          const newStake: stakesType = {
            stakedAt: stakeTime,
            stakedAmount: Number(amount),
            address: user,
            hash: log.transactionHash ? log.transactionHash?.toString() : "",
            slotId: Number(slotId),
          };

          console.log("Saving to DB from event");
          addStakesMutation(newStake);
        }
      });
    },
  });

  // Unstaked arbitrary tokens
  useScaffoldEventSubscriber({
    contractName: "StakingContract",
    eventName: "UnstakedTokens",
    listener: logs => {
      logs.map(log => {
        console.log("STAKES before if", stakes);
        const { user, amount, unstakeTime, _slotId, rewardsLeft } = log.args;
        console.log("📡 Unstaked", user, amount, unstakeTime, _slotId, rewardsLeft);
        console.log("IF VALUE", user && amount != undefined && _slotId != undefined && rewardsLeft != undefined);
        if (user != undefined && amount != undefined && _slotId != undefined && rewardsLeft != undefined) {
          if (stakes != undefined) {
            try {
              const topSlotId = stakes[0].slotId;
              const slotsToDel = [];
              let slotToUpdate = undefined;
              if (rewardsLeft === BigInt(0)) {
                // del topSlotId to _slotId
                for (let i = topSlotId; i <= _slotId; i++) {
                  slotsToDel.push(i);
                }
              } else {
                if (BigInt(topSlotId) === _slotId) {
                  // only need to update this val
                  slotToUpdate = [Number(_slotId), Number(rewardsLeft)];
                } else {
                  // del topSlotId to _slotId, update the _slotId
                  for (let i = topSlotId; i < _slotId; i++) {
                    slotsToDel.push(i);
                  }
                  slotToUpdate = [Number(_slotId), Number(rewardsLeft)];
                }
              }

              console.log("UPDATE: ", user, slotsToDel, slotToUpdate);
              const updateInfo = {
                user: user,
                slotsToDel: slotsToDel,
                updateSlot: slotToUpdate,
              };

              console.log("UPDATE INFO", updateInfo);
              removeStakesMutation(updateInfo);
            } catch (e) {
              console.log("Stakes", stakes);
              console.log("Unstake db update error", e);
            }
          } else {
            try {
              const updateSlots = async () => {
                try {
                  const slots = await readContract({
                    address: deployedContractInfo?.address!,
                    abi: deployedContractInfo?.abi!,
                    functionName: "getUserStakesInfo",
                    account: user,
                  });

                  const transformedArray = slots
                    .filter(item => Number(item.amount) > 0) // Filter items with amount > 0
                    .map(item => ({
                      stakedAmount: Number(item.amount),
                      stakedAt: item.startTime,
                      address: user, // Replace with the desired address
                      hash: log.transactionHash,
                      slotId: Number(item.id), // Replace with the desired hash
                    }));

                  console.log("TRANSFORMED ARRAY", transformedArray);

                  await updateAllRestakedMutation(user, transformedArray);
                } catch (e) {
                  console.log("failed to update the DB", e);
                }
              };

              updateSlots();
            } catch (e) {
              console.log("failed to update the DB", e);
            }
          }
        }
      });
    },
  });

  // Unstaked all tokens
  useScaffoldEventSubscriber({
    contractName: "StakingContract",
    eventName: "UnstakedAllTokens",
    listener: logs => {
      logs.map(log => {
        const { user, totalAmount, rewards, unstakeTime } = log.args;
        console.log("📡 Unstaked", user, totalAmount, rewards, unstakeTime);
        if (user && totalAmount && unstakeTime && rewards != undefined) {
          removeAllStakesMutation(user);
          notification.error(<div> Unstaked All: {formatEther(totalAmount)} </div>);
          notification.success(<div> Claimed {formatEther(rewards)} </div>);
        }
      });
    },
  });

  // Reward Claimed
  useScaffoldEventSubscriber({
    contractName: "StakingContract",
    eventName: "RewardClaimed",
    listener: logs => {
      logs.map(log => {
        const { user, totalReward, timeOfClaim, slotId, rewardsLeft } = log.args;
        console.log("📡 Claimed", user, totalReward, timeOfClaim, slotId, rewardsLeft);

        if (user && timeOfClaim && totalReward != undefined) {
          const updates = {
            totalRewards: Number(totalReward),
          };

          console.log("Updating userData db, totalRewards");
          updateUserData(user, updates);

          notification.success(<div> Claimed {formatEther(totalReward)} </div>);
        }
      });
    },
  });

  // All Rewards Claimed
  useScaffoldEventSubscriber({
    contractName: "StakingContract",
    eventName: "AllRewardClaimed",
    listener: logs => {
      logs.map(log => {
        const { user, totalReward, timeOfClaim } = log.args;
        console.log("📡 Claimed", user, totalReward, timeOfClaim);

        if (user && timeOfClaim && totalReward != undefined) {
          const updates = {
            totalRewards: Number(totalReward),
          };

          console.log("Updating userData db, totalRewards");
          updateUserData(user, updates);

          notification.success(<div> Claimed {formatEther(totalReward)} </div>);
        }
      });
    },
  });

  // Restaked
  useScaffoldEventSubscriber({
    contractName: "StakingContract",
    eventName: "ReStaked",
    listener: logs => {
      logs.map(log => {
        const { user, amount, stakeTime, slotId, rewardsLeft } = log.args;
        console.log("📡 Restaked", user, amount, stakeTime, slotId, rewardsLeft);

        console.log("RESTAKED", user && stakeTime);
        if (user && stakeTime && amount != undefined) {
          const updatedStake = {
            newStakedAmount: Number(amount),
            newStakedAt: Number(stakeTime),
            hash: log.transactionHash ? log.transactionHash?.toString() : "",
            addr: user,
            slotId: Number(slotId),
          };

          console.log("Updating restaked db");
          updateRestakedMutation(updatedStake);

          const updates = {
            totalRestakes: Number(amount),
          };

          updateUserData(user, updates);

          notification.success(<div> Restaked {formatEther(amount)} </div>);
        }
      });
    },
  });

  // Restaked All
  useScaffoldEventSubscriber({
    contractName: "StakingContract",
    eventName: "RestakedAll",
    listener: logs => {
      logs.map(log => {
        const { user, restakedAmount, timeStamp } = log.args;
        console.log("📡 Restaked", user, restakedAmount, timeStamp);

        if (user && timeStamp && restakedAmount != undefined) {
          const updateSlots = async () => {
            try {
              const slots = await readContract({
                address: deployedContractInfo?.address!,
                abi: deployedContractInfo?.abi!,
                functionName: "getUserStakesInfo",
                account: user,
              });
              console.log("retrieved slots", slots);

              const transformedArray = slots.map(item => ({
                stakedAmount: Number(item.amount),
                stakedAt: item.startTime,
                address: user, // Replace with the desired address
                hash: log.transactionHash,
                slotId: Number(item.id), // Replace with the desired hash
              }));

              console.log("TRANSFORMED ARRAY", transformedArray);

              await updateAllRestakedMutation(user, transformedArray);

              const updates = {
                totalRestakes: Number(restakedAmount),
              };

              console.log("Updating userData");
              await updateUserData(user, updates);
            } catch (e) {
              console.log("failed to update the DB", e);
            }

            notification.success(<div> Restaked {formatEther(restakedAmount)} </div>);
          };

          updateSlots();
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
              <TransactionsButton address={address}></TransactionsButton>
              <ClaimButton></ClaimButton>

              <RestakeButton></RestakeButton>
            </div>
          </div>

          {isStakesLoading || !stakes ? (
            <div className="justify-center">
              <button type="button" className="bg-base-100 rounded-2xl px-4" disabled>
                <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24"></svg>
                Loading...
              </button>
            </div>
          ) : (
            <div>
              <table className="w-full bg-base-200 shadow-lg rounded-lg overflow-hidden">
                <thead className="w-full">
                  <tr className="bg-[#11101A] ">
                    <th className="px-4 py-4 border border-white">Slot ID</th>
                    <th className="px-4 py-4 border border-white">Amount Staked</th>
                    <th className="px-4 py-4 border border-white">Txn Hash</th>
                    <th className="px-4 py-4 border border-white">Staked At</th>
                    <th className="px-4 py-4 border border-white">Rewards</th>
                    <th className="px-4 py-4 border border-white">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Sample Data */}
                  {stakes.slice(startIndex, endIndex).map((stake: any, idx: any) => {
                    return (
                      <tr
                        className="w-full p-4 my-2 items-center justify-center border border-white bg-[#11101A]"
                        key={idx}
                      >
                        <td className="px-4 py-2 text-center">{stake?.slotId}</td>
                        <td className="px-4 py-2 text-center">{formatEther(stake?.stakedAmount || "")}</td>
                        <td className="px-4 py-2 text-center">
                          <TransactionHash hash={stake?.hash}></TransactionHash>
                        </td>
                        {/* <td className="px-4 py-2 text-center"><a href=""></a>{formatTx(stake.hash)}</td> */}
                        <td className="px-4 py-2 text-center">{unixTimestampToDate(stake?.stakedAt)}</td>
                        <td className="px-4 py-2 text-center">{stake?.rewards}</td>

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
          )}
        </div>
      </GradientComponent>
    </section>
  );
};
