import React from "react";
import type { ReactElement } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
//import type { Prisma } from "@prisma/client";
import { formatDistance } from "date-fns";
import { trades } from "~~/data/data";

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

export default function TradeTable() {
  //const { eth, currency } = Global.useContainer();
  //   const calculateTradeCost = (cost: number): string => {
  //     // Calculate trade cost
  //     return currency === Currency.USD
  //       ? `$${parseUSD((Number(cost) / 1e18) * eth)}`
  //       : `${(Number(cost) / 1e18).toFixed(6)} Ξ`;
  //   };

  return (
    <Table className="min-w-[950px] [&_td]:py-1">
      <TableHeader className="sticky top-0">
        <TableRow>
          <TableHead>USD</TableHead>
          <TableHead>Time</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Address</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {trades.map((trade, i) => {
          //          const tradeCost: string = calculateTradeCost(trade.usd);

          return (
            <ColoredRow isBuy={trade.isBuy} key={i}>
              <TableCell>
                <a
                  href={`https://basescan.org/tx/${trade.hash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  {trade.usd}
                </a>
              </TableCell>
              <TableCell suppressHydrationWarning={true}>
                {formatDistance(new Date(trade.timestamp * 1000), new Date(), {
                  addSuffix: true,
                })}
              </TableCell>

              <TableCell>
                {trade.isBuy ? "+" : "-"}
                {trade.amount}
              </TableCell>

              <TableCell>{trade.address}</TableCell>
            </ColoredRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
