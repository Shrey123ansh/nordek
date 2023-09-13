import Link from "next/link";
import type { NextPage } from "next";
import Discover from "~~/components/landingcomps/discover";
import Features from "~~/components/landingcomps/features";
import Footer from "~~/components/landingcomps/footer";
import Hero from "~~/components/landingcomps/hero";
import Joinus from "~~/components/landingcomps/joinus";

const Home: NextPage = () => {
  return (
    <>
      <div className="flex flex-col w-full">
        <Hero />

        <Features />
        <Discover />
        <Joinus />
        <Footer />
      </div>
    </>
  );
};

export default Home;
