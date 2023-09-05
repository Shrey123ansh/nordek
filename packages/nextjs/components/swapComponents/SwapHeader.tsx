import { useState } from "react";
import SettingsPopup from "~~/components/SettingsPopup";

export default function SwapHeader() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className="flex justify-center w-full">
      <div className="badge badge-secondary badge-outline">Market</div>

      {/* <button
onClick={handleOpenPopup}
className="w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full"
>
<SettingsPopup isOpen={isPopupOpen} onClose={handleClosePopup}></SettingsPopup>
<svg
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  stroke="currentColor"
  className="w-4 h-4"
>
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
</svg>
</button> */}
    </div>
  );
}
