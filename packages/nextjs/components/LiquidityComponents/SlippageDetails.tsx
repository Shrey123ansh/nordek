import React from "react";

const SlippageDetails: React.FC<{ price: number }> = ({ price }) => {
  return (
    <div className="flex flex-col space-y-2 w-full">
      {/* Price in small on the left */}
      <div className="flex flex-col">
        <div className="text-sm font-bold text-purple-600">price</div>
        <div className="text-white rounded-lg px-2 py-1 text-md font-bold w-full bg-gray-400">{price} BNB</div>
      </div>

      <div className="flex justify-end items-right space-x-2">
        <div className="text-sm font-bold text-gray-600">NRK per BNB</div>
      </div>
    </div>
  );
};

export default SlippageDetails;
