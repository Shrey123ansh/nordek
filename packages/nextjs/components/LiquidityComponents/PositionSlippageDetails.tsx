import React, { useEffect, useState } from "react";
import { readContract } from '@wagmi/core'
import { useAccount } from "wagmi";
import pairABI from "../../../foundry/out/UniswapV2Pair.sol/UniswapV2Pair.json"
import { nordek } from "~~/utils/NordekChain";
import { tokenType } from "~~/data/data";
import { formatEther } from "viem";

type DetailsType = {
  pairContract: string,
  token1: tokenType,
  token2: tokenType,
  reserve1: Number,
  reserve2: Number,
  share: Number,
  lpTokens: string
}

const PositionSlippageDetails = ({ pairContract, token1, token2, reserve1 = 0, reserve2 = 0, share = 0, lpTokens = "-" }: DetailsType) => {
  // Define state for each div
  const [LPTokens, setLPTokens] = useState(0);
  console.log("pair contract address " + pairContract)

  return (
    <div className="flex flex-col space-y-1 text-[#8F8F8F]">
      {/* <div className="">
        <div>
          1 {token1.symbol} = {reserve1 !== 0 && reserve2 !== 0 ? Number(reserve2) / Number(reserve1) : 0} {token2.symbol}{" "}
        </div>
      </div>

      <div className="">
        <div>
          1 {token2.symbol} = {reserve1 !== 0 && reserve2 !== 0 ? Number(reserve1) / Number(reserve2) : 0} {token1.symbol}{" "}
        </div>
      </div> */}

      <div className="flex justify-between">
        <span> Pooled {token1.symbol} </span>
        <span className="font-bold"> {`${lpTokens}`} </span>
      </div> 
      <div className="flex justify-between">
        <span> - Withdraw {token1.symbol} </span>
        <span className="font-bold"> {`${lpTokens}`} </span>
      </div>       

      <div className="flex justify-between">
        <span> Share of Pool </span>
        <span className="font-bold">{`${share}%`} </span>
      </div>

      <div className="flex justify-between">
        <span> Pooled {token2.symbol} </span>
        <span className="font-bold"> {`${lpTokens}`} </span>
      </div>
      <hr className="" />
    </div>
  );
};

export default PositionSlippageDetails;
