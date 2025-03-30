import { SSEEventData, SSEEventType } from "@/types/sseevent";
import { FoundFeedback } from "../feedback/feedback-states";

export default function FoundData({ data, type }: { data: SSEEventData | null, type: SSEEventType | null }) {
  if (data && data.hash) {
    console.log(data);
    return (
      <>
        <FoundFeedback title={data.message} />
        <div>
          {data.data} <br />
          {data.author} <br />
          {data.hash} <br />
        </div>
      </>
    )
  }

  return null;
}