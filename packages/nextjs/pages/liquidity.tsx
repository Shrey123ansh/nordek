import type { NextPage } from "next";

import { LiquidityBox } from "~~/components/LiquidityBox";

const Liqudity: NextPage = () => {
  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5 mb-32  ">
          <LiquidityBox></LiquidityBox>
        </div>
      </div>
    </>
  );
};

// const Liqudity: NextPage = () => {
//   return (
//     <>
//       <div className="flex my-auto flex-col mx-auto w-[screen] h-[screen] lg:w-[50%] p-8 lg:p-20">
//         <img src="/loadingPage.svg" alt="Loading" className="w-[100%]" />
//         <h1 className="text-xl md:text-2xl lg:text-4xl italic font-bold mx-auto m-8"> Coming Soon.... </h1>
//       </div>
//     </>
//   );
// };

export default Liqudity;
