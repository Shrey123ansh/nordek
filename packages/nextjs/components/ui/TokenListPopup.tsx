import React, { useState } from "react";
import RPCComponent from "../SettingsComponents/RPCComponent";
import SwapModes from "../SettingsComponents/SwapModes";
import { tokenType, tokens } from "~~/data/data";

interface TokenListPopupProps {
  isOpen: boolean;
  onClose: () => void;
  setToken: (value: tokenType) => void;
}

const TokenListPopup: React.FC<TokenListPopupProps> = ({ isOpen, onClose, setToken }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-gray-800 opacity-50" onClick={onClose}></div>
      <div className="relative z-10 bg-gray-800 p-4 rounded-lg shadow-lg p-6">
        <div className="flex justify-center items-center text-center">
          <div className="text-lg text-center font-bold text-white">Select A Token</div>

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

        <div className="h-96 overflow-y-auto">
          {Object.values(tokens).map((token, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-gray-800 hover:bg-gray-900 text-white cursor-pointer"
              onClick={setToken(token)}
            >
              <div className="flex items-center space-x-4 mr-20">
                <img src={token.logo} className="w-6 h-6 rounded-full" />
                <span>{token.symbol}</span>
              </div>
              <span className="ml-20">{0}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TokenListPopup;
