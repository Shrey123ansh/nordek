import { Chain } from "@wagmi/core";

export const nordek = {
  id: 81041,
  name: "Nordek",
  network: "nordek",
  nativeCurrency: {
    decimals: 18,
    name: "Nordek",
    symbol: "NRK",
  },
  rpcUrls: {
    public: { http: ["https://mainnet-rpc.nordekscan.com/"] },
    default: { http: ["https://mainnet-rpc.nordekscan.com/"] },
  },
  blockExplorers: {
    etherscan: { name: "NordekScan", url: "https://nordekscan.com/" },
    default: { name: "NordekScan", url: "https://nordekscan.com/" },
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 11_907_934,
    },
  },
} as const satisfies Chain;
