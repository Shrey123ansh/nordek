import LiquidityHeader from "./LiquidityComponents/LiquidityHeader";
import LiquidityMain from "./LiquidityComponents/LiquidityMain";

export const LiquidityBox = () => {
  return (
    <div className={`p-6 border-2 rounded-2xl`}>
      <div className={`flex flex-col space-y-4 items-center px-16 pt-6 px-20 rounded-xl bg-base-300`}>
        <div>
          <LiquidityHeader></LiquidityHeader>
          <br />
        </div>

        <LiquidityMain></LiquidityMain>

        <br />
      </div>
    </div>
  );
};
