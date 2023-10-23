//import PriceComponent from "./PriceBox";
import { useState, useEffect } from "react";
import SelectToken from "./SelectToken";
import SwapFooter from "./SwapFooter";
import axios from "axios";
import { useAccount, useConnect } from "wagmi";
import { ArrowDownIcon } from "@heroicons/react/24/outline";
import { localTokens, tokenType } from "~~/data/data";
import { formatEther, parseEther } from "viem";
import { useContractRead } from 'wagmi'
import { readContract, writeContract } from '@wagmi/core'
//import { getTokenData } from "~~/utils/coingeckoPrices";
import uniswapv2paircontractABI from "../../../foundry/out/UniswapV2Pair.sol/UniswapV2Pair.json"
import { useDeployedContractInfo } from "~~/hooks/scaffold-eth";
import { nordek } from "~~/utils/NordekChain";

export default function SwapMain() {
  const [token0Amount, setToken0Amount] = useState<number>(0.0);
  const [token1Amount, setToken1Amount] = useState<number>(0.0);
  // Define states for tokens
  const [token0, setToken0] = useState<tokenType>(localTokens.NRK);
  const [token1, setToken1] = useState<tokenType>(localTokens.PERC);
  const [slippage, setSlippage] = useState(0.05);
  const token0Min = Number(token0Amount) - ((Number(token0Amount) * slippage) / 100)
  const token1Min = Number(token1Amount) - ((Number(token1Amount) * slippage) / 100)
  const [pairContract, setPairContract] = useState("0x0000000000000000000000000000000000000000");

  const [reserveA, setReserve1] = useState(0)
  const [reserveB, setReserve2] = useState(0)
  const {address: account, isConnected} = useAccount();

  const {data: factoryContractData} = useDeployedContractInfo("UniswapV2Factory");

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

  const handleSwap = async () => {
    if (token1Amount <= 0 || token0Amount <= 0) {
      console.log("can't be lt 0");
      return;
    }

    if (!account) {
      console.log("notConnected");
      return;
    }

    const tradeData = {
      usd: 11.1, // get price from API (await getTokenData(token1.name, "usd")).usd
      boughtToken: token1.name,
      boughtTokenAmount: token1Amount,
      soldToken: token0.name,
      soldTokenAmount: token0Amount,
      address: account,
      holdings: 21.1, //get holdings from contract
      time: new Date(),
      hash: "0xae4edaf81a180ee1ef6e95e787a1813351fb859058233872132f9146b2cba38a0", //get hash from confirmation
      isBuy: true, // need to change this
    };

    //saveStakeToDb(tradeData);

    // save data to database
    console.log("Swapped");
  };

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

  useEffect(() => {

    const getPairAddress = async () => {
      try {
        const pairAddress = await readContract({
          address: factoryContractData?.address,
          abi: factoryContractData?.abi,
          functionName: 'getPair',
          args: [token0.address, token1.address],
          account: account
        })
        console.log("pair contract from toggle" + pairAddress)

        setPairContract(pairAddress)

      } catch (error) {

      }
    }
    getPairAddress()

  }, [token0, token1])

  useEffect(() => {
    const getData = async () => {
      if (pairContract !== "0x0000000000000000000000000000000000000000" && pairContract !== undefined) {
        console.log(pairContract)
        const reserves = await readContract({
          address: pairContract,
          abi: uniswapv2paircontractABI.abi,
          functionName: "getReserves",
          account: account,
          chainId: nordek.id
        })
        const tokenA = await readContract({
          address: pairContract,
          abi: uniswapv2paircontractABI.abi,
          functionName: "token0",
          account: account,
          chainId: nordek.id
        })

        const reserve1 = Number(formatEther(reserves[0]))
        const reserve2 = Number(formatEther(reserves[1]))
        console.log("reserve 1 " + reserve1)
        console.log("reserve 2 " + reserve2)
        console.log(tokenA)
        if (tokenA === token0.address) {
          setReserve1(reserve1)
          setReserve2(reserve2)
        } else if (tokenA === token1.address) {
          setReserve2(reserve1)
          setReserve1(reserve2)
        }





      }
    }
    getData()
  }, [pairContract])

  const setTokenAmount0Override = (value) => {
    if (pairContract !== "0x0000000000000000000000000000000000000000" && pairContract !== undefined) {
      setToken0Amount(value)
      setToken1Amount((Number(value) * reserveB) / reserveA)
    } else {
      setToken0Amount(value)
    }
  }
  const setTokenAmount1Override = (value) => {
    if (pairContract !== "0x0000000000000000000000000000000000000000" && pairContract !== undefined) {
      setToken1Amount(value)
      setToken0Amount((Number(value) * reserveA) / reserveB)
    }
    else {
      setToken1Amount(value)
    }
  }


  return (
    <div className="flex flex-col items-center justify-between w-full">
      {
        pairContract === "0x0000000000000000000000000000000000000000" &&
        <div className="flex flex-col items-center  " >
          <div>Supply equal value parts of two different tokens.</div>
          <div className="w-[300px] my-4 text-center  " >You are the first liquidity provider.The ratio of tokens you add will set the price of this pool.</div>
        </div>
      }
      <SelectToken
        token={token0}
        setToken={setToken0}
        tokenAmount={token0Amount}
        setTokenAmount={setTokenAmount0Override}
      ></SelectToken>
      <div className="w-6 h-6 flex items-center justify-center text-white rounded-full mb-4">
        <ArrowDownIcon className="font-bold" />
      </div>
      <SelectToken
        token={token1}
        setToken={setToken1}
        tokenAmount={token1Amount}
        setTokenAmount={setTokenAmount1Override}
      ></SelectToken>
      <SwapFooter handleSwap={handleSwap} pairContract={pairContract}  token1={token0} token2={token1} reserve1={reserveA} reserve2={reserveB} slippage={slippage} setSLippage={setSlippage}></SwapFooter>
      {/* <PriceComponent price={0}></PriceComponent> */}
    </div>
  );
}
