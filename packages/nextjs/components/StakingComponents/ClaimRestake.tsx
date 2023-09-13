import { useAccount } from "wagmi";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

export const Claim = ({ ClaimAmount, slotId }: { ClaimAmount: number; slotId: number }) => {
  const { address } = useAccount();
  const { writeAsync, isLoading } = useScaffoldContractWrite({
    contractName: "StakingContract",
    functionName: "claimRewards",
    account: address,
    args: [BigInt(ClaimAmount), BigInt(slotId)],
    onBlockConfirmation: txnReceipt => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
    },
  });

  return (
    <button
      className="bg-gradient-to-r from-[#4F56FF] to-[#9D09E3] text-sm text-white py-2 px-8 rounded-full w-full"
      onClick={() => {
        writeAsync;
      }}
    >
      Claim
    </button>
  );
};

export const Restake = ({ RestakeAmount, slotId }: { RestakeAmount: number; slotId: number }) => {
  const { address } = useAccount();
  const { writeAsync, isLoading } = useScaffoldContractWrite({
    contractName: "StakingContract",
    functionName: "restake",
    account: address,
    args: [BigInt(RestakeAmount), BigInt(slotId)],
    onBlockConfirmation: txnReceipt => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
    },
  });

  return (
    <button
      className="bg-gradient-to-r from-[#4F56FF] to-[#9D09E3] text-sm text-white py-2 px-8 rounded-full w-full"
      onClick={() => {
        writeAsync;
      }}
    >
      Restake
    </button>
  );
};
