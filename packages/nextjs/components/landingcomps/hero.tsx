import React from "react";

const Hero: React.FC = () => {
  return (
    <div className="w-full h-full bg-[url('/assets/croppedlandingbg.png')] pb-[8rem] bg-cover bg-no-repeat lg:pb-[10rem] xl:pb-[20rem] "  >
        {/* <img src="landingbg.png" alt="Background Banner" className="absolute top-[10rem] md:top-20 left-0 w-full h-full object-cover"/> */}
    <div  className="w-[60%]  md:w-[67%] lg:w-3/5 xl:w-3/5" >
        
<div className="w-full py-[1rem] px-[2rem] md:py-[3rem] md:px-[4rem] lg:px-[8rem]">

<div className="flex flex-col items-start space-y-6 w-full">
 
  <p className="font-[Lexend Tera] text-[17.97px]">NORSWAP</p>
  <p className=" font-[Kanit]text-[25px] md:text-[30px] lg:text-[30px]">The Portal to DeFi: Mint</p>
  <p className=" font-[Kanit] text-[11px] md:text-[12px] lg:text-[16px]">All in one decentralized exchange for leveraging diversified funds across ecosystems, with the speed of Fantom Opera</p>

  {/* Border div */}
  <div className="border p-1 w-[70%] rounded-[2rem] xl:p-3 flex  xl:w-[60%]">
    {/* for socials*/}
    <div className="w-3/5"></div>

    
    <button className="w-2/5  bg-[#A259FF] rounded-3xl xl:py-2 xl:px-4">
      Get NRK
    </button>
  </div>
</div>
   
    
</div>
    
    </div>
    </div>
  );
};

export default Hero;
