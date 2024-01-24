import { Select } from "../Select/Select";
import { useDarkMode } from "usehooks-ts";
import { tokenType } from "~~/data/data";

type SwapFooterProps = {
  token: tokenType;
  setToken: React.Dispatch<React.SetStateAction<tokenType>>;
  tokenAmount: Number;
  setTokenAmount: (value: Number) => void;
  title: string;
  balance: number;
};

const SelectToken = ({ token, setToken, tokenAmount, setTokenAmount, title, balance }: SwapFooterProps) => {
  const { isDarkMode } = useDarkMode();

  return (
    <div
      className={
        isDarkMode
          ? " shadow-md  rounded-lg  bg-swap-gradient   px-4 py-2 mb-4 mt-4 "
          : " shadow-md  rounded-lg  bg-swap-gradient  border-2 border-[#E2D4FF]  px-4 py-2 mb-4 mt-4 "
      }
    >
      <div className="mb-4 font-semibold ">{title}</div>
      <div className=" flex flex-row items-center   justify-between  ">
        <Select setToken={setToken} token={token} setTokenAmount={setTokenAmount}></Select>
        <input
          type="number"
          placeholder="0.0"
          value={tokenAmount === 0 ? "" : tokenAmount?.toString()}
          className="  w-[120px] lg:w-fit pr-0 bg-transparent  font-semibold  input-ghost  text-right rounded-none focus:outline-none     leading-tight [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          onChange={e => {
            const value = Number(e.target.value);
            if (value < 0) {
              return;
            }

            setTokenAmount(value);
          }}
        />
      </div>
      <div className="flex flex-row items-center  justify-between mt-4 font-semibold  text-sm ">
        <span>Balance</span>
        <span>{balance.toFixed(4)}</span>
      </div>
    </div>
  );
};

export default SelectToken;
