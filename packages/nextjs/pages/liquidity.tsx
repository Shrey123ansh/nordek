import Link from "next/link";
import type { NextPage } from "next";
import Addliquidity from "~~/components/AddLiquidity";

const Liqudity: NextPage = () => {
  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <Addliquidity></Addliquidity>
        </div>
      </div>
    </>
  );
};

export default Liqudity;
