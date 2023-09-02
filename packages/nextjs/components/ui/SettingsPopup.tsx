import React, { useState } from "react";
import RPCComponent from "../SettingsComponents/RPCComponent";
import SwapModes from "../SettingsComponents/SwapModes";
import SwapSettings from "../SettingsComponents/SwapSettings";
import TransactionSpeed from "../SettingsComponents/TransactionSpeed";

interface SettingsPopupProps {
  isOpen: boolean;
  onClose: () => void;
  setSlippageValue: (value: number) => void;
}

const SettingsPopup: React.FC<SettingsPopupProps> = ({ isOpen, onClose, setSlippageValue }) => {
  const handleSlippage = (value: number) => {
    setSlippageValue(value);
  };

  const [selectedSlippage, setSelectedSlippage] = useState(0.1);
  const slippageValues = [0.1, 0.5, 1];

  const handleSlippageClick = (value: number) => {
    setSelectedSlippage(value);
    handleSlippage(value);
  };

  const [checkbox1, setCheckbox1] = useState(false);
  const [checkbox2, setCheckbox2] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-gray-800 opacity-50" onClick={onClose}></div>
      <div className="relative z-10 bg-gray-800 p-4 rounded shadow-lg ">
        <div className="flex justify-center items-center text-center">
          <div className="text-xl text-center font-bold">Settings</div>

          <button className="absolute top-0 right-0 m-2 p-2 text-white-600 hover:text-gray-400" onClick={onClose}>
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
        <hr className="my-4 border-t border-gray-300" />

        {/* <TransactionSpeed></TransactionSpeed> */}
        <SwapModes></SwapModes>
        <hr className="my-4 border-t border-gray-300" />
        <RPCComponent connected={true} rpcName={"Public"} rpcLink={"https://rpc.nordek.chain"}></RPCComponent>
        <hr className="my-4 border-t border-gray-300" />
        <div className="flex flex-col">
          <h1 className="mb-4">TRADING</h1>
          <div className="flex justify-between">
            <div className="flex flex-col">
              <h1 className="mb-4 text-gray-400"> Slippage Tollerance</h1>
              <ul className="flex list-none space-x-4">
                {slippageValues.map(value => (
                  <li
                    key={value}
                    onClick={() => handleSlippageClick(value)}
                    className={selectedSlippage === value ? "text-blue-500" : ""}
                  >
                    {value}%
                  </li>
                ))}
              </ul>
            </div>
            <input
              type="number"
              placeholder="0"
              className="px-2 py-2 bg-purple-800 rounded-lg text-right appearance-none"
              value={selectedSlippage}
              onChange={e => handleSlippageClick(Number(e.target.value))}
            />
          </div>
        </div>
        <hr className="my-4 border-t border-gray-300" />
        <div className="mt-4 mb-4">
          <h1 className="mb-4">Approved Amounts</h1>
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

              <span className="ml-2 text-white text-sm">Infinite for approval that cost gas</span>
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

              <span className="ml-2 text-white text-sm">Infinite for approval that dont cost gas</span>
            </label>
          </div>
        </div>
        <hr className="my-4 border-t border-gray-300" />
        {/* <SwapSettings></SwapSettings> */}
      </div>
    </div>
  );
};

export default SettingsPopup;
