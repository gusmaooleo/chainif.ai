import { SSEEvent } from "@/types/sseevent";
import { FoundFeedback } from "../feedback/feedback-states";
import NftInfo from "./nft-info";
import ChecksumInfo from "./checksum-info";
import AuthorInfo from "./author-info";
import DateInfo from "./date-info";
import DataInfo from "./data-info";
import { notFound } from "next/navigation";

export default function FoundData({ data }: { data: SSEEvent | null }) {
  if (data && data.type === 'complete') {
    return (
      <>
        <FoundFeedback title={data.message} tx_id={data.tx_id} />
        <div className="flex flex-col md:flex-row h-full py-4 px-4 xl:py-10 gap-4 md:gap-10">
          <div className="flex flex-row md:flex-col justify-between w-full md:gap-0">
            <NftInfo hash={data.hash} />

            <div className="flex flex-col md:gap-10 justify-between">
              <div className="w-[140px]">
                <ChecksumInfo hash={data.hash} />
              </div>

              <div className="flex flex-col md:flex-row justify-between w-full">
                <AuthorInfo author={data.author} />
                <DateInfo date={data.date} />
              </div>
            </div>
          </div>

          <DataInfo data={data.data} />
        </div>
      </>
    );
  }

  notFound();
}
