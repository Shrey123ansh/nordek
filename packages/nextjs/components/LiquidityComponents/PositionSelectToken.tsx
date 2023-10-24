import { useState } from "react";
import Image from "next/image";
import { Select } from "../Select/Select";
import { tokenType } from "~~/data/data";
import { set } from "mongoose";

type SwapFooterProps = {
  token: tokenType;
  setToken: React.Dispatch<React.SetStateAction<tokenType>>;
  tokenAmount: Number;
  setTokenAmount: (value: Number) => void
};

const PositionSelectToken = ({ token, setToken, tokenAmount, setTokenAmount }: SwapFooterProps) => {

    const [percentage, setPercentage] = useState(100);

   

    const handlePercentageFunction = (e) => {

        const value = e.target.value;
        if(value > 100 || value<0) {
            setPercentage(0);
        }
        else {
            setPercentage(value);
        }

        setPercentage(e.target.value)
    }

    const setPercentageFunction1 = () => {
        setPercentage(25);
    }
    const setPercentageFunction2 = () => {
        setPercentage(50);
    }
    const setPercentageFunction3 = () => {
        setPercentage(75);
    }
    const setPercentageFunction4 = () => {
        setPercentage(100);
    }

  return (
    // <select
    //   options={options}
    //   styles={customStyles}
    //   components={{
    //     Option: CustomOption,
    //   }}
    // />
    <div className=" flex flex-col mb-4 shadow-md bg-gradient-to-r from-[#141414] to-[#593FB1] px-4 py-2 rounded-lg text-white text-sm">
        
      <span className="">Withdraw</span>
      <div className="flex items-center">
        <div>
            <div className="font-bold">
                <span>HELL</span> - 
                <span> PERC</span>
            </div>
        </div>

        <input
          type="number"
          placeholder="0.0"
          value={tokenAmount?.toString()}
          className="input input-sm input-ghost max-w-md text-right rounded-none focus:outline-none bg-transparent leading-tight [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          onChange={e => {
            setTokenAmount(Number(e.target.value));
          }}
        />
        
      </div>
      <label className="label block w-full text-right">
        <span className="label-text-alt">-</span>
      </label>
      <hr className="bg-white w-full" />

      <div className="py-1">
        <div className="flex items-center justify-between">
            <span>By Percentage </span>
            <input
            type="number"
            step="0.1"
            min={1}
            max={100}
            value={percentage}
            className="input input-sm input-ghost max-w-md text-right rounded-none focus:outline-none bg-transparent leading-tight [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            onChange={handlePercentageFunction}
            ></input>
        </div>

        <div className="flex justify-end gap-4">
            <span onClick={() => setPercentageFunction1()} className="cursor-pointer hover:text-gray-400">25%</span>
            <span onClick={() => setPercentageFunction2()} className="cursor-pointer hover:text-gray-400">50%</span>
            <span onClick={() => setPercentageFunction3()} className="cursor-pointer hover:text-gray-400">75%</span>
            <span onClick={() => setPercentageFunction4()} className="cursor-pointer hover:text-gray-400">MAX</span>
        </div>

      </div>
      <hr className="bg-white w-full" />
      
      <div className="flex justify-between">
        <span>Balance</span>
        <span>0.00</span>
      </div>
    </div>
  );
};

export default PositionSelectToken;
