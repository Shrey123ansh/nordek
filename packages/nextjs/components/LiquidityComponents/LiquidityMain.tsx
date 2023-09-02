//import PriceComponent from "./PriceBox";
import SelectToken from "../swapComponents/SelectToken";
import LiquidityFooter from "./LiquidityFooter";
import SlippageDetails from "./SlippageDetails";
import { ArrowDownIcon } from "@heroicons/react/24/outline";

export default function LiquidityMain() {
  return (
    <div className="flex flex-col items-center justify-between w-full">
      <SelectToken></SelectToken>
      <SelectToken></SelectToken>
      <LiquidityFooter></LiquidityFooter>
      {/* <PriceComponent price={0}></PriceComponent> */}
    </div>
  );
}
