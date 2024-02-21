//import PriceComponent from "./PriceBox";
import { useEffect, useState } from "react";
import erc20ABI from "../../../foundry/out/ERC20.sol/ERC20.json";
import pairABI from "../../../foundry/out/UniswapV2Pair.sol/UniswapV2Pair.json";
import { Select } from "../Select/Select";
import { updateUserData } from "../StakingComponents/APICallFunctions";
import SelectToken from "../swapComponents/SelectToken";
import TokenListPopup from "../ui/TokenListPopup";
import LiquidityFooter from "./LiquidityFooter";
import SlippageDetails from "./SlippageDetails";
import { readContract } from "@wagmi/core";
import { writeContract } from "@wagmi/core";
import { fetchBalance, waitForTransaction } from "@wagmi/core";
import axios from "axios";
import { MdArrowDropDown } from "react-icons/md";
import { useDarkMode } from "usehooks-ts";
import { formatEther, parseEther } from "viem";
import { useAccount } from "wagmi";
import { ArrowDownIcon } from "@heroicons/react/24/outline";
import { localTokens, tokenType } from "~~/data/data";
import { useDeployedContractInfo, useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { Liquidity } from "~~/pages/api/liquidity";
import { nordek } from "~~/utils/NordekChain";
import { notification } from "~~/utils/scaffold-eth";

export default function LiquidityMain({ handleUpdate }: { handleUpdate: () => void }) {
  const { isDarkMode } = useDarkMode();
  const address0 = "0x0000000000000000000000000000000000000000";
  const [token0Amount, setToken0Amount] = useState<Number>(0);
  const [token1Amount, setToken1Amount] = useState<Number>(0);
  const { address: account } = useAccount();
  const [token0, setToken0] = useState<tokenType>(localTokens.NRK);
  const [token1, setToken1] = useState<tokenType>(localTokens.PERC);
  const [pairContract, setPairContract] = useState("0x0000000000000000000000000000000000000000");
  const [reserveA, setReserve1] = useState(0);
  const [reserveB, setReserve2] = useState(0);
  const { data: routerContract } = useDeployedContractInfo("NordekV2Router02");
  const { data: factoryContractData } = useDeployedContractInfo("NordekV2Factory");
  const [slippage, setSlippage] = useState(0.5);
  const [update, setUpdate] = useState(0);
  const token0Min = Number(token0Amount) - (Number(token0Amount) * slippage) / 100;
  const token1Min = Number(token1Amount) - (Number(token1Amount) * slippage) / 100;
  const currentDate = new Date();
  const unixTimestampInSeconds = Math.floor(currentDate.getTime() / 1000);
  const [share, setShare] = useState(0);
  const [tokenAFromContract, setTokenAFromContract] = useState(address0);
  const [lpTokens, setLPTokens] = useState<Number>(0);
  const [pairTotalSupply, setPairTotalSupply] = useState(0);
  const [kLast, setKLast] = useState(0);
  const token0AmountNumber: number = Number(token0Amount);
  const token1AmountNumber: number = Number(token1Amount);
  const [balance0, setBalance0] = useState(0);
  const [balance1, setBalance1] = useState(0);
  const [loading, setLoading] = useState<boolean>(false);

  const { data: pc, isFetched } = useScaffoldContractRead({
    contractName: "NordekV2Factory",
    functionName: "getPair",
    args: [token0.address, token1.address],
    account: account,
  });

  useEffect(() => {
    setPairContract(pc);
  }, [isFetched]);

  const { writeAsync: addLiquidityETHToken0 } = useScaffoldContractWrite({
    contractName: "NordekV2Router02",
    functionName: "addLiquidityNRK",
    args: [
      token1.address,
      parseEther(`${token1Amount}`),
      parseEther(`${token1Min}`),
      parseEther(`${token0Min}`),
      account,
      BigInt(unixTimestampInSeconds + 300),
    ],
    value: `${token0AmountNumber}`,
    onError(error, variables, context) {
      console.log("error " + error);
      console.log("variables " + variables);
      console.log("context " + context);
    },
    blockConfirmations: 1,
  });
  const { writeAsync: addLiquidityETHToken1 } = useScaffoldContractWrite({
    contractName: "NordekV2Router02",
    functionName: "addLiquidityNRK",
    args: [
      token0.address,
      parseEther(`${token0Amount}`),
      parseEther(`${token0Min}`),
      parseEther(`${token1Min}`),
      account,
      BigInt(unixTimestampInSeconds + 300),
    ],
    value: `${token1AmountNumber}`,
    onError(error, variables, context) {
      console.log("error " + error);
      console.log("variables " + variables);
      console.log("context " + context);
    },
    blockConfirmations: 1,
  });
  const { writeAsync: addLiquidity } = useScaffoldContractWrite({
    contractName: "NordekV2Router02",
    functionName: "addLiquidity",
    args: [
      token0.address,
      token1.address,
      parseEther(`${token0Amount}`),
      parseEther(`${token1Amount}`),
      parseEther(`${token0Min}`),
      parseEther(`${token1Min}`),
      account,
      BigInt(unixTimestampInSeconds + 300),
    ],
    onError(error, variables, context) {
      console.log("error " + error);
      console.log("variables " + variables);
      console.log("context " + context);
    },
    blockConfirmations: 1,
  });

  const addToDataBase = async (lpTokens: Number) => {
    let result = "";
    try {
      result = await readContract({
        abi: factoryContractData.abi,
        address: factoryContractData.address,
        functionName: "getPair",
        args: [token0.address, token1.address],
        account: account,
      });
      console.log("pair contract address from wagmi " + result);
      setPairContract(result);
    } catch (e) {
      console.log(e);
    }
    const liquidity: Liquidity = {
      token0: token0,
      token1: token1,
      pairContract: result,
      user: account,
      lpTokens: lpTokens,
    };

    const headers = {
      "Content-Type": "application/json",
      Authorization: "JWT fefege...",
    };
    try {
      if (lpTokens !== 0) {
        const response = await axios.post("/api/liquidity", liquidity, {
          headers: headers,
        });

        console.log(response);
        console.log("added to database ");
      }
      handleUpdate();
    } catch (error) {
      console.log(error);
    } finally {
      setToken0Amount(0);
      setToken1Amount(0);
      setUpdate(update + 1);
    }
  };

  let approvalId = null;
  const approvalNotification = () => {
    approvalId = notification.loading("Awaiting for user confirmation");
  };
  const removeApprovalNotification = () => {
    notification.remove(approvalId);
  };
  let txCompId = null;
  const txCompletionWaitNotification = () => {
    txCompId = notification.loading("Waiting for Tx completion");
  };
  const removeTxCompNotification = () => {
    notification.remove(txCompId);
  };

  const fetchLpTokenBalance = async () => {
    // await new Promise(r => setTimeout(r, 5000));
    const pairAddress = await readContract({
      address: factoryContract.address,
      abi: factoryContract.abi,
      functionName: "getPair",
      args: [token0.address, token1.address],
      account: account,
    });
    const lptokensBalance = await readContract({
      address: pairAddress,
      abi: erc20ABI.abi,
      functionName: "balanceOf",
      args: [account],
      account: account,
    });
    console.log("check: ", Number(formatEther(lptokensBalance as bigint)));
    return Number(formatEther(lptokensBalance as bigint));
  };

  const handleAddLiquidity = async () => {
    console.log("add liuidity");
    setLoading(true);

    // console.log("Nrk token", token0Amount);
    // console.log("Approval", token1Amount);
    // console.log("lp tokens", Number(lpTokens));
    // console.log("hello");
    // console.log("Nrk token", parseEther(`${token0Amount}`));
    // console.log("Approval", parseEther(`${token1Amount}`));
    // console.log("mintoken0", parseEther(`${token0Min}`));
    // console.log("mintoken1", parseEther(`${token1Min}`));

    const nrkAddress: string = localTokens.NRK.address;
    if (token0Amount === 0 || token1Amount === 0) {
      setLoading(false);
      notification.error("Amount Cannot be 0", {
        duration: 1000,
      });
      return;
    }
    console.log("non zero");
    if (token0.address === nrkAddress || token1.address === nrkAddress) {
      console.log("nordek address");
      if (token0.address === nrkAddress) {
        console.log("token 1 nordek");
        try {
          approvalNotification();
          const { hash: approveHash } = await writeContract({
            address: token1.address,
            abi: erc20ABI.abi,
            functionName: "approve",
            args: [routerContract.address, parseEther(`${token1Amount}`)],
          });
          await waitForTransaction({
            hash: approveHash,
            confirmations: 1,
          });
          removeApprovalNotification();

          console.log("approve");
          await addLiquidityETHToken0();
          console.log("add liquidity");
        } catch (error) {
          removeApprovalNotification();

          console.log(error);
        }
      } else if (token1.address === nrkAddress) {
        console.log("token 2 nordek");
        try {
          approvalNotification();
          const { hash: approveHash } = await writeContract({
            address: token0.address,
            abi: erc20ABI.abi,
            functionName: "approve",
            args: [routerContract.address, parseEther(`${token0Amount}`)],
          });
          await waitForTransaction({
            hash: approveHash,
            confirmations: 1,
          });
          removeApprovalNotification();

          await addLiquidityETHToken1();
        } catch (error) {
          removeApprovalNotification();
        }
      }
    } else {
      // addLiquidity
      try {
        approvalNotification();
        const { hash: approveHash1 } = await writeContract({
          address: token0.address,
          abi: erc20ABI.abi,
          functionName: "approve",
          args: [routerContract.address, parseEther(`${token0Amount}`)],
        });
        const { hash: approveHash2 } = await writeContract({
          address: token1.address,
          abi: erc20ABI.abi,
          functionName: "approve",
          args: [routerContract.address, parseEther(`${token1Amount}`)],
        });
        removeApprovalNotification();
        txCompletionWaitNotification();
        await waitForTransaction({
          hash: approveHash1,
          confirmations: 1,
          timeout: 5000,
        });
        removeApprovalNotification();
        await waitForTransaction({
          hash: approveHash2,
          confirmations: 1,
          timeout: 5000,
        });
      } catch (error) {
        removeApprovalNotification();
      }
      await addLiquidity();
    }
    setLoading(false);

    await getBalance();
    const lpTokens = await fetchLpTokenBalance();

    await addToDataBase(lpTokens);
  };

  const { data: factoryContract } = useDeployedContractInfo("NordekV2Factory");

  const setTokenA = (token: tokenType) => {
    if (token.address !== token1.address) {
      setToken0(token);
    }
  };
  const setTokenB = (token: tokenType) => {
    if (token.address !== token0.address) {
      setToken1(token);
    }
  };
  const getPairAddress = async () => {
    setToken0Amount(0);
    setToken1Amount(0);
    console.log("pair contract function");
    try {
      const pairAddress = await readContract({
        address: factoryContract?.address,
        abi: factoryContract?.abi,
        functionName: "getPair",
        args: [token0.address, token1.address],
        account: account,
      });
      console.log("pair contrat from toggle" + pairAddress);

      setPairContract(pairAddress);
      if (pairAddress === address0) {
        setReserve1(0);
        setReserve2(0);
      }
      if (pairAddress !== address0) {
        setShare(0);
      }
    } catch (error) {}
  };

  useEffect(() => {
    console.log("pair contract getting ");
    getPairAddress();
  }, [token0, token1, update]);

  useEffect(() => {
    const getData = async () => {
      if (pairContract !== "0x0000000000000000000000000000000000000000" && pairContract !== undefined) {
        console.log(pairContract);
        const reserves = await readContract({
          address: pairContract,
          abi: pairABI.abi,
          functionName: "getReserves",
          account: account,
          chainId: nordek.id,
        });
        const tokenA = await readContract({
          address: pairContract,
          abi: pairABI.abi,
          functionName: "token0",
          account: account,
          chainId: nordek.id,
        });
        setTokenAFromContract(String(tokenA));
        const reserve1 = Number(formatEther(reserves[0]));
        const reserve2 = Number(formatEther(reserves[1]));

        if (tokenA === token0.address) {
          setReserve1(reserve1);
          setReserve2(reserve2);
        } else if (tokenA === token1.address) {
          1;
          setReserve2(reserve1);
          setReserve1(reserve2);
        }
        const totalSupply = await readContract({
          address: pairContract,
          abi: pairABI.abi,
          functionName: "totalSupply",
          account: account,
          chainId: nordek.id,
        });
        const supply = Number(formatEther(BigInt(Number(totalSupply))));
        setPairTotalSupply(supply);
        // setPairTotalSupply(Number(formatEther(BigInt(totalSupply))))
        var kLastValue = await readContract({
          address: pairContract,
          abi: pairABI.abi,
          functionName: "kLast",
          account: account,
          chainId: nordek.id,
        });
        // setKLast(Number(formatEther(BigInt(Number(kLastValue)))))
        kLastValue = BigInt(Number(kLastValue)) / BigInt(10 ** 36);
        // console.log(kLastValue)
        setKLast(Number(kLastValue));
      }
    };
    getData();
  }, [pairContract, update]);

  const getBalance = async () => {
    console.log("fetching....");
    try {
      const nrkAddress = localTokens.NRK.address;
      if (token0.address === nrkAddress || token1.address === nrkAddress) {
        const balanceNRK = await fetchBalance({
          address: account,
        });
        if (token0.address === nrkAddress) {
          const balanceB = await readContract({
            address: token1.address,
            abi: erc20ABI.abi,
            functionName: "balanceOf",
            args: [account],
            account: account,
          });
          setBalance0(Number(balanceNRK.formatted));
          setBalance1(Number(formatEther(balanceB)));
        } else {
          const balanceA = await readContract({
            address: token0.address,
            abi: erc20ABI.abi,
            functionName: "balanceOf",
            args: [account],
            account: account,
          });
          setBalance0(Number(formatEther(balanceA)));
          setBalance1(Number(balanceNRK.formatted));
        }
      } else {
        const balanceA = await readContract({
          address: token0.address,
          abi: erc20ABI.abi,
          functionName: "balanceOf",
          args: [account],
          account: account,
        });
        const balanceB = await readContract({
          address: token1.address,
          abi: erc20ABI.abi,
          functionName: "balanceOf",
          args: [account],
          account: account,
        });
        setBalance0(Number(formatEther(balanceA)));
        setBalance1(Number(formatEther(balanceB)));
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    if (account) {
      getBalance();
    }
  }, [token0, token1, account]);

  useEffect(() => {
    if (pairContract !== address0) {
      setShare(Number((Number(token0Amount) * 100) / reserveA));

      // calculating lp tokens user will get

      var reserve0 = 0;
      var reserve1 = 0;
      var amount0: Number = 0;
      var amount1: Number = 0;
      if (tokenAFromContract === token0.address) {
        reserve0 = reserveA;
        reserve1 = reserveB;
        amount0 = token0Amount;
        amount1 = token1Amount;
      } else {
        reserve0 = reserveB;
        reserve1 = reserveA;
        amount0 = token1Amount;
        amount1 = token0Amount;
      }
      const rootK = Math.sqrt((reserve0 + amount0) * (reserve1 + amount1));
      const rootKLast = Math.sqrt(kLast);

      const numerator = pairTotalSupply * (rootK - rootKLast);
      const denominator = rootK * 5 + rootKLast;
      const feeMinted = numerator / denominator;
      console.log(feeMinted);
      const updatedSupply = pairTotalSupply + feeMinted;
      var liquidity = 0;
      const value1 = (Number(amount0) * updatedSupply) / reserve0;
      const value2 = (Number(amount1) * updatedSupply) / reserve1;

      liquidity = value1 > value2 ? value2 : value1;

      setLPTokens(Number(liquidity));
    } else {
      if (token0Amount === 0 || token1Amount === 0) return;
      setShare(Math.sqrt(Number(token0Amount) * Number(token1Amount)));
    }
  }, [token0Amount, token1Amount]);

  const setTokenAmount0Override = (value: Number) => {
    if (pairContract !== "0x0000000000000000000000000000000000000000" && pairContract !== undefined) {
      var _amount1 = (Number(value) * reserveB) / reserveA;
      // if (_amount1 > balance1) {
      //   var _amount0 = (Number(balance1) * reserveA) / reserveB;
      //   setToken0Amount(_amount0);
      //   setToken1Amount(balance1);
      //   return;
      // }
      setToken0Amount(value);
      setToken1Amount(_amount1);
    } else {
      if (value === 0) setShare(0);
      setToken0Amount(value);
    }
    setLPTokens(0);
  };
  const setTokenAmount1Override = (value: Number) => {
    if (pairContract !== "0x0000000000000000000000000000000000000000" && pairContract !== undefined) {
      var _amount0 = (Number(value) * reserveA) / reserveB;
      // if (_amount0 > balance0) {
      //   var _amount1 = (Number(balance0) * reserveB) / reserveA;

      //   setToken0Amount(balance0);
      //   setToken1Amount(_amount1);
      //   return;
      // }
      setToken0Amount(_amount0);
      setToken1Amount(value);
    } else {
      if (value === 0) setShare(0);
      setToken1Amount(value);
    }
    setLPTokens(0);
  };

  return (
    <div className="flex flex-col w-full  ">
      {pairContract === "0x0000000000000000000000000000000000000000" && (
        <div className=" text-sm  text-center  font-bold mb-4 ">! NO PAIR EXISTS FOR THESE TWO TOKENS !</div>
      )}

      <div className=" text-[10px] font-semibold  ">CHOOSE TOKEN PAIR</div>
      <div className="flex flex-row items-center w-full  justify-between mt-4  ">
        <div className="w-full mr-4 ">
          {/* <Select setToken={setTokenA} token={token0} /> */}
          <LiquidityTokenSelectButton setToken={setTokenA} token={token0} />
        </div>
        <div className=" font-bold text-lg ">+</div>
        <div className="w-full ml-4 ">
          {/* <Select setToken={setTokenB} token={token1} /> */}
          <LiquidityTokenSelectButton setToken={setTokenB} token={token1} />
        </div>
      </div>

      <div className=" text-[10px] font-semibold mt-8 ">DEPOSIT AMOUNT</div>
      <TokenAmountEntry
        tokenAmount={token0Amount}
        setTokenAmount={setTokenAmount0Override}
        token={token0}
        balance={balance0}
      />

      <TokenAmountEntry
        tokenAmount={token1Amount}
        setTokenAmount={setTokenAmount1Override}
        token={token1}
        balance={balance1}
      />

      <LiquidityFooter
        handleAddLiquidity={handleAddLiquidity}
        pairContract={pairContract}
        token1={token0}
        token2={token1}
        reserve1={reserveA}
        reserve2={reserveB}
        slippage={slippage}
        setSlippageValue={setSlippage}
        share={share}
        lpTokens={lpTokens}
        setLoading={setLoading}
        loading={loading}
      ></LiquidityFooter>
    </div>
  );
}

const TokenAmountEntry = ({
  setTokenAmount,
  tokenAmount,
  token,
  balance,
}: {
  balance: Number;
  setTokenAmount: (value: Number) => void;
  tokenAmount: Number;
  token: tokenType;
}) => {
  const { isDarkMode } = useDarkMode();
  return (
    <div className="mt-4 ">
      <div className="flex flex-row items-center  justify-between">
        <div className="flex flex-row items-center">
          <img src={token.logo} className="w-6 h-6 rounded-full mr-2" />
          <div className=" font-semibold   ">{token.symbol}</div>
        </div>
        <div className="font-semibold text-sm">{`Balance : ${balance === 0 ? 0 : balance.toFixed(4)}`}</div>
      </div>

      <div
        className={` flex flex-col  shadow-md  bg-swap-gradient rounded-lg px-4 py-4 mb-4 mt-4 ${
          !isDarkMode && "border-2 border-[#E2D4FF]"
        } `}
      >
        <input
          type="number"
          placeholder="0.0"
          value={tokenAmount === 0 ? "" : tokenAmount?.toString()}
          className="input input-sm pr-0 disabled:bg-transparent disabled:border-none bg-transparent w-full text-lg  font-semibold  input-ghost max-w-md text-right rounded-none focus:outline-none leading-tight [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          disabled={balance === 0 ? true : false}
          onChange={e => {
            const value = Number(e.target.value);
            if (value < 0) {
              return;
            }

            setTokenAmount(value);
          }}
        />
        <button
          className=" self-end font-semibold disabled:opacity-50  bg-secondary rounded-full px-2 mt-2   "
          disabled={balance === 0 ? true : false}
          onClick={() => {
            // 0.01% buffer for gas fee
            var _balance = Number(balance) - Number(balance) / 10000;
            setTokenAmount(_balance);
          }}
        >
          Max
        </button>
      </div>
    </div>
  );
};

const LiquidityTokenSelectButton = ({ setToken, token }: { setToken: () => void; token: tokenType }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handlePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const { isDarkMode } = useDarkMode();
  return (
    <>
      <button
        className={`rounded-full flex flex-row bg-white  items-center   text-gray-800 text-xs py-1 px-4 w-full ${
          !isDarkMode && "border - 2 border-[#E2D4FF]"
        } `}
        onClick={handlePopup}
      >
        <div className="flex flex-row flex-1 ">
          <div className="flex items-center font-semibold text-base  justify-between   ">
            {" "}
            <img src={token.logo} className="w-6 h-6 rounded-full mr-2" /> {token.symbol}
          </div>
        </div>
        <MdArrowDropDown className="text-gray-800  invisible lg:visible   " size={15} />
      </button>
      <TokenListPopup isOpen={isPopupOpen} onClose={handlePopup} setToken={setToken}></TokenListPopup>
    </>
  );
};
