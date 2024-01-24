import ExpertToggle from "./swapComponents/ExpertModeToggle";
import SwapHeader from "./swapComponents/SwapHeader";
import SwapMain from "./swapComponents/SwapMain";
import { ToggleSwitchProps } from "./swapComponents/ToggleSwitchProps";


export const Swap2: React.FC<ToggleSwitchProps> = ({ expertToggle, setExpertToggle }) => {
  // Define states for decimal numbers

  return (
    <div className={expertToggle ? "" : `p-1   border-2 rounded-2xl mb-32 bg-[#FFF] lg:w-[500px]  w-[300px]  `}>
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

        <SwapMain></SwapMain>
        <br />
      </div>
    </div>
  );
};
