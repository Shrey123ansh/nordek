import LiquidityHeader from "./LiquidityComponents/LiquidityHeader";
import LiquidityMain from "./LiquidityComponents/LiquidityMain";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import LiquidityPositions from "./LiquidityComponents/LiquidityPositions";
export const LiquidityBox = () => {
  return (
    <div className={`p-6 border-2 rounded-2xl bg-[#E2D4FF]`}>
      <div className={`bg-[#E2D4FF] flex flex-col space-y-4 items-center pt-6 px-12 rounded-xl bg-gradient-to-r bg-base-300`}>
        {/* <div className="">
          <LiquidityHeader></LiquidityHeader>
          <br />
        </div> */}

        <Tabs isFitted>
          <TabList>
            <Tab>+ Supply</Tab>
            <Tab>Positions</Tab>

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
