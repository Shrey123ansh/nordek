//import PriceComponent from "./PriceBox";
import { useState } from "react";
import SelectToken from "./SelectToken";
import SwapFooter from "./SwapFooter";
import axios from "axios";
import { useAccount } from "wagmi";
import { ArrowDownIcon } from "@heroicons/react/24/outline";
import { localTokens, tokenType } from "~~/data/data";

//import { getTokenData } from "~~/utils/coingeckoPrices";

export default function SwapMain() {
  const [token0Amount, setToken0Amount] = useState<number>(0.0);
  const [token1Amount, setToken1Amount] = useState<number>(0.0);
  const { address } = useAccount();
  // Define states for tokens
  const [token0, setToken0] = useState<tokenType>(localTokens.NRK);
  const [token1, setToken1] = useState<tokenType>(localTokens.USDC);

  const saveStakeToDb = async (newTrade: {
    usd: number;
    boughtToken: string;
    boughtTokenAmount: number;
    soldToken: string;
    soldTokenAmount: number;
    address: string;
    holdings: number;
    time: Date;
    hash: string;
    isBuy: boolean;
  }) => {
    console.log("SAVING TO DB");
    const headers = {
      "Content-Type": "application/json",
      Authorization: "JWT fefege...",
    };
    await axios
      .post("/api/stakes", newTrade, {
        headers: headers,
      })
      .then(function (response) {
        console.log(response);
        console.log("Staked");
      })
      .catch(function (error) {
        console.log(error);
      });

    console.log("Saved to DB");
  };

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
      usd: 11.1, // get price from API (await getTokenData(token1.name, "usd")).usd
      boughtToken: token1.name,
      boughtTokenAmount: token1Amount,
      soldToken: token0.name,
      soldTokenAmount: token0Amount,
      address: address,
      holdings: 21.1, //get holdings from contract
      time: new Date(),
      hash: "0xae4edaf81a180ee1ef6e95e787a1813351fb859058233872132f9146b2cba38a0", //get hash from confirmation
      isBuy: true, // need to change this
    };

    //saveStakeToDb(tradeData);

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
