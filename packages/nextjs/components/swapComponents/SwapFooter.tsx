import React, { useState } from "react";
import SettingsPopup from "../ui/SettingsPopup";
import ActionButton from "../ui/actionButton";
import SlippageDetails from "./SlippageDetails";
import ConnectWalletButton from "./ConnectWalletButton";
import { tokenType } from "~~/data/data";

type SwapFooterProps = {
  handleSwap: () => void;
  pairContract: string,
  token1: tokenType,
  token2: tokenType,
  reserve1: Number,
  reserve2: Number,
  minimumPrice: Number
};

const SwapFooter = ({ handleSwap, pairContract, token1, token2, reserve1, reserve2, minimumPrice }: SwapFooterProps) => {
  const [slippageValue, setSlippageValue] = useState(0.05); // Initial slippage value (2% in this example)

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handlePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    // <div className="flex flex-col w-full px-2 text-sm ">
    //   <div className="flex justify-between items-center mb-2 ">
    //     <div>
    //       <span className="text-sm">Slippage</span>

    //       <span className="ml-2 font-semibold text-secondary">{slippageValue}%</span>
    //     </div>
    // <button className="ml-2 hover:text-secondary" onClick={handlePopup}>
    //   Edit
    // </button>
    //   </div>
    //   <SlippageDetails pairContract={pairContract} token1={token1} token2={token2} reserve1={reserve1} reserve2={reserve2} minimumPrice={minimumPrice} ></SlippageDetails>
    // <ActionButton
    //   text="Swap"
    //   onClick={() => {
    //     handleSwap();
    //   }}
    // ></ActionButton>

    //   <SettingsPopup isOpen={isPopupOpen} onClose={handlePopup} setSlippageValue={setSlippageValue} slippage={slippageValue}></SettingsPopup>
    // </div>
    <div className="flex flex-col font-medium mt-2 " >
      <div className="flex flex-row justify-between items-center mb-1 " >
        <div className="flex flex-row" >
          <div className="mr-2" >Slippage</div>
          <div className=" text-secondary " >{slippageValue}%</div>
        </div>
        <button className=" hover:text-secondary" onClick={handlePopup}>
          Edit
        </button>
      </div>
      <SlippageDetails pairContract={pairContract} token1={token1} token2={token2} reserve1={reserve1} reserve2={reserve2} minimumPrice={minimumPrice} ></SlippageDetails>
      <ActionButton
        text="Swap"
        onClick={() => {
          handleSwap();
        }}
      ></ActionButton>
      <SettingsPopup isOpen={isPopupOpen} onClose={handlePopup} setSlippageValue={setSlippageValue} slippage={slippageValue}></SettingsPopup>
    </div>
  );
};

export default SwapFooter;
