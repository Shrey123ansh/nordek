import React, { useState } from "react";
import SettingsPopup from "../ui/SettingsPopup";
import ActionButton from "../ui/actionButton";
import SlippageDetails from "./SlippageDetails";
import { MdEdit } from "react-icons/md";
import { tokenType } from "~~/data/data";

type LiquidityFooterProps = {
  handleAddLiquidity: () => void;
  pairContract: string;
  token1: tokenType;
  token2: tokenType;
  reserve1: Number;
  reserve2: Number;
  slippage: Number;
  setSlippageValue: (value: Number) => void;
  share: Number;
  lpTokens: string;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
};

const LiquidityFooter = ({
  handleAddLiquidity,
  pairContract,
  token1,
  token2,
  reserve1,
  reserve2,
  slippage,
  setSlippageValue,
  share,
  lpTokens,
  setLoading,
  loading,
}: LiquidityFooterProps) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handlePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <div className="flex flex-col w-full text-sm">
      <div className="flex flex-row justify-between items-center font-medium ">
        <div className="flex flex-row items-center ">
          <div className="mr-2">Slippage</div>
          <button onClick={handlePopup}>
            <MdEdit className="hover:text-secondary-content" />
          </button>
        </div>
        <div className="  text-secondary-content  ">{Number(slippage)}%</div>
      </div>
      <SlippageDetails
        lpTokens={lpTokens}
        token1={token1}
        token2={token2}
        reserve1={reserve1}
        reserve2={reserve2}
        share={share}
      ></SlippageDetails>

      <SettingsPopup
        isOpen={isPopupOpen}
        onClose={handlePopup}
        setSlippageValue={setSlippageValue}
        slippage={slippage}
      ></SettingsPopup>

      <ActionButton
        text="Add Liquidity"
        setLoading={setLoading}
        loading={loading}
        onClick={() => {
          handleAddLiquidity();
        }}
      ></ActionButton>
    </div>
  );
};

export default LiquidityFooter;
