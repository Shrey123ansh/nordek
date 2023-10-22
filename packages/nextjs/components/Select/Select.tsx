import { useState } from "react";
import TokenListPopup from "../ui/TokenListPopup";
import { tokenType } from "~~/data/data";

interface SelectProps {
  setToken: React.Dispatch<React.SetStateAction<tokenType>>;
  token: tokenType;
}

export const Select: React.FC<SelectProps> = ({ setToken, token }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handlePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };



  return (

    <div className="rounded-full bg-white inline-block text-gray-800 text-xs py-1 px-2 " >
      <button className="flex items-center justify-between space-x-4" onClick={handlePopup}>
        {" "}
        <img src={token.logo} className="w-6 h-6 rounded-full mr-2" /> {token.symbol}
      </button>
      <TokenListPopup isOpen={isPopupOpen} onClose={handlePopup} setToken={setToken}></TokenListPopup>
    </div>
  );
};

