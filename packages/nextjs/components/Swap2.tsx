import ExpertToggle from "./swapComponents/ExpertModeToggle";
import SwapHeader from "./swapComponents/SwapHeader";
import SwapMain from "./swapComponents/SwapMain";
import { ToggleSwitchProps } from "./swapComponents/ToggleSwitchProps";

export const Swap2: React.FC<ToggleSwitchProps> = ({ expertToggle, setExpertToggle }) => {
  // Define states for decimal numbers

  return (
    <div className={expertToggle ? "" : `p-6 border-2 rounded-2xl mb-32 bg-[#E2D4FF]`}>
      <div
        className={
          `flex flex-col space-y-4 items-center ` +
          (expertToggle ? `h-[500px] overflow-y-auto overflow-hidden` : `px-16 pt-6 px-12 rounded-xl bg-gradient-to-r `)
        }
      >
        {expertToggle ? (
          <div className="w-full bg-[#5F29A5] p-2 text-center font-sm"> Market</div>
        ) : (
          <div>
            <SwapHeader></SwapHeader>
            <br />
            <ExpertToggle expertToggle={expertToggle} setExpertToggle={setExpertToggle}></ExpertToggle>
          </div>
        )}
        <SwapMain></SwapMain>
        <br />
      </div>
    </div>
  );
};
