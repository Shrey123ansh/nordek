import Socials from "./landingcomps/socials";
import { HeartIcon } from "@heroicons/react/24/outline";
import { SwitchTheme } from "~~/components/SwitchTheme";

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
        <div
          className="w-full  flex justify-center py-[2rem]"
          style={{ background: "var(--grad, linear-gradient(180deg, #000 0%, #000 100%))" }}
        >
          <div className="w-[90%] flex flex-col justify-between  md:flex-row  ">
            <div className="flex flex-col w-[25%] gap-2">
              <div className="flex flex-row gap-2">
                <img src="/icon.svg" alt="" className="w-[20%]" />
                <p className="text-[25px] font-[LexendTera]">NORDEK</p>
              </div>
              <div className="border-t-[1px] border-[#A259FF8F] py-2 ">
                <Socials />
              </div>
            </div>
            <div className="flex flex-col">
              <p className="font-bold mb-4 text-[14px]  uppercase text-[#A259FF]">Products</p>
              <ul className="space-y-2 text-[14px] ">
                <li>
                  <a href="https://norpay.io/">Norpay</a>
                </li>
                <li>
                  <a href="https://norswap.io/">Norswap</a>
                </li>
                <li>
                  <a href="https://norflix.io/">Norflix</a>
                </li>
              </ul>
            </div>
            <div className="flex flex-col">
              <p className="font-bold mb-4 text-[14px]  uppercase text-[#A259FF]">About</p>
              <ul className="space-y-2 text-[14px] ">
                <li>
                  <a href="https://uploads-ssl.webflow.com/64257cf27c31852a08e9fb9d/64e8aa72431f87034e2270c1_NORDEK%20WHITEPAPER.pdf">
                    WhitePaper
                  </a>
                </li>
                <li>
                  <a href="https://nordekscan.com/">Nordek Mainnet</a>
                </li>
                <li>
                  <a href="https://www.swapperly.io/">Stake $NRK</a>
                </li>
                <li>
                  <a href="http://blog.nordek.io/">Blog</a>
                </li>
                <li>
                  <a href="https://www.nordek.io/#our-team">Team</a>
                </li>
                <li>
                  <a href="https://www.nordek.io/#token-NRK">Buy $NRK</a>
                </li>{" "}
                <li>
                  <a href="https://outlook.office.com/mail/deeplink/compose?mailtouri=mailto%3Ainfo%40nordek.io%3Fsubject%3DNew%2520Mail">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div className="flex flex-col">
              <p className="font-bold mb-4 text-[14px]  uppercase text-[#A259FF]">Build Ecosystem</p>
              <ul className="space-y-2 text-[14px] ">
                <li>
                  <a href="https://plutopad.com/">Launchpad</a>
                </li>
                <li>
                  <a href="https://s2z8lugt86o.typeform.com/to/B2GydRKY">Technology</a>
                </li>
                <li>
                  <a href="https://docs.nordekscan.com/">Developer Docs</a>
                </li>
                <li>
                  <a href="https://s2z8lugt86o.typeform.com/to/T6cmzG3i">Get in Touch</a>
                </li>
              </ul>
            </div>
            <div className="flex flex-col">
              <p className="font-bold mb-4 text-[14px]  uppercase text-[#A259FF]">Media</p>
              <ul className="space-y-2 text-[14px] ">
                <li>
                  <a href="https://www.nordek.io/media-kit">Media Kit</a>
                </li>
                <li>
                  <a href="https://www.nordek.io/nordek-terms-and-conditions">Terms & Conditions</a>
                </li>
                <li>
                  <a href="https://www.nordek.io/privacy-policy">Privacy Policy</a>
                </li>
                <li>
                  <a href="https://www.nordek.io/cookies-policy">Cookie Policy</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
