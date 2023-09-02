import React, { useState } from "react";
import SettingsPopup from "../ui/SettingsPopup";
import ActionButton from "../ui/actionButton";
import ConnectWalletButton from "./ConnectWalletButton";
import SlippageDetails from "./SlippageDetails";

const LiquidityFooter = () => {
  const [slippageValue, setSlippageValue] = useState(2); // Initial slippage value (2% in this example)
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handlePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const handleAddLiquidity = () => {
    console.log("Swapped");
  };

  return (
    <div className="flex flex-col w-full text-sm">
      <div className="flex justify-between items-center mb-2">
        <div>
          <span className="text-sm">Slippage</span>

          <span className="ml-2 font-semibold">{slippageValue}%</span>
        </div>
        <button className="ml-2" onClick={handlePopup}>
          Edit
        </button>
      </div>
      <SlippageDetails></SlippageDetails>
      <SettingsPopup isOpen={isPopupOpen} onClose={handlePopup} setSlippageValue={setSlippageValue}></SettingsPopup>
      <br />
      <ActionButton text="Add Liquidity" onClick={handleAddLiquidity}></ActionButton>
    </div>
  );
};

export default LiquidityFooter;
