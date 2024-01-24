import { useState } from "react";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { fetchUserData, getTransactionsFromNordekScan } from "~~/components/StakingComponents/APICallFunctions";
import { TransactionsTable } from "~~/components/StakingComponents/TransactionsTable";
import { PaginationButton } from "~~/components/blockexplorer/";
import { Address, Balance } from "~~/components/scaffold-eth";
import deployedContracts from "~~/generated/deployedContracts";
import { decodeTransactionData, getTargetNetwork } from "~~/utils/scaffold-eth";
import { GenericContractsDeclaration } from "~~/utils/scaffold-eth/contract";

const AddressPage = ({ address, transactions }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const router = useRouter();
  const startIndex = currentPage * 20;
  const endIndex = startIndex + 20;

  return (
    <div className="m-10 mb-20">
      <div className="flex justify-start mb-5">
        <button className="btn btn-sm btn-primary text-white" onClick={() => router.back()}>
          Back
        </button>
      </div>
      <div className="col-span-5 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
        <div className="col-span-1 flex flex-col">
          <div className="bg-base-100 border-base-300 border shadow-md shadow-secondary rounded-3xl px-6 lg:px-8 mb-6 space-y-1 py-4 overflow-x-auto">
            <div className="flex">
              <div className="flex flex-col gap-1">
                <Address address={address} format="long" />
                <div className="flex gap-1 items-center">
                  <span className="font-bold text-sm">Balance:</span>
                  <Balance address={address} className="text" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-4">
        <TransactionsTable transactions={transactions.slice(startIndex, endIndex)} isLoading={!transactions} />
        <PaginationButton
          currentPage={currentPage}
          totalItems={Number(transactions.length)}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default AddressPage;

export const getServerSideProps: GetServerSideProps = async context => {
  const configuredNetwork = getTargetNetwork();
  const userAddress = context.params?.address as string;
  const contracts = deployedContracts as GenericContractsDeclaration | null;
  const chainId = configuredNetwork.id;
  const deployedContractsOnChain = contracts ? contracts[chainId][0].contracts : {};
  let contractAddress = "";
  for (const [contractName, contractInfo] of Object.entries(deployedContractsOnChain)) {
    if (contractName === "StakingContract") {
      contractAddress = contractInfo.address;
      break;
    }
  }

  try {
    const userData = await fetchUserData(userAddress);
    //const userDataParsed = JSON.parse(JSON.stringify(userData));

    const transactions = await getTransactionsFromNordekScan({
      userAddress: userAddress,
      blockNumber: userData?.blockNumber || 0,
      contractAddress: contractAddress,
    });

    const formattedTransactions = transactions.map(item => {
      const tx = decodeTransactionData(item);
      //console.log("after decode tx", tx);
      return {
        hash: tx.hash,
        input: tx.input,
        value: tx.value,
        to: tx.to,
        from: tx.from,
        // @ts-ignore
        timeStamp: tx.timeStamp,
        blockNumber: tx.blockNumber,
        functionName: tx.functionName ? tx.functionName : "",
      };
    });

    //const tx = decodeTransactionData(formattedTransactions);
    //console.log(tx);

    // console.log("USER TRANSACTIONS", formattedTransactions);

    // const transactionResult = JSON.parse(JSON.stringify(transactions));
    // console.log("TRANSACTION RESULT", transactionResult);
    return {
      props: {
        address: userAddress,
        transactions: formattedTransactions,
      },
    };
  } catch (e) {
    console.log("ERROR LOADING DATA");
    console.error(e);
  }
};
