import React, { useState } from "react";
import RPCComponent from "../SettingsComponents/RPCComponent";
import SwapModes from "../SettingsComponents/SwapModes";
import { notification } from "~~/utils/scaffold-eth";

interface SettingsPopupProps {
  isOpen: boolean;
  onClose: () => void;
  setSlippageValue: (value: number) => void;
  slippage: Number;
}

const SettingsPopup: React.FC<SettingsPopupProps> = ({ isOpen, onClose, setSlippageValue, slippage }) => {
  const handleSlippage = (value: number) => {
    setSlippageValue(value);
  };

  const [selectedSlippage, setSelectedSlippage] = useState(slippage);
  const slippageValues = [0.1, 0.5, 1];

  const handleSlippageClick = (value: number) => {
    if (value > 5) {
      notification.info("Slippage Can't be more than 5%", { duration: 1000 });
      return;
    }
    const decimalCount = (value.toString().split(".")[1] || "").length;
    if (decimalCount > 4) return;
    setSelectedSlippage(value);
    handleSlippage(value);
  };

  const [checkbox1, setCheckbox1] = useState(false);
  const [checkbox2, setCheckbox2] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed    inset-0 flex items-center justify-center z-50">
      <div className="fixed  w-full inset-0 bg-gray-800 opacity-50    " onClick={onClose}></div>
      <div className="relative z-10 bg-setting-gradient p-4 rounded shadow-lg m-4 lg:w-fit  w-full ">
        <div className="flex justify-center items-center text-center">
          <div className="text-xl text-center font-bold text- ">Settings</div>
          <button
            className="absolute top-0 right-0 m-2 p-2 text-white-600 hover:text-gray-400"
            onClick={onClose}
            title="Popup"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <hr className="my-4 border-t border-primary" />

        {/* <TransactionSpeed></TransactionSpeed> */}
        <SwapModes></SwapModes>
        <hr className="my-4 border-t border-primary" />

        <RPCComponent connected={true} rpcName={"Public"} rpcLink={"https://rpc.nordek.chain"}></RPCComponent>
        <hr className="my-4 border-t border-primary" />

        <div className="flex flex-col">
          <h1 className="mb-4 font-medium ">TRADING</h1>
          <div className="flex justify-between">
            <div className="flex flex-col">
              <h1 className="mb-4 text-gray-400 font-medium "> Slippage Tolerance</h1>
              <ul className="flex list-none space-x-4">
                {slippageValues.map(value => (
                  <li
                    key={value}
                    onClick={() => handleSlippageClick(value)}
                    className={selectedSlippage === value ? "text-blue-500 " : " cursor-pointer font-medium"}
                  >
                    {value}%
                  </li>
                ))}
              </ul>
            </div>
            <input
              type="number"
              placeholder="0.0"
              className="px-2 py-2 bg-transparent rounded-lg text-right appearance-none outline-none "
              value={selectedSlippage === 0 ? "" : Number(selectedSlippage)}
              onChange={e => handleSlippageClick(Number(e.target.value))}
            />
          </div>
        </div>
        <hr className="my-4 border-t border-primary" />

        {/* <div className="mt-4 mb-4">
          <h1 className="mb-4 font-medium ">Approved Amounts</h1>
          <div className="mt-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={checkbox1}
                onChange={e => {
                  setCheckbox1(e.target.checked);
                }}
                className="form-checkbox h-5 w-5 text-blue-600 border border-purple-600"
              />

              <span className="ml-2   text-sm">Infinite for approval that cost gas</span>
            </label>
          </div>
          <div className="mt-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={checkbox2}
                onChange={e => {
                  setCheckbox2(e.target.checked);
                }}
                className="form-checkbox h-5 w-5 text-blue-600 border border-purple-600"
              />

              <span className="ml-2  text-sm">Infinite for approval that dont cost gas</span>
            </label>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default SettingsPopup;
