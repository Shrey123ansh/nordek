//@ts-nocheck
import { useState } from "react";
import GradientComponent from "./GradientContainer";
import { formatEther, parseEther } from "viem";
import { useAccount } from "wagmi";
import { useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

export const ClaimPopup = ({
  isOpen,
  onClose,
  slotId,
  isClaim,
}: {
  isOpen: boolean;
  onClose: () => void;
  slotId: bigint;
  isClaim: boolean;
}) => {
  const [amount, setAmount] = useState(0);
  const { address } = useAccount();

  const { data: userSlotReward, isLoading: isGetUserSlotReward } = useScaffoldContractRead({
    contractName: "StakingContract",
    functionName: "getUserRewards",
    account: address,
    args: [slotId],
  });
  //const userSlotStake = userSlotStakeDtls? userSlotStakeDtls[0]

  const slotReward = userSlotReward ? userSlotReward : BigInt(0);

  function setStakeAmountMax() {
    setAmount(formatEtherNumber(slotReward));
  }

  const { writeAsync: claimRewards } = useScaffoldContractWrite({
    contractName: "StakingContract",
    functionName: "claimRewards",
    account: address,
    args: [slotReward, BigInt(slotId)],
    onBlockConfirmation: txnReceipt => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
    },
  });

  const { writeAsync: restakeRewards } = useScaffoldContractWrite({
    contractName: "StakingContract",
    functionName: "restake",
    account: address,
    args: [slotReward, BigInt(slotId)],
    onBlockConfirmation: txnReceipt => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
    },
  });
  if (!isOpen) return null;

  const textColor = "text-secondary-content mx-4";

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 bg-gray-800">
      <GradientComponent>
        <div className="relative bg-custom-gradient p-4 rounded-md shadow-md">
          <div className="text-center mb-4 flex justify-between items-center text-center">
            <h2 className="text-lg font-semibold mr-8 ">{isClaim ? "Claim Rewards" : "Restake Rewards"}</h2>
            <button className="relative top-0 right-0 text-base-content hover:text-gray-400 ml-8" onClick={onClose}>
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

          <div className="flex flex-col space-y-4 mb-8">
            <h1 className="flex justify-between ">
              <span className={textColor}>Slot ID</span>
              <span className={textColor}>{slotId.toString()}</span>
            </h1>
            {isClaim ? (
              <h1 className="flex justify-between text-gradient-to-r from-[#4F56FF] to-[#9D09E3]">
                <span className={textColor}>Rewards</span>{" "}
                <span className={textColor}>{formatEther(slotReward)} NRK</span>
              </h1>
            ) : (
              <h1 className="flex justify-between text-gradient-to-r from-[#4F56FF] to-[#9D09E3]">
                <span className={textColor}>Stake</span>{" "}
                <span className={textColor}>{formatEther(slotReward)} NRK</span>
              </h1>
            )}
          </div>

          <div className="flex justify-between">
            {isClaim ? (
              <button
                className="bg-gradient-to-r from-[#4F56FF] to-[#9D09E3] text-sm text-white py-2 px-8 rounded-full w-full font-semibold"
                onClick={() => {
                  claimRewards();
                  onClose();
                }}
              >
                Claim All
              </button>
            ) : (
              <button
                className="bg-gradient-to-r from-[#4F56FF] to-[#9D09E3] text-sm text-white py-2 px-8 rounded-full w-full font-semibold"
                onClick={() => {
                  restakeRewards();
                  onClose();
                }}
              >
                Restake All
              </button>
            )}
          </div>
        </div>
      </GradientComponent>
    </div>
  );
};
