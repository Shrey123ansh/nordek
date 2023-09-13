import { useState } from "react";
import { Claim, Restake } from "./ClaimRestake";
import GradientComponent from "./GradientContainer";
import { formatEther } from "viem";
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
  console.log("SLOT ID", slotId);
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

  const handleRestake = () => {
    // Perform the "Restake" action here
    console.log("Restaking", amount);
    restake();
    onClose();
  };

  if (!isOpen) return null;

  const textColor = "bg-gradient-to-r from-white to-[#AD00FF] text-transparent bg-clip-text";

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 bg-gray-800">
      <GradientComponent>
        <div className="relative bg-base-200 p-4 rounded-md shadow-md">
          <div className="text-center mb-4 flex justify-between items-center text-center">
            <h2 className="text-lg font-semibold">{isClaim ? "Claim" : "Restake"}</h2>
            <button className="relative top-0 right-0 text-white-600 hover:text-gray-400" onClick={onClose}>
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

          <input
            type="text"
            placeholder="Enter amount"
            className="w-full p-2 border border-snow-300 rounded-md mb-4 text-white bg-transparent"
            value={amount}
            onChange={e => setAmount(e.target.value)}
          />

          <div className="flex flex-col space-y-4 mb-8">
            <h1 className="flex justify-between ">
              <span className={textColor}>ID</span>
              <span className={textColor}>{slotId.toString()}</span>
            </h1>
            {isClaim ? (
              <h1 className="flex justify-between text-gradient-to-r from-[#4F56FF] to-[#9D09E3]">
                <span className={textColor}>Rewards</span>{" "}
                <span className={textColor}>{userSlotReward ? formatEther(userSlotReward) : ""} NRK</span>
              </h1>
            ) : (
              <h1 className="flex justify-between text-gradient-to-r from-[#4F56FF] to-[#9D09E3]">
                <span className={textColor}>Stake</span>{" "}
                <span className={textColor}>{userSlotStake ? formatEther(userSlotStake[0]) : ""} NRK</span>
              </h1>
            )}
          </div>

          <div className="flex justify-between">
            {isClaim ? (
              <Claim ClaimAmount={Number(amount)} slotId={Number(slotId)}></Claim>
            ) : (
              <Restake RestakeAmount={Number(amount)} slotId={Number(slotId)}></Restake>
            )}
          </div>
        </div>
      </GradientComponent>
    </div>
  );
};
