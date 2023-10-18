const contracts = {
  31337: [
    {
      name: "Anvil",
      chainId: "31337",
      contracts: {
        null: {
          address: "0xA66F165cD51125BD17b044C6977233873fEbb178",
          abi: [
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
        UniswapV2Factory: {
          address: "0xFB958AB67aB585Bb1670C2C2A0D56Eba31F07A4d",
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
          address: "0x461b1b4AC423F418464200AE467Dc40c77D8E497",
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
          address: "0xcc8E48E56f6689b54B4F6C0F84FeeB86D12998f5",
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
      },
    },
  ],
} as const;

export default contracts;
