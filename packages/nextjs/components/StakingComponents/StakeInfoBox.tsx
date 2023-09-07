import React, { useEffect } from "react";
import { useBalance } from "wagmi";
import { getTokenData } from "~~/utils/coingeckoPrices";

const StakeInfoBox = () => {
  const [totalStaked, setTotalStaked] = React.useState<number>(1);
  const {
    data: totalNRKStaked,
    isError,
    isLoading,
  } = useBalance({
    address: "0x0E801D84Fa97b50751Dbf25036d067dCf18858bF",
  });

  const [tvl, setTvl] = React.useState<number>(0);

  useEffect(() => {
    const updateTVL = async () => {
      const NRKTokendata = await getTokenData("nordek", "usd");
      setTvl(NRKTokendata.usd * totalStaked);
    };
    updateTVL();
  }, [totalStaked]);

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
          <span className="text-sm text-accent">{totalNRKStaked ? totalNRKStaked.toString() : 0} NRK</span>
        </div>
        <div className="flex items-center">
          <span className="text-primary-content text-sm mr-2">Total Value Locked:</span>
          <span className="text-sm text-accent">${tvl}</span>
        </div>
      </div>

      {/* Buttons on the Right */}
      <div className="flex flex-col space-y-4 items-center">
        <button className="bg-gradient-to-r from-[#5B10B9] to-[#79C5E7] text-white font-bold py-2 px-8 rounded-full mr-2">
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
