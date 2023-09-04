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
import { localTokens } from "~~/data/data";
import clientPromise from "~~/lib/mongoDb";

//import { tradeData } from "~~/data/data";
//import clientPromise from "~~/lib/mongoDb";

const Home: NextPage<any> = props => {
  const [expertToggle, setExpertToggle] = useState(false);
  const [trades, setTrades] = useState(props.trades);
  const [chartToken, setChartToken] = useState(localTokens.NRK);
  const [secondaryChartToken, setSecondaryChartToken] = useState(localTokens.USDC);

  return (
    <>
      <MetaHeader />
      {expertToggle ? (
        <ExpertModeNavbar
          expertToggle={expertToggle}
          setExpertToggle={setExpertToggle}
          chartToken={chartToken}
          setChartToken={setChartToken}
          secondaryChartToken={secondaryChartToken}
          setSecondaryChartToken={setSecondaryChartToken}
        ></ExpertModeNavbar>
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
                  <TradeTable trades={trades} />
                  <TradeTable trades={trades} />
                </div>
              </div>

              <div className="felx w-[25%]">
                <Swap2 expertToggle={expertToggle} setExpertToggle={setExpertToggle}></Swap2>
              </div>
            </>
          ) : (
            <div className="mt-20">
              <Swap2 expertToggle={expertToggle} setExpertToggle={setExpertToggle}></Swap2>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
export async function getServerSideProps() {
  try {
    const client = await clientPromise;
    const db = client.db("Norswap");

    const trades = await db.collection("trades").find({}).sort({ time: -1 }).limit(10).toArray();
    return {
      props: {
        trades: JSON.parse(JSON.stringify(trades)),
      },
    };
  } catch (e) {
    console.log("ERROR");
    console.error(e);
  }
}
