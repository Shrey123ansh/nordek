import { JSXElementConstructor, MouseEventHandler, ReactElement, ReactFragment, ReactPortal, useState } from "react";
import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { QRCodeSVG } from "qrcode.react";
import CopyToClipboard from "react-copy-to-clipboard";
import { useDisconnect, useSwitchNetwork } from "wagmi";
import {
  ArrowLeftOnRectangleIcon,
  ArrowTopRightOnSquareIcon,
  ArrowsRightLeftIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  DocumentDuplicateIcon,
  QrCodeIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { Address, Balance, BlockieAvatar } from "~~/components/scaffold-eth";
import { useAutoConnect, useNetworkColor } from "~~/hooks/scaffold-eth";
import scaffoldConfig from "~~/scaffold.config";
import { enabledChains } from "~~/services/web3/wagmiConnectors";
import { getBlockExplorerAddressLink, getTargetNetwork } from "~~/utils/scaffold-eth";

/**
 *
 * Custom Wagmi Connect Button (watch balance + custom design)
 */

interface WalletButtonProps {
  buttonText: string;
  onClickFunc: () => void;
}

const WalletButton: React.FC<WalletButtonProps> = ({ buttonText, onClickFunc }) => {
  const buttonStyle = "py-1 px-4 border-3 rounded-full font-bold bg-gray-800";

  return (
    <div className="rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-1">
      <button onClick={onClickFunc} type="button" className={buttonStyle}>
        {buttonText}
      </button>
    </div>
  );
};

export const RainbowKitCustomConnectButton = () => {
  useAutoConnect();
  const networkColor = useNetworkColor();
  const configuredNetwork = getTargetNetwork();
  const { disconnect } = useDisconnect();
  const { switchNetwork } = useSwitchNetwork();
  const [addressCopied, setAddressCopied] = useState(false);

  return (
    <ConnectButton.Custom>
      {({ account, chain, openAccountModal, openChainModal, openConnectModal, authenticationStatus, mounted }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready && account && chain && (!authenticationStatus || authenticationStatus === "authenticated");

        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <WalletButton buttonText="Connect Wallet" onClickFunc={openConnectModal}></WalletButton>
                  // <div className="rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-1">
                  //   <button onClick={openConnectModal} type="button" className={buttonStyle}>
                  //     Connect Wallet
                  //   </button>
                  // </div>
                );
              }
              if (chain.unsupported) {
                return (
                  <WalletButton buttonText="Wrong network" onClickFunc={openChainModal}></WalletButton>
                  // <button onClick={openChainModal} type="button" className={buttonStyle}>
                  //   Wrong network
                  // </button>
                );
              }
              return (
                <div style={{ display: "flex", gap: 12 }} className="font-bold">
                  <button
                    onClick={openChainModal}
                    style={{ display: "flex", alignItems: "center" }}
                    type="button"
                    className="space-x-4"
                  >
                    <span>{account.displayBalance}</span>
                    {chain.hasIcon && (
                      <div
                        style={{
                          background: chain.iconBackground,
                          width: 32,
                          height: 32,
                          borderRadius: 999,
                          overflow: "hidden",
                          marginRight: 4,
                        }}
                      >
                        {chain.iconUrl && (
                          <img alt={chain.name ?? "Chain icon"} src={chain.iconUrl} style={{ width: 32, height: 32 }} />
                        )}
                      </div>
                    )}
                    {chain.name}
                  </button>

                  <WalletButton buttonText={account.displayName} onClickFunc={openAccountModal}></WalletButton>
                  {/* <button onClick={openAccountModal} type="button" className={buttonStyle}>
                    {account.displayName}
                    {account.displayBalance ? ` (${account.displayBalance})` : ""}
                  </button> */}
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};

// return (
//   // <ConnectButton.Custom>
//   //   {({ account, chain, openConnectModal, mounted }) => {
//   //     const connected = mounted && account && chain;
//   //     const blockExplorerAddressLink = account
//   //       ? getBlockExplorerAddressLink(getTargetNetwork(), account.address)
//   //       : undefined;

//   //     return (
//   //       <>
//   //         {(() => {
//   //           if (!connected) {
//   //             return (
//   //               <button className="btn btn-primary btn-sm" onClick={openConnectModal} type="button">
//   //                 Connect Wallet
//   //               </button>
//   //             );
//   //           }

//   //           if (chain.unsupported) {
//   //             return (
//   //               <div className="dropdown dropdown-end">
//   //                 <label tabIndex={0} className="btn btn-error btn-sm dropdown-toggle">
//   //                   <span>Wrong network</span>
//   //                   <ChevronDownIcon className="h-6 w-4 ml-2 sm:ml-0" />
//   //                 </label>
//   //                 <ul
//   //                   tabIndex={0}
//   //                   className="dropdown-content menu p-2 mt-1 shadow-center shadow-accent bg-base-200 rounded-box gap-1"
//   //                 >
//   //                   {enabledChains.map(chain => {
//   //                     return (
//   //                       <li key={chain.id}>
//   //                         <button
//   //                           className="menu-item btn-sm !rounded-xl"
//   //                           type="button"
//   //                           onClick={() => {
//   //                             scaffoldConfig.targetNetwork = chain;
//   //                             switchNetwork?.(chain.id);
//   //                           }}
//   //                         >
//   //                           <ArrowsRightLeftIcon className="h-6 w-4 ml-2 sm:ml-0" />
//   //                           <span className="whitespace-nowrap">
//   //                             Switch to <span style={{ color: networkColor }}>{chain.name}</span>
//   //                           </span>
//   //                         </button>
//   //                       </li>
//   //                     );
//   //                   })}
//   //                   {/*
//   //                   <li>
//   //                     <button
//   //                       className="menu-item btn-sm !rounded-xl"
//   //                       type="button"
//   //                       onClick={() => switchNetwork?.(configuredNetwork.id)}
//   //                     >
//   //                       <ArrowsRightLeftIcon className="h-6 w-4 ml-2 sm:ml-0" />
//   //                       <span className="whitespace-nowrap">
//   //                         Switch to <span style={{ color: networkColor }}>{configuredNetwork.name}</span>
//   //                       </span>
//   //                     </button>
//   //                   </li> */}

//   //                   <li>
//   //                     <button
//   //                       className="menu-item text-error btn-sm !rounded-xl"
//   //                       type="button"
//   //                       onClick={() => disconnect()}
//   //                     >
//   //                       <ArrowLeftOnRectangleIcon className="h-6 w-4 ml-2 sm:ml-0" /> <span>Disconnect</span>
//   //                     </button>
//   //                   </li>
//   //                 </ul>
//   //               </div>
//   //             );
//   //           }

//   //           return (
//   //             <div className="px-2 flex justify-end items-center">
//   //               <div className="flex flex-col items-center mr-1">
//   //                 <Balance address={account.address} className="min-h-0 h-auto" />
//   //                 <span className="text-xs" style={{ color: networkColor }}>
//   //                   {chain.name}
//   //                 </span>
//   //               </div>
//   //               <div className="dropdown dropdown-end">
//   //                 <label tabIndex={0} className="btn btn-secondary btn-sm pl-0 pr-2 shadow-md dropdown-toggle">
//   //                   <BlockieAvatar address={account.address} size={24} ensImage={account.ensAvatar} />
//   //                   <span className="ml-2 mr-1">{account.displayName}</span>
//   //                   <ChevronDownIcon className="h-6 w-4 ml-2 sm:ml-0" />
//   //                 </label>
//   //                 <ul
//   //                   tabIndex={0}
//   //                   className="dropdown-content menu p-2 mt-1 shadow-center shadow-accent bg-base-200 rounded-box gap-1"
//   //                 >
//   //                   {enabledChains.map(chain => {
//   //                     return (
//   //                       <li key={chain.id}>
//   //                         <button
//   //                           className="menu-item btn-sm !rounded-xl"
//   //                           type="button"
//   //                           onClick={() => {
//   //                             scaffoldConfig.targetNetwork = chain;
//   //                             switchNetwork?.(chain.id);
//   //                           }}
//   //                         >
//   //                           <ArrowsRightLeftIcon className="h-6 w-4 ml-2 sm:ml-0" />
//   //                           <span className="whitespace-nowrap">
//   //                             Switch to <span style={{ color: networkColor }}>{chain.name}</span>
//   //                           </span>
//   //                         </button>
//   //                       </li>
//   //                     );
//   //                   })}
//   //                   <li>
//   //                     {addressCopied ? (
//   //                       <div className="btn-sm !rounded-xl">
//   //                         <CheckCircleIcon
//   //                           className=" text-xl font-normal h-6 w-4 cursor-pointer"
//   //                           aria-hidden="true"
//   //                         />
//   //                         <span className=" whitespace-nowrap">Copy address</span>
//   //                       </div>
//   //                     ) : (
//   //                       <CopyToClipboard
//   //                         text={account.address}
//   //                         onCopy={() => {
//   //                           setAddressCopied(true);
//   //                           setTimeout(() => {
//   //                             setAddressCopied(false);
//   //                           }, 800);
//   //                         }}
//   //                       >
//   //                         <div className="btn-sm !rounded-xl">
//   //                           <DocumentDuplicateIcon
//   //                             className=" text-xl font-normal h-6 w-4 cursor-pointer"
//   //                             aria-hidden="true"
//   //                           />
//   //                           <span className=" whitespace-nowrap">Copy address</span>
//   //                         </div>
//   //                       </CopyToClipboard>
//   //                     )}
//   //                   </li>
//   //                   <li>
//   //                     <Link className="menu-item btn-sm !rounded-xl" href="/profile">
//   //                       <UserCircleIcon className="h-6 w-4 ml-2 sm:ml-0" /> <span>Profile</span>
//   //                     </Link>
//   //                   </li>

//   //                   <li>
//   //                     <label htmlFor="qrcode-modal" className="btn-sm !rounded-xl">
//   //                       <QrCodeIcon className="h-6 w-4 ml-2 sm:ml-0" />
//   //                       <span className="whitespace-nowrap">View QR Code</span>
//   //                     </label>
//   //                   </li>
//   //                   <li>
//   //                     <button className="menu-item btn-sm !rounded-xl" type="button">
//   //                       <ArrowTopRightOnSquareIcon className="h-6 w-4 ml-2 sm:ml-0" />
//   //                       <a
//   //                         target="_blank"
//   //                         href={blockExplorerAddressLink}
//   //                         rel="noopener noreferrer"
//   //                         className="whitespace-nowrap"
//   //                       >
//   //                         View on Block Explorer
//   //                       </a>
//   //                     </button>
//   //                   </li>
//   //                   <li>
//   //                     <button
//   //                       className="menu-item text-error btn-sm !rounded-xl"
//   //                       type="button"
//   //                       onClick={() => disconnect()}
//   //                     >
//   //                       <ArrowLeftOnRectangleIcon className="h-6 w-4 ml-2 sm:ml-0" /> <span>Disconnect</span>
//   //                     </button>
//   //                   </li>
//   //                 </ul>
//   //               </div>
//   //               <div>
//   //                 <input type="checkbox" id="qrcode-modal" className="modal-toggle" />
//   //                 <label htmlFor="qrcode-modal" className="modal cursor-pointer">
//   //                   <label className="modal-box relative">
//   //                     {/* dummy input to capture event onclick on modal box */}
//   //                     <input className="h-0 w-0 absolute top-0 left-0" />
//   //                     <label
//   //                       htmlFor="qrcode-modal"
//   //                       className="btn btn-ghost btn-sm btn-circle absolute right-3 top-3"
//   //                     >
//   //                       ✕
//   //                     </label>
//   //                     <div className="space-y-3 py-6">
//   //                       <div className="flex space-x-4 flex-col items-center gap-6">
//   //                         <QRCodeSVG value={account.address} size={256} />
//   //                         <Address address={account.address} format="long" disableAddressLink />
//   //                       </div>
//   //                     </div>
//   //                   </label>
//   //                 </label>
//   //               </div>
//   //             </div>
//   //           );
//   //         })()}
//   //       </>
//   //     );
//   //   }}
//   // </ConnectButton.Custom>
// );
