//import PriceComponent from "./PriceBox";
import { useState } from "react";
import SelectToken from "../swapComponents/SelectToken";
import LiquidityFooter from "./LiquidityFooter";
import SlippageDetails from "./SlippageDetails";
import { parseEther } from "viem";
import { useAccount } from "wagmi";
import { ArrowDownIcon } from "@heroicons/react/24/outline";
import { localTokens, tokenType } from "~~/data/data";
import { useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

export default function LiquidityMain() {
  const [token0Amount, setToken0Amount] = useState<number>(0.0);
  const [token1Amount, setToken1Amount] = useState<number>(0.0);
  const { address } = useAccount();
  const [token0, setToken0] = useState<tokenType>(localTokens[4]);
  const [token1, setToken1] = useState<tokenType>(localTokens[3]);

  const handleAddLiquidity = () => {
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
      <SelectToken
        token={token1}
        setToken={setToken1}
        tokenAmount={token1Amount}
        setTokenAmount={setToken1Amount}
      ></SelectToken>
      <LiquidityFooter handleAddLiquidity={handleAddLiquidity}></LiquidityFooter>
      {/* <PriceComponent price={0}></PriceComponent> */}
    </div>
  );
}
