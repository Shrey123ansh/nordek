import React, { useEffect, useState } from "react";
import { useBalance } from "wagmi";
import { useDeployedContractInfo } from "~~/hooks/scaffold-eth";
import { getTokenData } from "~~/utils/coingeckoPrices";
import { formatNumberWithKMB, parseUSD } from "~~/utils/usd";

const StakeHeader: React.FC = () => {
  const { data: deployedContract } = useDeployedContractInfo("StakingContract");
  const { data, isError, isLoading } = useBalance({
    address: deployedContract?.address,
  });

  const [tvl, setTvl] = useState(0);
  const totalNRKStaked = Number(data?.formatted);

  useEffect(() => {
    console.log("Updaing tvl");
    const updateTVL = async () => {
      const NRKTokendata = await getTokenData("nordek", "usd");
      if (NRKTokendata) {
        const tvlVal = NRKTokendata?.usd * Number(totalNRKStaked);
        setTvl(tvlVal);
      } else {
        setTvl(0);
      }
    };

    updateTVL();
  }, [totalNRKStaked, isLoading]);

  return (
    <div className="w-[100%] h-[25rem] flex flex-col justify-center items-center md:h-[30rem] lg:h-[40rem] bg-[url('/assets/headerbg.png')]  bg-no-repeat bg-contain text-white">
      <div className="flex gap-[2rem] lg:gap-[0rem] -mt-[8rem] h-[70%] flex-col justify-between items-center lg:flex-row w-[60%]  md:w-[67%] lg:w-3/5 xl:w-3/5">
        <div
          className=" w-[100%] lg:w-[30%] h-[45%]  lg:h-[65%]  bg-cover bg-no-repeat   rounded-[15px] "
          style={{
            background: "rgba(200, 200, 200, 0.08)",
            strokeWidth: "1px",
            stroke: "#CDD5FE",
            filter: "drop-shadow(0px 4px 24px rgba(0, 0, 0, 0.20))",
            backdropFilter: "blur(23px)",
          }}
        >
          <div className="flex flex-col p-[1rem] lg:p-[3rem] justify-between items-center rounded-[15px] ">
            <div className="text-[25px] md:text-[55px] lg:text-[65px] xl:text-[70px] font-[600]">
              {formatNumberWithKMB(totalNRKStaked)}
            </div>
            <div className="text-[15px] md:text-[18px] lg:text-[21px] xl:text-[22px] text-center">Total NRK Staked</div>
          </div>
        </div>
        <div
          className=" w-[100%] lg:w-[30%] h-[45%]  lg:h-[65%]  bg-cover bg-no-repeat   rounded-[15px]   "
          style={{
            background: "rgba(200, 200, 200, 0.08)",
            strokeWidth: "1px",
            stroke: "#CDD5FE",
            filter: "drop-shadow(0px 4px 24px rgba(0, 0, 0, 0.20))",
            backdropFilter: "blur(23px)",
          }}
        >
          <div className="flex flex-col p-[1rem] lg:p-[3rem] justify-between items-center rounded-[15px] ">
            <div className="text-[20px] md:text-[50px] lg:text-[60px] xl:text-[70px] font-[600]">
              {"$" + parseUSD(tvl)}
            </div>
            <div className="text-[15px] md:text-[18px] lg:text-[21px] xl:text-[22px] text-center">
              Total Value Locked
            </div>
          </div>
        </div>
        <div
          className=" w-[100%] lg:w-[30%] h-[45%]  lg:h-[65%]  bg-cover bg-no-repeat   rounded-[15px]   "
          style={{
            background: "rgba(200, 200, 200, 0.08)",
            strokeWidth: "1px",
            stroke: "#CDD5FE",
            filter: "drop-shadow(0px 4px 24px rgba(0, 0, 0, 0.20))",
            backdropFilter: "blur(23px)",
          }}
        >
          <div className="flex flex-col p-[1rem] lg:p-[3rem] justify-between items-center rounded-[15px] ">
            <div className="text-[20px] md:text-[50px] lg:text-[60px] xl:text-[70px] font-[600]">2.1B</div>
            <div className="text-[15px] md:text-[18px] lg:text-[21px] xl:text-[22px] text-center">Total NRK Supply</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StakeHeader;
