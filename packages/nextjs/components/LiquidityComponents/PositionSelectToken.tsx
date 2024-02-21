"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import erc20ABI from "../../../foundry/out/ERC20.sol/ERC20.json";
import pairABI from "../../../foundry/out/UniswapV2Pair.sol/UniswapV2Pair.json";
import RouterABI from "../../utils/INordekV2Router02.sol/INordekV2Router02.json";
import { Select } from "../Select/Select";
import LiquidityFooter from "./LiquidityPositionFooter";
import { readContract, waitForTransaction, writeContract } from "@wagmi/core";
import axios from "axios";
import { set } from "mongoose";
import { FaArrowDownLong } from "react-icons/fa6";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
// import 'toolcool-range-slider';
import { RangeSlider } from "toolcool-range-slider";
import { useDarkMode } from "usehooks-ts";
import { formatEther, parseEther } from "viem";
import { useAccount } from "wagmi";
import { localTokens, tokenType } from "~~/data/data";
import { useDeployedContractInfo, useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { Liquidity } from "~~/pages/api/liquidity";
import PairAbi from "~~/utils/PairAbi.json";
import { notification } from "~~/utils/scaffold-eth";

const PositionSelectToken = ({
  liqudity,
  updateOnRemove,
  onRemove,
}: {
  liqudity: Liquidity;
  updateOnRemove: (value: bool) => void;
  onRemove: bool;
}) => {
  const { isDarkMode } = useDarkMode();
  const { data: routerContract } = useDeployedContractInfo("NordekV2Router02");
  const nrkAddress: string = localTokens.NRK.address;
  const sliderRef = useRef(null);
  const { data: factoryContract } = useDeployedContractInfo("NordekV2Factory");

  const [percentage, setPercentage] = useState(0);
  const [value, setValue] = useState<number>(liqudity.lpTokens);
  const [open, setOpen] = useState(false);
  const [slippage, setSlippage] = useState(0.8);
  const { address: account } = useAccount();
  const [remove, setRemove] = useState(false);

  const [totalLp, setTotalLp] = useState(0);
  const [reserve0, setReserve0] = useState(0);
  const [reserve1, setReserve1] = useState(0);
  const [token0Withdraw, setToken0Withdraw] = useState(0);
  const [token1Withdraw, setToken1Withdraw] = useState(0);
  const [token0WithdrawMin, setToken0WithdrawMin] = useState(0);
  const [token1WithdrawMin, setToken1WithdrawMin] = useState(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [token0, setToken0] = useState<tokenType>(localTokens.NRK);
  const [token1, setToken1] = useState<tokenType>(localTokens.PERC);

  const setPercentageExtension = (value: number) => {
    if (value <= 100) {
      setPercentage(value);
      setValue((Number(liqudity.lpTokens) * value) / 100);
    }
  };

  useEffect(() => {
    // fetch the totaly lp token supply
    const fetchData = async () => {
      console.log("fetching in liquidity positions");
      console.log(liqudity.pairContract);
      if (liqudity.pairContract === undefined) return;
      try {
        const totalLp = await readContract({
          abi: PairAbi.abi,
          address: liqudity.pairContract,
          functionName: "totalSupply",
          account: account,
        });
        setTotalLp(Number(formatEther(totalLp as bigint)));
      } catch (e) {
        console.log(e);
      }

      try {
        const data = await readContract({
          abi: PairAbi.abi,
          address: liqudity.pairContract,
          functionName: "getReserves",
          account: account,
        });

        const token0 = await readContract({
          abi: PairAbi.abi,
          address: liqudity.pairContract,
          functionName: "token0",
          account: account,
        });
        const token1 = await readContract({
          abi: PairAbi.abi,
          address: liqudity.pairContract,
          functionName: "token0",
          account: account,
        });

        if (token0 === liqudity.token0.address) {
          setReserve0(Number(formatEther(data[0] as bigint)));
          setReserve1(Number(formatEther(data[1] as bigint)));
        } else {
          setReserve0(Number(formatEther(data[1] as bigint)));
          setReserve1(Number(formatEther(data[0] as bigint)));
        }
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
    // get reserves here
  }, [liqudity.pairContract]);

  let approvalId = null;
  const approvalNotification = () => {
    approvalId = notification.loading("Awaiting user confirmation");
  };
  const removeApprovalNotification = () => {
    notification.remove(approvalId);
  };
  let txCompId = null;
  const txCompletionWaitNotification = () => {
    txCompId = notification.loading("Waiting for Tx completion");
  };
  const removeTxCompNotification = () => {
    notification.remove(txCompId);
  };

  const currentDate = new Date();
  const unixTimestampInSeconds = Math.floor(currentDate.getTime() / 1000);

  useEffect(() => {
    if (reserve0 === 0 || reserve1 === 0 || totalLp === 0) return;
    const userPercentage = (Number(liqudity.lpTokens) * 100) / totalLp;

    const userToken0Amount = (reserve0 * userPercentage) / 100;
    const userToken1Amount = (reserve1 * userPercentage) / 100;
    const token0Withdraw = (Number(userToken0Amount) * percentage) / 100;
    const token1Withdraw = (Number(userToken1Amount) * percentage) / 100;

    const token0WithdrawMin: number = token0Withdraw - (token0Withdraw * slippage) / 100;
    const token1WithdrawMin: number = token1Withdraw - (token1Withdraw * slippage) / 100;
    setToken0Withdraw(token0Withdraw);
    setToken1Withdraw(token1Withdraw);
    setToken0WithdrawMin(token0WithdrawMin);
    setToken1WithdrawMin(token1WithdrawMin);
  }, [totalLp, reserve0, reserve1, percentage]);

  const { writeAsync: removeLiqudityETH } = useScaffoldContractWrite({
    contractName: "NordekV2Router02",
    functionName: "removeLiquidityNRKSupportingFeeOnTransferTokens",
    args: [
      liqudity.token0.address === nrkAddress ? liqudity.token1.address : nrkAddress,
      parseEther(`${(Number(value) * percentage) / 100}`),
      liqudity.token0.address === nrkAddress ? parseEther(`${token1WithdrawMin}`) : parseEther(`${token0WithdrawMin}`),
      liqudity.token0.address === nrkAddress ? parseEther(`${token0WithdrawMin}`) : parseEther(`${token1WithdrawMin}`),
      account,
      BigInt(unixTimestampInSeconds + 300),
    ],
    blockConfirmations: 1,
  });

  const { writeAsync: removeLiquidity } = useScaffoldContractWrite({
    contractName: "NordekV2Router02",
    functionName: "removeLiquidity",
    args: [
      liqudity.token0.address,
      liqudity.token1.address,
      parseEther(`${(Number(value) * percentage) / 100}`),
      parseEther(`${token0WithdrawMin}`),
      parseEther(`${token1WithdrawMin}`),
      account,
      BigInt(unixTimestampInSeconds + 300),
    ],
    blockConfirmations: 1,
  });

  const fetchLpTokenBalance = async () => {
    const lptokensBalance = await readContract({
      address: liqudity.pairContract,
      abi: erc20ABI.abi,
      functionName: "balanceOf",
      args: [account],
      account: account,
    });
    console.log("check: ", Number(formatEther(lptokensBalance as bigint)));
    return Number(formatEther(lptokensBalance as bigint));
  };

  const deleteLiquidity = async () => {
    try {
      await axios.delete(`api/liquidity?pairContract=${liqudity.pairContract}&userAddress=${liqudity.user}`);
      console.log("deleted success fully");
    } catch (error) {
      console.log(error);
    }
  };

  // const removeLiqudityETH = async () => {
  //   var _value = (Number(value) * percentage) / 100;
  //   approvalNotification();
  //   const { hash: approveHash } = await writeContract({
  //     address: liqudity.pairContract,
  //     abi: pairABI.abi,
  //     functionName: "approve",
  //     args: [routerContract.address, parseEther(`${_value}`)],
  //   });
  //   const { hash: swapHash } = await writeContract({
  //     address: RouterABI.address,
  //     abi: RouterABI.abi,
  //     functionName: "removeLiquidityNRKSupportingFeeOnTransferTokens",
  //     args: [
  //       liqudity.token0.address === nrkAddress ? liqudity.token1.address : nrkAddress,
  //       parseEther(`${(Number(value) * percentage) / 100}`),
  //       liqudity.token0.address === nrkAddress
  //         ? parseEther(`${token1WithdrawMin}`)
  //         : parseEther(`${token0WithdrawMin}`),
  //       liqudity.token0.address === nrkAddress
  //         ? parseEther(`${token0WithdrawMin}`)
  //         : parseEther(`${token1WithdrawMin}`),
  //       account,
  //       BigInt(unixTimestampInSeconds + 300),
  //     ],
  //   });
  //   removeApprovalNotification();
  //   txCompletionWaitNotification();
  //   await waitForTransaction({
  //     hash: approveHash,
  //     confirmations: 1,
  //   });
  //   await waitForTransaction({
  //     hash: swapHash,
  //     confirmations: 1,
  //   });
  //   removeTxCompNotification();
  //   notification.success("Transaction completed successfully!");
  // };
  // const removeLiquidity = async () => {
  //   var _value = (Number(value) * percentage) / 100;
  //   approvalNotification();
  //   const { hash: approveHash } = await writeContract({
  //     address: liqudity.pairContract,
  //     abi: pairABI.abi,
  //     functionName: "approve",
  //     args: [routerContract.address, parseEther(`${_value}`)],
  //   });
  //   removeApprovalNotification();
  //   const { hash: swapHash } = await writeContract({
  //     address: RouterABI.address,
  //     abi: RouterABI.abi,
  //     functionName: "removeLiquidity",
  //     args: [
  //       liqudity.token0.address,
  //       liqudity.token1.address,
  //       parseEther(`${(Number(value) * percentage) / 100}`),
  //       parseEther(`${token0WithdrawMin}`),
  //       parseEther(`${token1WithdrawMin}`),
  //       account,
  //       BigInt(unixTimestampInSeconds + 300),
  //     ],
  //   });
  //   removeApprovalNotification();
  //   txCompletionWaitNotification();
  //   await waitForTransaction({
  //     hash: approveHash,
  //     confirmations: 1,
  //   });
  //   await waitForTransaction({
  //     hash: swapHash,
  //     confirmations: 1,
  //   });
  //   removeTxCompNotification();
  //   notification.success("Transaction completed successfully!");
  // };
  const updateLiquidity = async () => {
    let newLp = 0;
    try {
      const data = await readContract({
        address: liqudity.pairContract,
        abi: pairABI.abi,
        functionName: "balanceOf",
        args: [account],
        account: account,
      });
      console.log(data);
      newLp = Number(formatEther(data as bigint));
      console.log("new lp of user");
      console.log(newLp);
    } catch (e) {
      console.log(e);
    }

    const liquidity: Liquidity = {
      token0: liqudity.token0,
      token1: liqudity.token1,
      pairContract: liqudity.pairContract,
      user: account,
      lpTokens: newLp,
    };
    console.log("sending liquidity...");
    console.log(liqudity);
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
  };

  const handleWithdraw = async () => {
    setLoading(true);

    console.log("withdraw liuidity");

    try {
      console.log(typeof value);
      if (percentage === 0) {
        setLoading(false);
        notification.error("Percentage cannot be 0", { duration: 1000 });
        return;
      }
      var _value = (Number(value) * percentage) / 100;
      console.log(parseEther(`${_value}`));
      console.log("pair contract  value  " + liqudity.pairContract);
      approvalNotification();
      const { hash: approveHash } = await writeContract({
        address: liqudity.pairContract,
        abi: pairABI.abi,
        functionName: "approve",
        args: [routerContract.address, parseEther(`${_value}`)],
      });
      removeApprovalNotification();
      txCompletionWaitNotification();
      await waitForTransaction({
        hash: approveHash,
        confirmations: 1,
      });
      removeTxCompNotification();
      // console.log("token 1 withdraw amount " + token0WithdrawMin);
      // console.log("token 2 withdraw amount " + token1WithdrawMin);
    } catch (e) {
      removeApprovalNotification();
    }
    if (liqudity.token0.address === nrkAddress || liqudity.token1.address === nrkAddress) {
      await removeLiqudityETH();
    } else {
      await removeLiquidity();
    }
    setLoading(false);

    const lpTokens = await fetchLpTokenBalance();

    if (lpTokens === 0) {
      console.log("delete value from db");
      await deleteLiquidity();
    } else {
      console.log("update value from db");
      await updateLiquidity();
    }

    updateOnRemove?.(!onRemove);
  };

  // console.log(liqudity.token0);
  // console.log(liqudity.token);

  return (
    <>
      <div
        className={
          isDarkMode
            ? "bg-swap-gradient rounded-lg px-4 py-4 mb-4"
            : "bg-swap-gradient rounded-lg border-2 border-[#E2D4FF]  px-4 py-4 mb-4"
        }
      >
        <div className="flex flex-row w-full  items-center justify-between  ">
          <div className="flex flex-row items-center font-medium ml-2  text-sm lg:text-base ">
            <img src={liqudity.token0.logo} className=" w-4 h-4 lg:w-6 lg:h-6 rounded-full  absolute -ml-3   " />
            <img src={liqudity.token1.logo} className="w-4 h-4 lg:w-6 lg:h-6 rounded-full  mr-2   " />
            {`${liqudity.token0.symbol}/${liqudity.token1.symbol}`}
          </div>
          <button
            className="flex flex-row items-center  bg-primary text-white rounded-full px-2 lg:px-4 lg:py-1  text-xs  lg:text-sm font-medium "
            onClick={() => {
              setOpen(!open);
              setRemove(false);
            }}
          >
            Manage
            {open ? <RiArrowDropUpLine className="ml-2 " /> : <RiArrowDropDownLine className="ml-2" />}
          </button>
        </div>

        {open && (
          <>
            <div className="mt-4">
              <div className="flex flex-row items-center justify-between  font-normal text-sm  ">
                <div>Your Lp Tokens:</div>
                <div>{liqudity.lpTokens.toFixed(2).replace(/[.,]00$/, "")}</div>
              </div>

              <div className="flex flex-row items-center justify-between  font-normal text-sm mt-2 ">
                <div>{`Pool ${liqudity.token0.symbol}`}</div>
                <div className="flex flex-row items-center">
                  {reserve0.toFixed(2).replace(/[.,]00$/, "")}
                  <img src={liqudity.token0.logo} className="w-4 h-4 rounded-full ml-2 " />
                </div>
              </div>

              <div className="flex flex-row items-center justify-between  font-normal text-sm mt-2  ">
                <div>{`Pool ${liqudity.token1.symbol}`}</div>
                <div className="flex flex-row items-center">
                  {reserve1.toFixed(2).replace(/[.,]00$/, "")}
                  <img src={liqudity.token1.logo} className="w-4 h-4 rounded-full ml-2 " />
                </div>
              </div>

              {!remove && (
                <button
                  className=" text-center  w-full mt-4 font-medium bg-primary text-white rounded-lg py-2  "
                  onClick={() => {
                    setRemove(true);
                  }}
                >
                  Remove
                </button>
              )}
            </div>
          </>
        )}
      </div>
      {remove && (
        <div className="mt-2">
          <div className=" text-[10px] font-semibold  ">REMOVE LIQUIDITY</div>
          <div
            className={
              isDarkMode
                ? "bg-swap-gradient rounded-lg p-4 mt-2"
                : "bg-swap-gradient rounded-lg border-2 border-[#E2D4FF]  px-4 py-4 mb-4"
            }
          >
            <div className="flex flex-row">
              <div className=" text-5xl font-bold ">{`${percentage}%`}</div>
              <div className="flex flex-row items-center justify-end gap-1.5 w-full mt-4  ">
                {/* <div className="flex flex-row items-center justify-end gap-2 w-full mt-4 absolute bottom-0 right-0"> */}
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
                <button
                  className={
                    isDarkMode
                      ? " bg-secondary px-0.5 rounded-3xl py-0.5 text-sm font-medium lg:px-2 lg:py-1"
                      : " border-2  px-0.5 rounded-3xl py-0.5 text-sm font-medium lg:px-2 lg:py-1 "
                  }
                  onClick={() => {
                    setPercentage(25);
                  }}
                >
                  25%
                </button>
                <button
                  className={
                    isDarkMode
                      ? " bg-secondary px-0.5 rounded-3xl py-0.5 text-sm font-medium lg:px-2 lg:py-1 "
                      : "border-2  px-0.5 rounded-3xl py-0.5 text-sm font-medium lg:px-2 lg:py-1 "
                  }
                  onClick={() => {
                    setPercentage(50);
                  }}
                >
                  50%
                </button>
                <button
                  className={
                    isDarkMode
                      ? " bg-secondary px-0.5 rounded-3xl py-0.5 text-sm font-medium lg:px-2 lg:py-1 "
                      : "border-2  px-0.5 rounded-3xl py-0.5 text-sm font-medium lg:px-2 lg:py-1 "
                  }
                  onClick={() => {
                    setPercentage(75);
                  }}
                >
                  75%
                </button>
                <button
                  className={
                    isDarkMode
                      ? " bg-secondary px-0.5 rounded-3xl py-0.5 text-sm font-medium lg:px-2 lg:py-1 "
                      : "border-2  px-0.5 rounded-3xl py-0.5 text-sm font-medium lg:px-2 lg:py-1 "
                  }
                  onClick={() => {
                    setPercentage(100);
                  }}
                >
                  100%
                </button>
              </div>
            </div>
            <div className="mt-4">
              <input
                type="range"
                onChange={e => setPercentage(e.target.value)}
                value={percentage}
                className={isDarkMode ? " w-full h-1  outline-none slider " : "w-full h-1 	outline-color: #000slider"}
                pointer-shadow="0 0 5px #DAE8FF"
              />
            </div>
          </div>
          <FaArrowDownLong className="w-full items-center my-4" />
          <div
            className={
              isDarkMode
                ? "bg-swap-gradient rounded-lg p-4 "
                : "bg-swap-gradient rounded-lg border-2 border-[#E2D4FF]  px-4 py-4 mb-4"
            }
          >
            <div className="flex flex-row items-center justify-between mb-4 ">
              <div>Your Pool Share</div>
              <div>{`${((Number(liqudity.lpTokens) * 100) / totalLp).toFixed(2)}%`}</div>
            </div>
            <div className="flex flex-row items-center justify-between ">
              <div>{token0Withdraw === 0 ? 0 : token0Withdraw.toFixed(4)}</div>
              <div className="flex flex-row items-center  ">
                <img src={liqudity.token0.logo} className="w-6 h-6 rounded-full mr-2 " />
                <div className=" font-semibold "> {liqudity.token0.symbol}</div>
              </div>
            </div>
            <div className="flex flex-row items-center justify-between mt-4 ">
              <div>{token1Withdraw === 0 ? 0 : token1Withdraw.toFixed(4)}</div>
              <div className="flex flex-row items-center  ">
                <img src={liqudity.token1.logo} className="w-6 h-6 rounded-full mr-2 " />
                <div className=" font-semibold "> {liqudity.token1.symbol}</div>
              </div>
            </div>
          </div>
          <button
            className="btn btn-sm btn-outline btn-accent my-4 w-full"
            onClick={handleWithdraw}
            disabled={loading === true ? true : false}
          >
            Remove Liquidity
          </button>
        </div>
      )}
    </>
  );
};

export default PositionSelectToken;
