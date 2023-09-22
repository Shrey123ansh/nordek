import React, { useCallback, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { FaucetButton, RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";
import { useOutsideClick } from "~~/hooks/scaffold-eth";

const NavLink = ({
  href,
  children,
  toggleDrawer,
}: {
  href: string;
  children: React.ReactNode;
  toggleDrawer: () => void;
}) => {
  const router = useRouter();
  const isActive = router.pathname === href;

  return (
    <Link
      href={href}
      passHref
      className={`${
        isActive ? "bg-accent shadow-md text-white" : ""
      } hover:bg-accent hover:shadow-md hover:text-white focus:bg-accent py-1.5 px-6 lg:text-sm lg:font-normal text-2xl font-bold space-x-2 rounded-none m-0 h-full text-center  flex items-center justify-center`}
      onClick={toggleDrawer}
    >
      {children}
    </Link>
  );
};

/**
 * Site header
 */
export const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const burgerMenuRef = useRef<HTMLDivElement>(null);

  useOutsideClick(
    burgerMenuRef,
    useCallback(() => setIsDrawerOpen(false), []),
  );

  const toggleDrawer = () => {
    setIsDrawerOpen(prevState => !prevState);
  };

  const navLinks = (
    <>
      <NavLink href="/" toggleDrawer={toggleDrawer}>
        Home
      </NavLink>
      <NavLink href="/swap" toggleDrawer={toggleDrawer}>
        Swap
      </NavLink>
      <NavLink href="/liquidity" toggleDrawer={toggleDrawer}>
        Liquidity
      </NavLink>
      <NavLink href="/stake" toggleDrawer={toggleDrawer}>
        Stake
      </NavLink>
    </>
  );

  return (
    <div className="sticky lg:static top-0 navbar bg-base-100 min-h-0 flex-shrink-0 justify-between z-20 shadow-md shadow-secondary p-0">
      <div className="navbar-start w-auto lg:w-1/2 py-0">
        <div className="flex items-center space-x-2 ml-4 mr-6">
          <Link href="/" passHref className="flex items-center space-x-2">
            <div className="flex relative w-8 h-10">
              <Image alt="SE2 logo" className="cursor-pointer fill-black" fill src="/icon.svg" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold">NORSWAP</span>
            </div>
          </Link>
        </div>

        {/* {isDrawerOpen ? (
  <div className="fixed inset-0 bg-blue-500 h-screen flex flex-col justify-center items-center z-30">
    
    <div className="space-y-4 text-white">
      
      {navLinks}
    </div>
  </div>
):(
  <div className="lg:flex sm:hidden">{navLinks}</div>
)} */}

        {isDrawerOpen && (
          <div
            className={`block h-full top-0 fixed z-10 flex flex-col bg-base-200 lg:hidden md:w-1/2 w-full right-0 p-12`}
          >
            <div className="flex items-center justify-between space-x-2 mb-8">
              <div className="flex">
                <Link href="/" passHref className="flex items-center space-x-2">
                  <div className="flex relative w-8 h-10">
                    <Image alt="SE2 logo" className="cursor-pointer" fill src="/icon.svg" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold">NORSWAP</span>
                  </div>
                </Link>
              </div>
              <button onClick={toggleDrawer}>
                <XMarkIcon className="w-8 h-8 text-white" />
              </button>
            </div>
            <div className="flex flex-col justify-between h-full space-y-8 p-y-12">
              {navLinks}
              <div className="flex mx-auto">
                <RainbowKitCustomConnectButton />
              </div>
            </div>
          </div>
        )}
        <div className="lg:flex hidden lg:flex">{navLinks}</div>
      </div>

      <div className="lg:hidden navbar-end flex-grow mr-4 my-2 ">
        {/* Hamburger icon for mobile */}
        <button className="p-2 focus:outline-none" onClick={toggleDrawer} aria-label="Toggle Navigation">
          <Bars3Icon className="w-6 h-6 text-white" />
        </button>
      </div>

      <div className="navbar-end flex-grow mr-4 my-2 hidden lg:flex">
        <RainbowKitCustomConnectButton />
        <FaucetButton />
      </div>
    </div>
  );
};
