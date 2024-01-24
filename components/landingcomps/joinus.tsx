import React from "react";
import Socials from "./socials";

const Joinus: React.FC = () => {
  return (
    <div className="w-full ">
      <div className="flex justify-center items-center h-auto m-[2rem] ">
        <div
          className="w-4/5 px-8 py-6 flex justify-around items-center border border-white border-opacity-20 rounded-2xl bg-gradient-to-br from-transparent to-white opacity-60"
          style={{
            background:
              "var(--Glassmorphism-card, linear-gradient(131deg, rgba(255, 255, 255, 0.10) -2.89%, rgba(255, 255, 255, 0.00) 99.1%))",
          }}
        >
          <div className="w-1/2 flex flex-col  items-center justify-around ">
            <button className="rounded-xl bg-white border-[#31415E]  text-[#31415E] w-[30%] border-2 ">Join Us</button>
            <button className="rounded-xl bg-white border-[#31415E]  text-[#31415E] w-[30%] border-2 mt-[2rem]">
              Get NRK
            </button>
            <div className="w-30% mt-[2.5rem]">
              <Socials />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Joinus;
