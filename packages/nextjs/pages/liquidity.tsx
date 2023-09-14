import type { NextPage } from "next";
import { LiquidityBox } from "~~/components/LiquidityBox";

const Liqudity: NextPage = () => {
  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <LiquidityBox></LiquidityBox>
        </div>
      </div>
    </>
  );
};

export default Liqudity;
