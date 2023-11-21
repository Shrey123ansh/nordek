import LiquidityHeader from "./LiquidityComponents/LiquidityHeader";
import LiquidityMain from "./LiquidityComponents/LiquidityMain";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import LiquidityPositions from "./LiquidityComponents/LiquidityPositions";
export const LiquidityBox = () => {
  return (
    <div className={`p-4 border-2 rounded-2xl bg-[#E2D4FF] mt-12 `}>
      <div className={`bg-[#E2D4FF] flex flex-col space-y-4  pt-6 px-12 w-[500px] rounded-xl bg-gradient-to-r bg-base-300`}>
        {/* <div className="">
          <LiquidityHeader></LiquidityHeader>
          <br />
        </div> */}

        <Tabs  >
          <TabList className=" font-bold w-full "  >
            <Tab className="flex flex-1"   >Add Liquidity</Tab>
            <Tab className="flex flex-1" >Your Positions</Tab>
          </TabList>


          <TabPanels>
            <TabPanel>
              <LiquidityMain></LiquidityMain>
            </TabPanel>
            <TabPanel>
              <LiquidityPositions></LiquidityPositions>
            </TabPanel>
          </TabPanels>
        </Tabs>

        <br />
      </div>
    </div>
  );
};
