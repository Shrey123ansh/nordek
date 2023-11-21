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
import { writeContract } from '@wagmi/core'
import pairABI from "../../../foundry/out/UniswapV2Pair.sol/UniswapV2Pair.json";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";

// import 'toolcool-range-slider';
import { RangeSlider } from 'toolcool-range-slider';
import { FaArrowDownLong } from "react-icons/fa6";



const PositionSelectToken = ({ liqudity }: { liqudity: Liquidity }) => {

  const { data: routerContract } = useDeployedContractInfo("UniswapV2Router02");
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
    contractName: "UniswapV2Router02",
    functionName: "removeLiquidityETHSupportingFeeOnTransferTokens",
    args: [
      liqudity.token0.address === nrkAddress ? liqudity.token1.address : nrkAddress,
      parseEther(`${value}`),
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

    }
  });
  const { writeAsync: removeLiquidity } = useScaffoldContractWrite({
    contractName: "UniswapV2Router02",
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
      lpTokens: Number(liqudity.lpTokens) - Number(value)
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
    await writeContract({
      address: liqudity.pairContract,
      abi: pairABI.abi,
      functionName: 'approve',
      args: [routerContract.address, parseEther(`${value}`)]
    })
    if (liqudity.token0.address === nrkAddress || liqudity.token1.address === nrkAddress) {
      await removeLiqudityETH()
    } else {
      await removeLiquidity()
    }
  }

  // useEffect(() => {

  //   const slider = sliderRef.current;

  //   const onChange = (evt: Event) => {
  //     const customEvent = evt as CustomEvent;
  //     setPercentage(customEvent.detail.value)
  //   };

  //   slider?.addEventListener('change', onChange);



  // }, []);

  const setSliderValue = (value: Number) => {
    sliderRef.current.setAttribute("value", `${value}`)
  }


  return (
    // <div className=" flex flex-col mb-4 shadow-md bg-gradient-to-r from-[#141414] to-[#593FB1] px-4 py-2 rounded-lg text-white text-sm">

    //   <span className="">Withdraw</span>
    //   <div className="flex items-center">
    //     <div>
    //       <div className="font-bold">
    //         <span>{liqudity.token0.symbol}</span> -
    //         <span>{liqudity.token1.symbol}</span>
    //       </div>
    //     </div>

    //     <input
    //       type="number"
    //       placeholder="0.0"
    //       value={Number(value)}
    //       className="input input-sm input-ghost max-w-md text-right rounded-none focus:outline-none bg-transparent leading-tight [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
    //       onChange={e => {
    //         const val: number = Number(e.target.value)
    //         if (val <= Number(liqudity.lpTokens)) {
    //           setValue(val)
    //           setPercentage((val * 100) / Number(liqudity.lpTokens))
    //         }
    //       }}
    //     />

    //   </div>
    //   <label className="label block w-full text-right">
    //     <span className="label-text-alt">-</span>
    //   </label>
    //   <hr className="bg-white w-full" />

    //   <div className="py-1">
    //     <div className="flex items-center justify-between">
    //       <span>By Percentage</span>
    //       <input
    //         type="number"
    //         step="0.1"
    //         min={1}
    //         max={100}
    //         value={percentage}
    //         className="input input-sm input-ghost max-w-md text-right rounded-none focus:outline-none bg-transparent leading-tight [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
    //         onChange={(e) => { setPercentageExtension(Number(e.target.value)) }}
    //       ></input>
    //     </div>

    //     <div className="flex justify-end gap-4">
    //       <span onClick={() => setPercentageExtension(Number(25))} className="cursor-pointer hover:text-gray-400">25%</span>
    //       <span onClick={() => setPercentageExtension(Number(50))} className="cursor-pointer hover:text-gray-400">50%</span>
    //       <span onClick={() => setPercentageExtension(Number(75))} className="cursor-pointer hover:text-gray-400">75%</span>
    //       <span onClick={() => setPercentageExtension(Number(100))} className="cursor-pointer hover:text-gray-400">MAX</span>
    //     </div>

    //   </div>
    //   <hr className="bg-white w-full" />

    //   <div className="flex justify-between">
    //     <span>Balance</span>
    //     <span>{Number(liqudity.lpTokens)}</span>
    //   </div>

    //   <LiquidityFooter liquidity={liqudity} percentage={percentage} withdraw={handleWithdraw} slippage={slippage} setSlippage={setSlippage} />
    // </div>

    <>

      <div className="bg-gradient-to-r from-[#141414] to-[#593FB1] rounded-lg px-4 py-4 mb-4" >

        <div className="flex flex-row w-full  items-center justify-between  " >
          <div className="flex flex-row items-center font-medium ml-2 " >

            <img src={liqudity.token0.logo} className="w-6 h-6 rounded-full    mr-2   " />
            <img src={liqudity.token1.logo} className="w-6 h-6 rounded-full   absolute -ml-3 " />
            {`${liqudity.token0.symbol}/${liqudity.token1.symbol}`}
          </div>
          <button className="flex flex-row items-center  bg-secondary rounded-full px-4  text-sm font-medium " onClick={() => { setOpen(!open); setRemove(false) }} >
            Manage
            {open ? <RiArrowDropUpLine size={30} className="ml-2" />
              : <RiArrowDropDownLine size={30} className="ml-2" />}

          </button>



        </div>

        {
          open &&
          <>
            <div className="mt-4" >


              <div className="flex flex-row items-center justify-between  font-normal text-sm  " >
                <div>Your total pool tokens:</div>
                <div>{liqudity.lpTokens}</div>
              </div>

              <div className="flex flex-row items-center justify-between  font-normal text-sm mt-2 " >
                <div>{`Pooled ${liqudity.token0.symbol}`}</div>
                <div className="flex flex-row items-center" >
                  {liqudity.token0Amount}
                  <img src={liqudity.token0.logo} className="w-4 h-4 rounded-full ml-2 " />
                </div>
              </div>

              <div className="flex flex-row items-center justify-between  font-normal text-sm mt-2  " >
                <div>{`Pooled ${liqudity.token1.symbol}`}</div>
                <div className="flex flex-row items-center" >
                  {liqudity.token1Amount}
                  <img src={liqudity.token0.logo} className="w-4 h-4 rounded-full ml-2 " />
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
          <div className="bg-gradient-to-r from-[#141414] to-[#593FB1] rounded-lg p-4 mt-2" >
            <div className=" text-6xl font-bold " >
              {`${percentage}%`}
            </div>
            <div className="mt-4" >
              <input type="range" onChange={(e) => setPercentage(e.target.value)} value={percentage} className=" w-full h-1 outline-none slider " pointer-shadow="0 0 5px #DAE8FF" />
            </div>
            <div className=" flex flex-row items-center justify-between w-full mt-4 " >
              <button className=" bg-secondary px-4 rounded-md py-2 " onClick={() => { setPercentage(25) }} >
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
              </button>
            </div>
          </div>
          <FaArrowDownLong className="w-full items-center my-4" />
          <div className="bg-gradient-to-r from-[#141414] to-[#593FB1] rounded-lg p-4">
            <div className="flex flex-row items-center justify-between " >
              <div>
                {token0Withdraw}
              </div>
              <div className="flex flex-row items-center  " >
                <img src={liqudity.token0.logo} className="w-6 h-6 rounded-full mr-2 " />
                <div className=" font-semibold " > {liqudity.token0.symbol}</div>
              </div>
            </div>
            <div className="flex flex-row items-center justify-between mt-4 " >
              <div>
                {token1Withdraw}
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
