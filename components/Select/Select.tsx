import { useState } from "react";
import TokenListPopup from "../ui/TokenListPopup";
import { tokenType } from "~~/data/data";

interface SelectProps {
  setToken: React.Dispatch<React.SetStateAction<tokenType>>;
  setTokenAmount: (value: Number) => void;
  token: tokenType;
}

export const Select: React.FC<SelectProps> = ({ setToken, token, setTokenAmount }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handlePopup = () => {
    setIsPopupOpen(true);
  };

  return (
    <>
      <button
        className=" flex flex-row items-center font-semibold lg:text-base text-sm rounded-full bg-white  text-gray-800 px-4 pr-6 py-1  "
        onClick={handlePopup}
      >
        <img src={token.logo} className="lg:w-6 lg:h-6 w-4 h-4 rounded-full mr-1 " />
        <div>{token.symbol}</div>
      </button>
      <TokenListPopup
        isOpen={isPopupOpen}
        onClose={() => {
          setIsPopupOpen(false);
          setTokenAmount(0);
        }}
        setToken={setToken}
      ></TokenListPopup>
    </>
  );
};
