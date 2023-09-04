import React from "react";
import type { ReactElement } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
//import type { Prisma } from "@prisma/client";
import { formatDistance } from "date-fns";

//import type { TradeWithTwitterUser } from "pages/api/stats/trades";
// import { Currency, Global } from "~~/state/global";
// import { parseUSD } from "~~/utils/usd";

//import { truncateAddress } from "utils";
//import { parseUSD } from "utils/usd";

// Render row background depending on trade type
function ColoredRow({ isBuy, children }: { isBuy: boolean; children: ReactElement[] }) {
  return isBuy ? (
    <TableRow className="bg-buy-30">{children}</TableRow>
  ) : (
    <TableRow className="bg-sell-30">{children}</TableRow>
  );
}
const trades = [
  {
    usdValue: "$100",
    currency1: { amount: "0.5", token: "ETH" },
    currency2: { amount: "150", token: "USDT" },
    time: Date.now() - 120000,
  },
  {
    usdValue: "$100",
    currency1: { amount: "0.5", token: "ETH" },
    currency2: { amount: "150", token: "USDT" },
    time: Date.now() - 120000,
  },
  {
    usdValue: "$100",
    currency1: { amount: "0.5", token: "ETH" },
    currency2: { amount: "150", token: "USDT" },
    time: Date.now() - 120000,
  },
  {
    usdValue: "$100",
    currency1: { amount: "0.5", token: "ETH" },
    currency2: { amount: "150", token: "USDT" },
    time: Date.now() - 120000,
  },
  {
    usdValue: "$100",
    currency1: { amount: "0.5", token: "ETH" },
    currency2: { amount: "150", token: "USDT" },
    time: Date.now() - 120000,
  },
  {
    usdValue: "$100",
    currency1: { amount: "0.5", token: "ETH" },
    currency2: { amount: "150", token: "USDT" },
    time: Date.now() - 120000,
  },
  {
    usdValue: "$100",
    currency1: { amount: "0.5", token: "ETH" },
    currency2: { amount: "150", token: "USDT" },
    time: Date.now() - 120000,
  },
  {
    usdValue: "$100",
    currency1: { amount: "0.5", token: "ETH" },
    currency2: { amount: "150", token: "USDT" },
    time: Date.now() - 120000,
  },
  {
    usdValue: "$100",
    currency1: { amount: "0.5", token: "ETH" },
    currency2: { amount: "150", token: "USDT" },
    time: Date.now() - 120000,
  },
];
{
  /* @ts-ignore */
}
function TradeHistory({ trades }) {
  return (
    <div className="border-b-2 bg-purple-100 flex-grow overflow-y-auto">
      <h2 className=" text-lg  px-2 py-1 text-purple-600">Trade History</h2>
      <div className="overflow-y-auto scrollbar-hide">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-purple-200">
            <tr>
              <th className="px-6 py-3 text-left text-md font-large text-purple-600  tracking-wider">
                USD 
              </th>
              <th className="px-6 py-3 text-left text-md font-large text-purple-600  tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-md font-large text-purple-600 tracking-wider">Time</th>
            </tr>
          </thead>
          <tbody className="bg-white ">
            {/* @ts-ignore */}
            {trades.map((trade, idx) => (
              <React.Fragment key={idx}>
              <tr >
  <td className="px-6 py-4 whitespace-nowrap text-purple-600">
    {trade.usdValue}
  </td>
  <td className="px-6 py-4 whitespace-nowrap text-purple-600">
    <div>{trade.currency1.amount} {trade.currency1.token}</div>
    <div>{trade.currency2.amount} {trade.currency2.token}</div>
  </td>
  <td className="px-6 py-4 whitespace-nowrap text-purple-600">
    {formatTime(trade.time)}
  </td>
</tr>

              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
// @ts-ignore
function formatTime(time) {
  const now = Date.now();

  // Assuming the provided time is a timestamp in ms
  const difference = now - time;

  const seconds = difference / 1000;
  if (seconds < 60) return `${Math.round(seconds)} secs`;

  const minutes = seconds / 60;
  if (minutes < 60) return `${Math.round(minutes)} mins`;

  const hours = minutes / 60;
  if (hours < 24) return `${Math.round(hours)} hrs`;

  return new Date(time).toLocaleString();
}

export default function TradeTable() {
  //const { eth, currency } = Global.useContainer();
  //   const calculateTradeCost = (cost: number): string => {
  //     // Calculate trade cost
  //     return currency === Currency.USD
  //       ? `$${parseUSD((Number(cost) / 1e18) * eth)}`
  //       : `${(Number(cost) / 1e18).toFixed(6)} Ξ`;
  //   };

  return (
    // <Table className="min-w-[950px] [&_td]:py-1">
    //   <TableHeader className="sticky top-0">
    //     <TableRow>
    //       <TableHead>USD</TableHead>
    //       <TableHead>Time</TableHead>
    //       <TableHead>Quantity</TableHead>
    //       <TableHead>Address</TableHead>
    //     </TableRow>
    //   </TableHeader>
    //   <TableBody>
    //     {trades.map((trade, i) => {
    //       //          const tradeCost: string = calculateTradeCost(trade.usd);

    //       return (
    //         <ColoredRow isBuy={trade.isBuy} key={i}>
    //           <TableCell>
    //             <a
    //               href={`https://basescan.org/tx/${trade.hash}`}
    //               target="_blank"
    //               rel="noopener noreferrer"
    //               className="underline"
    //             >
    //               {trade.usd}
    //             </a>
    //           </TableCell>
    //           <TableCell suppressHydrationWarning={true}>
    //             {formatDistance(new Date(trade.timestamp * 1000), new Date(), {
    //               addSuffix: true,
    //             })}
    //           </TableCell>

    //           <TableCell>
    //             {trade.isBuy ? "+" : "-"}
    //             {trade.amount}
    //           </TableCell>

    //           <TableCell>{trade.address}</TableCell>
    //         </ColoredRow>
    //       );
    //     })}
    //   </TableBody>
    // </Table>
    <TradeHistory trades={trades} />
  );
}
