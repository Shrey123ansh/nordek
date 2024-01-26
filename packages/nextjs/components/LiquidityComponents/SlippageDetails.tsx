import React, { useEffect, useState } from "react";
import pairABI from "../../../foundry/out/UniswapV2Pair.sol/UniswapV2Pair.json";
import { readContract } from "@wagmi/core";
import { useDarkMode } from "usehooks-ts";
import { formatEther } from "viem";
import { useAccount } from "wagmi";
import { tokenType } from "~~/data/data";
import { nordek } from "~~/utils/NordekChain";

type DetailsType = {
  pairContract: string;
  token1: tokenType;
  token2: tokenType;
  reserve1: Number;
  reserve2: Number;
  share: Number;
  lpTokens: string;
};

const SlippageDetails = ({ token1, token2, reserve1 = 0, reserve2 = 0, share = 0, lpTokens = "-" }: DetailsType) => {
  const [token1PerToken2, setToken1PerToken2] = useState(0);
  const [token2PerToken1, setToken2PerToken1] = useState(0);
  useEffect(() => {
    const value1 = reserve1 !== 0 && reserve2 !== 0 ? Number(reserve2) / Number(reserve1) : 0;
    const value2 = reserve1 !== 0 && reserve2 !== 0 ? Number(reserve1) / Number(reserve2) : 0;

    setToken1PerToken2(Number(value1.toFixed(4).replace(/[.,]00$/, "")));
    setToken2PerToken1(Number(value2.toFixed(4).replace(/[.,]00$/, "")));
  }, [reserve1, reserve2, token1, token2]);

  const { isDarkMode } = useDarkMode();

  return (
    <div
      className={`shadow-md bg-swap-gradient rounded-lg mt-4   font-medium ${
        !isDarkMode && "border-2 border-[#E2D4FF]"
      }   `}
    >
      <div className="px-4 pt-4  text-[10px]">PRICES AND POOL SHARE</div>
      <div className=" grid grid-cols-2 justify-center   lg:flex lg:flex-row items-center lg:justify-between  mt-4  p-4 ">
        {/* token1 per token2  */}
        <div className="flex flex-col items-center justify-center  ">
          <div className=" text-base ">{token1PerToken2}</div>
          <div className=" mt-2 text-sm ">{`${token2.symbol} per ${token1.symbol}`}</div>
        </div>

        {/* token2 per token1  */}
        <div className="flex flex-col items-center justify-center">
          <div className=" text-base ">{token2PerToken1}</div>
          <div className=" mt-2 text-sm ">{`${token1.symbol} per ${token2.symbol}`}</div>
        </div>

        {/* share of pool */}
        <div className="flex flex-col items-center mt-4 lg:mt-0  w-[200px]  lg:w-fit   justify-center">
          <div className=" text-base ">{Number(share).toFixed(4)}</div>
          <div className=" mt-2 text-sm ">No. of LP tokens</div>
        </div>
      </div>
    </div>
  );
};

export default SlippageDetails;
