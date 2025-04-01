import { SSEEventData } from "@/types/sseevent";
import { FoundFeedback } from "../feedback/feedback-states";
import NftInfo from "./nft-info";
import ChecksumInfo from "./checksum-info";
import AuthorInfo from "./author-info";
import DateInfo from "./date-info";
import DataInfo from "./data-info";
import { notFound } from "next/navigation";

export default function FoundData({ data }: { data: SSEEventData | null }) {
  if (data && data.hash) {
    return (
      <>
        <FoundFeedback title={data.message} tx_id={data.tx_id} />
        <div className="grid grid-cols-1 md:grid-cols-[350px_1fr] gap-4 md:gap-10 px-4 py-6 items-start h-full items-stretch min-h-[400px]">
          <div className="flex flex-col gap-4 h-full justify-between">
            <NftInfo hash={data.hash} />
            <ChecksumInfo hash={data.hash} />
            <div className="flex flex-row justify-between gap-4">
              <AuthorInfo author={data.author} />
              <DateInfo date={data.date} />
            </div>
          </div>

          <DataInfo data={data.data} />
        </div>
      </>
    );
  }

  notFound();
}
