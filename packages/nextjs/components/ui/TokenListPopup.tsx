"use client";

import React, { useEffect, useState } from "react";
import erc20Abi from "../../../foundry/out/ERC20.sol/ERC20.json";
import { readContract } from "@wagmi/core";
import axios from "axios";
import { BsSearch } from "react-icons/bs";
import { useAccount, useBalance } from "wagmi";
import { tokenType } from "~~/data/data";
import { useDeployedContractInfo, useScaffoldContractRead } from "~~/hooks/scaffold-eth";

interface TokenListPopupProps {
  isOpen: boolean;
  onClose: () => void;
  setToken: (value: tokenType) => void;
}

const TokenListPopup: React.FC<TokenListPopupProps> = ({ isOpen, onClose, setToken }) => {
  const [tokens, setTokens] = useState<tokenType[] | undefined>(undefined); // Initialize tokens as undefined
  const { data: deployedContractData } = useDeployedContractInfo("WNRK");

  const { address: account } = useAccount();
  const heading1 = "Select a Token";
  const heading2 = "Edit My Token List";

  const [heading, setHeading] = useState(heading1);
  const [searchValue, setSearchValue] = useState("");
  const [loadingToken, setLoadingToken] = useState(false);
  const [logo, setLogo] = useState("https://picsum.photos/200");

  const [newToken, setNewToken] = useState({ name: "", symbol: "", address: "", status: "" });

  const [fotter, setFooter] = useState("Edit My Token List >");

  const fetchTokens = async () => {
    try {
      const response = await axios.get("/api/swapSupportedTokenList");

      setTokens(response.data.swapSupportedTokenList);
    } catch (error) {}
  };
  useEffect(() => {
    fetchTokens();
  }, []);

  useEffect(() => {
    fetchTokens();
  }, [newToken]);

  const onCloseOverride = () => {
    onClose();
    setHeading(heading1);
    setNewToken({ name: "", symbol: "", address: "", status: "" });
    setFooter("Edit My Token List >");
  };

  const onFotterClick = () => {
    if (heading === heading1) {
      setHeading(heading2);
      setFooter("< Back to selection");
    } else {
      setHeading(heading1);
      setFooter("Edit My Token List >");
    }
  };

  const onAddressInput = async (address: string) => {
    if (address === "") return;

    setLoadingToken(true);
    // getting logo
    try {
      const logo = await axios.get(`https://nordekscan.com/api/v2/tokens/${address}`);
      console.log(logo);
      await axios.get(logo.data.icon_url);
      setLogo(logo.data.icon_url);
    } catch (c) {
      console.log("error");
    }
    try {
      const name = await readContract({
        address: address,
        abi: deployedContractData.abi,
        functionName: "name",
        account: account,
      });
      const symbol = await readContract({
        address: address,
        abi: deployedContractData.abi,
        functionName: "symbol",
        account: account,
      });
      setNewToken({ name: name, symbol: symbol, address: address, status: "not added" });
      setLoadingToken(false);
    } catch (e) {
      setLoadingToken(false);
      console.log(e);
    }
  };

  const addNewTokenToList = async () => {
    const token = {
      logo: logo,
      name: newToken.name,
      symbol: newToken.symbol,
      address: newToken.address,
    };

    const headers = {
      "Content-Type": "application/json",
      Authorization: "JWT fefege...",
    };
    try {
      const response = await axios.put("/api/swapSupportedTokenList", token, {
        headers: headers,
      });

      console.log(response);
      console.log("new token added");
      setNewToken({
        name: newToken.name,
        symbol: newToken.symbol,
        address: newToken.address,
        status: "added",
      });
    } catch (error) {
      console.log(error);
    }

    console.log("Saved to DB");
    fetchTokens();
    setSearchValue("");
  };

  const removeToken = async () => {
    try {
      const response = await axios.delete(`/api/swapSupportedTokenList?address=${newToken.address}`);
      console.log(response);
      setNewToken({ name: "", symbol: "", address: "", status: "" });
    } catch (e) {
      console.log("Couldn't send update/del request", e);
    }
    fetchTokens();
    setSearchValue("");
  };

  const ListComponent = () => {
    if (tokens === undefined) {
      return <div className="text-white font-bold mt-4">Loading...</div>; // Display a loading indicator
    }

    return (
      <div className="max-h-96 flex-grow overflow-y-auto ">
        {Object.values(tokens).map((token, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 hover:bg-base-100 text-white cursor-pointer"
            onClick={() => {
              setToken(token);
              onCloseOverride();
            }}
          >
            <div className="flex items-center space-x-4 mr-20">
              <img src={token.logo} className="w-6 h-6 rounded-full" alt={token.symbol} />
              <span className="text-base text-primary-content ">{token.symbol}</span>
            </div>
            {/* <span className="ml-20">{0}</span> */}
          </div>
        ))}
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex  items-center justify-center z-50 ">
      <div className="fixed inset-0 bg-gray-800   opacity-50 " onClick={onCloseOverride}></div>
      <div className="relative z-10  rounded-lg shadow-lg p-6 max-h-[500px] w-[350px] lg:w-[450px] bg-gradient-to-r bg-base-300">
        <div className="flex  flex-col ">
          {/* header part  */}
          <div className="flex flex-row justify-between  items-center  ">
            <div className="text-lg text-center font-bold text-primary-content">{heading}</div>
            <button
              className="absolute top-0 right-0 m-2 p-2 text-gray-400   hover:text-primary-content"
              onClick={onCloseOverride}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className=" flex flex-row bg-white text-black px-4 py-2  rounded-md items-center my-2  ">
            <input
              className="bg-transparent outline-none placeholer:text-secondary  placeholder:text-base w-full"
              placeholder="Search By Name or Address"
              type="text"
              value={searchValue}
              onChange={event => {
                setSearchValue(event.target.value);
                if (heading === heading2) onAddressInput(event.target.value);
              }}
            ></input>

            <span>
              <BsSearch className="text-lg text-gray" />
            </span>
          </div>

          {heading === heading2 && (
            <>
              {loadingToken && (
                <div className="w-full flex flex-row items-center justify-center ">
                  <div className="loader "></div>
                </div>
              )}
              {newToken.name !== "" && newToken.symbol !== "" && (
                <div className="flex items-center justify-between p-4 bg-base-300 hover:bg-base-100 text-white cursor-pointer">
                  <div className="flex items-center space-x-4 mr-20">
                    <img src={logo} className="w-6 h-6 rounded-full" alt={newToken.symbol} />
                    <span className="">{newToken.symbol}</span>
                  </div>
                  {Object.values(tokens).find(token => token.address === newToken.address) ? (
                    <button className="ml-20" onClick={removeToken}>
                      - Remove
                    </button>
                  ) : (
                    <button className="ml-20" onClick={addNewTokenToList}>
                      + Add
                    </button>
                  )}
                </div>
              )}
            </>
          )}
          {/* token list part  */}
          {heading == heading1 && (
            <div className=" flex flex-col max-h-[300px]  overflow-y-scroll ">
              <ListComponent />
            </div>
          )}
          {/* <div>
            <div className="   text-left mt-8 text-primary-content font-bold text-[15px] ">
              <button onClick={onFotterClick}>{fotter}</button>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default TokenListPopup;
