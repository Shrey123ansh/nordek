import LiquidityHeader from "./LiquidityComponents/LiquidityHeader";
import LiquidityMain from "./LiquidityComponents/LiquidityMain";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import LiquidityPositions from "./LiquidityComponents/LiquidityPositions";
import { useState } from "react";
export const LiquidityBox = () => {
  const [updatePosition, setUpdatePosition] = useState(0)

  const handleUpdate = () => {
    setUpdatePosition(updatePosition + 1)
  }
  return (
    <div className={`p-1   border-2 rounded-2xl  bg-white mt-12 `}>
      <div className={` flex flex-col space-y-4  pt-6 px-4 lg:px-12 lg:w-[500px] w-[300px] rounded-xl bg-gradient-to-r bg-base-300`}>


        <Tabs  >
          <TabList className=" font-bold w-full "  >
            <Tab className="flex flex-1"   >Add Liquidity</Tab>
            <Tab className="flex flex-1" >Your Position</Tab>
          </TabList>


          <TabPanels>
            <TabPanel>
              <LiquidityMain handleUpdate={handleUpdate} ></LiquidityMain>
            </TabPanel>
            <TabPanel>
              <LiquidityPositions updatePosition={updatePosition} ></LiquidityPositions>
            </TabPanel>
          </TabPanels>
        </Tabs>

        <br />
      </div>
    </div>
  );
};
