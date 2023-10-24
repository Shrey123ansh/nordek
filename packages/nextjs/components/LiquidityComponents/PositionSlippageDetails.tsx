import React, { useEffect, useState } from "react";
import { readContract } from '@wagmi/core'
import { useAccount } from "wagmi";
import pairABI from "../../../foundry/out/UniswapV2Pair.sol/UniswapV2Pair.json"
import { nordek } from "~~/utils/NordekChain";
import { tokenType } from "~~/data/data";
import { formatEther } from "viem";
import { Liquidity } from "~~/pages/api/liquidity";


const PositionSlippageDetails = ({ liquidity, withdrawPercentage }: { liquidity: Liquidity, withdrawPercentage: Number }) => {


  return (
    <div className="flex flex-col space-y-1 text-[#8F8F8F]">
      <div className="flex justify-between">
        <span> Pooled {liquidity.token0.symbol} </span>
        <span className="font-bold"> {`${liquidity.token0Amount}`} </span>
      </div>
      <div className="flex justify-between">
        <span> - Withdraw {liquidity.token0.symbol} </span>
        <span className="font-bold"> {`${(Number(liquidity.token0Amount) * Number(withdrawPercentage)) / 100}`} </span>
      </div>

      {/* <div className="flex justify-between">
        <span> Share of Pool </span>
        <span className="font-bold">{`${share}%`} </span>
      </div> */}

      <div className="flex justify-between">
        <span> Pooled {liquidity.token1.symbol} </span>
        <span className="font-bold"> {`${liquidity.token1Amount}`} </span>
      </div>
      <div className="flex justify-between">
        <span> - Withdraw {liquidity.token1.symbol} </span>
        <span className="font-bold"> {`${(Number(liquidity.token1Amount) * Number(withdrawPercentage)) / 100}`} </span>
      </div>


    </div>
  );
};

export default PositionSlippageDetails;
