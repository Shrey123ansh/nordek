import React, { useState } from "react";
import ActionButton from "../ui/actionButton";
import ConnectWalletButton from "./ConnectWalletButton";

const SlippageComponent = () => {
  const [slippageValue, setSlippageValue] = useState(2); // Initial slippage value (2% in this example)
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleSlippageChange = event => {
    setSlippageValue(event.target.value);
  };

  const handleSwap = () => {
    console.log("Swapped");
  };

  return (
    <div className="flex flex-col w-full text-sm">
      <div className="flex justify-between items-center mb-2">
        <div>
          <span className="text-sm">Slippage</span>
          {isEditing ? (
            <input
              type="number"
              className="ml-2 border border-gray-300 p-1 rounded-md"
              value={slippageValue}
              onChange={handleSlippageChange}
            />
          ) : (
            <span className="ml-2 font-semibold">{slippageValue}%</span>
          )}
        </div>
        <button className="ml-2" onClick={handleEditClick}>
          {isEditing ? "Save" : "Edit"}
        </button>
      </div>
      <ActionButton text="Swap" onClick={handleSwap}></ActionButton>
    </div>
  );
};

export default SlippageComponent;
