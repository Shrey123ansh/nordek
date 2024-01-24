import React from "react";

const Header: React.FC = () => {
  return (
    <div className="flex justify-between items-center bg-gray-700 text-white p-4">
      <div className="text-xl font-bold">Settings</div>
      <div className="cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>
    </div>
  );
};

export default Header;
