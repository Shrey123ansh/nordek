"use client"
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Select } from "../Select/Select";
import { localTokens, tokenType } from "~~/data/data";
import { set } from "mongoose";
import { Liquidity } from "~~/pages/api/liquidity";
import LiquidityFooter from "./LiquidityPositionFooter";
import { useScaffoldContractWrite, useDeployedContractInfo } from "~~/hooks/scaffold-eth";
import { parseEther } from "viem";
import { useAccount } from "wagmi";
import axios from "axios";
import { writeContract, waitForTransaction } from '@wagmi/core'
import pairABI from "../../../foundry/out/UniswapV2Pair.sol/UniswapV2Pair.json";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";

// import 'toolcool-range-slider';
import { RangeSlider } from 'toolcool-range-slider';
import { FaArrowDownLong } from "react-icons/fa6";



const PositionSelectToken = ({ liqudity, updateOnRemove, onRemove }: { liqudity: Liquidity, updateOnRemove: (value: bool) => void, onRemove: bool }) => {

  const { data: routerContract } = useDeployedContractInfo("NordekV2Router02");
  const nrkAddress: string = localTokens.NRK.address
  const sliderRef = useRef(null);

  const [percentage, setPercentage] = useState(0);
  const [value, setValue] = useState<Number>(liqudity.lpTokens)
  const [open, setOpen] = useState(false)
  const [slippage, setSlippage] = useState(0.8)
  const { address: account } = useAccount()
  const [remove, setRemove] = useState(false)
  const setPercentageExtension = (value: number) => {
    if (value <= 100) {
      setPercentage(value)
      setValue((Number(liqudity.lpTokens) * value) / 100)
    }
  }

  const token0Withdraw = (Number(liqudity.token0Amount) * percentage) / 100
  const token1Withdraw = (Number(liqudity.token1Amount) * percentage) / 100
  const token0WithdrawMin = token0Withdraw - (token0Withdraw * slippage) / 100
  const token1WithdrawMin = token1Withdraw - (token1Withdraw * slippage) / 100

  const currentDate = new Date();
  const unixTimestampInSeconds = Math.floor(currentDate.getTime() / 1000);

  const { writeAsync: removeLiqudityETH } = useScaffoldContractWrite({
    contractName: "NordekV2Router02",
    functionName: "removeLiquidityNRKSupportingFeeOnTransferTokens",
    args: [
      liqudity.token0.address === nrkAddress ? liqudity.token1.address : nrkAddress,
      parseEther(`${(Number(value) * percentage) / 100}`),
      liqudity.token0.address === nrkAddress ? parseEther(`${token1WithdrawMin}`) : parseEther(`${token0WithdrawMin}`),
      liqudity.token0.address === nrkAddress ? parseEther(`${token0WithdrawMin}`) : parseEther(`${token1WithdrawMin}`),
      account,
      BigInt(unixTimestampInSeconds + 300)
    ],
    onSuccess: async () => {
      // update database 
      if (percentage === 100) {
        console.log("delete value from db")
        await deleteLiquidity()
      }
      else {
        console.log("update value from db")
        await updateLiquidity()
      }

      updateOnRemove(!onRemove)

    }
  });
  const { writeAsync: removeLiquidity } = useScaffoldContractWrite({
    contractName: "NordekV2Router02",
    functionName: "removeLiquidity",
    args: [
      liqudity.token0.address,
      liqudity.token1.address,
      parseEther(`${value}`),
      parseEther(`${token0WithdrawMin}`),
      parseEther(`${token1WithdrawMin}`),
      account,
      BigInt(unixTimestampInSeconds + 300)
    ],
    onSuccess: async () => {
      // update database 
      if (percentage === 100) {
        await deleteLiquidity()
      }
      else {
        await updateLiquidity()
      }

    }
  });

  const resetValues = () => {
    const lpTokenLeft = Number(liqudity.lpTokens) - Number(value)
    setValue(lpTokenLeft)
    liqudity.token0Amount = Number(liqudity.token0Amount) - token0Withdraw
    liqudity.token1Amount = Number(liqudity.token1Amount) - token1Withdraw
    liqudity.lpTokens = lpTokenLeft

  }



  const deleteLiquidity = async () => {
    try {
      await axios.delete(`api/liquidity?pairContract=${liqudity.pairContract}&userAddress=${liqudity.user}`);
      console.log("deleted success fully");
    } catch (error) {
      console.log(error);
    }
  }


  const updateLiquidity = async () => {
    const liquidity: Liquidity = {
      token0: liqudity.token0,
      token1: liqudity.token1,
      token0Amount: Number(liqudity.token0Amount) - token0Withdraw,
      token1Amount: Number(liqudity.token1Amount) - token1Withdraw,
      pairContract: liqudity.pairContract,
      user: account,
      lpTokens: Number(liqudity.lpTokens) - Number((Number(value) * percentage) / 100)
    }

    const headers = {
      "Content-Type": "application/json",
      Authorization: "JWT fefege...",
    };
    try {
      await axios.put("/api/liquidity", liquidity, {
        headers: headers,
      });
      console.log("liquidity update successfully");
    } catch (error) {
      console.log(error);
    }

  }

  const handleWithdraw = async () => {

    try {
      console.log(value)
      if (percentage === 0) return
      var _value = (Number(value) * percentage) / 100
      console.log("pair contract  value  " + liqudity.pairContract)
      const { hash: approveHash } = await writeContract({
        address: liqudity.pairContract,
        abi: pairABI.abi,
        functionName: 'approve',
        args: [routerContract.address, parseEther(`${_value}`)]
      })
      await waitForTransaction({
        hash: approveHash
      })
      console.log("token 1 withdraw amount " + token0WithdrawMin)
      console.log("token 2 withdraw amount " + token1WithdrawMin)
      if (liqudity.token0.address === nrkAddress || liqudity.token1.address === nrkAddress) {
        await removeLiqudityETH()
      } else {
        await removeLiquidity()
      }
    } catch (e) { }
  }




  console.log(liqudity.token0)
  console.log(liqudity.token)


  return (
    <>

      <div className="bg-swap-gradient rounded-lg px-4 py-4 mb-4" >

        <div className="flex flex-row w-full  items-center justify-between  " >
          <div className="flex flex-row items-center font-medium ml-2  text-sm lg:text-base " >

            <img src={liqudity.token0.logo} className=" w-4 h-4 lg:w-6 lg:h-6 rounded-full  absolute -ml-3   " />
            <img src={liqudity.token1.logo} className="w-4 h-4 lg:w-6 lg:h-6 rounded-full  mr-2   " />
            {`${liqudity.token0.symbol}/${liqudity.token1.symbol}`}
          </div>
          <button className="flex flex-row items-center  bg-secondary rounded-full px-2 lg:px-4 lg:py-1  text-xs  lg:text-sm font-medium " onClick={() => { setOpen(!open); setRemove(false) }} >
            Manage
            {open ? <RiArrowDropUpLine className="ml-2 " />
              : <RiArrowDropDownLine className="ml-2" />}

          </button>



        </div>

        {
          open &&
          <>
            <div className="mt-4" >


              <div className="flex flex-row items-center justify-between  font-normal text-sm  " >
                <div>Your Lp Tokens:</div>
                <div>{liqudity.lpTokens.toFixed(2).replace(/[.,]00$/, "")}</div>
              </div>

              <div className="flex flex-row items-center justify-between  font-normal text-sm mt-2 " >
                <div>{`Pooled ${liqudity.token0.symbol}`}</div>
                <div className="flex flex-row items-center" >
                  {liqudity.token0Amount.toFixed(2).replace(/[.,]00$/, "")}
                  <img src={liqudity.token0.logo} className="w-4 h-4 rounded-full ml-2 " />
                </div>
              </div>

              <div className="flex flex-row items-center justify-between  font-normal text-sm mt-2  " >
                <div>{`Pooled ${liqudity.token1.symbol}`}</div>
                <div className="flex flex-row items-center" >
                  {liqudity.token1Amount.toFixed(2).replace(/[.,]00$/, "")}
                  <img src={liqudity.token1.logo} className="w-4 h-4 rounded-full ml-2 " />
                </div>
              </div>

              {!remove && <button className=" text-center  w-full mt-4 font-medium bg-secondary rounded-lg py-2  " onClick={() => { setRemove(true) }} >
                Remove
              </button>}




            </div>
          </>
        }

      </div >
      {remove &&
        <div className="mt-2" >
          <div className=" text-[10px] font-semibold  " >REMOVE LIQUIDITY</div>
          <div className="bg-swap-gradient rounded-lg p-4 mt-2" >
            <div className=" text-6xl font-bold " >
              {`${percentage}%`}
            </div>
            <div className="mt-4" >
              <input type="range" onChange={(e) => setPercentage(e.target.value)} value={percentage} className=" w-full h-1 outline-none slider " pointer-shadow="0 0 5px #DAE8FF" />
            </div>
            <div className=" flex flex-row items-center justify-between w-full mt-4 " >
              {/* <button className=" bg-secondary px-4 rounded-md py-2 " onClick={() => { setPercentage(25) }} >
                25%
              </button>
              <button className=" bg-secondary px-4 rounded-md py-2 " onClick={() => { setPercentage(50) }}>
                50%
              </button>
              <button className=" bg-secondary px-4 rounded-md py-2 " onClick={() => { setPercentage(75) }} >
                75%
              </button>
              <button className=" bg-secondary px-4 rounded-md py-2 " onClick={() => { setPercentage(100) }} >
                100%
              </button> */}
              <button className=" bg-secondary px-1 rounded-md py-1 font-medium lg:px-4 lg:py-2 " onClick={() => { setPercentage(25) }} >
                25%
              </button>
              <button className=" bg-secondary px-1 rounded-md py-1 font-medium lg:px-4 lg:py-2" onClick={() => { setPercentage(50) }} >
                50%
              </button>
              <button className=" bg-secondary px-1 rounded-md py-1 font-medium lg:px-4 lg:py-2" onClick={() => { setPercentage(75) }} >
                75%
              </button>
              <button className=" bg-secondary px-1 rounded-md py-1 font-medium lg:px-4 lg:py-2" onClick={() => { setPercentage(100) }} >
                100%
              </button>
            </div>
          </div>
          <FaArrowDownLong className="w-full items-center my-4" />
          <div className="bg-swap-gradient rounded-lg p-4">
            <div className="flex flex-row items-center justify-between " >
              <div>
                {token0Withdraw === 0 ? 0 : token0Withdraw.toFixed(4)}
              </div>
              <div className="flex flex-row items-center  " >
                <img src={liqudity.token0.logo} className="w-6 h-6 rounded-full mr-2 " />
                <div className=" font-semibold " > {liqudity.token0.symbol}</div>
              </div>
            </div>
            <div className="flex flex-row items-center justify-between mt-4 " >
              <div>
                {token1Withdraw === 0 ? 0 : token1Withdraw.toFixed(4)}
              </div>
              <div className="flex flex-row items-center  " >
                <img src={liqudity.token1.logo} className="w-6 h-6 rounded-full mr-2 " />
                <div className=" font-semibold " > {liqudity.token1.symbol}</div>
              </div>
            </div>

          </div>


          <button className="btn btn-sm btn-outline btn-accent my-4 w-full" onClick={handleWithdraw}>
            Remove Liquidity
          </button>
        </div >}
    </>
  );
};

export default PositionSelectToken;
