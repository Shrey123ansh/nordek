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
function TradeHistory({ trades }: any) {
  return (
    <div className="bg-purple-100 flex-grow overflow-y-auto">
      <h2 className="text-lg p-3 text-purple-600 bg-purple-100">Trade History</h2>

      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-purple-200">
          <tr>
            <th className="px-6 py-3 text-left text-md font-large text-purple-600 tracking-wider">USD</th>
            <th className="px-6 py-3 text-left text-md font-large text-purple-600 tracking-wider">Amount</th>
            <th className="px-6 py-3 text-left text-md font-large text-purple-600 tracking-wider">Time</th>
          </tr>
        </thead>
      </table>

      <div className="overflow-y-auto scrollbar-hide" style={{ maxHeight: "300px" }}>
        <table className="min-w-full divide-y divide-gray-200">
          <tbody className="bg-white">
            {/* @ts-ignore */}
            {trades.map((trade, idx) => (
              <React.Fragment key={idx}>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-purple-600">{trade.usd}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-purple-600">
                    <div>
                      {trade.boughtToken} {trade.boughtTokenAmount}
                    </div>
                    <div>
                      {trade.soldToken} {trade.soldTokenAmount}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-purple-600">{formatTimeAgo(trade.time)}</td>
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
    return `${elapsedMinutes} ${elapsedMinutes === 1 ? "m" : "m"} ago`;
  } else if (elapsedHours < 24) {
    const remainingMinutes = elapsedMinutes % 60;
    return `${elapsedHours} ${elapsedHours === 1 ? "h" : "h"} ${remainingMinutes} ${
      remainingMinutes === 1 ? "minute" : "minutes"
    } ago`;
  } else {
    return `${elapsedDays} ${elapsedDays === 1 ? "d" : "d"} ago`;
  }
}
export default function TradeTable({ trades }: any) {
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
