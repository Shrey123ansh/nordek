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
    <button className="rounded-full bg-white inline-block text-gray-800 text-xs py-1 px-2 " onClick={handlePopup}>
      <span className="flex items-center justify-between space-x-4">
        {" "}
        <img src={token.logo} className="w-6 h-6 rounded-full mr-2" /> {token.name}
      </span>
      <TokenListPopup isOpen={isPopupOpen} onClose={handlePopup} setToken={setToken}></TokenListPopup>
    </button>
  );
};

// {options.map(token => (
//   <option key={token.address} value={token.address} className="text-xs ">
//     {token.symbol}
//   </option>
// ))}
