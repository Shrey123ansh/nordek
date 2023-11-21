import React, { useState } from "react";
import SettingsPopup from "../ui/SettingsPopup";
import ActionButton from "../ui/actionButton";
import SlippageDetails from "./SlippageDetails";
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
      <div className="flex flex-row justify-between items-center font-medium " >
        <div className="flex flex-row" >
          <div className="mr-2" >Slippage</div>
          <div className=" text-secondary " >{slippage}%</div>
        </div>
        <button className=" hover:text-secondary" onClick={handlePopup}>
          Edit
        </button>
      </div>
      <SlippageDetails lpTokens={lpTokens} token1={token1} token2={token2} reserve1={reserve1} reserve2={reserve2} share={share}></SlippageDetails>

      <SettingsPopup isOpen={isPopupOpen} onClose={handlePopup} setSlippageValue={setSlippageValue} slippage={slippage} ></SettingsPopup>

      <ActionButton
        text="Add Liquidity"
        onClick={() => {
          handleAddLiquidity();
        }}
      ></ActionButton>

    </div>
  );
};

export default LiquidityFooter;
