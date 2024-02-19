import React, { useState } from "react";
import SettingsPopup from "../ui/SettingsPopup";
import ActionButton from "../ui/actionButton";
import ConnectWalletButton from "./ConnectWalletButton";
import SlippageDetails from "./SlippageDetails";
import { MdEdit } from "react-icons/md";
import { tokenType } from "~~/data/data";

type SwapFooterProps = {
  handleSwap: () => void;
  pairContract: string;
  token1: tokenType;
  token2: tokenType;
  reserve1: Number;
  reserve2: Number;
  minimumPrice: Number;
  handlePopup: () => {};
  isPopupOpen: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
};

const SwapFooter = ({
  handleSwap,
  pairContract,
  token1,
  token2,
  reserve1,
  reserve2,
  minimumPrice,
  handlePopup,
  isPopupOpen,
  setLoading,
  loading,
}: SwapFooterProps) => {
  const [slippageValue, setSlippageValue] = useState(0.05); // Initial slippage value (2% in this example)

  return (
    <div className="flex flex-col font-medium mt-2 ">
      <div className="flex flex-row justify-between items-center mb-1 ">
        <div className="flex flex-row  items-center  ">
          <div className="mr-2">Slippage</div>
          <button onClick={handlePopup}>
            <MdEdit className="hover:text-secondary-content" />
          </button>
        </div>
        <div className="  text-secondary-content   ">{slippageValue}%</div>
      </div>
      <SlippageDetails
        pairContract={pairContract}
        token1={token1}
        token2={token2}
        reserve1={reserve1}
        reserve2={reserve2}
        minimumPrice={minimumPrice}
      ></SlippageDetails>
      <ActionButton
        text="Swap"
        setLoading={setLoading}
        loading={loading}
        onClick={() => {
          handleSwap();
        }}
      ></ActionButton>
      <SettingsPopup
        isOpen={isPopupOpen}
        onClose={handlePopup}
        setSlippageValue={setSlippageValue}
        slippage={slippageValue}
      ></SettingsPopup>
    </div>
  );
};

export default SwapFooter;
