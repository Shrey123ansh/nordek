//import PriceComponent from "./PriceBox";
import { useEffect, useState } from "react";
import SelectToken from "../swapComponents/SelectToken";
import LiquidityFooter from "./LiquidityFooter";
import SlippageDetails from "./SlippageDetails";
import { formatEther, parseEther } from "viem";
import { Liquidity } from "~~/pages/api/liquidity";
import { useAccount } from "wagmi";
import { ArrowDownIcon } from "@heroicons/react/24/outline";
import { localTokens, tokenType } from "~~/data/data";
import { useDeployedContractInfo, useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { readContract } from '@wagmi/core'
import pairABI from "../../../foundry/out/UniswapV2Pair.sol/UniswapV2Pair.json";
import { nordek } from "~~/utils/NordekChain";
import { writeContract } from '@wagmi/core'
import erc20ABI from "../../../foundry/out/ERC20.sol/ERC20.json";
import { updateUserData } from "../StakingComponents/APICallFunctions";
import axios from "axios";
import TokenListPopup from "../ui/TokenListPopup";
import { Select } from "../Select/Select";
import { MdArrowDropDown } from "react-icons/md";
import { fetchBalance } from '@wagmi/core'


export default function LiquidityMain() {
  const address0 = "0x0000000000000000000000000000000000000000"
  const [token0Amount, setToken0Amount] = useState<Number>(0);
  const [token1Amount, setToken1Amount] = useState<Number>(0);
  const { address: account } = useAccount();
  const [token0, setToken0] = useState<tokenType>(localTokens.NRK);
  const [token1, setToken1] = useState<tokenType>(localTokens.PERC);
  const [pairContract, setPairContract] = useState("0x0000000000000000000000000000000000000000")
  const [reserveA, setReserve1] = useState(0)
  const [reserveB, setReserve2] = useState(0)
  const { data: routerContract } = useDeployedContractInfo("UniswapV2Router02");
  const [slippage, setSlippage] = useState(0.5)
  const [update, setUpdate] = useState(0)
  const token0Min = Number(token0Amount) - ((Number(token0Amount) * slippage) / 100)
  const token1Min = Number(token1Amount) - ((Number(token1Amount) * slippage) / 100)
  const currentDate = new Date();
  const unixTimestampInSeconds = Math.floor(currentDate.getTime() / 1000);
  const [share, setShare] = useState(0)
  const [tokenAFromContract, setTokenAFromContract] = useState(address0)
  const [lpTokens, setLPTokens] = useState("-")
  const [pairTotalSupply, setPairTotalSupply] = useState(0)
  const [kLast, setKLast] = useState(0)
  const token0AmountNumber: number = Number(token0Amount)
  const token1AmountNumber: number = Number(token1Amount)
  const [balance0, setBalance0] = useState(0)
  const [balance1, setBalance1] = useState(0)

  const { data: pc, isFetched } = useScaffoldContractRead({
    contractName: "UniswapV2Factory",
    functionName: "getPair",
    args: [token0.address, token1.address],
    account: account,

  });

  useEffect(() => {
    setPairContract(pc)
    if (pc === address0) {
      setShare(100)
    }
    if (pc !== address0) {
      setShare(0)
    }
  }, [isFetched])



  const { writeAsync: addLiquidityETHToken0 } = useScaffoldContractWrite({
    contractName: "UniswapV2Router02",
    functionName: "addLiquidityETH",
    args: [
      token1.address,
      parseEther(`${token1Amount}`),
      parseEther(`${token1Min}`),
      parseEther(`${token0Min}`),
      account,
      BigInt(unixTimestampInSeconds + 300)
    ],
    value: `${token0AmountNumber}`,
    onBlockConfirmation: (txnReceipt) => {
      console.log("Transaction blockHash", txnReceipt.blockHash);
    },
    onSuccess: async () => {
      await addToDataBase()
      setToken0Amount(0)
      setToken1Amount(0)
      setUpdate(update + 1)
    },
    onError(error, variables, context) {
      console.log("error " + error)
      console.log("variables " + variables)
      console.log("context " + context)
    },
  });
  const { writeAsync: addLiquidityETHToken1 } = useScaffoldContractWrite({
    contractName: "UniswapV2Router02",
    functionName: "addLiquidityETH",
    args: [
      token0.address,
      parseEther(`${token0Amount}`),
      parseEther(`${token0Min}`),
      parseEther(`${token1Min}`),
      account,
      BigInt(unixTimestampInSeconds + 300)
    ],
    value: `${token1AmountNumber}`,
    onBlockConfirmation: (txnReceipt) => {
      console.log("Transaction blockHash", txnReceipt.blockHash);
    },
    onSuccess: async () => {
      await addToDataBase()
      setToken0Amount(0)
      setToken1Amount(0)
      setUpdate(update + 1)
    }
  });
  const { writeAsync: addLiquidity, isLoading, isMining } = useScaffoldContractWrite({
    contractName: "UniswapV2Router02",
    functionName: "addLiquidity",
    args: [
      token0.address,
      token1.address,
      parseEther(`${token0Amount}`),
      parseEther(`${token1Amount}`),
      parseEther(`${token0Min}`),
      parseEther(`${token1Min}`),
      account,
      BigInt(unixTimestampInSeconds + 300)
    ],

    onBlockConfirmation: (txnReceipt) => {
      console.log("Transaction blockHash", txnReceipt.blockHash);
    },
    onSuccess: async () => {
      await addToDataBase()
      setToken0Amount(0)
      setToken1Amount(0)
      setUpdate(update + 1)
    }
  });



  const addToDataBase = async () => {
    const liquidity: Liquidity = {
      token0: token0,
      token1: token1,
      token0Amount: token0Amount,
      token1Amount: token1Amount,
      pairContract: pairContract,
      user: account,
      lpTokens: Number(lpTokens)
    }

    const headers = {
      "Content-Type": "application/json",
      Authorization: "JWT fefege...",
    };
    try {
      const response = await axios.post("/api/liquidity", liquidity, {
        headers: headers,
      });

      console.log(response);
      console.log("added to database ");
    } catch (error) {
      console.log(error);
    }
  }



  const handleAddLiquidity = async () => {
    const nrkAddress: string = localTokens.NRK.address
    if (token0Amount === 0 || token1Amount === 0) return
    if (token0.address === nrkAddress || token1.address === nrkAddress) {
      // one of the token is native NRK token 
      // addLiquidityETH
      if (token0.address === nrkAddress) {
        try {
          await writeContract({
            address: token1.address,
            abi: erc20ABI.abi,
            functionName: 'approve',
            args: [routerContract.address, parseEther(`${token1Amount}`)],
          })

          await addLiquidityETHToken0()

        } catch (error) { }
      } else if (token1.address === nrkAddress) {
        try {
          await writeContract({
            address: token0.address,
            abi: erc20ABI.abi,
            functionName: 'approve',
            args: [routerContract.address, parseEther(`${token0Amount}`)],
          })
          await addLiquidityETHToken1()
        } catch (error) { }
      }


    }
    else {
      // addLiquidity 
      try {
        await writeContract({
          address: token0.address,
          abi: erc20ABI.abi,
          functionName: 'approve',
          args: [routerContract.address, parseEther(`${token0Amount}`)],
        })
      } catch (error) { }
      try {

        await writeContract({
          address: token1.address,
          abi: erc20ABI.abi,
          functionName: 'approve',
          args: [routerContract.address, parseEther(`${token1Amount}`)],
        })
      } catch (error) { }
      await addLiquidity()
    }

  };



  const { data: factoryContract } = useDeployedContractInfo("UniswapV2Factory")

  const setTokenA = (token: tokenType) => {
    if (token.address !== token1.address) {
      setToken0(token)
    }
  }
  const setTokenB = (token: tokenType) => {
    if (token.address !== token0.address) {
      setToken1(token)
    }
  }
  const getPairAddress = async () => {
    setToken0Amount(0)
    setToken1Amount(0)
    console.log("pair contract function")
    try {
      const pairAddress = await readContract({
        address: factoryContract?.address,
        abi: factoryContract?.abi,
        functionName: 'getPair',
        args: [token0.address, token1.address],
        account: account
      })
      console.log("pair contrat from toggle" + pairAddress)

      setPairContract(pairAddress)
      if (pairAddress === address0) {
        setShare(100)
        setReserve1(0)
        setReserve2(0)
      }
      if (pairAddress !== address0) {
        setShare(0)
      }

    } catch (error) {

    }
  }



  useEffect(() => {
    console.log("pair contract getting ")
    getPairAddress()
  }, [token0, token1, update])



  useEffect(() => {
    const getData = async () => {
      if (pairContract !== "0x0000000000000000000000000000000000000000" && pairContract !== undefined) {
        console.log(pairContract)
        const reserves = await readContract({
          address: pairContract,
          abi: pairABI.abi,
          functionName: "getReserves",
          account: account,
          chainId: nordek.id
        })
        const tokenA = await readContract({
          address: pairContract,
          abi: pairABI.abi,
          functionName: "token0",
          account: account,
          chainId: nordek.id
        })
        setTokenAFromContract(String(tokenA))
        const reserve1 = Number(formatEther(reserves[0]))
        const reserve2 = Number(formatEther(reserves[1]))

        if (tokenA === token0.address) {
          setReserve1(reserve1)
          setReserve2(reserve2)
        } else if (tokenA === token1.address) {
          setReserve2(reserve1)
          setReserve1(reserve2)
        }
        const totalSupply = await readContract({
          address: pairContract,
          abi: pairABI.abi,
          functionName: "totalSupply",
          account: account,
          chainId: nordek.id
        })
        const supply = Number(formatEther(BigInt(Number(totalSupply))))
        setPairTotalSupply(supply)
        // setPairTotalSupply(Number(formatEther(BigInt(totalSupply))))
        var kLastValue = await readContract({
          address: pairContract,
          abi: pairABI.abi,
          functionName: "kLast",
          account: account,
          chainId: nordek.id
        })
        // setKLast(Number(formatEther(BigInt(Number(kLastValue)))))
        kLastValue = BigInt(Number(kLastValue)) / BigInt(10 ** 36)
        // console.log(kLastValue)
        setKLast(Number(kLastValue))
      }
    }
    getData()
  }, [pairContract, update])


  useEffect(() => {
    const getBalance = async () => {
      console.log("fetching....")
      try {
        const nrkAddress = localTokens.NRK.address
        if (token0.address === nrkAddress || token1.address === nrkAddress) {

          const balanceNRK = await fetchBalance({
            address: account,
          })
          if (token0.address === nrkAddress) {
            const balanceB = await readContract({
              address: token1.address,
              abi: erc20ABI.abi,
              functionName: 'balanceOf',
              args: [account],
              account: account
            })
            setBalance0(Number(balanceNRK.formatted))
            setBalance1(Number(formatEther(balanceB)))

          } else {
            const balanceA = await readContract({
              address: token0.address,
              abi: erc20ABI.abi,
              functionName: 'balanceOf',
              args: [account],
              account: account
            })
            setBalance0(Number(formatEther(balanceA)))
            setBalance1(Number(balanceNRK.formatted))
          }
        } else {
          const balanceA = await readContract({
            address: token0.address,
            abi: erc20ABI.abi,
            functionName: 'balanceOf',
            args: [account],
            account: account
          })
          const balanceB = await readContract({
            address: token1.address,
            abi: erc20ABI.abi,
            functionName: 'balanceOf',
            args: [account],
            account: account
          })
          setBalance0(Number(formatEther(balanceA)))
          setBalance1(Number(formatEther(balanceB)))
        }
      } catch (e) {
        console.log(e)
      }

    }
    getBalance()
  }, [token0, token1, account])



  useEffect(() => {
    if (pairContract !== address0) {
      setShare(((Number(token0Amount) * 100) / reserveA).toFixed(3))

      // calculating lp tokens user will get 

      var reserve0 = 0;
      var reserve1 = 0;
      var amount0: Number = 0;
      var amount1: Number = 0;
      if (tokenAFromContract === token0.address) {
        reserve0 = reserveA
        reserve1 = reserveB
        amount0 = token0Amount
        amount1 = token1Amount
      }
      else {
        reserve0 = reserveB
        reserve1 = reserveA
        amount0 = token1Amount
        amount1 = token0Amount
      }
      const rootK = Math.sqrt((reserve0 + amount0) * (reserve1 + amount1))
      const rootKLast = Math.sqrt(kLast)

      const numerator = pairTotalSupply * (rootK - rootKLast)
      const denominator = rootK * 5 + rootKLast
      const feeMinted = numerator / denominator
      console.log(feeMinted)
      const updatedSupply = pairTotalSupply + feeMinted
      var liquidity = 0
      const value1 = ((Number(amount0) * updatedSupply) / reserve0)
      const value2 = ((Number(amount1) * updatedSupply) / reserve1)

      liquidity = value1 > value2 ? value2 : value1

      setLPTokens(String(liquidity.toFixed(3)))
    }

  }, [token0Amount, token1Amount])



  const setTokenAmount0Override = (value: Number) => {
    if (pairContract !== "0x0000000000000000000000000000000000000000" && pairContract !== undefined) {
      setToken0Amount(value)
      setToken1Amount((Number(value) * reserveB) / reserveA)
    } else {
      setToken0Amount(value)
    }
    setLPTokens("-")
  }
  const setTokenAmount1Override = (value: Number) => {
    if (pairContract !== "0x0000000000000000000000000000000000000000" && pairContract !== undefined) {
      setToken1Amount(value)
      setToken0Amount((Number(value) * reserveA) / reserveB)
    }
    else {
      setToken1Amount(value)
    }
    setLPTokens("-")
  }

  return (
    <div className="flex flex-col w-full  ">
      {
        pairContract === "0x0000000000000000000000000000000000000000" &&
        <div className=" text-sm  text-center  font-bold mb-4 " >
          ! NO PAIR EXISTS FOR THESE TWO TOKENS !
        </div>
      }



      <div className=" text-[10px] font-semibold  " >CHOOSE TOKEN PAIR</div>
      <div className="flex flex-row items-center w-full  justify-between mt-4  " >
        <div className="w-full mr-4 " >
          {/* <Select setToken={setTokenA} token={token0} /> */}
          <LiquidityTokenSelectButton setToken={setTokenA} token={token0} />
        </div>
        <div className=" font-bold text-lg " >+</div>
        <div className="w-full ml-4 " >
          {/* <Select setToken={setTokenB} token={token1} /> */}
          <LiquidityTokenSelectButton setToken={setTokenB} token={token1} />
        </div>
      </div>



      <div className=" text-[10px] font-semibold mt-8 " >DEPOSIT AMOUNT</div>
      <TokenAmountEntry tokenAmount={token0Amount} setTokenAmount={setTokenAmount0Override} token={token0} balance={balance0} />

      <TokenAmountEntry tokenAmount={token1Amount} setTokenAmount={setTokenAmount1Override} token={token1} balance={balance1} />


      <LiquidityFooter handleAddLiquidity={handleAddLiquidity} pairContract={pairContract} token1={token0} token2={token1} reserve1={reserveA} reserve2={reserveB} slippage={slippage} setSlippageValue={setSlippage} share={share} lpTokens={lpTokens}></LiquidityFooter>
    </div>
  );
}




const TokenAmountEntry = ({ setTokenAmount, tokenAmount, token, balance }: { balance: Number, setTokenAmount: (value: Number) => void, tokenAmount: Number, token: tokenType }) => {
  return (
    <div className="mt-4   " >
      <div className="flex flex-row items-center  justify-between" >
        <div className="flex flex-row items-center" >
          <img src={token.logo} className="w-6 h-6 rounded-full mr-2" />
          <div className=" font-semibold   " >
            {token.symbol}
          </div>
        </div>
        <div className="font-semibold text-sm"  >{`Balance : ${balance}`}</div>
      </div>

      <div className=" flex flex-col  shadow-md bg-gradient-to-r from-[#141414] to-[#593FB1] rounded-lg px-4 py-4 mb-4 mt-4  " >
        <input
          type="number"
          placeholder="0"
          value={tokenAmount?.toString()}
          className="input input-sm pr-0 bg-transparent w-full text-lg  font-semibold  input-ghost max-w-md text-right rounded-none focus:outline-none leading-tight [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          onChange={e => {
            const value = Number(e.target.value)
            if (value < 0) {
              return
            }
            setTokenAmount(value);
          }}
        />
        <button className=" self-end font-semibold   bg-secondary rounded-full px-2 mt-2   " onClick={() => {
          // 0.01% buffer for gas fee 
          var _balance = Number(balance) - (Number(balance) / 10000)
          setTokenAmount(_balance)
        }}  >Max</button>
      </div>


    </div>
  );
}





const LiquidityTokenSelectButton = ({ setToken, token }: {
  setToken: () => void,
  token: tokenType
}) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handlePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <button className="rounded-full flex flex-row bg-white   items-center   text-gray-800 text-xs py-1 px-4 w-full " onClick={handlePopup} >
      <div className="flex flex-row  flex-1" >
        <div className="flex items-center font-semibold text-base  justify-between space-x-4  ">
          {" "}
          <img src={token.logo} className="w-6 h-6 rounded-full mr-2" /> {token.symbol}

        </div>
        <TokenListPopup isOpen={isPopupOpen} onClose={handlePopup} setToken={setToken}></TokenListPopup>
      </div>
      <MdArrowDropDown className="text-gray-800  " size={15} />
    </button>
  );
}
