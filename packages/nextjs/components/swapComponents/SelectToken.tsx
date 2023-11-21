import { Select } from "../Select/Select";
import { tokenType } from "~~/data/data";

type SwapFooterProps = {
  token: tokenType;
  setToken: React.Dispatch<React.SetStateAction<tokenType>>;
  tokenAmount: Number;
  setTokenAmount: (value: Number) => void,
  title: string,
  balance: number
};

const SelectToken = ({ token, setToken, tokenAmount, setTokenAmount, title, balance }: SwapFooterProps) => {
  return (


    <div className=" shadow-md bg-gradient-to-r from-[#141414] to-[#593FB1] rounded-lg px-4 py-2 mb-4 mt-4 " >
      <div className="mb-4 font-semibold " >{title}</div>
      <div className=" flex flex-row items-center  justify-between  " >
        <Select setToken={setToken} token={token}></Select>
        <input
          type="number"
          placeholder="0"
          value={tokenAmount?.toString()}
          className="input   input-sm pr-0 bg-transparent  font-semibold  input-ghost max-w-md text-right rounded-none focus:outline-none   leading-tight [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          onChange={e => {
            const value = Number(e.target.value)
            if (value < 0) {
              return
            }
            setTokenAmount(value);
          }}
        />
      </div>
      <div className="flex flex-row items-center  justify-between mt-4 font-semibold  text-sm ">
        <span>Balance</span>
        <span>{balance}</span>
      </div>
    </div>






  );
};

export default SelectToken;
