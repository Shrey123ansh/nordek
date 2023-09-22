import { formatEther } from "viem";
import { TransactionHash } from "~~/components/blockexplorer/TransactionHash";
import { Address } from "~~/components/scaffold-eth";
import { TransactionWithFunction, getTargetNetwork } from "~~/utils/scaffold-eth";
import { unixTimestampToDate } from "~~/utils/time";

type TransactionsTableProps = {};

export const TransactionsTable = ({ transactions, isLoading }: any) => {
  const targetNetwork = getTargetNetwork();

  return (
    <div className="flex justify-center px-4 md:px-0">
      <div className="overflow-x-auto w-full shadow-2xl rounded-xl">
        <table className="table text-xl bg-base-100 table-zebra w-full md:table-md table-sm">
          <thead>
            <tr className="rounded-xl text-sm text-white">
              <th className="bg-primary">Transaction Hash</th>
              <th className="bg-primary">Function Called</th>
              <th className="bg-primary">Block Number</th>
              <th className="bg-primary">Time Mined</th>
              <th className="bg-primary">From</th>
              <th className="bg-primary">To</th>
              <th className="bg-primary text-end">Value ({targetNetwork.nativeCurrency.symbol})</th>
            </tr>
          </thead>
          {isLoading ? (
            <tbody>
              {[...Array(20)].map((_, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="bg-base-200 hover:bg-base-300 transition-colors duration-200 h-12 text-sm"
                >
                  {[...Array(7)].map((_, colIndex) => (
                    <td className="w-1/12 md:py-4" key={colIndex}>
                      <div className="h-2 bg-gray-200 rounded-full animate-pulse"></div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          ) : (
            <tbody>
              {transactions.map(tx => {
                return (
                  <tr key={tx.hash} className="hover text-sm">
                    <td className="w-1/12 md:py-4">
                      <TransactionHash hash={tx.hash} />
                    </td>
                    <td className="w-2/12 md:py-4">
                      {tx.input === "0x" ? (
                        ""
                      ) : (
                        <span className="badge badge-primary font-bold text-xs text-white">
                          {tx.functionName || tx.input.slice(0, 8) || ""}
                        </span>
                      )}
                      {/* {functionCalled !== "0x" && (
                        <span className="badge badge-primary font-bold text-xs">{functionCalled}</span>
                      )} */}
                    </td>
                    <td className="w-1/12 md:py-4">{tx.blockNumber?.toString()}</td>
                    <td className="w-2/1 md:py-4">{unixTimestampToDate(tx.timeStamp)}</td>
                    <td className="w-2/12 md:py-4">
                      <Address address={tx.from} size="sm" />
                    </td>
                    <td className="w-2/12 md:py-4">
                      <div className="relative">
                        <Address address={tx.to} size="sm" />
                      </div>
                    </td>
                    <td className="text-right md:py-4">
                      {formatEther(tx.value)} {targetNetwork.nativeCurrency.symbol}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
};
