import React from "react";

interface RPCComponentProps {
  connected: boolean;
  rpcName: string;
  rpcLink: string;
}

const RPCComponent: React.FC<RPCComponentProps> = ({ connected, rpcName, rpcLink }) => {
  return (
    <div className="mt-4 mb-4">
      <h1 className="mb-4 font-medium ">RPC</h1>
      <div className="flex items-center py-4 px-2 justify-between border rounded-md">
        <div className="mr-20">
          <span className={connected ? "text-green-500" : "text-red-500"}>{connected ? "✔️" : "❌"}</span>
          <label className="ml-2">{rpcName}</label>
        </div>
        <span className="ml-20 font-medium ">{rpcLink}</span>
      </div>
    </div>
  );
};

export default RPCComponent;
