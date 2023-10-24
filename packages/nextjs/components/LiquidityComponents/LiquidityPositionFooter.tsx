import React, { useState } from "react";
import SettingsPopup from "../ui/SettingsPopup";
import ActionButton from "../ui/actionButton";
import SlippageDetails from "./SlippageDetails";
import PositionSlippageDetails from './PositionSlippageDetails'
import { tokenType } from "~~/data/data";

type LiquidityFooterProps = {
  handleAddLiquidity: () => void;
  pairContract: string,
  token1: tokenType,
  token2: tokenType,
  reserve1: Number,
  reserve2: Number,
  slippage: Number,
  setSlippageValue: (value: Number) => void,
  share: Number,
  lpTokens: string
};

const LiquidityFooter = ({ handleAddLiquidity, pairContract, token1, token2, reserve1, reserve2, slippage, setSlippageValue, share, lpTokens }: LiquidityFooterProps) => {
  // Initial slippage value (2% in this example)
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handlePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <div className="flex flex-col w-full text-sm">
      <div className="flex justify-between items-center mb-2">
        <div>
          <span className="text-sm">Slippage</span>

          <span className="ml-2 font-semibold text-secondary">{`${slippage}%`}</span>
        </div>
        <button className="ml-2 hover:text-secondary" onClick={handlePopup}>
          Edit
        </button>
      </div>
      <PositionSlippageDetails lpTokens={lpTokens} pairContract={pairContract} token1={token1} token2={token2} reserve1={reserve1} reserve2={reserve2} share={share}></PositionSlippageDetails>

      <SettingsPopup isOpen={isPopupOpen} onClose={handlePopup} setSlippageValue={setSlippageValue} slippage={slippage} ></SettingsPopup>
      <br />
      <div className="flex justify-evenly w-full">
        <ActionButton
            text="Withdraw"
            // onClick={() => withdrawFunc()}
        >

        </ActionButton>
        <ActionButton
            text="Cancel"
        >

        </ActionButton>
      </div>
      
    </div>
  );
};

export default LiquidityFooter;
