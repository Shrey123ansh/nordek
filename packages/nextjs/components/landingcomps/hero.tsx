import React from "react";
import { useRouter } from "next/router";

const Hero: React.FC = () => {
  const router = useRouter();

  return (
    <div className="w-full h-full bg-[url('/assets/croppedlandingbg.png')] pb-[8rem] bg-cover bg-no-repeat lg:pb-[10rem] xl:pb-[20rem] ">
      {/* <img src="landingbg.png" alt="Background Banner" className="absolute top-[10rem] md:top-20 left-0 w-full h-full object-cover"/> */}
      <div className="w-[60%]  md:w-[67%] lg:w-3/5 xl:w-3/5">
        <div className="w-full py-[1rem] px-[2rem] md:py-[3rem] md:px-[4rem] lg:px-[8rem]">
          <div className="flex flex-col items-start space-y-4 w-full">
            <p className="font-[LexendTera] text-[27.97px] heroText font-bold">NORSWAP</p>
            <p className=" font-[Kanit]text-[25px] md:text-[30px] lg:text-[40px] font-[500]">
              The Portal to DeFi: Mint
            </p>
            <p className=" font-[Kanit] text-[13px] md:text-[16px] lg:text-[20px] ">
              All in one decentralized exchange for leveraging diversified funds across ecosystems, with the speed of
              Fantom Opera
            </p>

            {/* Border div */}
            <div className=" p-0 w-[70%] rounded-[2rem] xl:p-0 flex  xl:w-[40%] " onClick={() => router.push("/stake")}>
              <button className="w-full  bg-secondary heroShades rounded-3xl xl:py-2 xl:px-4 text-white lg:mt-[2.5em]">
                Stake NRK
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
