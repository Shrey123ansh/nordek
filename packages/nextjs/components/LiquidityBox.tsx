import LiquidityHeader from "./LiquidityComponents/LiquidityHeader";
import LiquidityMain from "./LiquidityComponents/LiquidityMain";

export const LiquidityBox = () => {
  return (
    <div className={`p-6 border-2 rounded-2xl bg-[#E2D4FF]`}>
      <div className={`bg-[#E2D4FF] flex flex-col space-y-4 items-center pt-6 px-12 rounded-xl bg-gradient-to-r bg-base-300`}>
        <div className="">
          <LiquidityHeader></LiquidityHeader>
          <br />
        </div>

        <LiquidityMain></LiquidityMain>

        <br />
      </div>
    </div>
  );
};
