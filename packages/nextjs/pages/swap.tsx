//import { useEffect, useState } from "react";
import type { NextPage } from "next";
import Chart from "~~/components/Chart/Chart";
import ExpertModeNavbar from "~~/components/ExpertModeNavbar";
import { MetaHeader } from "~~/components/MetaHeader";
import { Swap2 } from "~~/components/Swap2";
import TradeTable from "~~/components/TradeTable";
import { localTokens } from "~~/data/data";
import { getTokenData } from "~~/utils/coingeckoPrices";

import { useState, useEffect } from 'react'



const Swap: NextPage<any> = props => {
  const [expertToggle, setExpertToggle] = useState(false);
  const [trades, setTrades] = useState(props.trades);
  const [liquidityHistory, setLiquidityHistory] = useState(props.liquidityHistory);
  const [chartToken, setChartToken] = useState(localTokens.NRK);
  const [secondaryChartToken, setSecondaryChartToken] = useState(localTokens.USDC);
  const [priceData, setPriceData] = useState<any>();

  useEffect(() => {
    const updatePrice = async () => {
      const data = await getTokenData(chartToken.name, "usd");
      setPriceData(data);
    };
    updatePrice();
  }, [chartToken]);

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
            ? `flex items-center flex-col flex-grow pt-10 mt-4   `
            : `flex items-center flex-col justify-center  mx-auto mt-4`
        }
      >
        <div className="px-0 flex w-full h-full justify-between    ">
          {expertToggle ? (
            <>
              <div className="flex justify-between p-0 w-[100%]">
                <Chart></Chart>
                <div className="flex flex-col h-screen">
                  <TradeTable trades={trades} tableHead={"Trade History"} />
                  <TradeTable trades={liquidityHistory} tableHead={"Liquidity History"} />
                </div>
              </div>
              <div className="flex flex-col w-[25%]">
                <div className="felx mb-3">
                  <Swap2 expertToggle={expertToggle} setExpertToggle={setExpertToggle}></Swap2>
                </div>
                <div className="flex flex-col">
                  <div className="w-full bg-[#5F29A5] p-2 text-center font-sm"> Token Data</div>

                  <div className="p-4 flex justify-between w-full hover:bg-gray-900">
                    {" "}
                    <span>Price in USD:</span> <span>{priceData?.usd}</span>
                  </div>
                  <div className="p-4 flex justify-between w-full hover:bg-gray-900">
                    {" "}
                    <span>Mkt Cap in USD:</span> <span>{priceData?.usd_market_cap}</span>
                  </div>
                  <div className="p-4 flex justify-between w-full hover:bg-gray-900">
                    {" "}
                    <span>24hr Change </span>
                    <span>{priceData?.usd_24h_change}</span>
                  </div>
                  <div className="p-4 flex justify-between w-full hover:bg-gray-900">
                    {" "}
                    <span>24hr Volume:</span> <span>{priceData?.usd_24h_vol}</span>
                  </div>
                  <div className="p-4 flex justify-between w-full hover:bg-gray-900">
                    {" "}
                    <span>Last updated At:</span> <span>{priceData?.last_updated}</span>
                  </div>
                </div>
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

export default Swap;
