import React, { useState } from "react";

const SwapModes: React.FC = () => {
  const [value, setValue] = useState<number | null>(null);
  const [selectedButton, setSelectedButton] = useState<string | null>(null);

  const handleButtonClick = (newValue: number, buttonName: string) => {
    setValue(newValue);
    setSelectedButton(buttonName);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col">
        <span>Default transaction speed (GWEI)</span>
      </div>

      <div className="flex justify-between space-x-2">
        <button
          className={`flex-1 border border-purple-500 px-4 py-2 rounded-full ${
            selectedButton === "button1" ? "bg-purple-500 text-white" : "bg-transparent"
          }`}
          onClick={() => handleButtonClick(5, "button1")}
        >
          Default
        </button>
        <button
          className={`flex-1 border border-purple-500 px-4 py-2 rounded-full ${
            selectedButton === "button2" ? "bg-purple-500 text-white" : "bg-transparent"
          }`}
          onClick={() => handleButtonClick(6, "button2")}
        >
          Fast
        </button>
        <button
          className={`flex-1 border border-purple-500 px-4 py-2 rounded-full ${
            selectedButton === "button3" ? "bg-purple-500 text-white" : "bg-transparent"
          }`}
          onClick={() => handleButtonClick(7, "button3")}
        >
          Instant
        </button>
      </div>
    </div>
  );
};

export default SwapModes;
