//import PriceComponent from "./PriceBox";
import { useState } from "react";
import SelectToken from "./SelectToken";
import SwapFooter from "./SwapFooter";
import { useAccount } from "wagmi";
import { ArrowDownIcon } from "@heroicons/react/24/outline";
import { localTokens, tokenType } from "~~/data/data";

export default function SwapMain() {
  const [token0Amount, setToken0Amount] = useState<number>(0.0);
  const [token1Amount, setToken1Amount] = useState<number>(0.0);
  const { address } = useAccount();
  // Define states for tokens
  const [token0, setToken0] = useState<tokenType>(localTokens.NRK);
  const [token1, setToken1] = useState<tokenType>(localTokens.USDC);

  const handleSwap = async () => {
    if (token1Amount <= 0 || token0Amount <= 0) {
      console.log("can't be lt 0");
      return;
    }

    if (!address) {
      console.log("notConnected");
      return;
    }

    const tradeData = {
      usd: 100.1, // get price from API
      boughtToken: token1.address,
      boughtTokenAmount: token1Amount,
      soldToken: token0.address,
      soldTokenAmount: token0Amount,
      address: address,
      holdings: 21.1, //get holdings from contract
      time: new Date(),
      hash: "0xae4e6dd81a180ee1ef6e95e787a1813351fb859058233872132f9146b2cba38a0", //get hash from confirmation
      isBuy: true, // need to change this
    };

    const res = await fetch("http://localhost:3000/api/trades", {
      method: "POST",
      body: JSON.stringify(tradeData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log(await res.json);

    // save data to database
    console.log("Swapped");
  };

  return (
    <div className="flex flex-col items-center justify-between w-full">
      <SelectToken
        token={token0}
        setToken={setToken0}
        tokenAmount={token0Amount}
        setTokenAmount={setToken0Amount}
      ></SelectToken>
      <div className="w-6 h-6 flex items-center justify-center text-white rounded-full mb-4">
        <ArrowDownIcon className="font-bold" />
      </div>
      <SelectToken
        token={token1}
        setToken={setToken1}
        tokenAmount={token1Amount}
        setTokenAmount={setToken1Amount}
      ></SelectToken>
      <SwapFooter handleSwap={handleSwap}></SwapFooter>
      {/* <PriceComponent price={0}></PriceComponent> */}
    </div>
  );
}
