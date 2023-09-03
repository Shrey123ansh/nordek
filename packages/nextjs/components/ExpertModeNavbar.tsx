import React, { useState } from "react";
import { Select } from "./Select/Select";
import ExpertToggle from "./swapComponents/ExpertModeToggle";
import { ToggleSwitchProps } from "./swapComponents/ToggleSwitchProps";
import { tokenType, tokens } from "~~/data/data";

const ExpertModeNavbar: React.FC<ToggleSwitchProps> = ({ expertToggle, setExpertToggle }) => {
  const [token, setToken] = useState(tokens.NRK); // State to store the selected currency

  const handleTokenSelect = (token: React.SetStateAction<tokenType>) => {
    setToken(token);
  };

  return (
    <nav className="absolute flex bg-purple-600 py-3 w-full items-center z-10 p-4 top-0 left-0 items-center">
      <div className="flex items-center">
        <div className="flex space-x-8">
          {/* Padding on the left edge */}
          <div className="pl-4">
            {/* Element 1 */}
            <ExpertToggle expertToggle={expertToggle} setExpertToggle={setExpertToggle}></ExpertToggle>
          </div>

          {/* Element 2 */}
          <Select setToken={setToken} token={token}></Select>
          <span className="font-bold"> - </span>
          {/* Element 3 */}
          <button
            className={`appearance-none ${token.name === "NRK" ? "text-blue-500" : ""}`}
            onClick={() => handleTokenSelect(tokens.NRK)}
          >
            NRK
          </button>
          <button
            className={`appearance-none ${token.name === "USD" ? "text-blue-500" : ""}`}
            onClick={() => handleTokenSelect(tokens.USDC)}
          >
            USD
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
