import Socials from "./landingcomps/socials";
import { HeartIcon } from "@heroicons/react/24/outline";
import { SwitchTheme } from "~~/components/SwitchTheme";
import Socials from "./landingcomps/socials";

/**
 * Site footer
 */
export const Footer = () => {
  return (
    <div className="min-h-0 p-0 mb-11 lg:mb-0 text-white">
      <div>
        <div className="fixed flex justify-between items-center w-full z-10 p-4 bottom-0 left-0 pointer-events-none">
          <SwitchTheme className="pointer-events-auto" />
        </div>
      </div>
      <div className="w-full">
      <div className="w-full  flex justify-center py-[2rem]" style={{ background: 'var(--grad, linear-gradient(180deg, #000 0%, #000 100%))' }}>
            <div className="w-[90%] flex flex-col justify-between  md:flex-row  ">

                <div className="flex flex-col w-[25%] gap-2">
                    <div className="flex flex-row gap-2">
                        <img src="/icon.svg" alt="" className="w-[20%]" />
                        <p className="text-[25px] font-[LexendTera]">NORSWAP</p>
                    </div>
                    <div className="border-t-[1px] border-[#A259FF8F] py-2 ">
<Socials/>
                    </div>
                </div>
                <div className="flex flex-col">
                    <p className="font-bold mb-4 text-[14px]  uppercase text-[#A259FF]">Community</p>
                    <ul className="space-y-2 text-[14px] ">
                        <li>Discord</li>
                        <li>Twitter</li>
                        <li>Telegram</li>
                    </ul>

                </div>
                <div className="flex flex-col">
                    <p className="font-bold mb-4 text-[14px]  uppercase text-[#A259FF]">Tools</p>
                    <ul className="space-y-2 text-[14px] ">
                        <li>Analytics</li>
                        <li>Github</li>
                        <li>Coingecko</li>
                        <li>GeckoTerminal</li>
                        <li>CoinMarketCap</li>
                        <li>TradingView</li>
                        <li>Defi Llama</li>
                        <li>CryptoFees</li>
                    </ul>
                </div>
                <div className="flex flex-col">
                    <p className="font-bold mb-4 text-[14px]  uppercase text-[#A259FF]">Info</p>
                    <ul className="space-y-2 text-[14px] ">
                        <li>News</li>
                        <li>Medium</li>
                        <li>Docs</li>
                        <li>FAQs</li>
                        <li>Help</li>
                        <li>Media Kit</li>
                        <li>Contact Us</li>
                    </ul>
                </div>
                <div className="flex flex-col">
                    <p className="font-bold mb-4 text-[14px]  uppercase text-[#A259FF]">Participate</p>
                    <ul className="space-y-2 text-[14px] ">
                        <li>Vote</li>
                        <li>Forum</li>
                        <li>Apply for Collab</li>
                        <li>Apply for Token Listing</li>
                        <li>Apply for Farm</li>
                        <li>Bug Bounty</li>
                    </ul>
                </div>

            </div>


        </div>
      </div>
    </div>
  );
};
