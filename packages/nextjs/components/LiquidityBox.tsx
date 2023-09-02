import { useEffect, useState } from "react";
import LiquidityHeader from "./LiquidityComponents/LiquidityHeader";
import LiquidityMain from "./LiquidityComponents/LiquidityMain";
import ExpertToggle from "./swapComponents/ExpertModeToggle";
import SwapFooter from "./swapComponents/SwapFooter";
import SwapMain from "./swapComponents/SwapMain";
import { parseEther } from "viem";
import { useAccount } from "wagmi";
import { tokens } from "~~/data/data.js";
import { useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

export const LiquidityBox = () => {
  return (
    <div className={`p-6 border-2 rounded-2xl`}>
      <div className={`flex flex-col space-y-4 items-center px-16 pt-6 px-20 rounded-xl bg-gray-600`}>
        <div>
          <LiquidityHeader></LiquidityHeader>
          <br />
        </div>

        <LiquidityMain></LiquidityMain>

        <br />
      </div>
    </div>
  );
};
