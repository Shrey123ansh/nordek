import React from "react";
import { useBalance } from "wagmi";
import { useDeployedContractInfo } from "~~/hooks/scaffold-eth";
import { formatNumberWithKMB } from "~~/utils/usd";

const StakeHeader: React.FC = () => {
  const { data: deployedContract } = useDeployedContractInfo("StakingContract");
  const { data, isError, isLoading } = useBalance({
    address: deployedContract?.address,
  });

  const totalNRKStaked = Number(data?.formatted);

  return (
    <div className="w-[90%] h-[25rem] flex flex-col justify-center items-center md:h-[30rem] lg:h-[40rem] bg-[url('/assets/headerbg.png')]  bg-no-repeat bg-contain ">
      <div className="flex -mt-[8rem] h-[70%] flex-col justify-between items-center lg:flex-row w-[60%]  md:w-[67%] lg:w-3/5 xl:w-3/5">
        <div
          className=" w-[100%] lg:w-[45%] h-[45%]  lg:h-[65%]  bg-cover bg-no-repeat   rounded-[15px]   "
          style={{
            background: "rgba(200, 200, 200, 0.08)",
            strokeWidth: "1px",
            stroke: "#CDD5FE",
            filter: "drop-shadow(0px 4px 24px rgba(0, 0, 0, 0.20))",
            backdropFilter: "blur(23px)",
          }}
        >
          <div className="flex flex-col p-[1rem] lg:p-[3rem] justify-between items-center rounded-[15px] ">
            <div className="text-[25px] md:text-[55px] lg:text-[65px] xl:text-[80px] font-[600]">
              {formatNumberWithKMB(totalNRKStaked)}
            </div>
            <div className="text-[15px] md:text-[18px] lg:text-[21px] xl:text-[24px] text-center">Total NRK Staked</div>
          </div>
        </div>
        <div
          className=" w-[100%] lg:w-[45%] h-[45%]  lg:h-[65%]  bg-cover bg-no-repeat   rounded-[15px]   "
          style={{
            background: "rgba(200, 200, 200, 0.08)",
            strokeWidth: "1px",
            stroke: "#CDD5FE",
            filter: "drop-shadow(0px 4px 24px rgba(0, 0, 0, 0.20))",
            backdropFilter: "blur(23px)",
          }}
        >
          <div className="flex flex-col p-[1rem] lg:p-[3rem] justify-between items-center rounded-[15px] ">
            <div className="text-[20px] md:text-[50px] lg:text-[60px] xl:text-[80px] font-[600]">$3M</div>
            <div className="text-[15px] md:text-[18px] lg:text-[21px] xl:text-[24px] text-center">Total NRK Supply</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StakeHeader;
