import React, { useState } from "react";

const SlippageDetails = () => {
  // Define state for each div
  const [token0, setToken0] = useState("NRK");
  const [token0Amount, setToken0Amount] = useState(0);
  const [token1, setToken1] = useState("NUSDT");
  const [token1Amount, setToken1Amount] = useState(0);
  const [shareOfPool, setShareOfPool] = useState(0);
  const [LPTokens, setLPTokens] = useState(0);

  return (
    <div className="flex flex-col space-y-1">
      <div className="">
        <div>
          1 {token0} = {token1Amount} {token1}{" "}
        </div>
      </div>

      <div className="">
        <div>
          1 {token1} = {token0Amount} {token0}{" "}
        </div>
      </div>

      <div className="flex justify-between">
        <span> Share of Pool </span>
        <span className="font-bold"> {shareOfPool} </span>
      </div>

      <div className="flex justify-between">
        <span> Lp Tokens </span>
        <span className="font-bold"> {LPTokens} </span>
      </div>
      <hr className="" />
    </div>
  );
};

export default SlippageDetails;
