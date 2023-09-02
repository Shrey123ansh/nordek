import React, { useState } from "react";
import RPCComponent from "../SettingsComponents/RPCComponent";
import SwapModes from "../SettingsComponents/SwapModes";
import { tokenType, tokens } from "~~/data/data";

interface TokenListPopupProps {
  isOpen: boolean;
  onClose: () => void;
  setToken: (value: string) => void;
}

const ListItem: React.FC<tokenType> = ({ name, symbol, address }) => (
  <div className="flex items-center justify-between p-4 border-b border-gray-300">
    <div className="flex items-center space-x-2">
      <img src={"logo"} alt={name} className="w-6 h-6" />
      <span>{symbol}</span>
    </div>
    <span>{0}</span>
  </div>
);

interface TokenListProps {
  tokens: Record<string, tokenType>;
}

const TokenList: React.FC<TokenListProps> = ({ tokens }) => (
  <div className="h-64 overflow-y-auto">
    {Object.values(tokens).map((token, index) => (
      <ListItem key={index} {...token} />
    ))}
  </div>
);

const TokenListPopup: React.FC<TokenListPopupProps> = ({ isOpen, onClose, setToken }) => {
  const handleSetToken = (value: string) => {
    setToken(value);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-gray-800 opacity-50" onClick={onClose}></div>
      <div className="relative z-10 bg-gray-800 p-4 rounded shadow-lg ">
        <div className="flex justify-center items-center text-center">
          <div className="text-xl text-center font-bold">Select A Token</div>

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

        <TokenList tokens={tokens} />
      </div>
    </div>
  );
};

export default TokenListPopup;
