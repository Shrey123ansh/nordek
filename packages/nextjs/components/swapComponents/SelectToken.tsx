import { useState } from "react";
import Image from "next/image";
import { Select } from "../Select/Select";
import { tokens } from "~~/data/data";

const SelectToken = () => {
  const [token, setToken] = useState(tokens.NRK);

  return (
    // <select
    //   options={options}
    //   styles={customStyles}
    //   components={{
    //     Option: CustomOption,
    //   }}
    // />
    <div className="flex flex-col mb-4 bg-gray-800 px-4 py-2 rounded-lg text-sm">
      <span className="mb-4">From</span>
      <div className="flex items-center">
        <Select setToken={setToken} token={token}></Select>

        <input
          type="number"
          placeholder="0.0"
          className="input input-sm input-ghost max-w-md text-right rounded-none leading-tight [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
      </div>
      <label className="label block w-full text-right">
        <span className="label-text-alt">$23</span>
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
