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
{
  /* @ts-ignore */
}
function TradeHistory({ trades, tableHead }: any) {
  return (
    <div className="bg-white flex-grow overflow-y-auto">
      <div className="text-md p-2 text-white-600 bg-[#5F29A5] text-center">{tableHead}</div>

      <div className="">
        <table className="min-w-full divide-y divide-gray-200 text-sm px-4">
          <thead className="bg-white">
            <tr>
              <th className="px-5 py-1 text-center text-md text-purple-600 tracking-wider border-b border-[#642EFF] border-t">
                USD
              </th>
              <th className="px-5 py-1 text-center text-md text-purple-600 tracking-wider border-b border-[#642EFF] border-t">
                Amount
              </th>
              <th className="px-5 py-1 text-center text-md text-purple-600 tracking-wider border-b border-[#642EFF] border-t">
                Time
              </th>
            </tr>
          </thead>
          <tbody className="bg-white overflow-y-auto scrollbar-hide max-h-96 flex-grow">
            {/* @ts-ignore */}
            {trades.map((trade, idx) => (
              <React.Fragment key={idx}>
                <tr className="text-center space-x-8 px-4">
                  <td className="whitespace-nowrap text-purple-600">{trade.usd}</td>
                  <td className="whitespace-nowrap text-black font-light">
                    <div>
                      {trade.boughtTokenAmount} {"NRK"}
                    </div>
                    <div>
                      {trade.soldTokenAmount} {"NUSD"}
                    </div>
                  </td>
                  <td className="whitespace-nowrap text-black font-light text-right text-xs pr-4">
                    {formatTimeAgo(trade.time)}
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
function formatTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const elapsedMilliseconds = now.getTime() - date.getTime();
  const elapsedMinutes = Math.floor(elapsedMilliseconds / 60000); // 1 minute = 60000 milliseconds
  const elapsedHours = Math.floor(elapsedMinutes / 60); // 1 hour = 60 minutes
  const elapsedDays = Math.floor(elapsedHours / 24); // 1 day = 24 hours

  if (elapsedMinutes < 1) {
    return "just now";
  } else if (elapsedMinutes < 60) {
    return `${elapsedMinutes}${elapsedMinutes === 1 ? "m" : "m"} ago`;
  } else if (elapsedHours < 24) {
    const remainingMinutes = elapsedMinutes % 60;
    return `${elapsedHours}${elapsedHours === 1 ? "h" : "h"} ago`;
  } else {
    return `${elapsedDays}${elapsedDays === 1 ? "d" : "d"} ago`;
  }
}
export default function TradeTable({ trades, tableHead }: any) {
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
    <TradeHistory trades={trades} tableHead={tableHead} />
  );
}
