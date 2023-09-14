import React, { useEffect } from "react";
import { formatEther } from "viem";
import { useAccount, useBalance } from "wagmi";
import {
  useDeployedContractInfo,
  useScaffoldContractRead,
  useScaffoldContractWrite,
  useScaffoldEventSubscriber,
} from "~~/hooks/scaffold-eth";
import { getTokenData } from "~~/utils/coingeckoPrices";
import { notification } from "~~/utils/scaffold-eth/notification";

const StakeInfoBox = () => {
  const { address } = useAccount();
  const { data: deployedContract } = useDeployedContractInfo("StakingContract");
  const {
    data: totalNRKStaked,
    isError,
    isLoading,
  } = useBalance({
    address: deployedContract?.address,
  });

  const [tvl, setTvl] = React.useState<number>(0);

  const { data: userTotalRewards, isLoading: isUserTotalRewards } = useScaffoldContractRead({
    contractName: "StakingContract",
    functionName: "getTotalRewards",
    account: address,
  });

  const { writeAsync, isLoading: isClaimAllLoading } = useScaffoldContractWrite({
    contractName: "StakingContract",
    functionName: "claimAllRewards",
    onBlockConfirmation: txnReceipt => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
    },
  });
  console.log("USER TOTAL REWARDS", userTotalRewards);

  useEffect(() => {
    const updateTVL = async () => {
      const NRKTokendata = await getTokenData("nordek", "usd");
      const totalStakedNrk = Number(totalNRKStaked?.formatted);
      const tvlVal = NRKTokendata.usd * totalStakedNrk;
      setTvl(tvlVal);
    };
    updateTVL();
  }, [totalNRKStaked]);

  return (
    <div className="flex items-center justify-between p-8 py-12 rounded-lg w-[100%] bg-base-100">
      {/* Big Logo on the Left */}
      <div className="flex items-center mr-8">
        <img src="/icon.svg" alt="Your Logo" className=" h-full" />
      </div>

      {/* Content in the Middle */}
      <div className="flex-grow">
        <h1 className="text-4xl font-bold mb-2">Staking Platform</h1>
        <div className="flex items-center mb-2">
          <span className="text-primary-content text-sm mr-2">Total NRK Staked: </span>
          <span className="text-sm text-accent">{totalNRKStaked ? totalNRKStaked.formatted.toString() : 0} NRK</span>
        </div>
        <div className="flex items-center mb-2">
          <span className="text-primary-content text-sm mr-2">Total Value Locked:</span>
          <span className="text-sm text-accent">${tvl}</span>
        </div>
        <div className="flex items-center">
          <span className="text-primary-content text-sm mr-2">Your Total Rewards:</span>
          <span className="text-sm text-accent">{userTotalRewards ? formatEther(userTotalRewards) : 0} NRK</span>
        </div>
      </div>

      {/* Buttons on the Right */}
      <div className="flex flex-col space-y-4 items-center">
        <button
          className="bg-gradient-to-r from-[#5B10B9] to-[#79C5E7] text-white font-bold py-2 px-8 rounded-full mr-2"
          onClick={() => {
            writeAsync();
          }}
        >
          Claim All
        </button>
        <button className="text-white font-bold py-2 px-8 rounded-full hover:bg-gradient-to-r from-[#5B10B9] to-[#79C5E7]">
          Unstake
        </button>
      </div>
    </div>
  );
};

export default StakeInfoBox;
