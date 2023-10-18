"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { tokenType } from "~~/data/data";

interface TokenListPopupProps {
  isOpen: boolean;
  onClose: () => void;
  setToken: (value: tokenType) => void;
}

const getTokenList = async () => {
  const response = await fetch("http://localhost:3000/api/swapSupportedTokenList");

  if (!response.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  } else {
    const data = await response.json();
    console.log(data);
    return data.swapSupportedTokenList;
  }
};

const TokenListPopup: React.FC<TokenListPopupProps> = ({ isOpen, onClose, setToken }) => {
  const [tokens, setTokens] = useState<tokenType[] | undefined>(undefined); // Initialize tokens as undefined

  useEffect(() => {
    const fetchTokens = async () => {
      const tokenList = await getTokenList();
      console.log("TOKEN LIST", tokenList);
      setTokens(tokenList);
    };

    fetchTokens();
  }, []);

  const ListComponent = () => {
    if (tokens === undefined) {
      return <div className="text-white font-bold mt-4">Loading...</div>; // Display a loading indicator
    }

    return (
      <div className="max-h-96 flex-grow overflow-y-auto bg-base-300">
        {Object.values(tokens).map((token, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 bg-base-300 hover:bg-base-100 text-white cursor-pointer"
            onClick={() => setToken(token)}
          >
            <div className="flex items-center space-x-4 mr-20">
              <img src={token.logo} className="w-6 h-6 rounded-full" alt={token.symbol} />
              <span>{token.symbol}</span>
            </div>
            <span className="ml-20">{0}</span>
          </div>
        ))}
      </div>
    );
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-gray-800 opacity-50" onClick={onClose}></div>
      <div className="relative z-10 bg-base-300 p-4 rounded-lg shadow-lg p-6">
        <div className="flex justify-center items-center text-center ">
          <div className="text-lg text-center font-bold text-white">Select A Token</div>

          <button className="absolute top-0 right-0 m-2 p-2 text-gray-400 hover:text-primary-content" onClick={onClose}>
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
        <ListComponent />
      </div>
    </div>
  );
};

export default TokenListPopup;
