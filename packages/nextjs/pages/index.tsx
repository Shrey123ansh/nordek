import Link from "next/link";
import type { NextPage } from "next";
import { BugAntIcon, MagnifyingGlassIcon, SparklesIcon } from "@heroicons/react/24/outline";
import Chart from "~~/components/Chart/Chart";
import { MetaHeader } from "~~/components/MetaHeader";
import Swap from "~~/components/Swap";
import TradeTable from "~~/components/TradeTable";

const Home: NextPage = () => {
  return (
    <>
      <MetaHeader />
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5 flex">
          <div className="flex flex-col justify-between p-4">
            <div className="m-4 mb-8">
              <Chart></Chart>
            </div>
            <div className="m-4 mt-8">
              <TradeTable />
            </div>
          </div>

          <div>
            <Swap></Swap>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
