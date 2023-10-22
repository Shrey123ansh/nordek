const contracts = {
  31337: [
    {
      name: "Anvil",
      chainId: "31337",
      contracts: {
        UniswapV2Factory: {
          address: "0x2Cc4C9C85459D6E0Ee8e0205770C7994C76BC2a1",
          abi: [
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_feeToSetter",
                  type: "address",
                },
              ],
              stateMutability: "nonpayable",
              type: "constructor",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "token0",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "token1",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "address",
                  name: "pair",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              name: "PairCreated",
              type: "event",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              name: "allPairs",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "allPairsLength",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "tokenA",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "tokenB",
                  type: "address",
                },
              ],
              name: "createPair",
              outputs: [
                {
                  internalType: "address",
                  name: "pair",
                  type: "address",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "feeTo",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "feeToSetter",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              name: "getPair",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_feeTo",
                  type: "address",
                },
              ],
              name: "setFeeTo",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_feeToSetter",
                  type: "address",
                },
              ],
              name: "setFeeToSetter",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
          ],
        },
        WNRK: {
          address: "0x466ab249dd2fdFCb8a17cB9A1dfF00aDBF80E765",
          abi: [
            {
              inputs: [],
              stateMutability: "nonpayable",
              type: "constructor",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "owner",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "spender",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "value",
                  type: "uint256",
                },
              ],
              name: "Approval",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "from",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "value",
                  type: "uint256",
                },
              ],
              name: "Transfer",
              type: "event",
            },
            {
              stateMutability: "payable",
              type: "fallback",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "owner",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "spender",
                  type: "address",
                },
              ],
              name: "allowance",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "spender",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
              ],
              name: "approve",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "account",
                  type: "address",
                },
              ],
              name: "balanceOf",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "decimals",
              outputs: [
                {
                  internalType: "uint8",
                  name: "",
                  type: "uint8",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "spender",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "subtractedValue",
                  type: "uint256",
                },
              ],
              name: "decreaseAllowance",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "deposit",
              outputs: [],
              stateMutability: "payable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "spender",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "addedValue",
                  type: "uint256",
                },
              ],
              name: "increaseAllowance",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "name",
              outputs: [
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "symbol",
              outputs: [
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "totalSupply",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
              ],
              name: "transfer",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "from",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
              ],
              name: "transferFrom",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_amount",
                  type: "uint256",
                },
              ],
              name: "withdraw",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              stateMutability: "payable",
              type: "receive",
            },
          ],
        },
        UniswapV2Router02: {
          address: "0x0500136187518B5d9b2fBffF34693D8E60bA5776",
          abi: [
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_factory",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "_WETH",
                  type: "address",
                },
              ],
              stateMutability: "nonpayable",
              type: "constructor",
            },
            {
              inputs: [],
              name: "WETH",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "tokenA",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "tokenB",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "amountADesired",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "amountBDesired",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "amountAMin",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "amountBMin",
                  type: "uint256",
                },
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "deadline",
                  type: "uint256",
                },
              ],
              name: "addLiquidity",
              outputs: [
                {
                  internalType: "uint256",
                  name: "amountA",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "amountB",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "liquidity",
                  type: "uint256",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "token",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "amountTokenDesired",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "amountTokenMin",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "amountETHMin",
                  type: "uint256",
                },
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "deadline",
                  type: "uint256",
                },
              ],
              name: "addLiquidityETH",
              outputs: [
                {
                  internalType: "uint256",
                  name: "amountToken",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "amountETH",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "liquidity",
                  type: "uint256",
                },
              ],
              stateMutability: "payable",
              type: "function",
            },
            {
              inputs: [],
              name: "factory",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "amountOut",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "reserveIn",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "reserveOut",
                  type: "uint256",
                },
              ],
              name: "getAmountIn",
              outputs: [
                {
                  internalType: "uint256",
                  name: "amountIn",
                  type: "uint256",
                },
              ],
              stateMutability: "pure",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "amountIn",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "reserveIn",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "reserveOut",
                  type: "uint256",
                },
              ],
              name: "getAmountOut",
              outputs: [
                {
                  internalType: "uint256",
                  name: "amountOut",
                  type: "uint256",
                },
              ],
              stateMutability: "pure",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "amountOut",
                  type: "uint256",
                },
                {
                  internalType: "address[]",
                  name: "path",
                  type: "address[]",
                },
              ],
              name: "getAmountsIn",
              outputs: [
                {
                  internalType: "uint256[]",
                  name: "amounts",
                  type: "uint256[]",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "amountIn",
                  type: "uint256",
                },
                {
                  internalType: "address[]",
                  name: "path",
                  type: "address[]",
                },
              ],
              name: "getAmountsOut",
              outputs: [
                {
                  internalType: "uint256[]",
                  name: "amounts",
                  type: "uint256[]",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "amountA",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "reserveA",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "reserveB",
                  type: "uint256",
                },
              ],
              name: "quote",
              outputs: [
                {
                  internalType: "uint256",
                  name: "amountB",
                  type: "uint256",
                },
              ],
              stateMutability: "pure",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "tokenA",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "tokenB",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "liquidity",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "amountAMin",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "amountBMin",
                  type: "uint256",
                },
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "deadline",
                  type: "uint256",
                },
              ],
              name: "removeLiquidity",
              outputs: [
                {
                  internalType: "uint256",
                  name: "amountA",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "amountB",
                  type: "uint256",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "token",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "liquidity",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "amountTokenMin",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "amountETHMin",
                  type: "uint256",
                },
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "deadline",
                  type: "uint256",
                },
              ],
              name: "removeLiquidityETH",
              outputs: [
                {
                  internalType: "uint256",
                  name: "amountToken",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "amountETH",
                  type: "uint256",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "token",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "liquidity",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "amountTokenMin",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "amountETHMin",
                  type: "uint256",
                },
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "deadline",
                  type: "uint256",
                },
              ],
              name: "removeLiquidityETHSupportingFeeOnTransferTokens",
              outputs: [
                {
                  internalType: "uint256",
                  name: "amountETH",
                  type: "uint256",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "token",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "liquidity",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "amountTokenMin",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "amountETHMin",
                  type: "uint256",
                },
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "deadline",
                  type: "uint256",
                },
                {
                  internalType: "bool",
                  name: "approveMax",
                  type: "bool",
                },
                {
                  internalType: "uint8",
                  name: "v",
                  type: "uint8",
                },
                {
                  internalType: "bytes32",
                  name: "r",
                  type: "bytes32",
                },
                {
                  internalType: "bytes32",
                  name: "s",
                  type: "bytes32",
                },
              ],
              name: "removeLiquidityETHWithPermit",
              outputs: [
                {
                  internalType: "uint256",
                  name: "amountToken",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "amountETH",
                  type: "uint256",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "token",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "liquidity",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "amountTokenMin",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "amountETHMin",
                  type: "uint256",
                },
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "deadline",
                  type: "uint256",
                },
                {
                  internalType: "bool",
                  name: "approveMax",
                  type: "bool",
                },
                {
                  internalType: "uint8",
                  name: "v",
                  type: "uint8",
                },
                {
                  internalType: "bytes32",
                  name: "r",
                  type: "bytes32",
                },
                {
                  internalType: "bytes32",
                  name: "s",
                  type: "bytes32",
                },
              ],
              name: "removeLiquidityETHWithPermitSupportingFeeOnTransferTokens",
              outputs: [
                {
                  internalType: "uint256",
                  name: "amountETH",
                  type: "uint256",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "tokenA",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "tokenB",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "liquidity",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "amountAMin",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "amountBMin",
                  type: "uint256",
                },
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "deadline",
                  type: "uint256",
                },
                {
                  internalType: "bool",
                  name: "approveMax",
                  type: "bool",
                },
                {
                  internalType: "uint8",
                  name: "v",
                  type: "uint8",
                },
                {
                  internalType: "bytes32",
                  name: "r",
                  type: "bytes32",
                },
                {
                  internalType: "bytes32",
                  name: "s",
                  type: "bytes32",
                },
              ],
              name: "removeLiquidityWithPermit",
              outputs: [
                {
                  internalType: "uint256",
                  name: "amountA",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "amountB",
                  type: "uint256",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "amountOut",
                  type: "uint256",
                },
                {
                  internalType: "address[]",
                  name: "path",
                  type: "address[]",
                },
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "deadline",
                  type: "uint256",
                },
              ],
              name: "swapETHForExactTokens",
              outputs: [
                {
                  internalType: "uint256[]",
                  name: "amounts",
                  type: "uint256[]",
                },
              ],
              stateMutability: "payable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "amountOutMin",
                  type: "uint256",
                },
                {
                  internalType: "address[]",
                  name: "path",
                  type: "address[]",
                },
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "deadline",
                  type: "uint256",
                },
              ],
              name: "swapExactETHForTokens",
              outputs: [
                {
                  internalType: "uint256[]",
                  name: "amounts",
                  type: "uint256[]",
                },
              ],
              stateMutability: "payable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "amountOutMin",
                  type: "uint256",
                },
                {
                  internalType: "address[]",
                  name: "path",
                  type: "address[]",
                },
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "deadline",
                  type: "uint256",
                },
              ],
              name: "swapExactETHForTokensSupportingFeeOnTransferTokens",
              outputs: [],
              stateMutability: "payable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "amountIn",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "amountOutMin",
                  type: "uint256",
                },
                {
                  internalType: "address[]",
                  name: "path",
                  type: "address[]",
                },
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "deadline",
                  type: "uint256",
                },
              ],
              name: "swapExactTokensForETH",
              outputs: [
                {
                  internalType: "uint256[]",
                  name: "amounts",
                  type: "uint256[]",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "amountIn",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "amountOutMin",
                  type: "uint256",
                },
                {
                  internalType: "address[]",
                  name: "path",
                  type: "address[]",
                },
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "deadline",
                  type: "uint256",
                },
              ],
              name: "swapExactTokensForETHSupportingFeeOnTransferTokens",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "amountIn",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "amountOutMin",
                  type: "uint256",
                },
                {
                  internalType: "address[]",
                  name: "path",
                  type: "address[]",
                },
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "deadline",
                  type: "uint256",
                },
              ],
              name: "swapExactTokensForTokens",
              outputs: [
                {
                  internalType: "uint256[]",
                  name: "amounts",
                  type: "uint256[]",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "amountIn",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "amountOutMin",
                  type: "uint256",
                },
                {
                  internalType: "address[]",
                  name: "path",
                  type: "address[]",
                },
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "deadline",
                  type: "uint256",
                },
              ],
              name: "swapExactTokensForTokensSupportingFeeOnTransferTokens",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "amountOut",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "amountInMax",
                  type: "uint256",
                },
                {
                  internalType: "address[]",
                  name: "path",
                  type: "address[]",
                },
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "deadline",
                  type: "uint256",
                },
              ],
              name: "swapTokensForExactETH",
              outputs: [
                {
                  internalType: "uint256[]",
                  name: "amounts",
                  type: "uint256[]",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "amountOut",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "amountInMax",
                  type: "uint256",
                },
                {
                  internalType: "address[]",
                  name: "path",
                  type: "address[]",
                },
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "deadline",
                  type: "uint256",
                },
              ],
              name: "swapTokensForExactTokens",
              outputs: [
                {
                  internalType: "uint256[]",
                  name: "amounts",
                  type: "uint256[]",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              stateMutability: "payable",
              type: "receive",
            },
          ],
        },
        PracticeSupplyERC20: {
          address: "0xA66F165cD51125BD17b044C6977233873fEbb178",
          abi: [
            {
              inputs: [],
              stateMutability: "nonpayable",
              type: "constructor",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "owner",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "spender",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "value",
                  type: "uint256",
                },
              ],
              name: "Approval",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "from",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "value",
                  type: "uint256",
                },
              ],
              name: "Transfer",
              type: "event",
            },
            {
              stateMutability: "payable",
              type: "fallback",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "owner",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "spender",
                  type: "address",
                },
              ],
              name: "allowance",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "spender",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
              ],
              name: "approve",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "account",
                  type: "address",
                },
              ],
              name: "balanceOf",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "decimals",
              outputs: [
                {
                  internalType: "uint8",
                  name: "",
                  type: "uint8",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "spender",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "subtractedValue",
                  type: "uint256",
                },
              ],
              name: "decreaseAllowance",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "spender",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "addedValue",
                  type: "uint256",
                },
              ],
              name: "increaseAllowance",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "name",
              outputs: [
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "symbol",
              outputs: [
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "totalSupply",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
              ],
              name: "transfer",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "from",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
              ],
              name: "transferFrom",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              stateMutability: "payable",
              type: "receive",
            },
          ],
        },
      },
    },
  ],
  80001: [
    {
      name: "Polygon Mumbai",
      chainId: "80001",
      contracts: {
        UniswapV2Factory: {
          address: "0xe5B1846438547134f7c7e75e56145b00c9088F39",
          abi: [
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_feeToSetter",
                  type: "address",
                },
              ],
              stateMutability: "nonpayable",
              type: "constructor",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "token0",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "token1",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "address",
                  name: "pair",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              name: "PairCreated",
              type: "event",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              name: "allPairs",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "allPairsLength",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "tokenA",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "tokenB",
                  type: "address",
                },
              ],
              name: "createPair",
              outputs: [
                {
                  internalType: "address",
                  name: "pair",
                  type: "address",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "feeTo",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "feeToSetter",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              name: "getPair",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_feeTo",
                  type: "address",
                },
              ],
              name: "setFeeTo",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_feeToSetter",
                  type: "address",
                },
              ],
              name: "setFeeToSetter",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
          ],
        },
        WNRK: {
          address: "0x99624acc6DAb3C664753111526B42C1e0d953D24",
          abi: [
            {
              inputs: [],
              stateMutability: "nonpayable",
              type: "constructor",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "owner",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "spender",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "value",
                  type: "uint256",
                },
              ],
              name: "Approval",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "from",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "value",
                  type: "uint256",
                },
              ],
              name: "Transfer",
              type: "event",
            },
            {
              stateMutability: "payable",
              type: "fallback",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "owner",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "spender",
                  type: "address",
                },
              ],
              name: "allowance",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "spender",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
              ],
              name: "approve",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "account",
                  type: "address",
                },
              ],
              name: "balanceOf",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "decimals",
              outputs: [
                {
                  internalType: "uint8",
                  name: "",
                  type: "uint8",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "spender",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "subtractedValue",
                  type: "uint256",
                },
              ],
              name: "decreaseAllowance",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "deposit",
              outputs: [],
              stateMutability: "payable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "spender",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "addedValue",
                  type: "uint256",
                },
              ],
              name: "increaseAllowance",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "name",
              outputs: [
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "symbol",
              outputs: [
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "totalSupply",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
              ],
              name: "transfer",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "from",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
              ],
              name: "transferFrom",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_amount",
                  type: "uint256",
                },
              ],
              name: "withdraw",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              stateMutability: "payable",
              type: "receive",
            },
          ],
        },
        UniswapV2Router02: {
          address: "0x2307D18d828560D4fdA502A2e55Cc916c88c317d",
          abi: [
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_factory",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "_WETH",
                  type: "address",
                },
              ],
              stateMutability: "nonpayable",
              type: "constructor",
            },
            {
              inputs: [],
              name: "WETH",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "tokenA",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "tokenB",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "amountADesired",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "amountBDesired",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "amountAMin",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "amountBMin",
                  type: "uint256",
                },
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "deadline",
                  type: "uint256",
                },
              ],
              name: "addLiquidity",
              outputs: [
                {
                  internalType: "uint256",
                  name: "amountA",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "amountB",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "liquidity",
                  type: "uint256",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "token",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "amountTokenDesired",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "amountTokenMin",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "amountETHMin",
                  type: "uint256",
                },
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "deadline",
                  type: "uint256",
                },
              ],
              name: "addLiquidityETH",
              outputs: [
                {
                  internalType: "uint256",
                  name: "amountToken",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "amountETH",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "liquidity",
                  type: "uint256",
                },
              ],
              stateMutability: "payable",
              type: "function",
            },
            {
              inputs: [],
              name: "factory",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "amountOut",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "reserveIn",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "reserveOut",
                  type: "uint256",
                },
              ],
              name: "getAmountIn",
              outputs: [
                {
                  internalType: "uint256",
                  name: "amountIn",
                  type: "uint256",
                },
              ],
              stateMutability: "pure",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "amountIn",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "reserveIn",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "reserveOut",
                  type: "uint256",
                },
              ],
              name: "getAmountOut",
              outputs: [
                {
                  internalType: "uint256",
                  name: "amountOut",
                  type: "uint256",
                },
              ],
              stateMutability: "pure",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "amountOut",
                  type: "uint256",
                },
                {
                  internalType: "address[]",
                  name: "path",
                  type: "address[]",
                },
              ],
              name: "getAmountsIn",
              outputs: [
                {
                  internalType: "uint256[]",
                  name: "amounts",
                  type: "uint256[]",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "amountIn",
                  type: "uint256",
                },
                {
                  internalType: "address[]",
                  name: "path",
                  type: "address[]",
                },
              ],
              name: "getAmountsOut",
              outputs: [
                {
                  internalType: "uint256[]",
                  name: "amounts",
                  type: "uint256[]",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "amountA",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "reserveA",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "reserveB",
                  type: "uint256",
                },
              ],
              name: "quote",
              outputs: [
                {
                  internalType: "uint256",
                  name: "amountB",
                  type: "uint256",
                },
              ],
              stateMutability: "pure",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "tokenA",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "tokenB",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "liquidity",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "amountAMin",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "amountBMin",
                  type: "uint256",
                },
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "deadline",
                  type: "uint256",
                },
              ],
              name: "removeLiquidity",
              outputs: [
                {
                  internalType: "uint256",
                  name: "amountA",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "amountB",
                  type: "uint256",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "token",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "liquidity",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "amountTokenMin",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "amountETHMin",
                  type: "uint256",
                },
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "deadline",
                  type: "uint256",
                },
              ],
              name: "removeLiquidityETH",
              outputs: [
                {
                  internalType: "uint256",
                  name: "amountToken",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "amountETH",
                  type: "uint256",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "token",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "liquidity",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "amountTokenMin",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "amountETHMin",
                  type: "uint256",
                },
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "deadline",
                  type: "uint256",
                },
              ],
              name: "removeLiquidityETHSupportingFeeOnTransferTokens",
              outputs: [
                {
                  internalType: "uint256",
                  name: "amountETH",
                  type: "uint256",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "token",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "liquidity",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "amountTokenMin",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "amountETHMin",
                  type: "uint256",
                },
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "deadline",
                  type: "uint256",
                },
                {
                  internalType: "bool",
                  name: "approveMax",
                  type: "bool",
                },
                {
                  internalType: "uint8",
                  name: "v",
                  type: "uint8",
                },
                {
                  internalType: "bytes32",
                  name: "r",
                  type: "bytes32",
                },
                {
                  internalType: "bytes32",
                  name: "s",
                  type: "bytes32",
                },
              ],
              name: "removeLiquidityETHWithPermit",
              outputs: [
                {
                  internalType: "uint256",
                  name: "amountToken",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "amountETH",
                  type: "uint256",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "token",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "liquidity",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "amountTokenMin",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "amountETHMin",
                  type: "uint256",
                },
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "deadline",
                  type: "uint256",
                },
                {
                  internalType: "bool",
                  name: "approveMax",
                  type: "bool",
                },
                {
                  internalType: "uint8",
                  name: "v",
                  type: "uint8",
                },
                {
                  internalType: "bytes32",
                  name: "r",
                  type: "bytes32",
                },
                {
                  internalType: "bytes32",
                  name: "s",
                  type: "bytes32",
                },
              ],
              name: "removeLiquidityETHWithPermitSupportingFeeOnTransferTokens",
              outputs: [
                {
                  internalType: "uint256",
                  name: "amountETH",
                  type: "uint256",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "tokenA",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "tokenB",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "liquidity",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "amountAMin",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "amountBMin",
                  type: "uint256",
                },
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "deadline",
                  type: "uint256",
                },
                {
                  internalType: "bool",
                  name: "approveMax",
                  type: "bool",
                },
                {
                  internalType: "uint8",
                  name: "v",
                  type: "uint8",
                },
                {
                  internalType: "bytes32",
                  name: "r",
                  type: "bytes32",
                },
                {
                  internalType: "bytes32",
                  name: "s",
                  type: "bytes32",
                },
              ],
              name: "removeLiquidityWithPermit",
              outputs: [
                {
                  internalType: "uint256",
                  name: "amountA",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "amountB",
                  type: "uint256",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "amountOut",
                  type: "uint256",
                },
                {
                  internalType: "address[]",
                  name: "path",
                  type: "address[]",
                },
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "deadline",
                  type: "uint256",
                },
              ],
              name: "swapETHForExactTokens",
              outputs: [
                {
                  internalType: "uint256[]",
                  name: "amounts",
                  type: "uint256[]",
                },
              ],
              stateMutability: "payable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "amountOutMin",
                  type: "uint256",
                },
                {
                  internalType: "address[]",
                  name: "path",
                  type: "address[]",
                },
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "deadline",
                  type: "uint256",
                },
              ],
              name: "swapExactETHForTokens",
              outputs: [
                {
                  internalType: "uint256[]",
                  name: "amounts",
                  type: "uint256[]",
                },
              ],
              stateMutability: "payable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "amountOutMin",
                  type: "uint256",
                },
                {
                  internalType: "address[]",
                  name: "path",
                  type: "address[]",
                },
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "deadline",
                  type: "uint256",
                },
              ],
              name: "swapExactETHForTokensSupportingFeeOnTransferTokens",
              outputs: [],
              stateMutability: "payable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "amountIn",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "amountOutMin",
                  type: "uint256",
                },
                {
                  internalType: "address[]",
                  name: "path",
                  type: "address[]",
                },
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "deadline",
                  type: "uint256",
                },
              ],
              name: "swapExactTokensForETH",
              outputs: [
                {
                  internalType: "uint256[]",
                  name: "amounts",
                  type: "uint256[]",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "amountIn",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "amountOutMin",
                  type: "uint256",
                },
                {
                  internalType: "address[]",
                  name: "path",
                  type: "address[]",
                },
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "deadline",
                  type: "uint256",
                },
              ],
              name: "swapExactTokensForETHSupportingFeeOnTransferTokens",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "amountIn",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "amountOutMin",
                  type: "uint256",
                },
                {
                  internalType: "address[]",
                  name: "path",
                  type: "address[]",
                },
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "deadline",
                  type: "uint256",
                },
              ],
              name: "swapExactTokensForTokens",
              outputs: [
                {
                  internalType: "uint256[]",
                  name: "amounts",
                  type: "uint256[]",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "amountIn",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "amountOutMin",
                  type: "uint256",
                },
                {
                  internalType: "address[]",
                  name: "path",
                  type: "address[]",
                },
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "deadline",
                  type: "uint256",
                },
              ],
              name: "swapExactTokensForTokensSupportingFeeOnTransferTokens",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "amountOut",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "amountInMax",
                  type: "uint256",
                },
                {
                  internalType: "address[]",
                  name: "path",
                  type: "address[]",
                },
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "deadline",
                  type: "uint256",
                },
              ],
              name: "swapTokensForExactETH",
              outputs: [
                {
                  internalType: "uint256[]",
                  name: "amounts",
                  type: "uint256[]",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "amountOut",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "amountInMax",
                  type: "uint256",
                },
                {
                  internalType: "address[]",
                  name: "path",
                  type: "address[]",
                },
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "deadline",
                  type: "uint256",
                },
              ],
              name: "swapTokensForExactTokens",
              outputs: [
                {
                  internalType: "uint256[]",
                  name: "amounts",
                  type: "uint256[]",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              stateMutability: "payable",
              type: "receive",
            },
          ],
        },
        PracticeSupplyERC20: {
          address: "0x476B163f1Dabee641Ee943bb101c816a7989d2FB",
          abi: [
            {
              inputs: [],
              stateMutability: "nonpayable",
              type: "constructor",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "owner",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "spender",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "value",
                  type: "uint256",
                },
              ],
              name: "Approval",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "from",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "value",
                  type: "uint256",
                },
              ],
              name: "Transfer",
              type: "event",
            },
            {
              stateMutability: "payable",
              type: "fallback",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "owner",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "spender",
                  type: "address",
                },
              ],
              name: "allowance",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "spender",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
              ],
              name: "approve",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "account",
                  type: "address",
                },
              ],
              name: "balanceOf",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "decimals",
              outputs: [
                {
                  internalType: "uint8",
                  name: "",
                  type: "uint8",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "spender",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "subtractedValue",
                  type: "uint256",
                },
              ],
              name: "decreaseAllowance",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "spender",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "addedValue",
                  type: "uint256",
                },
              ],
              name: "increaseAllowance",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "name",
              outputs: [
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "symbol",
              outputs: [
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "totalSupply",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
              ],
              name: "transfer",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "from",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
              ],
              name: "transferFrom",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              stateMutability: "payable",
              type: "receive",
            },
          ],
        },
      },
    },
  ],
  81041: [
    {
      name: "nordek",
      chainId: "81041",
      contracts: {
        LiquidityPool: {
          address: "0xcEAaa9dFfCaaF7280F17F9D26c93246Ae8870bBf",
          abi: [
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "address",
                  name: "contractAddress",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "string",
                  name: "action",
                  type: "string",
                },
                {
                  indexed: false,
                  internalType: "uint32",
                  name: "timeStamp",
                  type: "uint32",
                },
              ],
              name: "AccessedFunds",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "address",
                  name: "newAddress",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint32",
                  name: "timeStamp",
                  type: "uint32",
                },
              ],
              name: "AmountMigrated",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "address",
                  name: "contractAddress",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint32",
                  name: "timeStamp",
                  type: "uint32",
                },
              ],
              name: "ContractVerified",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint32",
                  name: "timeStamp",
                  type: "uint32",
                },
              ],
              name: "OwnerAccessFunds",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "previousOwner",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "newOwner",
                  type: "address",
                },
              ],
              name: "OwnershipTransferred",
              type: "event",
            },
            {
              stateMutability: "payable",
              type: "fallback",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_amount",
                  type: "uint256",
                },
                {
                  internalType: "string",
                  name: "_action",
                  type: "string",
                },
              ],
              name: "accessFunds",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_amount",
                  type: "uint256",
                },
              ],
              name: "extractFunds",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
                {
                  internalType: "address",
                  name: "newAddress",
                  type: "address",
                },
              ],
              name: "migration",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "owner",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "renounceOwnership",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "newOwner",
                  type: "address",
                },
              ],
              name: "transferOwnership",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              name: "verifiedContract",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_contract",
                  type: "address",
                },
              ],
              name: "verifyContract",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              stateMutability: "payable",
              type: "receive",
            },
          ],
        },
        StakingContract: {
          address: "0x4C56D360F1e8a45B45b191dD52589a564c150378",
          abi: [
            {
              inputs: [
                {
                  internalType: "uint16",
                  name: "_apy",
                  type: "uint16",
                },
                {
                  internalType: "uint256",
                  name: "_minimumStake",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_frequency",
                  type: "uint256",
                },
                {
                  internalType: "address",
                  name: "_liquidityPool",
                  type: "address",
                },
              ],
              stateMutability: "nonpayable",
              type: "constructor",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "user",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "totalReward",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint32",
                  name: "timeOfClaim",
                  type: "uint32",
                },
              ],
              name: "AllRewardClaimed",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "address",
                  name: "newAddress",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint32",
                  name: "migrationTime",
                  type: "uint32",
                },
              ],
              name: "AmountMigrated",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "apy",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint32",
                  name: "timeStamp",
                  type: "uint32",
                },
              ],
              name: "ApyUpdated",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "frequency",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint32",
                  name: "timeStamp",
                  type: "uint32",
                },
              ],
              name: "FrequencyUpdated",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "uint8",
                  name: "version",
                  type: "uint8",
                },
              ],
              name: "Initialized",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "address",
                  name: "newPool",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint32",
                  name: "timeStamp",
                  type: "uint32",
                },
              ],
              name: "LiquidityPoolUpdated",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "minimumStake",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint32",
                  name: "timeStamp",
                  type: "uint32",
                },
              ],
              name: "MinimumStakeUpdated",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "previousOwner",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "newOwner",
                  type: "address",
                },
              ],
              name: "OwnershipTransferred",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "user",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint32",
                  name: "stakeTime",
                  type: "uint32",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "slotId",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "rewardsLeft",
                  type: "uint256",
                },
              ],
              name: "ReStaked",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "address",
                  name: "user",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "restakedAmount",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint32",
                  name: "timeStamp",
                  type: "uint32",
                },
              ],
              name: "RestakedAll",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "user",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "totalReward",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint32",
                  name: "timeOfClaim",
                  type: "uint32",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "slotId",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "rewardsLeft",
                  type: "uint256",
                },
              ],
              name: "RewardClaimed",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "user",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint32",
                  name: "stakeTime",
                  type: "uint32",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "slotId",
                  type: "uint256",
                },
              ],
              name: "Staked",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "user",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint32",
                  name: "unstakeTime",
                  type: "uint32",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "slotid",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "rewards",
                  type: "uint256",
                },
              ],
              name: "Unstaked",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "user",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "totalAmount",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "rewards",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint32",
                  name: "unstakeTime",
                  type: "uint32",
                },
              ],
              name: "UnstakedAllTokens",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "user",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint32",
                  name: "unstakeTime",
                  type: "uint32",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "_slotId",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "rewardsLeft",
                  type: "uint256",
                },
              ],
              name: "UnstakedTokens",
              type: "event",
            },
            {
              stateMutability: "payable",
              type: "fallback",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              name: "apy",
              outputs: [
                {
                  internalType: "uint16",
                  name: "value",
                  type: "uint16",
                },
                {
                  internalType: "uint32",
                  name: "changeTime",
                  type: "uint32",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "claimAllRewards",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_rewardAmount",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_slotId",
                  type: "uint256",
                },
              ],
              name: "claimRewards",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "frequency",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "getCurrentApy",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "getTotalRewards",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_slotId",
                  type: "uint256",
                },
              ],
              name: "getUserRewards",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_slotId",
                  type: "uint256",
                },
              ],
              name: "getUserStake",
              outputs: [
                {
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
                {
                  internalType: "uint32",
                  name: "startTime",
                  type: "uint32",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "getUserStakesInfo",
              outputs: [
                {
                  components: [
                    {
                      internalType: "uint256",
                      name: "amount",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "rewards",
                      type: "uint256",
                    },
                    {
                      internalType: "uint32",
                      name: "startTime",
                      type: "uint32",
                    },
                    {
                      internalType: "uint256",
                      name: "id",
                      type: "uint256",
                    },
                  ],
                  internalType: "struct StakingContract.Slot[]",
                  name: "",
                  type: "tuple[]",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "getUserTotalStakes",
              outputs: [
                {
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "liquidityPool",
              outputs: [
                {
                  internalType: "contract ILiquidityPool",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
                {
                  internalType: "address",
                  name: "newAddress",
                  type: "address",
                },
              ],
              name: "migration",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "minimumStake",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "owner",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "pause",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "renounceOwnership",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_amount",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_slotId",
                  type: "uint256",
                },
              ],
              name: "restake",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
              ],
              name: "restake",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "restakeAll",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint16",
                  name: "_newAPY",
                  type: "uint16",
                },
              ],
              name: "setAPY",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_frequency",
                  type: "uint256",
                },
              ],
              name: "setFrequency",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_liquidityPool",
                  type: "address",
                },
              ],
              name: "setLiquidityPool",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_newMinimumStake",
                  type: "uint256",
                },
              ],
              name: "setMinimumStake",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "stake",
              outputs: [],
              stateMutability: "payable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              name: "stakes",
              outputs: [
                {
                  internalType: "uint256",
                  name: "counter",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "newOwner",
                  type: "address",
                },
              ],
              name: "transferOwnership",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
              ],
              name: "unstake",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_amount",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_slotId",
                  type: "uint256",
                },
              ],
              name: "unstake",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "unstakeAll",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bool",
                  name: "_pause",
                  type: "bool",
                },
              ],
              name: "updateStakingPause",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              stateMutability: "payable",
              type: "receive",
            },
          ],
        },
        UniswapV2Factory: {
          address: "0x2D87FaACf6F70ACe77D3dB3DAA9235333089cf4E",
          abi: [
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_feeToSetter",
                  type: "address",
                },
              ],
              stateMutability: "nonpayable",
              type: "constructor",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "token0",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "token1",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "address",
                  name: "pair",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              name: "PairCreated",
              type: "event",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              name: "allPairs",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "allPairsLength",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "tokenA",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "tokenB",
                  type: "address",
                },
              ],
              name: "createPair",
              outputs: [
                {
                  internalType: "address",
                  name: "pair",
                  type: "address",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "feeTo",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "feeToSetter",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              name: "getPair",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_feeTo",
                  type: "address",
                },
              ],
              name: "setFeeTo",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_feeToSetter",
                  type: "address",
                },
              ],
              name: "setFeeToSetter",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
          ],
        },
        WNRK: {
          address: "0xC5C5B963eCf571B6817b0884c170f8B9C59c9A00",
          abi: [
            {
              inputs: [],
              stateMutability: "nonpayable",
              type: "constructor",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "owner",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "spender",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "value",
                  type: "uint256",
                },
              ],
              name: "Approval",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "from",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "value",
                  type: "uint256",
                },
              ],
              name: "Transfer",
              type: "event",
            },
            {
              stateMutability: "payable",
              type: "fallback",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "owner",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "spender",
                  type: "address",
                },
              ],
              name: "allowance",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "spender",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
              ],
              name: "approve",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "account",
                  type: "address",
                },
              ],
              name: "balanceOf",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "decimals",
              outputs: [
                {
                  internalType: "uint8",
                  name: "",
                  type: "uint8",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "spender",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "subtractedValue",
                  type: "uint256",
                },
              ],
              name: "decreaseAllowance",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "deposit",
              outputs: [],
              stateMutability: "payable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "spender",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "addedValue",
                  type: "uint256",
                },
              ],
              name: "increaseAllowance",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "name",
              outputs: [
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "symbol",
              outputs: [
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "totalSupply",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
              ],
              name: "transfer",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "from",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
              ],
              name: "transferFrom",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_amount",
                  type: "uint256",
                },
              ],
              name: "withdraw",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              stateMutability: "payable",
              type: "receive",
            },
          ],
        },
        UniswapV2Router02: {
          address: "0xa84014B6CC13210A6B43ee33d5b6DBF674BBC1C1",
          abi: [
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_factory",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "_WETH",
                  type: "address",
                },
              ],
              stateMutability: "nonpayable",
              type: "constructor",
            },
            {
              inputs: [],
              name: "WETH",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "tokenA",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "tokenB",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "amountADesired",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "amountBDesired",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "amountAMin",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "amountBMin",
                  type: "uint256",
                },
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "deadline",
                  type: "uint256",
                },
              ],
              name: "addLiquidity",
              outputs: [
                {
                  internalType: "uint256",
                  name: "amountA",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "amountB",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "liquidity",
                  type: "uint256",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "token",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "amountTokenDesired",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "amountTokenMin",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "amountETHMin",
                  type: "uint256",
                },
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "deadline",
                  type: "uint256",
                },
              ],
              name: "addLiquidityETH",
              outputs: [
                {
                  internalType: "uint256",
                  name: "amountToken",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "amountETH",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "liquidity",
                  type: "uint256",
                },
              ],
              stateMutability: "payable",
              type: "function",
            },
            {
              inputs: [],
              name: "factory",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "amountOut",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "reserveIn",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "reserveOut",
                  type: "uint256",
                },
              ],
              name: "getAmountIn",
              outputs: [
                {
                  internalType: "uint256",
                  name: "amountIn",
                  type: "uint256",
                },
              ],
              stateMutability: "pure",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "amountIn",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "reserveIn",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "reserveOut",
                  type: "uint256",
                },
              ],
              name: "getAmountOut",
              outputs: [
                {
                  internalType: "uint256",
                  name: "amountOut",
                  type: "uint256",
                },
              ],
              stateMutability: "pure",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "amountOut",
                  type: "uint256",
                },
                {
                  internalType: "address[]",
                  name: "path",
                  type: "address[]",
                },
              ],
              name: "getAmountsIn",
              outputs: [
                {
                  internalType: "uint256[]",
                  name: "amounts",
                  type: "uint256[]",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "amountIn",
                  type: "uint256",
                },
                {
                  internalType: "address[]",
                  name: "path",
                  type: "address[]",
                },
              ],
              name: "getAmountsOut",
              outputs: [
                {
                  internalType: "uint256[]",
                  name: "amounts",
                  type: "uint256[]",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "amountA",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "reserveA",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "reserveB",
                  type: "uint256",
                },
              ],
              name: "quote",
              outputs: [
                {
                  internalType: "uint256",
                  name: "amountB",
                  type: "uint256",
                },
              ],
              stateMutability: "pure",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "tokenA",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "tokenB",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "liquidity",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "amountAMin",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "amountBMin",
                  type: "uint256",
                },
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "deadline",
                  type: "uint256",
                },
              ],
              name: "removeLiquidity",
              outputs: [
                {
                  internalType: "uint256",
                  name: "amountA",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "amountB",
                  type: "uint256",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "token",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "liquidity",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "amountTokenMin",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "amountETHMin",
                  type: "uint256",
                },
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "deadline",
                  type: "uint256",
                },
              ],
              name: "removeLiquidityETH",
              outputs: [
                {
                  internalType: "uint256",
                  name: "amountToken",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "amountETH",
                  type: "uint256",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "token",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "liquidity",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "amountTokenMin",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "amountETHMin",
                  type: "uint256",
                },
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "deadline",
                  type: "uint256",
                },
              ],
              name: "removeLiquidityETHSupportingFeeOnTransferTokens",
              outputs: [
                {
                  internalType: "uint256",
                  name: "amountETH",
                  type: "uint256",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "token",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "liquidity",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "amountTokenMin",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "amountETHMin",
                  type: "uint256",
                },
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "deadline",
                  type: "uint256",
                },
                {
                  internalType: "bool",
                  name: "approveMax",
                  type: "bool",
                },
                {
                  internalType: "uint8",
                  name: "v",
                  type: "uint8",
                },
                {
                  internalType: "bytes32",
                  name: "r",
                  type: "bytes32",
                },
                {
                  internalType: "bytes32",
                  name: "s",
                  type: "bytes32",
                },
              ],
              name: "removeLiquidityETHWithPermit",
              outputs: [
                {
                  internalType: "uint256",
                  name: "amountToken",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "amountETH",
                  type: "uint256",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "token",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "liquidity",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "amountTokenMin",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "amountETHMin",
                  type: "uint256",
                },
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "deadline",
                  type: "uint256",
                },
                {
                  internalType: "bool",
                  name: "approveMax",
                  type: "bool",
                },
                {
                  internalType: "uint8",
                  name: "v",
                  type: "uint8",
                },
                {
                  internalType: "bytes32",
                  name: "r",
                  type: "bytes32",
                },
                {
                  internalType: "bytes32",
                  name: "s",
                  type: "bytes32",
                },
              ],
              name: "removeLiquidityETHWithPermitSupportingFeeOnTransferTokens",
              outputs: [
                {
                  internalType: "uint256",
                  name: "amountETH",
                  type: "uint256",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "tokenA",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "tokenB",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "liquidity",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "amountAMin",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "amountBMin",
                  type: "uint256",
                },
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "deadline",
                  type: "uint256",
                },
                {
                  internalType: "bool",
                  name: "approveMax",
                  type: "bool",
                },
                {
                  internalType: "uint8",
                  name: "v",
                  type: "uint8",
                },
                {
                  internalType: "bytes32",
                  name: "r",
                  type: "bytes32",
                },
                {
                  internalType: "bytes32",
                  name: "s",
                  type: "bytes32",
                },
              ],
              name: "removeLiquidityWithPermit",
              outputs: [
                {
                  internalType: "uint256",
                  name: "amountA",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "amountB",
                  type: "uint256",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "amountOut",
                  type: "uint256",
                },
                {
                  internalType: "address[]",
                  name: "path",
                  type: "address[]",
                },
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "deadline",
                  type: "uint256",
                },
              ],
              name: "swapETHForExactTokens",
              outputs: [
                {
                  internalType: "uint256[]",
                  name: "amounts",
                  type: "uint256[]",
                },
              ],
              stateMutability: "payable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "amountOutMin",
                  type: "uint256",
                },
                {
                  internalType: "address[]",
                  name: "path",
                  type: "address[]",
                },
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "deadline",
                  type: "uint256",
                },
              ],
              name: "swapExactETHForTokens",
              outputs: [
                {
                  internalType: "uint256[]",
                  name: "amounts",
                  type: "uint256[]",
                },
              ],
              stateMutability: "payable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "amountOutMin",
                  type: "uint256",
                },
                {
                  internalType: "address[]",
                  name: "path",
                  type: "address[]",
                },
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "deadline",
                  type: "uint256",
                },
              ],
              name: "swapExactETHForTokensSupportingFeeOnTransferTokens",
              outputs: [],
              stateMutability: "payable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "amountIn",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "amountOutMin",
                  type: "uint256",
                },
                {
                  internalType: "address[]",
                  name: "path",
                  type: "address[]",
                },
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "deadline",
                  type: "uint256",
                },
              ],
              name: "swapExactTokensForETH",
              outputs: [
                {
                  internalType: "uint256[]",
                  name: "amounts",
                  type: "uint256[]",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "amountIn",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "amountOutMin",
                  type: "uint256",
                },
                {
                  internalType: "address[]",
                  name: "path",
                  type: "address[]",
                },
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "deadline",
                  type: "uint256",
                },
              ],
              name: "swapExactTokensForETHSupportingFeeOnTransferTokens",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "amountIn",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "amountOutMin",
                  type: "uint256",
                },
                {
                  internalType: "address[]",
                  name: "path",
                  type: "address[]",
                },
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "deadline",
                  type: "uint256",
                },
              ],
              name: "swapExactTokensForTokens",
              outputs: [
                {
                  internalType: "uint256[]",
                  name: "amounts",
                  type: "uint256[]",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "amountIn",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "amountOutMin",
                  type: "uint256",
                },
                {
                  internalType: "address[]",
                  name: "path",
                  type: "address[]",
                },
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "deadline",
                  type: "uint256",
                },
              ],
              name: "swapExactTokensForTokensSupportingFeeOnTransferTokens",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "amountOut",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "amountInMax",
                  type: "uint256",
                },
                {
                  internalType: "address[]",
                  name: "path",
                  type: "address[]",
                },
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "deadline",
                  type: "uint256",
                },
              ],
              name: "swapTokensForExactETH",
              outputs: [
                {
                  internalType: "uint256[]",
                  name: "amounts",
                  type: "uint256[]",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "amountOut",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "amountInMax",
                  type: "uint256",
                },
                {
                  internalType: "address[]",
                  name: "path",
                  type: "address[]",
                },
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "deadline",
                  type: "uint256",
                },
              ],
              name: "swapTokensForExactTokens",
              outputs: [
                {
                  internalType: "uint256[]",
                  name: "amounts",
                  type: "uint256[]",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              stateMutability: "payable",
              type: "receive",
            },
          ],
        },
        PracticeSupplyERC20: {
          address: "0xBf148975eeF04287d12902200494498DF60fC01A",
          abi: [
            {
              inputs: [],
              stateMutability: "nonpayable",
              type: "constructor",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "owner",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "spender",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "value",
                  type: "uint256",
                },
              ],
              name: "Approval",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "from",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "value",
                  type: "uint256",
                },
              ],
              name: "Transfer",
              type: "event",
            },
            {
              stateMutability: "payable",
              type: "fallback",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "owner",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "spender",
                  type: "address",
                },
              ],
              name: "allowance",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "spender",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
              ],
              name: "approve",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "account",
                  type: "address",
                },
              ],
              name: "balanceOf",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "decimals",
              outputs: [
                {
                  internalType: "uint8",
                  name: "",
                  type: "uint8",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "spender",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "subtractedValue",
                  type: "uint256",
                },
              ],
              name: "decreaseAllowance",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "spender",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "addedValue",
                  type: "uint256",
                },
              ],
              name: "increaseAllowance",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "name",
              outputs: [
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "symbol",
              outputs: [
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "totalSupply",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
              ],
              name: "transfer",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "from",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
              ],
              name: "transferFrom",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              stateMutability: "payable",
              type: "receive",
            },
          ],
        },
      },
    },
  ],
} as const;

export default contracts;
