import React, { useState } from "react";
import SettingsPopup from "../ui/SettingsPopup";
import ActionButton from "../ui/actionButton";
import ConnectWalletButton from "./ConnectWalletButton";
import { tokenType } from "~~/data/data";

type SwapFooterProps = {
  handleSwap: () => void;
};

const SwapFooter = ({ handleSwap }: SwapFooterProps) => {
  const [slippageValue, setSlippageValue] = useState(2); // Initial slippage value (2% in this example)

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handlePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <div className="flex flex-col w-full text-sm">
      <div className="flex justify-between items-center mb-2 mx-2">
        <div>
          <span className="text-sm">Slippage</span>

          <span className="ml-2 font-semibold text-secondary">{slippageValue}%</span>
        </div>
        <button className="ml-2 hover:text-secondary" onClick={handlePopup}>
          Edit
        </button>
      </div>

      <ActionButton
        text="Swap"
        onClick={() => {
          handleSwap();
        }}
      ></ActionButton>

      <SettingsPopup isOpen={isPopupOpen} onClose={handlePopup} setSlippageValue={setSlippageValue}></SettingsPopup>
    </div>
  );
};

export default SwapFooter;
