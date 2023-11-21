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

const SlippageDetails = ({ token1, token2, reserve1 = 0, reserve2 = 0, share = 0, lpTokens = "-" }: DetailsType) => {

  const [token1PerToken2, setToken1PerToken2] = useState(0)
  const [token2PerToken1, setToken2PerToken1] = useState(0)
  useEffect(() => {
    const value1 = reserve1 !== 0 && reserve2 !== 0 ? Number(reserve2) / Number(reserve1) : 0
    const value2 = reserve1 !== 0 && reserve2 !== 0 ? Number(reserve1) / Number(reserve2) : 0
    setToken1PerToken2(value1.toFixed(4))
    setToken2PerToken1(value2.toFixed(4))
  }, [reserve1, reserve2, token1, token2])



  return (


    <div className="shadow-md bg-gradient-to-r from-[#141414] to-[#593FB1] rounded-lg mt-4   font-medium    " >

      <div className="px-4 pt-4  text-[10px]" >
        PRICES AND POOL SHARE
      </div>
      <div className="flex flex-row items-center justify-between mt-4  p-4 " >

        {/* token1 per token2  */}
        <div className="flex flex-col items-center justify-center  " >
          <div className=" text-base " >
            {token1PerToken2}
          </div>
          <div className=" mt-2 text-sm " >
            {`${token1.symbol} per ${token2.symbol}`}
          </div>
        </div>


        {/* token2 per token1  */}
        <div className="flex flex-col items-center justify-center" >
          <div className=" text-base ">
            {token2PerToken1}
          </div>
          <div className=" mt-2 text-sm " >
            {`${token2.symbol} per ${token1.symbol}`}
          </div>
        </div>


        {/* share of pool */}
        <div className="flex flex-col items-center justify-center" >
          <div className=" text-base ">
            {share}
          </div>
          <div className=" mt-2 text-sm " >
            Share of pool
          </div>
        </div>
      </div>

    </div>
  );
};

export default SlippageDetails;
