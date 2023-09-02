import React, { useState } from "react";
import SwapModes from "./SettingsComponents/SwapModes";
import SwapSettings from "./SettingsComponents/SwapSettings";
import TransactionSpeed from "./SettingsComponents/TransactionSpeed";

interface SettingsPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsPopup: React.FC<SettingsPopupProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-gray-800 opacity-50"></div>
      <div className="relative z-10 bg-gray-800 p-4 rounded shadow-lg">
        <div className="flex justify-between items-center">
          <div className="text-xl font-bold">Settings</div>
          <button className="absolute top-0 right-0 m-2 p-2 text-gray-600 hover:text-gray-800" onClick={onClose}>
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
        <TransactionSpeed></TransactionSpeed>
        <SwapModes></SwapModes>
        <SwapSettings></SwapSettings>
      </div>
    </div>
  );
};

export default SettingsPopup;
