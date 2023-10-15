import { useEffect, useState } from "react";
import { getUserData } from "./APICallFunctions";
import GradientComponent from "./GradientContainer";
import axios from "axios";
import { formatEther } from "viem";
import { useAccount, useBalance, usePublicClient } from "wagmi";
import { useDeployedContractInfo, useScaffoldContractRead } from "~~/hooks/scaffold-eth";
import { getTokenData } from "~~/utils/coingeckoPrices";
import { getTargetNetwork } from "~~/utils/scaffold-eth";
import { formatNumberWithKMB, parseUSD } from "~~/utils/usd";

type user = { address: string; totalStaked: bigint; totalRewards: bigint; totalRestakes: bigint; blockNumber: number };

export const StakeInfo = () => {
  const { address } = useAccount();
  const [userData, setUserData] = useState<user>();
  const [tvl, setTvl] = useState(0);
  const { data: userTotalStakes, isLoading: isUserTotalStakes } = useScaffoldContractRead({
    contractName: "StakingContract",
    functionName: "getUserTotalStakes",
    account: address,
  });

  //const balance = balanceData ? parseFloat(balanceData.formatted).toFixed(2) : "";

  const userStakes = userTotalStakes ? formatEther(userTotalStakes) : "0";

  const configuredNetwork = getTargetNetwork();
  const client = usePublicClient({ chainId: configuredNetwork.id });

  useEffect(() => {
    const loadData = async () => {
      if (address) {
        const blockNumber = await client.getBlockNumber();
        const data = await getUserData(address, Number(blockNumber));
        setUserData(data);
      }
    };

    const updateTVL = async () => {
      const NRKTokendata = await getTokenData("nordek", "usd");
      if (NRKTokendata) {
        const tvlVal = NRKTokendata?.usd * Number(userStakes);

        setTvl(tvlVal);
      } else {
        setTvl(0);
      }
    };
    loadData();
    updateTVL();
  }, [address]);

  const data = [
    {
      text: "Total NRK Staked",
      data: `${userStakes} NRK`,
    },
    {
      text: "User Total Value",
      data: `$ ${parseUSD(tvl)}`,
    },
    // {
    //   text: "Total Rewards Earned",
    //   data: "",
    // },
    {
      text: "Total Rewards Claimed",
      data: `${formatEther(userData?.totalRewards ? userData.totalRewards : BigInt(0))} NRK`,
    },
    {
      text: "Restaked Till Now",
      data: `${formatEther(userData?.totalRestakes ? userData.totalRestakes : BigInt(0))} NRK`,
    },
  ];
  const textColor = "text-secondary-content text-xs md:text-base lg:text-base";
  return (
    <section className="mt-8 w-full">
      <GradientComponent>
        <div className="rounded-xl relative flex flex-col w-full p-8 bg-custom-gradient space-y-4">
          <h1 className="text-2xl font-bold"> User Data</h1>
          {data.map((info, idx) => {
            return (
              <div className="w-full flex justify-between" key={idx}>
                <h1 className={textColor}>{info.text}</h1>
                <h1 className={`${textColor} important-text text-right`}>{info.data?.toString()}</h1>
              </div>
            );
          })}
        </div>
      </GradientComponent>
    </section>
  );
};
