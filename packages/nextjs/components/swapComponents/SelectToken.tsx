import { useState } from "react";
import Image from "next/image";
import { Select } from "../Select/Select";
import { tokenType } from "~~/data/data";

type SwapFooterProps = {
  token: tokenType;
  setToken: React.Dispatch<React.SetStateAction<tokenType>>;
  tokenAmount: Number;
  setTokenAmount: (value: Number) => void
};

const SelectToken = ({ token, setToken, tokenAmount, setTokenAmount }: SwapFooterProps) => {
  return (
    // <select
    //   options={options}
    //   styles={customStyles}
    //   components={{
    //     Option: CustomOption,
    //   }}
    // />
    <div className=" flex flex-col mb-4 bg-gradient-to-r from-[#141414] to-[#593FB1] px-4 py-2 rounded-lg text-white  text-sm">
      <span className="mb-4">From</span>
      <div className="flex items-center">
        <Select setToken={setToken} token={token}></Select>

        <input
          type="number"
          placeholder="0.0"
          value={tokenAmount?.toString()}
          className="input input-sm input-ghost max-w-md text-right rounded-none leading-tight [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          onChange={e => {
            setTokenAmount(Number(e.target.value));
          }}
        />
      </div>
      <label className="label block w-full text-right">
        <span className="label-text-alt">-</span>
      </label>
      <hr className="bg-white w-full " />
      <div className="flex justify-between">
        <span>Balance</span>
        <span>0.00</span>
      </div>
    </div>
  );
};

export default SelectToken;
