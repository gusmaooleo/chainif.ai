import { SSEEventData, SSEEventType } from "@/types/sseevent";
import { FoundFeedback } from "../feedback/feedback-states";
import { optionsList } from "@/lib/constants/originOptions";
import NftByHash from "./nft-by-hash";
import Image from "next/image";
import FoundDataElement from "./found-data-elements";
import { CopyButton } from "./copy-button";

export default function FoundData({ data }: { data: SSEEventData | null }) {
  const getAuthorIcon = (): [string, string | undefined] => {
    const key = Object.keys(optionsList).find(
      (key: string) => optionsList[key].value === data?.author
    );
    if (!key) {
      return [optionsList["Authorial"].icon, data?.author];
    }

    if (key === "Authorial") {
      return [optionsList[key].icon, data?.author];
    }

    return [optionsList[key].icon, key];
  };

  if (data && data.hash) {
    return (
      <>
        <FoundFeedback title={data.message} tx_id={data.tx_id} />
        <div className="flex flex-col md:flex-row h-full py-4 md:py-10 gap-4 md:gap-10 px-4">
          <div className="flex flex-col justify-between w-full md:w-[350px] gap-4 md:gap-0">
            <FoundDataElement title="NFT:">
              <NftByHash hash={data.hash} className="rounded-lg" />
            </FoundDataElement>

            <FoundDataElement title="Checksum:">
              <div className="flex items-center flex-row gap-2">
                <p className="truncate text-sm text-gray-600">{data.hash}</p>
                <CopyButton textToCopy={data.hash} />
              </div>
            </FoundDataElement>

            <FoundDataElement title="Author:">
              <div className="flex items-center flex-row gap-2">
                <Image
                  src={getAuthorIcon()[0]}
                  alt="Author"
                  width={30}
                  height={30}
                />
                <p className="truncate text-sm text-gray-600 capitalize">
                  {getAuthorIcon()[1]}
                </p>
              </div>
            </FoundDataElement>
          </div>

          <FoundDataElement title="Data:">
            <div className="bg-gray-200 h-[50vh] md:h-[40vh] lg:h-[61vmin] w-full md:w-[46vmin] rounded-lg p-4 text-sm relative border border-gray-300">
              <CopyButton
                textToCopy={data.data}
                className="absolute top-1 right-1"
              />
              <div className="font-[Fira_Code] h-[calc(100%)] overflow-auto">
                <pre className="whitespace-pre-wrap m-0">{data.data}</pre>
              </div>
            </div>
          </FoundDataElement>
        </div>
      </>
    );
  }

  return null;
}
