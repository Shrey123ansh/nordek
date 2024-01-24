import React from "react";
import Socials from "./socials";
const Footer: React.FC = () => {

    return (
        <div className="w-full  flex justify-center py-[2rem]" style={{ background: 'var(--grad, linear-gradient(94deg, #2D124F 4.53%, #1B013B 105%))' }}>
            <div className="w-2/3 flex flex-col justify-between  md:flex-row  ">

                <div className="flex flex-col w-[25%] justify-between">
                    <div className="flex flex-row gap-2">
                        <img src="logo.svg" alt="" className="w-[10%]" />
                        <p className="text-[15px]">NorSwap</p>
                    </div>
                    <div className="border-t-[1px] border-b-[1px] py-2">
<Socials/>
                    </div>
                </div>
                <div className="flex flex-col">
                    <p className="font-bold mb-4 text-[13px]">Community</p>
                    <ul className="space-y-2 text-[12px]">
                        <li>Discord</li>
                        <li>Twitter</li>
                        <li>Telegram</li>
                    </ul>

                </div>
                <div className="flex flex-col">
                    <p className="font-bold mb-4 text-[13px]">Tools</p>
                    <ul className="space-y-2 text-[12px]">
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
                    <p className="font-bold mb-4 text-[13px]">Info</p>
                    <ul className="space-y-2 text-[12px]">
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
                    <p className="font-bold mb-4 text-[13px]">Participate</p>
                    <ul className="space-y-2 text-[12px]">
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
    );
};

export default Footer;
