//import PriceComponent from "./PriceBox";
import { useEffect, useState } from "react";
import LiquidityPositionFooter from './LiquidityPositionFooter'
import PositionSelectToken from "./PositionSelectToken";
import axios from "axios";
import { useAccount } from "wagmi";
import { Liquidity } from "~~/pages/api/liquidity";



export default function LiquidityPositions() {
  const address0 = "0x0000000000000000000000000000000000000000"
  const { address: account, isConnected, isConnecting } = useAccount()
  const [userLiquidity, setUserLiquidity] = useState<Liquidity[]>([])


  useEffect(() => {
    console.log("fetching data ....")
    const getUserLiquidity = async () => {
      const apiUrl = `api/liquidity?address=${account}`;
      try {
        const response = await axios.get(apiUrl);
        const liquidity: Liquidity[] = response.data.userLiquidityValues
        setUserLiquidity(liquidity)
      } catch (error) {
        console.log(error);
      }
    }
    getUserLiquidity()
  }, [isConnected])


  return (
    <div className="flex flex-col  w-full">
      {
        // pairContract === "0x0000000000000000000000000000000000000000" &&
        // userLiquidity.length === 0 && <div className="flex flex-col items-center py-4  " >
        //   <div className=" text-sm  text-center  font-bold " >! YOU HAVEN'T JOINED ANY PAIR YET !</div>
        //   {/* <div className="w-[300px]  text-center  " >Unstake your tokens from farm to see them here.</div> */}
        // </div>
      }
      {/* {userLiquidity.length !== 0 && <> */}

      <div>
        {
          userLiquidity.map((value, key) => {
            return <div key={key}>
              <PositionSelectToken liqudity={value} />
            </div>
          })
        }
      </div>





      {/* </>} */}
    </div>
  );
}
