export const tokens = {
  ETH: {
    logo: "https://picsum.photos/200",
    name: "Ethereum",
    symbol: "ETH",
    address: "0x322813Fd9A801c5507c9de605d63CEA4f2CE6c44",
  },
  WBTC: {
    logo: "https://picsum.photos/200",
    name: "Wrapped Bitcoin",
    symbol: "WBTC",
    address: "0xa85233C63b9Ee964Add6F2cffe00Fd84eb32338f",
  },
  LINK: {
    logo: "https://picsum.photos/200",
    name: "Chainlink",
    symbol: "LINK",
    address: "0x4A679253410272dd5232B3Ff7cF5dbB88f295319",
  },
  USDC: {
    logo: "https://picsum.photos/200",
    name: "USDC",
    symbol: "USDC",
    address: "0x7a2088a1bFc9d81c55368AE168C2C02570cB814F",
  },
  NRK: {
    logo: "https://picsum.photos/200",
    name: "NRK",
    symbol: "NRK",
    address: "0x7a2088a1bFc9d81c55368AE168C2C02570cB814F",
  },
  // Add more token objects as needed
};

export type tokenType = {
  logo: string;
  name: string;
  symbol: string;
  address: string;
};

export const trades = [
  {
    usd: 100,
    amount: 5,
    address: "0x123abc...",
    time: "2023-08-23 10:30 AM",
    hash: "0xabcdef...",
    timestamp: 1679804621,
    isBuy: true,
  },
  {
    usd: 200,
    amount: 8,
    address: "0x456def...",
    time: "2023-08-23 11:45 AM",
    hash: "0xghijkl...",
    timestamp: 1679815550,
    isBuy: false,
  },
  {
    usd: 50,
    amount: 2,
    address: "0x789ghi...",
    time: "2023-08-23 2:15 PM",
    hash: "0mnopqr...",
    timestamp: 1679847123,
    isBuy: true,
  },
  // Add more dummy data objects as needed
];
