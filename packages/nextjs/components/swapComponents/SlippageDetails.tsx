import React, { useEffect, useState } from "react";
import { readContract } from '@wagmi/core'
import { useAccount } from "wagmi";
import pairABI from "../../../foundry/out/UniswapV2Pair.sol/UniswapV2Pair.json"
import { nordek } from "~~/utils/NordekChain";
import { tokenType } from "~~/data/data";
import { formatEther } from "viem";
import { AiOutlineSwap } from 'react-icons/ai';
type DetailsType = {
  pairContract: string,
  token1: tokenType,
  token2: tokenType,
  reserve1: Number,
  reserve2: Number,
  minimumPrice?: Number

}

const SlippageDetails = ({ pairContract, token1, token2, reserve1 = 0, reserve2 = 0, minimumPrice = 0 }: DetailsType) => {
  // Define state for each div
  const { address: account } = useAccount()
  const [toggleBtn, setToggleBtn] = useState(false);
  const [token0Amount, setToken0Amount] = useState(0);
  const [token1Amount, setToken1Amount] = useState(0);
  //   const [shareOfPool, setShareOfPool] = useState(0);
  //   const [amountReceived, setAmountReceived] = useState(0);
  //   const [LPTokens, setLPTokens] = useState(0);
  console.log("pair contract address " + pairContract)

  const toggleBtnFunction = () => {
    setToggleBtn(!toggleBtn);
  }


  return (
    <div className="flex flex-col space-y-1">



      <div className="flex justify-between">
        <span> Price </span>
        <div className="flex items-center gap-1">


          {
            toggleBtn ? (
              <div className="">
                <div>
                  1 {token1.symbol} = {reserve1 !== 0 && reserve2 !== 0 ? Number(reserve2) / Number(reserve1) : 0} {token2.symbol}{" "}
                </div>
              </div>
            ) : (
              <div className="">
                <div>
                  1 {token2.symbol} = {reserve1 !== 0 && reserve2 !== 0 ? Number(reserve1) / Number(reserve2) : 0} {token1.symbol}{" "}
                </div>
              </div>
            )}
          <button onClick={toggleBtnFunction}>
            <AiOutlineSwap className="text-lg " />
          </button>
        </div>
      </div>
      {/* 
      <div className="flex justify-between">
        <span> Share of Pool </span>
        <span className="font-bold"> {shareOfPool} </span>
      </div> */}

      <div className="flex justify-between">
        <span> Minimum Received </span>
        <span className="font-bold"> {`${minimumPrice}`} </span>
      </div>


      {/* 
      <div className="flex justify-between">
        <span> Gas Fee </span>
        <span className="font-bold"> 0.1 NRK </span>
      </div> */}
      <hr className="" />
    </div>
  );
};

export default SlippageDetails;
