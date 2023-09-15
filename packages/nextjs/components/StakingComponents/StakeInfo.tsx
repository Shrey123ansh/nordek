import { useEffect, useState } from "react";
import { getUserData } from "./APICallFunctions";
import GradientComponent from "./GradientContainer";
import axios from "axios";
import { formatEther } from "viem";
import { useAccount, useBalance } from "wagmi";
import { useDeployedContractInfo, useScaffoldContractRead } from "~~/hooks/scaffold-eth";
import { getTokenData } from "~~/utils/coingeckoPrices";
import { formatNumberWithKMB, parseUSD } from "~~/utils/usd";

type user = { address: string; totalStaked: bigint; totalRewards: bigint; totalRestakes: bigint };

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

  useEffect(() => {
    const loadData = async () => {
      if (address) {
        const data = await getUserData(address);
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
      text: "Total Value",
      data: `$ ${parseUSD(tvl)}`,
    },
    // {
    //   text: "Total Rewards Earned",
    //   data: "",
    // },
    {
      text: "Rewards Claimed Till Now",
      data: `${formatEther(userData?.totalRewards ? userData.totalRewards : BigInt(0))} NRK`,
    },
    {
      text: "Restaked Till Now",
      data: `${formatEther(userData?.totalRestakes ? userData.totalRestakes : BigInt(0))} NRK`,
    },
  ];
  const textColor = "bg-gradient-to-r from-white to-[#F991CC] text-transparent bg-clip-text";
  return (
    <section className="mt-8 w-full">
      <GradientComponent>
        <div className="rounded-xl relative flex flex-col w-full p-8 bg-gradient-to-r from-[#141525] to-[#140B1E] space-y-4">
          <h1 className="text-2xl"> User Data</h1>
          {data.map((info, idx) => {
            return (
              <div className="w-full flex justify-between" key={idx}>
                <h1 className={textColor}>{info.text}</h1>
                <h1 className={textColor}>{info.data?.toString()}</h1>
              </div>
            );
          })}
        </div>
      </GradientComponent>
    </section>
  );
};
