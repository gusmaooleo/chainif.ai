import { SSEEventData, SSEEventType } from "@/types/sseevent";
import { FoundFeedback } from "../feedback/feedback-states";
import { optionsList } from "@/lib/constants/originOptions";
import NftByHash from "./nft-by-hash";
import Image from "next/image";
import FoundDataElement from "./found-data-elements";
import { CopyButton } from "./copy-button";

export default function FoundData({ data, type }: { data: SSEEventData | null, type: SSEEventType | null }) {
  const getAuthorIcon = () => {
    const key = Object.keys(optionsList).find((key: string) => optionsList[key].value === data?.author);
    console.log(key)
    if (!key) {
      return optionsList["Authorial"].icon;
    }

    return optionsList[key].icon
  }
  
  
  if (data && data.hash) {
    console.log(data);
    return (
      <>
        <FoundFeedback title={data.message} />
        <div className="flex flex-row h-full py-10 gap-10">
          <div className="flex flex-col justify-between w-[350px]">
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
                <Image src={getAuthorIcon()} alt="Author" width={30} height={30} />
                <p className="truncate text-sm text-gray-600">{data.author}</p>
              </div>
            </FoundDataElement>
          </div>

          <FoundDataElement title="Data:">
            <div className="bg-gray-200 h-full w-[40vmin] rounded-lg p-4 font-[Fira_Code] text-sm relative">
              <CopyButton textToCopy={data.data} className="absolute top-1 right-1" />
              {data.data}
            </div>
          </FoundDataElement>
        </div>
      </>
    )
  }

  return null;
}