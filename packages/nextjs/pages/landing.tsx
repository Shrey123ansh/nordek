import Link from "next/link";
import type { NextPage } from "next";
import Features from "~~/components/landingcomps/features";
import Hero from "~~/components/landingcomps/hero";
import Discover from "~~/components/landingcomps/discover";
import Joinus from "~~/components/landingcomps/joinus";
import Footer from "~~/components/landingcomps/footer";
const Landing: NextPage = () => {
  return (
    <>
      <div className="flex  flex-col w-full">
       <Hero/>
      
   
       <Features/>
       <Discover/>
       <Joinus/>
       <Footer/>
      </div>
    </>
  );
};

export default Landing;
