import { useState } from "react";
import Link from "next/link";
import type { NextPage } from "next";
//import { BugAntIcon, MagnifyingGlassIcon, SparklesIcon } from "@heroicons/react/24/outline";
import Chart from "~~/components/Chart/Chart";
import ExpertModeNavbar from "~~/components/ExpertModeNavbar";
import { MetaHeader } from "~~/components/MetaHeader";
//import Swap from "~~/components/Swap";
import { Swap2 } from "~~/components/Swap2";
import TradeTable from "~~/components/TradeTable";

const Home: NextPage = () => {
  const [expertToggle, setExpertToggle] = useState(false);
  return (
    <>
      <MetaHeader />
      {expertToggle ? (
        <ExpertModeNavbar expertToggle={expertToggle} setExpertToggle={setExpertToggle}></ExpertModeNavbar>
      ) : (
        ""
      )}
      <div
        className={
          expertToggle
            ? `flex items-center flex-col flex-grow pt-10 mt-4`
            : `flex items-center flex-col justify-center mx-auto mt-4`
        }
      >
        <div className="px-0 flex w-full h-full justify-between">
          {expertToggle ? (
            <>
              <div className="flex justify-between p-0 w-[100%]">
                <Chart></Chart>
                <div className="flex flex-col h-screen">
                  <TradeTable />
                  <TradeTable />
                </div>
              </div>

              <div className="felx w-[25%]">
                <Swap2 expertToggle={expertToggle} setExpertToggle={setExpertToggle}></Swap2>
              </div>
            </>
          ) : (
            <div>
              <Swap2 expertToggle={expertToggle} setExpertToggle={setExpertToggle}></Swap2>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
