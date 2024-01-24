import React, { useState } from "react";
import SettingsPopup from "../ui/SettingsPopup";
import ActionButton from "../ui/actionButton";
import SlippageDetails from "./SlippageDetails";
import PositionSlippageDetails from './PositionSlippageDetails'
import { tokenType } from "~~/data/data";
import { Liquidity } from "~~/pages/api/liquidity";



const LiquidityFooter = ({ percentage, liquidity, withdraw, slippage, setSlippage }: { percentage: Number, liquidity: Liquidity, withdraw: () => void, slippage: number, setSlippage: (value: number) => void }) => {
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
      <PositionSlippageDetails liquidity={liquidity} withdrawPercentage={percentage} />

      <SettingsPopup isOpen={isPopupOpen} onClose={handlePopup} setSlippageValue={setSlippage} slippage={slippage} ></SettingsPopup>
      <br />
      <div className="flex justify-evenly w-full">
        <div className="btn btn-sm btn-outline btn-accent my-2" onClick={withdraw} >Withdraw</div>
      </div>

    </div>
  )
}

export default LiquidityFooter;
