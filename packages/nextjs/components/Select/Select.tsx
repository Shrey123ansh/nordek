import { useState } from "react";
import TokenListPopup from "../ui/TokenListPopup";

type token = {
  name: string;
  symbol: string;
  address: string;
};

interface SelectProps {
  setToken: React.Dispatch<React.SetStateAction<token>>;
  token: token;
}

export const Select: React.FC<SelectProps> = ({ setToken, token }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handlePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <button className="rounded-full bg-white inline-block text-gray-800 text-xs py-1 px-2 " onClick={handlePopup}>
      <span>{token.name}</span>
      <TokenListPopup isOpen={isPopupOpen} onClose={handlePopup} setToken={setToken}></TokenListPopup>
    </button>
  );
};

// {options.map(token => (
//   <option key={token.address} value={token.address} className="text-xs ">
//     {token.symbol}
//   </option>
// ))}
