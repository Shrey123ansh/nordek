const contracts = {
  81041: [
    {
      name: "nordek",
      chainId: "81041",
      contracts: {
        NordekV2Factory: {
          address: "0x146F51BDf714E6405FEdcA26813DdE4BcEdCD9B9",
          abi: [
            {
              type: "constructor",
              inputs: [
                {
                  name: "_feeToSetter",
                  type: "address",
                  internalType: "address",
                },
              ],
              stateMutability: "nonpayable",
            },
            {
              type: "function",
              name: "allPairs",
              inputs: [
                {
                  name: "",
                  type: "uint256",
                  internalType: "uint256",
                },
              ],
              outputs: [
                {
                  name: "",
                  type: "address",
                  internalType: "address",
                },
              ],
              stateMutability: "view",
            },
            {
              type: "function",
              name: "allPairsLength",
              inputs: [],
              outputs: [
                {
                  name: "",
                  type: "uint256",
                  internalType: "uint256",
                },
              ],
              stateMutability: "view",
            },
            {
              type: "function",
              name: "createPair",
              inputs: [
                {
                  name: "tokenA",
                  type: "address",
                  internalType: "address",
                },
                {
                  name: "tokenB",
                  type: "address",
                  internalType: "address",
                },
              ],
              outputs: [
                {
                  name: "pair",
                  type: "address",
                  internalType: "address",
                },
              ],
              stateMutability: "nonpayable",
            },
            {
              type: "function",
              name: "feeTo",
              inputs: [],
              outputs: [
                {
                  name: "",
                  type: "address",
                  internalType: "address",
                },
              ],
              stateMutability: "view",
            },
            {
              type: "function",
              name: "feeToSetter",
              inputs: [],
              outputs: [
                {
                  name: "",
                  type: "address",
                  internalType: "address",
                },
              ],
              stateMutability: "view",
            },
            {
              type: "function",
              name: "getPair",
              inputs: [
                {
                  name: "",
                  type: "address",
                  internalType: "address",
                },
                {
                  name: "",
                  type: "address",
                  internalType: "address",
                },
              ],
              outputs: [
                {
                  name: "",
                  type: "address",
                  internalType: "address",
                },
              ],
              stateMutability: "view",
            },
            {
              type: "function",
              name: "setFeeTo",
              inputs: [
                {
                  name: "_feeTo",
                  type: "address",
                  internalType: "address",
                },
              ],
              outputs: [],
              stateMutability: "nonpayable",
            },
            {
              type: "function",
              name: "setFeeToSetter",
              inputs: [
                {
                  name: "_feeToSetter",
                  type: "address",
                  internalType: "address",
                },
              ],
              outputs: [],
              stateMutability: "nonpayable",
            },
            {
              type: "event",
              name: "PairCreated",
              inputs: [
                {
                  name: "token0",
                  type: "address",
                  indexed: true,
                  internalType: "address",
                },
                {
                  name: "token1",
                  type: "address",
                  indexed: true,
                  internalType: "address",
                },
                {
                  name: "pair",
                  type: "address",
                  indexed: false,
                  internalType: "address",
                },
                {
                  name: "",
                  type: "uint256",
                  indexed: false,
                  internalType: "uint256",
                },
              ],
              anonymous: false,
            },
          ],
        },
        WNRK: {
          address: "0xE778959bC4dE7F84572499b83d2407d482A7F5a9",
          abi: [
            {
              type: "constructor",
              inputs: [],
              stateMutability: "nonpayable",
            },
            {
              type: "fallback",
              stateMutability: "payable",
            },
            {
              type: "receive",
              stateMutability: "payable",
            },
            {
              type: "function",
              name: "allowance",
              inputs: [
                {
                  name: "owner",
                  type: "address",
                  internalType: "address",
                },
                {
                  name: "spender",
                  type: "address",
                  internalType: "address",
                },
              ],
              outputs: [
                {
                  name: "",
                  type: "uint256",
                  internalType: "uint256",
                },
              ],
              stateMutability: "view",
            },
            {
              type: "function",
              name: "approve",
              inputs: [
                {
                  name: "spender",
                  type: "address",
                  internalType: "address",
                },
                {
                  name: "amount",
                  type: "uint256",
                  internalType: "uint256",
                },
              ],
              outputs: [
                {
                  name: "",
                  type: "bool",
                  internalType: "bool",
                },
              ],
              stateMutability: "nonpayable",
            },
            {
              type: "function",
              name: "balanceOf",
              inputs: [
                {
                  name: "account",
                  type: "address",
                  internalType: "address",
                },
              ],
              outputs: [
                {
                  name: "",
                  type: "uint256",
                  internalType: "uint256",
                },
              ],
              stateMutability: "view",
            },
            {
              type: "function",
              name: "decimals",
              inputs: [],
              outputs: [
                {
                  name: "",
                  type: "uint8",
                  internalType: "uint8",
                },
              ],
              stateMutability: "view",
            },
            {
              type: "function",
              name: "decreaseAllowance",
              inputs: [
                {
                  name: "spender",
                  type: "address",
                  internalType: "address",
                },
                {
                  name: "subtractedValue",
                  type: "uint256",
                  internalType: "uint256",
                },
              ],
              outputs: [
                {
                  name: "",
                  type: "bool",
                  internalType: "bool",
                },
              ],
              stateMutability: "nonpayable",
            },
            {
              type: "function",
              name: "deposit",
              inputs: [],
              outputs: [],
              stateMutability: "payable",
            },
            {
              type: "function",
              name: "increaseAllowance",
              inputs: [
                {
                  name: "spender",
                  type: "address",
                  internalType: "address",
                },
                {
                  name: "addedValue",
                  type: "uint256",
                  internalType: "uint256",
                },
              ],
              outputs: [
                {
                  name: "",
                  type: "bool",
                  internalType: "bool",
                },
              ],
              stateMutability: "nonpayable",
            },
            {
              type: "function",
              name: "name",
              inputs: [],
              outputs: [
                {
                  name: "",
                  type: "string",
                  internalType: "string",
                },
              ],
              stateMutability: "view",
            },
            {
              type: "function",
              name: "symbol",
              inputs: [],
              outputs: [
                {
                  name: "",
                  type: "string",
                  internalType: "string",
                },
              ],
              stateMutability: "view",
            },
            {
              type: "function",
              name: "totalSupply",
              inputs: [],
              outputs: [
                {
                  name: "",
                  type: "uint256",
                  internalType: "uint256",
                },
              ],
              stateMutability: "view",
            },
            {
              type: "function",
              name: "transfer",
              inputs: [
                {
                  name: "to",
                  type: "address",
                  internalType: "address",
                },
                {
                  name: "amount",
                  type: "uint256",
                  internalType: "uint256",
                },
              ],
              outputs: [
                {
                  name: "",
                  type: "bool",
                  internalType: "bool",
                },
              ],
              stateMutability: "nonpayable",
            },
            {
              type: "function",
              name: "transferFrom",
              inputs: [
                {
                  name: "from",
                  type: "address",
                  internalType: "address",
                },
                {
                  name: "to",
                  type: "address",
                  internalType: "address",
                },
                {
                  name: "amount",
                  type: "uint256",
                  internalType: "uint256",
                },
              ],
              outputs: [
                {
                  name: "",
                  type: "bool",
                  internalType: "bool",
                },
              ],
              stateMutability: "nonpayable",
            },
            {
              type: "function",
              name: "withdraw",
              inputs: [
                {
                  name: "_amount",
                  type: "uint256",
                  internalType: "uint256",
                },
              ],
              outputs: [],
              stateMutability: "nonpayable",
            },
            {
              type: "event",
              name: "Approval",
              inputs: [
                {
                  name: "owner",
                  type: "address",
                  indexed: true,
                  internalType: "address",
                },
                {
                  name: "spender",
                  type: "address",
                  indexed: true,
                  internalType: "address",
                },
                {
                  name: "value",
                  type: "uint256",
                  indexed: false,
                  internalType: "uint256",
                },
              ],
              anonymous: false,
            },
            {
              type: "event",
              name: "Transfer",
              inputs: [
                {
                  name: "from",
                  type: "address",
                  indexed: true,
                  internalType: "address",
                },
                {
                  name: "to",
                  type: "address",
                  indexed: true,
                  internalType: "address",
                },
                {
                  name: "value",
                  type: "uint256",
                  indexed: false,
                  internalType: "uint256",
                },
              ],
              anonymous: false,
            },
          ],
        },
        NordekV2Router02: {
          address: "0xcFde8397e2dc7e4801219C9Afec07aE293853Bd6",
          abi: [
            {
              type: "constructor",
              inputs: [
                {
                  name: "_factory",
                  type: "address",
                  internalType: "address",
                },
                {
                  name: "_WNRK",
                  type: "address",
                  internalType: "address",
                },
              ],
              stateMutability: "nonpayable",
            },
            {
              type: "receive",
              stateMutability: "payable",
            },
            {
              type: "function",
              name: "WNRK",
              inputs: [],
              outputs: [
                {
                  name: "",
                  type: "address",
                  internalType: "address",
                },
              ],
              stateMutability: "view",
            },
            {
              type: "function",
              name: "addLiquidity",
              inputs: [
                {
                  name: "tokenA",
                  type: "address",
                  internalType: "address",
                },
                {
                  name: "tokenB",
                  type: "address",
                  internalType: "address",
                },
                {
                  name: "amountADesired",
                  type: "uint256",
                  internalType: "uint256",
                },
                {
                  name: "amountBDesired",
                  type: "uint256",
                  internalType: "uint256",
                },
                {
                  name: "amountAMin",
                  type: "uint256",
                  internalType: "uint256",
                },
                {
                  name: "amountBMin",
                  type: "uint256",
                  internalType: "uint256",
                },
                {
                  name: "to",
                  type: "address",
                  internalType: "address",
                },
                {
                  name: "deadline",
                  type: "uint256",
                  internalType: "uint256",
                },
              ],
              outputs: [
                {
                  name: "amountA",
                  type: "uint256",
                  internalType: "uint256",
                },
                {
                  name: "amountB",
                  type: "uint256",
                  internalType: "uint256",
                },
                {
                  name: "liquidity",
                  type: "uint256",
                  internalType: "uint256",
                },
              ],
              stateMutability: "nonpayable",
            },
            {
              type: "function",
              name: "addLiquidityNRK",
              inputs: [
                {
                  name: "token",
                  type: "address",
                  internalType: "address",
                },
                {
                  name: "amountTokenDesired",
                  type: "uint256",
                  internalType: "uint256",
                },
                {
                  name: "amountTokenMin",
                  type: "uint256",
                  internalType: "uint256",
                },
                {
                  name: "amountNRKMin",
                  type: "uint256",
                  internalType: "uint256",
                },
                {
                  name: "to",
                  type: "address",
                  internalType: "address",
                },
                {
                  name: "deadline",
                  type: "uint256",
                  internalType: "uint256",
                },
              ],
              outputs: [
                {
                  name: "amountToken",
                  type: "uint256",
                  internalType: "uint256",
                },
                {
                  name: "amountNRK",
                  type: "uint256",
                  internalType: "uint256",
                },
                {
                  name: "liquidity",
                  type: "uint256",
                  internalType: "uint256",
                },
              ],
              stateMutability: "payable",
            },
            {
              type: "function",
              name: "factory",
              inputs: [],
              outputs: [
                {
                  name: "",
                  type: "address",
                  internalType: "address",
                },
              ],
              stateMutability: "view",
            },
            {
              type: "function",
              name: "getAmountIn",
              inputs: [
                {
                  name: "amountOut",
                  type: "uint256",
                  internalType: "uint256",
                },
                {
                  name: "reserveIn",
                  type: "uint256",
                  internalType: "uint256",
                },
                {
                  name: "reserveOut",
                  type: "uint256",
                  internalType: "uint256",
                },
              ],
              outputs: [
                {
                  name: "amountIn",
                  type: "uint256",
                  internalType: "uint256",
                },
              ],
              stateMutability: "pure",
            },
            {
              type: "function",
              name: "getAmountOut",
              inputs: [
                {
                  name: "amountIn",
                  type: "uint256",
                  internalType: "uint256",
                },
                {
                  name: "reserveIn",
                  type: "uint256",
                  internalType: "uint256",
                },
                {
                  name: "reserveOut",
                  type: "uint256",
                  internalType: "uint256",
                },
              ],
              outputs: [
                {
                  name: "amountOut",
                  type: "uint256",
                  internalType: "uint256",
                },
              ],
              stateMutability: "pure",
            },
            {
              type: "function",
              name: "getAmountsIn",
              inputs: [
                {
                  name: "amountOut",
                  type: "uint256",
                  internalType: "uint256",
                },
                {
                  name: "path",
                  type: "address[]",
                  internalType: "address[]",
                },
              ],
              outputs: [
                {
                  name: "amounts",
                  type: "uint256[]",
                  internalType: "uint256[]",
                },
              ],
              stateMutability: "view",
            },
            {
              type: "function",
              name: "getAmountsOut",
              inputs: [
                {
                  name: "amountIn",
                  type: "uint256",
                  internalType: "uint256",
                },
                {
                  name: "path",
                  type: "address[]",
                  internalType: "address[]",
                },
              ],
              outputs: [
                {
                  name: "amounts",
                  type: "uint256[]",
                  internalType: "uint256[]",
                },
              ],
              stateMutability: "view",
            },
            {
              type: "function",
              name: "quote",
              inputs: [
                {
                  name: "amountA",
                  type: "uint256",
                  internalType: "uint256",
                },
                {
                  name: "reserveA",
                  type: "uint256",
                  internalType: "uint256",
                },
                {
                  name: "reserveB",
                  type: "uint256",
                  internalType: "uint256",
                },
              ],
              outputs: [
                {
                  name: "amountB",
                  type: "uint256",
                  internalType: "uint256",
                },
              ],
              stateMutability: "pure",
            },
            {
              type: "function",
              name: "removeLiquidity",
              inputs: [
                {
                  name: "tokenA",
                  type: "address",
                  internalType: "address",
                },
                {
                  name: "tokenB",
                  type: "address",
                  internalType: "address",
                },
                {
                  name: "liquidity",
                  type: "uint256",
                  internalType: "uint256",
                },
                {
                  name: "amountAMin",
                  type: "uint256",
                  internalType: "uint256",
                },
                {
                  name: "amountBMin",
                  type: "uint256",
                  internalType: "uint256",
                },
                {
                  name: "to",
                  type: "address",
                  internalType: "address",
                },
                {
                  name: "deadline",
                  type: "uint256",
                  internalType: "uint256",
                },
              ],
              outputs: [
                {
                  name: "amountA",
                  type: "uint256",
                  internalType: "uint256",
                },
                {
                  name: "amountB",
                  type: "uint256",
                  internalType: "uint256",
                },
              ],
              stateMutability: "nonpayable",
            },
            {
              type: "function",
              name: "removeLiquidityNRK",
              inputs: [
                {
                  name: "token",
                  type: "address",
                  internalType: "address",
                },
                {
                  name: "liquidity",
                  type: "uint256",
                  internalType: "uint256",
                },
                {
                  name: "amountTokenMin",
                  type: "uint256",
                  internalType: "uint256",
                },
                {
                  name: "amountNRKMin",
                  type: "uint256",
                  internalType: "uint256",
                },
                {
                  name: "to",
                  type: "address",
                  internalType: "address",
                },
                {
                  name: "deadline",
                  type: "uint256",
                  internalType: "uint256",
                },
              ],
              outputs: [
                {
                  name: "amountToken",
                  type: "uint256",
                  internalType: "uint256",
                },
                {
                  name: "amountNRK",
                  type: "uint256",
                  internalType: "uint256",
                },
              ],
              stateMutability: "nonpayable",
            },
            {
              type: "function",
              name: "removeLiquidityNRKSupportingFeeOnTransferTokens",
              inputs: [
                {
                  name: "token",
                  type: "address",
                  internalType: "address",
                },
                {
                  name: "liquidity",
                  type: "uint256",
                  internalType: "uint256",
                },
                {
                  name: "amountTokenMin",
                  type: "uint256",
                  internalType: "uint256",
                },
                {
                  name: "amountNRKMin",
                  type: "uint256",
                  internalType: "uint256",
                },
                {
                  name: "to",
                  type: "address",
                  internalType: "address",
                },
                {
                  name: "deadline",
                  type: "uint256",
                  internalType: "uint256",
                },
              ],
              outputs: [
                {
                  name: "amountNRK",
                  type: "uint256",
                  internalType: "uint256",
                },
              ],
              stateMutability: "nonpayable",
            },
            {
              type: "function",
              name: "removeLiquidityNRKWithPermit",
              inputs: [
                {
                  name: "token",
                  type: "address",
                  internalType: "address",
                },
                {
                  name: "liquidity",
                  type: "uint256",
                  internalType: "uint256",
                },
                {
                  name: "amountTokenMin",
                  type: "uint256",
                  internalType: "uint256",
                },
                {
                  name: "amountNRKMin",
                  type: "uint256",
                  internalType: "uint256",
                },
                {
                  name: "to",
                  type: "address",
                  internalType: "address",
                },
                {
                  name: "deadline",
                  type: "uint256",
                  internalType: "uint256",
                },
                {
                  name: "approveMax",
                  type: "bool",
                  internalType: "bool",
                },
                {
                  name: "v",
                  type: "uint8",
                  internalType: "uint8",
                },
                {
                  name: "r",
                  type: "bytes32",
                  internalType: "bytes32",
                },
                {
                  name: "s",
                  type: "bytes32",
                  internalType: "bytes32",
                },
              ],
              outputs: [
                {
                  name: "amountToken",
                  type: "uint256",
                  internalType: "uint256",
                },
                {
                  name: "amountNRK",
                  type: "uint256",
                  internalType: "uint256",
                },
              ],
              stateMutability: "nonpayable",
            },
            {
              type: "function",
              name: "removeLiquidityNRKWithPermitSupportingFeeOnTransferTokens",
              inputs: [
                {
                  name: "token",
                  type: "address",
                  internalType: "address",
                },
                {
                  name: "liquidity",
                  type: "uint256",
                  internalType: "uint256",
                },
                {
                  name: "amountTokenMin",
                  type: "uint256",
                  internalType: "uint256",
                },
                {
                  name: "amountNRKMin",
                  type: "uint256",
                  internalType: "uint256",
                },
                {
                  name: "to",
                  type: "address",
                  internalType: "address",
                },
                {
                  name: "deadline",
                  type: "uint256",
                  internalType: "uint256",
                },
                {
                  name: "approveMax",
                  type: "bool",
                  internalType: "bool",
                },
                {
                  name: "v",
                  type: "uint8",
                  internalType: "uint8",
                },
                {
                  name: "r",
                  type: "bytes32",
                  internalType: "bytes32",
                },
                {
                  name: "s",
                  type: "bytes32",
                  internalType: "bytes32",
                },
              ],
              outputs: [
                {
                  name: "amountNRK",
                  type: "uint256",
                  internalType: "uint256",
                },
              ],
              stateMutability: "nonpayable",
            },
            {
              type: "function",
              name: "removeLiquidityWithPermit",
              inputs: [
                {
                  name: "tokenA",
                  type: "address",
                  internalType: "address",
                },
                {
                  name: "tokenB",
                  type: "address",
                  internalType: "address",
                },
                {
                  name: "liquidity",
                  type: "uint256",
                  internalType: "uint256",
                },
                {
                  name: "amountAMin",
                  type: "uint256",
                  internalType: "uint256",
                },
                {
                  name: "amountBMin",
                  type: "uint256",
                  internalType: "uint256",
                },
                {
                  name: "to",
                  type: "address",
                  internalType: "address",
                },
                {
                  name: "deadline",
                  type: "uint256",
                  internalType: "uint256",
                },
                {
                  name: "approveMax",
                  type: "bool",
                  internalType: "bool",
                },
                {
                  name: "v",
                  type: "uint8",
                  internalType: "uint8",
                },
                {
                  name: "r",
                  type: "bytes32",
                  internalType: "bytes32",
                },
                {
                  name: "s",
                  type: "bytes32",
                  internalType: "bytes32",
                },
              ],
              outputs: [
                {
                  name: "amountA",
                  type: "uint256",
                  internalType: "uint256",
                },
                {
                  name: "amountB",
                  type: "uint256",
                  internalType: "uint256",
                },
              ],
              stateMutability: "nonpayable",
            },
            {
              type: "function",
              name: "swapExactNRKForTokens",
              inputs: [
                {
                  name: "amountOutMin",
                  type: "uint256",
                  internalType: "uint256",
                },
                {
                  name: "path",
                  type: "address[]",
                  internalType: "address[]",
                },
                {
                  name: "to",
                  type: "address",
                  internalType: "address",
                },
                {
                  name: "deadline",
                  type: "uint256",
                  internalType: "uint256",
                },
              ],
              outputs: [
                {
                  name: "amounts",
                  type: "uint256[]",
                  internalType: "uint256[]",
                },
              ],
              stateMutability: "payable",
            },
            {
              type: "function",
              name: "swapExactNRKForTokensSupportingFeeOnTransferTokens",
              inputs: [
                {
                  name: "amountOutMin",
                  type: "uint256",
                  internalType: "uint256",
                },
                {
                  name: "path",
                  type: "address[]",
                  internalType: "address[]",
                },
                {
                  name: "to",
                  type: "address",
                  internalType: "address",
                },
                {
                  name: "deadline",
                  type: "uint256",
                  internalType: "uint256",
                },
              ],
              outputs: [],
              stateMutability: "payable",
            },
            {
              type: "function",
              name: "swapExactTokensForNRK",
              inputs: [
                {
                  name: "amountIn",
                  type: "uint256",
                  internalType: "uint256",
                },
                {
                  name: "amountOutMin",
                  type: "uint256",
                  internalType: "uint256",
                },
                {
                  name: "path",
                  type: "address[]",
                  internalType: "address[]",
                },
                {
                  name: "to",
                  type: "address",
                  internalType: "address",
                },
                {
                  name: "deadline",
                  type: "uint256",
                  internalType: "uint256",
                },
              ],
              outputs: [
                {
                  name: "amounts",
                  type: "uint256[]",
                  internalType: "uint256[]",
                },
              ],
              stateMutability: "nonpayable",
            },
            {
              type: "function",
              name: "swapExactTokensForNRKSupportingFeeOnTransferTokens",
              inputs: [
                {
                  name: "amountIn",
                  type: "uint256",
                  internalType: "uint256",
                },
                {
                  name: "amountOutMin",
                  type: "uint256",
                  internalType: "uint256",
                },
                {
                  name: "path",
                  type: "address[]",
                  internalType: "address[]",
                },
                {
                  name: "to",
                  type: "address",
                  internalType: "address",
                },
                {
                  name: "deadline",
                  type: "uint256",
                  internalType: "uint256",
                },
              ],
              outputs: [],
              stateMutability: "nonpayable",
            },
            {
              type: "function",
              name: "swapExactTokensForTokens",
              inputs: [
                {
                  name: "amountIn",
                  type: "uint256",
                  internalType: "uint256",
                },
                {
                  name: "amountOutMin",
                  type: "uint256",
                  internalType: "uint256",
                },
                {
                  name: "path",
                  type: "address[]",
                  internalType: "address[]",
                },
                {
                  name: "to",
                  type: "address",
                  internalType: "address",
                },
                {
                  name: "deadline",
                  type: "uint256",
                  internalType: "uint256",
                },
              ],
              outputs: [
                {
                  name: "amounts",
                  type: "uint256[]",
                  internalType: "uint256[]",
                },
              ],
              stateMutability: "nonpayable",
            },
            {
              type: "function",
              name: "swapExactTokensForTokensSupportingFeeOnTransferTokens",
              inputs: [
                {
                  name: "amountIn",
                  type: "uint256",
                  internalType: "uint256",
                },
                {
                  name: "amountOutMin",
                  type: "uint256",
                  internalType: "uint256",
                },
                {
                  name: "path",
                  type: "address[]",
                  internalType: "address[]",
                },
                {
                  name: "to",
                  type: "address",
                  internalType: "address",
                },
                {
                  name: "deadline",
                  type: "uint256",
                  internalType: "uint256",
                },
              ],
              outputs: [],
              stateMutability: "nonpayable",
            },
            {
              type: "function",
              name: "swapNRKForExactTokens",
              inputs: [
                {
                  name: "amountOut",
                  type: "uint256",
                  internalType: "uint256",
                },
                {
                  name: "path",
                  type: "address[]",
                  internalType: "address[]",
                },
                {
                  name: "to",
                  type: "address",
                  internalType: "address",
                },
                {
                  name: "deadline",
                  type: "uint256",
                  internalType: "uint256",
                },
              ],
              outputs: [
                {
                  name: "amounts",
                  type: "uint256[]",
                  internalType: "uint256[]",
                },
              ],
              stateMutability: "payable",
            },
            {
              type: "function",
              name: "swapTokensForExactNRK",
              inputs: [
                {
                  name: "amountOut",
                  type: "uint256",
                  internalType: "uint256",
                },
                {
                  name: "amountInMax",
                  type: "uint256",
                  internalType: "uint256",
                },
                {
                  name: "path",
                  type: "address[]",
                  internalType: "address[]",
                },
                {
                  name: "to",
                  type: "address",
                  internalType: "address",
                },
                {
                  name: "deadline",
                  type: "uint256",
                  internalType: "uint256",
                },
              ],
              outputs: [
                {
                  name: "amounts",
                  type: "uint256[]",
                  internalType: "uint256[]",
                },
              ],
              stateMutability: "nonpayable",
            },
            {
              type: "function",
              name: "swapTokensForExactTokens",
              inputs: [
                {
                  name: "amountOut",
                  type: "uint256",
                  internalType: "uint256",
                },
                {
                  name: "amountInMax",
                  type: "uint256",
                  internalType: "uint256",
                },
                {
                  name: "path",
                  type: "address[]",
                  internalType: "address[]",
                },
                {
                  name: "to",
                  type: "address",
                  internalType: "address",
                },
                {
                  name: "deadline",
                  type: "uint256",
                  internalType: "uint256",
                },
              ],
              outputs: [
                {
                  name: "amounts",
                  type: "uint256[]",
                  internalType: "uint256[]",
                },
              ],
              stateMutability: "nonpayable",
            },
          ],
        },
        PracticeSupplyERC20: {
          address: "0x24F6e95F286354ffc0294bfaE4F9Fa4bA863a480",
          abi: [
            {
              type: "constructor",
              inputs: [],
              stateMutability: "nonpayable",
            },
            {
              type: "fallback",
              stateMutability: "payable",
            },
            {
              type: "receive",
              stateMutability: "payable",
            },
            {
              type: "function",
              name: "allowance",
              inputs: [
                {
                  name: "owner",
                  type: "address",
                  internalType: "address",
                },
                {
                  name: "spender",
                  type: "address",
                  internalType: "address",
                },
              ],
              outputs: [
                {
                  name: "",
                  type: "uint256",
                  internalType: "uint256",
                },
              ],
              stateMutability: "view",
            },
            {
              type: "function",
              name: "approve",
              inputs: [
                {
                  name: "spender",
                  type: "address",
                  internalType: "address",
                },
                {
                  name: "amount",
                  type: "uint256",
                  internalType: "uint256",
                },
              ],
              outputs: [
                {
                  name: "",
                  type: "bool",
                  internalType: "bool",
                },
              ],
              stateMutability: "nonpayable",
            },
            {
              type: "function",
              name: "balanceOf",
              inputs: [
                {
                  name: "account",
                  type: "address",
                  internalType: "address",
                },
              ],
              outputs: [
                {
                  name: "",
                  type: "uint256",
                  internalType: "uint256",
                },
              ],
              stateMutability: "view",
            },
            {
              type: "function",
              name: "decimals",
              inputs: [],
              outputs: [
                {
                  name: "",
                  type: "uint8",
                  internalType: "uint8",
                },
              ],
              stateMutability: "view",
            },
            {
              type: "function",
              name: "decreaseAllowance",
              inputs: [
                {
                  name: "spender",
                  type: "address",
                  internalType: "address",
                },
                {
                  name: "subtractedValue",
                  type: "uint256",
                  internalType: "uint256",
                },
              ],
              outputs: [
                {
                  name: "",
                  type: "bool",
                  internalType: "bool",
                },
              ],
              stateMutability: "nonpayable",
            },
            {
              type: "function",
              name: "increaseAllowance",
              inputs: [
                {
                  name: "spender",
                  type: "address",
                  internalType: "address",
                },
                {
                  name: "addedValue",
                  type: "uint256",
                  internalType: "uint256",
                },
              ],
              outputs: [
                {
                  name: "",
                  type: "bool",
                  internalType: "bool",
                },
              ],
              stateMutability: "nonpayable",
            },
            {
              type: "function",
              name: "name",
              inputs: [],
              outputs: [
                {
                  name: "",
                  type: "string",
                  internalType: "string",
                },
              ],
              stateMutability: "view",
            },
            {
              type: "function",
              name: "symbol",
              inputs: [],
              outputs: [
                {
                  name: "",
                  type: "string",
                  internalType: "string",
                },
              ],
              stateMutability: "view",
            },
            {
              type: "function",
              name: "totalSupply",
              inputs: [],
              outputs: [
                {
                  name: "",
                  type: "uint256",
                  internalType: "uint256",
                },
              ],
              stateMutability: "view",
            },
            {
              type: "function",
              name: "transfer",
              inputs: [
                {
                  name: "to",
                  type: "address",
                  internalType: "address",
                },
                {
                  name: "amount",
                  type: "uint256",
                  internalType: "uint256",
                },
              ],
              outputs: [
                {
                  name: "",
                  type: "bool",
                  internalType: "bool",
                },
              ],
              stateMutability: "nonpayable",
            },
            {
              type: "function",
              name: "transferFrom",
              inputs: [
                {
                  name: "from",
                  type: "address",
                  internalType: "address",
                },
                {
                  name: "to",
                  type: "address",
                  internalType: "address",
                },
                {
                  name: "amount",
                  type: "uint256",
                  internalType: "uint256",
                },
              ],
              outputs: [
                {
                  name: "",
                  type: "bool",
                  internalType: "bool",
                },
              ],
              stateMutability: "nonpayable",
            },
            {
              type: "event",
              name: "Approval",
              inputs: [
                {
                  name: "owner",
                  type: "address",
                  indexed: true,
                  internalType: "address",
                },
                {
                  name: "spender",
                  type: "address",
                  indexed: true,
                  internalType: "address",
                },
                {
                  name: "value",
                  type: "uint256",
                  indexed: false,
                  internalType: "uint256",
                },
              ],
              anonymous: false,
            },
            {
              type: "event",
              name: "Transfer",
              inputs: [
                {
                  name: "from",
                  type: "address",
                  indexed: true,
                  internalType: "address",
                },
                {
                  name: "to",
                  type: "address",
                  indexed: true,
                  internalType: "address",
                },
                {
                  name: "value",
                  type: "uint256",
                  indexed: false,
                  internalType: "uint256",
                },
              ],
              anonymous: false,
            },
          ],
        },
      },
    },
  ],
} as const;

export default contracts;
