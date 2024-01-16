import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Discover from "~~/components/landingcomps/discover";
import Features from "~~/components/landingcomps/features";
import Footer from "~~/components/landingcomps/footer";
import Hero from "~~/components/landingcomps/hero";
import Joinus from "~~/components/landingcomps/joinus";

const Home: NextPage = () => {
  const router = useRouter()

  useEffect(() => {

    if (router.pathname === '/') {

      router.replace('/swap');
    }
  }, [router.pathname]);

  return (
    <>
      <div className="flex flex-col w-full">
        <Hero />
        <Features />
      </div>
    </>
  );
};

export default Home;
