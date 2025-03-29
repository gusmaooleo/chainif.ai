import { SSEEventData } from "@/types/sseevent";
import { FoundFeedback } from "../feedback/feedback-states";

export default function FoundData({ data }: { data: SSEEventData | null }) {
  console.log('asdasd')

  if (data && data.hash) {
    console.log(data);
    return (
      <>
        <FoundFeedback hash={data.hash} />
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