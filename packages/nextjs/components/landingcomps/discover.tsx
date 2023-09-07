import React from "react";

const Discover: React.FC = () => {
    const dummyData = [
        { name: "Token 1", logo: "/tokenImages/usdc.png" },
        { name: "Token 2", logo: "/tokenImages/usdc.png" },
        { name: "Token 3", logo: "/tokenImages/usdc.png" },
        { name: "Token 4", logo: "/tokenImages/usdc.png" },
        { name: "Token 5", logo: "/tokenImages/usdc.png" },
        { name: "Token 6", logo: "/tokenImages/usdc.png" },
        { name: "Token 7", logo: "/tokenImages/usdc.png" },
        { name: "Token 8", logo: "/tokenImages/usdc.png" },
        { name: "Token 9", logo: "/tokenImages/usdc.png" },
        { name: "Token 10", logo: "/tokenImages/usdc.png" },
        { name: "Token 11", logo: "/tokenImages/usdc.png" },
        { name: "Token 12", logo: "/tokenImages/usdc.png" },
        { name: "Token 13", logo: "/tokenImages/usdc.png" },
        { name: "Token 14", logo: "/tokenImages/usdc.png" },
        { name: "Token 15", logo: "/tokenImages/usdc.png" },
        { name: "Token 16", logo: "/tokenImages/usdc.png" },
        { name: "Token 17", logo: "/tokenImages/usdc.png" },
        { name: "Token 18", logo: "/tokenImages/usdc.png" },
      
      ];
  return (
    <div className="w-full ">
    <div className="bg-gradient-to-r from-[rgba(143,54,255,0.42)] to-[rgba(50,1,112,0.42)] opacity-33 flex flex-col items-center py-12 w-full px-[12rem]">
        <div className="text-center mb-8">
            <h1 className="text-white font-normal text-[25px] leading-[48px] tracking-[.3em] font-kanit mb-2">THE HUB TO DISCOVER FANTOM OPERA</h1>
            <p className="text-white font-normal text-base leading-[24px] font-kanit">Load up on the latest and popular tokens!</p>
        </div>
        {[8, 7, 6].map((itemsPerRow, index) => (
            <div key={index} className={`flex justify-between mb-8 ${itemsPerRow === 8 ? 'flex-row space-x-3' : itemsPerRow === 7 ? 'space-x-4' : 'space-x-5'} md:space-x-3`}>
                {dummyData.slice(itemsPerRow * index, itemsPerRow * index + itemsPerRow).map((item, idx) => (
                    <div key={idx} className="text-center">
                        <img src={item.logo} alt="Logo" className="mx-auto w-[40px] h-[40px] object-contain" />
                        <p className="text-white mt-2 text-[13px]">{item.name}</p>
                    </div>
                ))}
            </div>
        ))}
    </div>
</div>
  );
};

export default Discover;
