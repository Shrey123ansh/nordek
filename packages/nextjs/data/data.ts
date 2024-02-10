export const localTokens = {
  ETH: {
    logo: "https://picsum.photos/200",
    name: "ethereum",
    symbol: "ETH",
    address: "0x322813Fd9A801c5507c9de605d63CEA4f2CE6c44",
  },
  WBTC: {
    logo: "https://picsum.photos/200",
    name: "wrapped bitcoin",
    symbol: "WBTC",
    address: "0x61a4F9E552bfbCCd55f4413c0dD52b5868148Adc",
  },
  LINK: {
    logo: "https://picsum.photos/200",
    name: "chainlink",
    symbol: "LINK",
    address: "0x4A679253410272dd5232B3Ff7cF5dbB88f295319",
  },
  USDC: {
    logo: "https://picsum.photos/200",
    name: "usdc",
    symbol: "USDC",
    address: "0x7a2088a1bFc9d81c55368AE168C2C02570cB814F",
  },
  NRK: {
    logo: "https://raw.githubusercontent.com/kashyap222884/assets/main/blockchains/nrk/0x89439663317D6092c03adC955df7df769B8Bb605/logo.png",
    name: "nordek",
    symbol: "NRK",
    address: "0x99a6c7392cC9d735B019308Ea5648B177aDba869",
  },
  PERC: {
    logo: "https://picsum.photos/200",
    name: "ERC20",
    symbol: "AIT",
    address: "0xAd4f29f3151D0F80636B0aEE8Bdb28c8E2aaFf63",
  }

  // Add more token objects as needed
};

export type tokenType = {
  logo: string;
  name: string;
  symbol: string;
  address: string;
};

export type tradeData = {
  _id: string;
  usd: number;
  boughtToken: string;
  boughtTokenAmount: number;
  soldToken: string;
  soldTokenAmount: number;
  address: string;
  holdings: number;
  time: string;
  hash: string;
  isBuy: boolean;
};

const stakeData = {
  _id: "1231231",
  hash: "0xbe4e6dd81a180ee1ef6e95e787a181335f0859058233872132f9146b2cba38a0",
  stakedAt: 21235123,
  apy: 5.6,
  address: "0x36b95B5dAF5EFC083f16AcA6a6b980348B6C15d1",
  stakedAmount: 54,
};


 