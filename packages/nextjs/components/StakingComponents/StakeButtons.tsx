import React from "react";
import { useRouter } from "next/router";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

export const ClaimButton = () => {
  const { writeAsync, isLoading } = useScaffoldContractWrite({
    contractName: "StakingContract",
    functionName: "claimAllRewards",
    onBlockConfirmation: txnReceipt => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
    },
  });

  return (
    <button
      className="bg-gradient-to-r from-[#4F56FF] to-[#9D09E3] font-bold text-white py-0 px-8 rounded-lg"
      onClick={() => writeAsync()}
    >
      Claim All
    </button>
  );
};

export const RestakeButton = () => {
  const { writeAsync, isLoading } = useScaffoldContractWrite({
    contractName: "StakingContract",
    functionName: "restakeAll",
    onBlockConfirmation: txnReceipt => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
    },
  });

  return (
    <div className="rounded-lg bg-gradient-to-r from-[#4F56FF] to-[#9D09E3] p-0.5">
      <button
        type="button"
        className="px-8 py-2 border-1 rounded-lg font-bold bg-gray-800"
        onClick={() => writeAsync()}
      >
        Restake All
      </button>
    </div>
  );
};

export const TransactionsButton = ({ address }) => {
  const router = useRouter();
  return (
    <button
      className="bg-gradient-to-r from-[#4F56FF] to-[#9D09E3] font-bold text-white py-0 px-8 rounded-lg"
      onClick={() => router.push(`/stakeTransactions/${address}`)}
    >
      Transactions
    </button>
  );
};
