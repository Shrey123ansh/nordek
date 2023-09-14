import { useEffect, useState } from "react";
import GradientComponent from "./GradientContainer";
import { formatEther } from "viem";
import { useAccount, useBalance } from "wagmi";
import { useDeployedContractInfo, useScaffoldContractRead } from "~~/hooks/scaffold-eth";
import { getTokenData } from "~~/utils/coingeckoPrices";

export const StakeInfo = () => {
  const { address } = useAccount();
  const { data: deployedContract } = useDeployedContractInfo("StakingContract");
  const {
    data: totalNRKStaked,
    isError,
    isLoading,
  } = useBalance({
    address: deployedContract?.address,
  });
  const [tvl, setTvl] = useState(0);

  useEffect(() => {
    const updateTVL = async () => {
      const NRKTokendata = await getTokenData("nordek", "usd");
      const totalStakedNrk = Number(totalNRKStaked?.formatted);
      const tvlVal = NRKTokendata.usd * totalStakedNrk;
      setTvl(tvlVal);
    };
    updateTVL();
  }, [totalNRKStaked]);

  const { data: apy, isLoading: isApyLoading } = useScaffoldContractRead({
    contractName: "StakingContract",
    functionName: "getCurrentApy",
  });

  let { data: userRewards, isLoading: isUserTotalRewards } = useScaffoldContractRead({
    contractName: "StakingContract",
    functionName: "getTotalRewards",
    account: address,
  });

  let { data: userTotalStakes, isLoading: isUserTotalStakes } = useScaffoldContractRead({
    contractName: "StakingContract",
    functionName: "getUserTotalStakes",
    account: address,
  });

  userTotalStakes = userTotalStakes ? userTotalStakes : BigInt(0);
  userRewards = userRewards ? userRewards : BigInt(0);

  const data = [
    {
      text: "Total NRK Staked",
      data: Number(totalNRKStaked?.formatted).toFixed(2),
    },
    {
      text: "Total Value",
      data: `$ ${tvl.toFixed(2)}`,
    },
    {
      text: "Total Rewards Earned",
      data: "",
    },
    {
      text: "APY Applicable",
      data: apy?.toString() + "%",
    },
    {
      text: "Rewards",
      data: formatEther(userRewards),
    },
    {
      text: "Restake",
      data: `${formatEther(userTotalStakes)} NRK`,
    },
  ];
  return (
    <section className="mt-8 w-full">
      <GradientComponent>
        <div className="rounded-xl relative flex flex-col w-full p-8 bg-gradient-to-r from-[#141525] to-[#140B1E] space-y-4">
          <h1 className="text-2xl"> Total NRK Staked</h1>
          {data.map((info, idx) => {
            return (
              <div className="w-full flex justify-between" key={idx}>
                <h1>{info.text}</h1>
                <h1>{info.data?.toString()}</h1>
              </div>
            );
          })}
        </div>
      </GradientComponent>
    </section>
  );
};
