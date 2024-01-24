//import Card from "../Card";
import dynamic from "next/dynamic";
import { Card, LineChart, Title } from "@tremor/react";
//import { Global, StateUser } from "~~/state/global";
import { renderTimeSince } from "~~/utils/time";
import { usePollData } from "~~/utils/usePollData";

const AdvancedRealTimeChart = dynamic(
  () => import("react-ts-tradingview-widgets").then(mod => mod.AdvancedRealTimeChart),
  { ssr: false },
);

export default function Chart() {
  const user = {
    address: "0x00",
    username: "xenox",
  };
  // Token address
  //const { user }: { user: StateUser } = Global.useContainer();
  // Data
  const AdvancedRealTimeChart = dynamic(
    () => import("react-ts-tradingview-widgets").then(mod => mod.AdvancedRealTimeChart),
    { ssr: false },
  );

  const lastChecked = 10;
  const data = [
    {
      year: 1970,
      "Export Growth Rate": 2.04,
      "Import Growth Rate": 1.53,
    },
    {
      year: 1971,
      "Export Growth Rate": 1.96,
      "Import Growth Rate": 1.58,
    },
    {
      year: 1972,
      "Export Growth Rate": 1.96,
      "Import Growth Rate": 1.61,
    },
    {
      year: 1973,
      "Export Growth Rate": 1.93,
      "Import Growth Rate": 1.61,
    },
    {
      year: 1974,
      "Export Growth Rate": 1.88,
      "Import Growth Rate": 1.67,
    },
    //...
  ];
  //   const { data, lastChecked } = usePollData<{ timestamp: number; "Price (ETH)": number }[]>(
  //     `/api/token/chart?address=${user.address}`,
  //     [],
  //     15 * 1000,
  //   );
  const dataFormatter = (number: number) => `${Intl.NumberFormat("us").format(number).toString()}%`;
  return (
    <Card className="h-full p-0">
      {/* updated={`${user.username ? `@${user.username}` : user.address}, ${renderTimeSince(lastChecked)} ago`} */}

      {/* <div className="w-full h-full p-4">
        <LineChart
          className="h-full"
          data={data}
          index="year"
          categories={["Export Growth Rate", "Import Growth Rate"]}
          colors={["emerald", "gray"]}
          valueFormatter={dataFormatter}
          yAxisWidth={40}
        />
      </div> */}
      <div className="hidden lg:block flex-1 h-full w-full p-0">
        <AdvancedRealTimeChart symbol={"ETH/USD"} theme="dark" autosize />
      </div>
    </Card>
  );
}
