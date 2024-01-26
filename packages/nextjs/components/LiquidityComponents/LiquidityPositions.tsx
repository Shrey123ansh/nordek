//import PriceComponent from "./PriceBox";
import { useEffect, useState } from "react";
import PositionSelectToken from "./PositionSelectToken";
import axios from "axios";
import { useAccount } from "wagmi";
import { Liquidity } from "~~/pages/api/liquidity";

export default function LiquidityPositions({ updatePosition }: { updatePosition: Number }) {
  const address0 = "0x0000000000000000000000000000000000000000";
  const { address: account, isConnected, isConnecting } = useAccount();
  const [userLiquidity, setUserLiquidity] = useState<Liquidity[]>([]);
  const [onRemove, setOnRemove] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getUserLiquidity = async () => {
    setIsLoading(true);
    const apiUrl = `api/liquidity?address=${account}`;
    try {
      const response = await axios.get(apiUrl);
      const liquidity: Liquidity[] = response.data.userLiquidityaValues;
      console.log(liquidity);
      setUserLiquidity(liquidity);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log("fetching data ....");
    if (account) {
      getUserLiquidity();
    }
  }, [isConnected, onRemove, updatePosition, account]);

  return (
    <div className="flex flex-col  w-full">
      {userLiquidity.length === 0 && (
        <div className="flex flex-col items-center py-4  ">
          <div className=" text-sm  text-center  font-bold ">! YOU HAVEN'T JOINED ANY PAIR YET !</div>
          {/* <div className="w-[300px]  text-center  " >Unstake your tokens from farm to see them here.</div> */}
        </div>
      )}
      {isLoading ? (
        <div className="flex flex-col items-center py-4  ">
          <div className=" text-sm  text-center  font-bold ">Loading...</div>
        </div>
      ) : (
        userLiquidity.length !== 0 && (
          <>
            <div>
              {userLiquidity.map((value, key) => {
                console.log("fetched");
                return (
                  <div key={key}>
                    <PositionSelectToken liqudity={value} updateOnRemove={setOnRemove} onRemove={onRemove} />
                  </div>
                );
              })}
            </div>
          </>
        )
      )}
    </div>
  );
}
