//import PriceComponent from "./PriceBox";
import SelectToken from "./SelectToken";
import { ArrowDownIcon } from "@heroicons/react/24/outline";

export default function SwapMain() {
  return (
    <div className="flex flex-col items-center justify-between w-full">
      <SelectToken></SelectToken>
      <div className="w-6 h-6 flex items-center justify-center text-white rounded-full mb-4">
        <ArrowDownIcon className="font-bold" />
      </div>
      <SelectToken></SelectToken>

      {/* <PriceComponent price={0}></PriceComponent> */}
    </div>
  );
}
