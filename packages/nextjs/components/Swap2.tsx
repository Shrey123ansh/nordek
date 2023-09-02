import { useEffect, useState } from "react";
import ExpertToggle from "./swapComponents/ExpertModeToggle";
import SwapFooter from "./swapComponents/SwapFooter";
import SwapHeader from "./swapComponents/SwapHeader";
import SwapMain from "./swapComponents/SwapMain";
import { ToggleSwitchProps } from "./swapComponents/ToggleSwitchProps";
import { parseEther } from "viem";
import { useAccount } from "wagmi";
import { tokens } from "~~/data/data.js";
import { useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

export const Swap2: React.FC<ToggleSwitchProps> = ({ expertToggle, setExpertToggle }) => {
  console.log("SWAP 2", expertToggle);

  return (
    <div className={expertToggle ? "" : `p-6 border-2 rounded-2xl`}>
      <div
        className={
          `flex flex-col space-y-4 items-center ` +
          (expertToggle ? `h-[500px] overflow-y-auto overflow-hidden` : `px-16 pt-6 px-20 rounded-xl bg-gray-600`)
        }
      >
        {expertToggle ? (
          <div className="w-full bg-purple-800 p-2 text-center font-sm"> Market</div>
        ) : (
          <div>
            <SwapHeader></SwapHeader>
            <br />
            <ExpertToggle expertToggle={expertToggle} setExpertToggle={setExpertToggle}></ExpertToggle>
          </div>
        )}
        <SwapMain></SwapMain>
        <SwapFooter></SwapFooter>
        <br />
      </div>
    </div>
  );
};
