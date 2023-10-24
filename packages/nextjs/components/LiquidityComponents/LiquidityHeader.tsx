import { useState } from "react";

export default function LiquidityHeader() {
  const [liqudityMode, setLiquidityMode] = useState(""); // State to store the selected currency

  const handleCurrencySelect = (mode: React.SetStateAction<string>) => {
    setLiquidityMode(mode);
  };

  return (
    <div className="flex justify-center w-full space-between">
      <button
        className={` appearance-none mr-8 pb-2 ${liqudityMode === "Supply" ? "text-blue-500 border-b-2 border-blue-500" : ""} `}
        onClick={() => handleCurrencySelect("Supply")}
      >
        + Supply
      </button>
      <button
        className={`appearance-none ml-8 pb-2 ${liqudityMode === "Positions" ? "text-blue-500 border-b-2 border-blue-500" : ""} `}
        onClick={() => handleCurrencySelect("Positions")}
      >
        Positions
      </button>
    </div>
  );
}
