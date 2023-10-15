import React from "react";
import { useRouter } from "next/router";

const Features: React.FC = () => {
  const router = useRouter();
  const data = [
    {
      icon: "/assets/features1.png",
      title: "Swap Tokens",
      description: "Trade tokens with limit orders at the lowest fees. Turn on Expert Mode to view live charts!",
      route: "/swap",
    },
    {
      icon: "/assets/features3.png",
      title: "Stake NRK",
      description: "Embark on your staking journey with NRK Tokens – Amplify your assets yoday!",
      route: "/stake",
    },
    {
      icon: "/assets/features2.png",
      title: "Manage Liquidity",
      description:
        "Be part of the ecosystem by contributing liquidity to the pool for everyone to swap, and in return, earn fees from your contribution!",
      route: "/liquidity",
    },
  ];

  return (
    <div className="w-full ">
      <div className="flex justify-center items-center h-auto m-[2rem] ">
        <div
          className="w-4/5 px-8 py-20 flex justify-around items-center border border-white border-opacity-20 rounded-2xl bg-gradient-to-br from-transparent to-white opacity-60"
          style={{
            background:
              "var(--Glassmorphism-card, linear-gradient(131deg, rgba(255, 255, 255, 0.10) -2.89%, rgba(255, 255, 255, 0.00) 99.1%))",
          }}
        >
          <div className="w-[95%] flex flex-col justify-between md:flex-row gap-[2rem] xl:w-[85%]">
            {data.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center space-y-2 md:w-1/3 cursor-pointer transform transition-transform duration-200 hover:scale-105"
                onClick={() => router.push(item.route)}
              >
                <img src={item.icon} alt="icon" className="w-[60%] h-[40%]" />
                <h2
                  className="text-center font-bold text-base-content text-lg leading-[30px] font-kanit"
                  style={{
                    fontSize: "20px",
                    fontWeight: 400,
                  }}
                >
                  {item.title}
                </h2>
                <p
                  className="text-center font-semibold text-base-content leading-[20px] font-kanit"
                  style={{
                    fontSize: "14px",
                    fontWeight: 400,
                  }}
                >
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
