import ExpertToggle from "./swapComponents/ExpertModeToggle";
import SwapHeader from "./swapComponents/SwapHeader";
import SwapMain from "./swapComponents/SwapMain";
import { ToggleSwitchProps } from "./swapComponents/ToggleSwitchProps";

export const Swap2: React.FC<ToggleSwitchProps> = ({ expertToggle, setExpertToggle }) => {
  // Define states for decimal numbers

  return (
    <div className={expertToggle ? "" : `p-2 lg:p-4 border-2 rounded-2xl mb-32 bg-[#E2D4FF] lg:w-[500px]  w-[300px]  `}>
      <div
        className={
          `flex flex-col space-y-4   ` +
          (expertToggle ? `h-[500px] overflow-y-auto overflow-hidden` : ` pt-6 px-4 lg:px-12 rounded-xl bg-gradient-to-r `)
        }
      >
        {/* {expertToggle ? (
          <div className="w-full bg-[#5F29A5] p-2 text-center font-sm"> Market</div>
        ) : (
          <div>
            <SwapHeader></SwapHeader>
            <br />
            <ExpertToggle expertToggle={expertToggle} setExpertToggle={setExpertToggle}></ExpertToggle>
          </div>
        )} */}
        <div  >
          <div className=" font-bold text-2xl     " >Swap</div>
          <div className="  font-normal lg:text-sm  text-[10px]  " >Trade tokens in an instant</div>
        </div>
        <SwapMain></SwapMain>
        <br />
      </div>
    </div>
  );
};
