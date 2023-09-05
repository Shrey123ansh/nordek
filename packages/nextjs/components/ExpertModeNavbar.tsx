import React, { useState } from "react";
import { Select } from "./Select/Select";
import ExpertToggle from "./swapComponents/ExpertModeToggle";
import { localTokens, tokenType } from "~~/data/data";

type ToggleSwitchProps = {
  expertToggle: boolean;
  setExpertToggle: React.Dispatch<React.SetStateAction<boolean>>;
  chartToken: tokenType;
  setChartToken: React.Dispatch<React.SetStateAction<tokenType>>;
  secondaryChartToken: tokenType;
  setSecondaryChartToken: React.Dispatch<React.SetStateAction<tokenType>>;
};

const ExpertModeNavbar: React.FC<ToggleSwitchProps> = ({
  expertToggle,
  setExpertToggle,
  chartToken,
  setChartToken,
  secondaryChartToken,
  setSecondaryChartToken,
}) => {
  return (
    <nav className="absolute flex bg-accent py-3 w-full z-10 p-4 top-0 left-0 items-center text-md ">
      <div className="flex items-center">
        <div className="flex space-x-8">
          {/* Padding on the left edge */}
          <div className="pl-4">
            {/* Element 1 */}
            <ExpertToggle expertToggle={expertToggle} setExpertToggle={setExpertToggle}></ExpertToggle>
          </div>

          {/* Element 2 */}
          <Select setToken={setChartToken} token={chartToken}></Select>

          <span className="font-bold"> - </span>
          {/* Element 3 */}
          <button
            className={`appearance-none ${secondaryChartToken.name === "NRK" ? "text-blue-500" : ""}`}
            onClick={() => setSecondaryChartToken(localTokens.NRK)}
          >
            NRK
          </button>

          <button
            className={`appearance-none ${secondaryChartToken.name === "USDC" ? "text-blue-500" : ""}`}
            onClick={() => setSecondaryChartToken(localTokens.USDC)}
          >
            USDC
          </button>

          {/* Element 4 */}
          <div className="flex justify-center space-x-4">
            <input type="checkbox" className="checkbox appearance-none" />
            <span> Lock Token Chart</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default ExpertModeNavbar;
