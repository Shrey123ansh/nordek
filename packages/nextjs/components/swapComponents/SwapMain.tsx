//import PriceComponent from "./PriceBox";
import { useState, useEffect } from "react";
import SelectToken from "./SelectToken";
import SwapFooter from "./SwapFooter";
import pairABI from "../../../foundry/out/UniswapV2Pair.sol/UniswapV2Pair.json";
import { useAccount, useConnect } from "wagmi";
import { ArrowDownIcon } from "@heroicons/react/24/outline";
import { localTokens, tokenType } from "~~/data/data";
import { formatEther, numberToBytes, parseEther, parseUnits } from "viem";
import { useContractRead } from 'wagmi'
import { readContract, writeContract } from '@wagmi/core'
//import { getTokenData } from "~~/utils/coingeckoPrices";
import uniswapv2paircontractABI from "../../../foundry/out/UniswapV2Pair.sol/UniswapV2Pair.json"
import { useDeployedContractInfo, useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { nordek } from "~~/utils/NordekChain";
import erc20ABI from "../../../foundry/out/ERC20.sol/ERC20.json";
import { fetchBalance, waitForTransaction } from '@wagmi/core'
import { TbArrowsUpDown } from "react-icons/tb";
import { IoIosSettings } from "react-icons/io";


import { notification } from "~~/utils/scaffold-eth";

export default function SwapMain() {
  const address0 = "0x0000000000000000000000000000000000000000"
  const [share, setShare] = useState(0)
  const [token0Amount, setToken0Amount] = useState<number>(0);
  const [token1Amount, setToken1Amount] = useState<number>(0);
  // Define states for tokens
  const [tokenAFromContract, setTokenAFromContract] = useState(address0)

  const [token0, setToken0] = useState<tokenType>(localTokens.NRK);
  const [token1, setToken1] = useState<tokenType>(localTokens.PERC);
  const [slippage, setSlippage] = useState(0.5);
  const token0Min = Number(token0Amount) - ((Number(token0Amount) * slippage) / 100)
  const token1Min = Number(token1Amount) - ((Number(token1Amount) * slippage) / 100)
  const [pairContract, setPairContract] = useState("0x0000000000000000000000000000000000000000");
  const [pairTotalSupply, setPairTotalSupply] = useState(0)
  const [kLast, setKLast] = useState(0)
  const [reserveA, setReserve1] = useState(0)
  const [reserveB, setReserve2] = useState(0)
  const { address: account, isConnected } = useAccount();
  const [balance0, setBalance0] = useState(0)
  const [balance1, setBalance1] = useState(0)

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handlePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const currentDate = new Date();
  const unixTimestampInSeconds = Math.floor(currentDate.getTime() / 1000);

  const { data: routerContract } = useDeployedContractInfo("NordekV2Router02");

  const { data: pc, isFetched, isFetching } = useScaffoldContractRead({
    contractName: "NordekV2Factory",
    functionName: "getPair",
    args: [token0.address, token1.address],
    account: account,
  });

  useEffect(() => {
    setPairContract(pc)
    if (pc === address0) {
      setShare(100)
    }
    if (pc !== address0) {
      setShare(0)
    }
  }, [isFetched, isFetching])

  const getBalance = async () => {
    console.log("fetching....")
    try {
      const nrkAddress = localTokens.NRK.address
      if (token0.address === nrkAddress || token1.address === nrkAddress) {

        const balanceNRK = await fetchBalance({
          address: account,
        })
        if (token0.address === nrkAddress) {
          const balanceB = await readContract({
            address: token1.address,
            abi: erc20ABI.abi,
            functionName: 'balanceOf',
            args: [account],
            account: account
          })
          setBalance0(Number(balanceNRK.formatted))
          setBalance1(Number(formatEther(balanceB)))

        } else {
          const balanceA = await readContract({
            address: token0.address,
            abi: erc20ABI.abi,
            functionName: 'balanceOf',
            args: [account],
            account: account
          })
          setBalance0(Number(formatEther(balanceA)))
          setBalance1(Number(balanceNRK.formatted))
        }
      } else {
        const balanceA = await readContract({
          address: token0.address,
          abi: erc20ABI.abi,
          functionName: 'balanceOf',
          args: [account],
          account: account
        })
        const balanceB = await readContract({
          address: token1.address,
          abi: erc20ABI.abi,
          functionName: 'balanceOf',
          args: [account],
          account: account
        })
        setBalance0(Number(formatEther(balanceA)))
        setBalance1(Number(formatEther(balanceB)))
      }
    } catch (e) {
      console.log(e)
    }

  }
  useEffect(() => {
    getBalance()
  }, [token0, token1, account])

  const getData = async () => {
    if (pairContract !== "0x0000000000000000000000000000000000000000" && pairContract !== undefined) {
      console.log(pairContract)
      const reserves = await readContract({
        address: pairContract,
        abi: pairABI.abi,
        functionName: "getReserves",
        account: account,
        chainId: nordek.id
      })
      const tokenA = await readContract({
        address: pairContract,
        abi: pairABI.abi,
        functionName: "token0",
        account: account,
        chainId: nordek.id
      })
      setTokenAFromContract(String(tokenA))
      const reserve1 = Number(formatEther(reserves[0]))
      const reserve2 = Number(formatEther(reserves[1]))

      if (tokenA === token0.address) {
        setReserve1(reserve1)
        setReserve2(reserve2)
      } else if (tokenA === token1.address) {
        setReserve2(reserve1)
        setReserve1(reserve2)
      }
      const totalSupply = await readContract({
        address: pairContract,
        abi: pairABI.abi,
        functionName: "totalSupply",
        account: account,
        chainId: nordek.id
      })
      const supply = Number(formatEther(BigInt(Number(totalSupply))))
      setPairTotalSupply(supply)
      // setPairTotalSupply(Number(formatEther(BigInt(totalSupply))))
      var kLastValue = await readContract({
        address: pairContract,
        abi: pairABI.abi,
        functionName: "kLast",
        account: account,
        chainId: nordek.id
      })
      // setKLast(Number(formatEther(BigInt(Number(kLastValue)))))
      kLastValue = BigInt(Number(kLastValue)) / BigInt(10 ** 36)
      // console.log(kLastValue)
      setKLast(Number(kLastValue))
    }
    else if (pairContract === "0x0000000000000000000000000000000000000000") {
      console.log("pair is zero getdata")
      setReserve1(0)
      setReserve2(0)
    }
  }

  // const saveStakeToDb = async (newTrade: {
  //   usd: number;
  //   boughtToken: string;
  //   boughtTokenAmount: number;
  //   soldToken: string;
  //   soldTokenAmount: number;
  //   address: string;
  //   holdings: number;
  //   time: Date;
  //   hash: string;
  //   isBuy: boolean;
  // }) => {
  //   console.log("SAVING TO DB");
  //   const headers = {
  //     "Content-Type": "application/json",
  //     Authorization: "JWT fefege...",
  //   };
  //   await axios
  //     .post("/api/stakes", newTrade, {
  //       headers: headers,
  //     })
  //     .then(function (response) {
  //       console.log(response);
  //       console.log("Staked");
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });

  //   console.log("Saved to DB");
  // };

  // const { data: pc, isFetched } = useScaffoldContractRead({
  //   contractName: "NordekV2Factory",
  //   functionName: "getPair",
  //   args: [token0.address, token1.address],
  //   account: account,

  // });

  // useEffect(() => {
  //   console.log("pair contract swap " + pc)
  //   setPairContract(pc)
  //   if (pc === address0) {
  //     setShare(100)
  //   }
  //   if (pc !== address0) {
  //     setShare(0)
  //   }
  // }, [isFetched])

  useEffect(() => {
    getData()
  }, [pairContract, token1, token0])


  const { writeAsync: swapNRKToToken } = useScaffoldContractWrite({
    contractName: "NordekV2Router02",
    functionName: "swapExactNRKForTokensSupportingFeeOnTransferTokens",
    args: [
      parseEther(`${token1Min}`),
      [token0.address, token1.address],
      account,
      BigInt(unixTimestampInSeconds + 300)
    ],
    value: `${token0Amount}`,
    onBlockConfirmation: async (txnReceipt) => {
      console.log("Transaction blockHash", txnReceipt.blockHash);
      await getBalance()
    },
    onSuccess: () => {
      setToken0Amount(0)
      setToken1Amount(0)

    },
  });

  const { writeAsync: swapTokenForNRK } = useScaffoldContractWrite({
    contractName: "NordekV2Router02",
    functionName: "swapExactTokensForNRKSupportingFeeOnTransferTokens",
    args: [
      parseEther(`${token0Amount}`),
      parseEther(`${token1Min}`),
      [token0.address, token1.address],
      account,
      BigInt(unixTimestampInSeconds + 300)
    ],
    onBlockConfirmation: (txnReceipt) => {
      console.log("Transaction blockHash", txnReceipt.blockHash);
    },
    onSuccess: () => {
      setToken0Amount(0)
      setToken1Amount(0)
    },
  });
  const { writeAsync: swapTokenForToken } = useScaffoldContractWrite({
    contractName: "NordekV2Router02",
    functionName: "swapExactTokensForTokensSupportingFeeOnTransferTokens",
    args: [
      parseEther(`${token0Amount}`),
      parseEther(`${token1Min}`),
      [token0.address, token1.address],
      account,
      BigInt(unixTimestampInSeconds + 300)
    ],
    onBlockConfirmation: (txnReceipt) => {
      console.log("Transaction blockHash", txnReceipt.blockHash);
    },
    onSuccess: () => {
      setToken0Amount(0)
      setToken1Amount(0)
    },
  });


  const handleSwap = async () => {
    if (token1Amount <= 0 || token0Amount <= 0) {
      console.log("can't be lt 0");
      notification.error("Amount Can't Be 0", {
        duration: 1000
      })
      return;
    }

    if (!account) {
      console.log("notConnected");
      notification.info("Please Connect Your Wallet", {
        duration: 1000
      })
      return;
    }

    // const tradeData = {
    //   usd: 11.1, // get price from API (await getTokenData(token1.name, "usd")).usd
    //   boughtToken: token1.name,
    //   boughtTokenAmount: token1Amount,
    //   soldToken: token0.name,
    //   soldTokenAmount: token0Amount,
    //   address: account,
    //   holdings: 21.1, //get holdings from contract
    //   time: new Date(),
    //   hash: "0xae4edaf81a180ee1ef6e95e787a1813351fb859058233872132f9146b2cba38a0", //get hash from confirmation
    //   isBuy: true, // need to change this
    // };

    //saveStakeToDb(tradeData);

    // save data to database
    const nrkAddress: string = localTokens.NRK.address

    // swap NRK to erc20
    if (token0.address === nrkAddress) {
      console.log("out minimum " + parseEther(`${token1Min}`))
      console.log("token 0 address " + token0.address)
      console.log("token 1 address " + token1.address)
      await swapNRKToToken()
    }
    // swap erc20 to NRK 
    else {
      console.log("token 0 address " + token0.address)

      try {

        let approveId = notification.loading("Waiting for User to Approve Tx")
        const { hash: approveHash } = await writeContract({
          address: token0.address,
          abi: erc20ABI.abi,
          functionName: 'approve',
          args: [routerContract.address, parseEther(`${token0Amount}`)],
        })
        notification.remove(approveId)
        let completionID = notification.loading("Waiting for Tx Completion")
        // notification.info("Waiting For Tx Completion")
        await waitForTransaction({
          hash: approveHash
        })
        notification.remove(completionID)
        if (token1.address === nrkAddress) {
          console.log(" swaping token for nrk ")
          await swapTokenForNRK()
        }
        else
          await swapTokenForToken()

      } catch (error) { }
    }

    await getData()
    await getBalance()
    console.log("Swapped");
  };





  const setTokenAmount0Override = (value) => {
    if (value > balance0) return
    if (pairContract !== "0x0000000000000000000000000000000000000000" && pairContract !== undefined) {
      setToken0Amount(value)

      const amountInWithFee = value * 997
      const numerator = amountInWithFee * reserveB
      const denominator = reserveA * 1000 + amountInWithFee
      setToken1Amount(Number((numerator / denominator).toFixed(4)))


    } else {
      setToken0Amount(value)
    }
  }
  const setTokenAmount1Override = (value) => {
    if (value > balance1) return
    const numerator = reserveA * value * 1000
    const denominator = (reserveB - value) * 997

    if (numerator !== 0 && denominator !== 0) {
      const _val = Number((numerator / denominator).toFixed(4))
      if (_val < 0) return
      setToken0Amount(_val)
    }
    else
      setToken0Amount(0)
    setToken1Amount(value)
  }

  const setTokenA = (token: tokenType) => {
    if (token.address !== token1.address) {
      setToken0(token)
    }
  }
  const setTokenB = (token: tokenType) => {
    if (token.address !== token0.address) {
      setToken1(token)
    }
  }

  return (
    <>

      <div className="flex flex-col">
        <div className="flex flex-row items-center justify-between" >
          <div>
            <div className=" font-bold text-2xl     " >Swap</div>
            <div className="  font-normal lg:text-sm  text-[10px]  " >Trade tokens in an instant</div>
          </div>
          <button onClick={handlePopup}>
            <IoIosSettings size={20} />
          </button>
        </div>
        {reserveA === 0 && reserveB === 0 && <div className=" text-center font-bold " >NO PAIR EXISTS</div>}
        <SelectToken
          token={token0}
          setToken={setTokenA}
          tokenAmount={token0Amount}
          setTokenAmount={setTokenAmount0Override}
          title="From"
          balance={balance0}
        ></SelectToken>
        <button className="w-full h-6 flex flex-row items-center justify-center     rounded-full " onClick={() => { setToken0(token1); setToken1(token0); setReserve1(reserveB); setReserve2(reserveA) }}   >
          <TbArrowsUpDown />
        </button>
        <SelectToken
          token={token1}
          setToken={setTokenB}
          tokenAmount={token1Amount}
          setTokenAmount={setTokenAmount1Override}
          title="To"
          balance={balance1}
        ></SelectToken>
        <SwapFooter handleSwap={handleSwap}
          pairContract={pairContract}
          token1={token0}
          token2={token1}
          reserve1={reserveA}
          reserve2={reserveB}
          slippage={slippage}
          setSLippage={setSlippage}
          handlePopup={handlePopup}
          isPopupOpen={isPopupOpen}
          minimumPrice={Number(token1Amount) - ((Number(token1Amount) * slippage) / 100)}></SwapFooter>

      </div >

    </>
  );
}
