import { useState } from "react";
import Link from "next/link";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { CheckCircleIcon, DocumentDuplicateIcon } from "@heroicons/react/24/outline";
import { getTargetNetwork } from "~~/utils/scaffold-eth";

export const TransactionHash = ({ hash }: { hash: string }) => {
  const [addressCopied, setAddressCopied] = useState(false);
  const blockExplorerBaseURL = getTargetNetwork().blockExplorers?.default?.url;
  return (
    <div className="flex justify-center">
      <a href={`${blockExplorerBaseURL}/tx/${hash}`} target="blank">
        {hash?.substring(0, 6)}...{hash?.substring(hash.length - 4)}
      </a>
      {addressCopied ? (
        <CheckCircleIcon
          className="ml-1.5 text-xl font-normal text-sky-600 h-5 w-5 cursor-pointer"
          aria-hidden="true"
        />
      ) : (
        <CopyToClipboard
          text={hash as string}
          onCopy={() => {
            setAddressCopied(true);
            setTimeout(() => {
              setAddressCopied(false);
            }, 800);
          }}
        >
          <DocumentDuplicateIcon
            className="ml-1.5 text-xl font-normal text-sky-600 h-5 w-5 cursor-pointer"
            aria-hidden="true"
          />
        </CopyToClipboard>
      )}
    </div>
  );
};
