import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  addStyle: string;
};

export const ClaimButton = ({ addStyle = "" }: { addStyle: string }) => {
  return (
    <button
      className={addStyle + "bg-gradient-to-r from-[#4F56FF] to-[#9D09E3] font-bold text-white py-0 px-8 rounded-lg"}
    >
      Claim All
    </button>
  );
};

export const UnstakeButton: React.FC<ButtonProps> = ({ children, addStyle = "" }) => {
  return (
    <div className={addStyle + "rounded-lg bg-gradient-to-r from-[#4F56FF] to-[#9D09E3] p-0.5"}>
      <button type="button" className="px-8 py-2 border-1 rounded-lg font-bold bg-gray-800">
        {children}
      </button>
    </div>
  );
};
