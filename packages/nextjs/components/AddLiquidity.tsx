import { useEffect, useState } from "react";
import { parseEther } from "viem";
import { useAccount } from "wagmi";
import { localTokens } from "~~/data/data.js";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

export default function Addliquidity() {
  const tokens = localTokens
  const { address } = useAccount();
  const [tokenAmount0, setTokenAmount0] = useState("");
  const [tokenAmount1, setTokenAmount1] = useState("");
  const [tokenAddr0, setTokenAddr0] = useState(tokens[0].address);
  const [tokenAddr1, setTokenAddr1] = useState(tokens[1].address);

  // const { writeAsync, isLoading } = useScaffoldContractWrite({
  //   contractName: "ZuniswapV2Router",
  //   functionName: "addLiquidity",
  //   args: [
  //     tokenAddr0,
  //     tokenAddr1,
  //     parseEther(tokenAmount0),
  //     parseEther(tokenAmount1),
  //     parseEther(tokenAmount0),
  //     parseEther(tokenAmount1),
  //     address,
  //   ],
  //   onBlockConfirmation: txnReceipt => {
  //     console.log("📦 Transaction blockHash", txnReceipt.blockHash);
  //   },
  // });

  // useEffect(() => {
  //   console.log("tokenAddr0", tokenAddr0);
  //   console.log("tokenAddr1", tokenAddr1);
  // }, [tokenAddr0, tokenAddr1]);

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // writeAsync();
  };

  return (
    <div className="p-12 rounded-lg flex flex-col space-y-4 items-center bg-blue-800 h-auto">
      <div className="flex justify-between mb-6 items-center w-full">
        <h2 className="font-bold justify-self-start"> Add Liquidity </h2>
      </div>

      <form className="flex flex-col space-y-4 text-purple" onSubmit={handleSubmit}>
        <div className="flex space-x-2">
          <input
            placeholder="Token 1 Amount"
            className="rounded-md px-4 py-2 text-black"
            onChange={e => {
              setTokenAmount0(e.target.value);
            }}
          />
          <select
            name="token0"
            id="token0"
            className="rounded-lg text-gray-700 font-medium p-2"
            onChange={e => setTokenAddr0(e.target.value)}
          >
            {tokens.map(token => (
              <option key={token.address} value={token.address}>
                {token.symbol}
              </option>
            ))}
          </select>
        </div>
        <div className="flex space-x-2">
          <input
            placeholder="Token 1 Amount"
            className="rounded-md px-4 py-2 text-black"
            onChange={e => {
              setTokenAmount1(e.target.value);
            }}
          />
          <select
            name="token1"
            id="token1"
            className="rounded-lg text-gray-700 font-medium p-2"
            onChange={e => setTokenAddr1(e.target.value)}
          >
            {tokens.map(token => (
              <option key={token.address} value={token.address}>
                {token.symbol}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="bg-red-400 rounded-lg px-4 py-2 font-bold">
          {" "}
          Swap{" "}
        </button>
      </form>
    </div>
  );
}
