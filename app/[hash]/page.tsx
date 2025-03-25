import HashInput from "@/components/elements/hash-input";
import HashFeedback from "@/components/elements/hash-feedback";
import { DefaultFeedback } from "@/components/elements/feedback-states";
import ShowEquivalentHash from "@/components/elements/show-equivalent-hash";

export default async function DynamicHashPage({params}: {params: Promise<{ hash: string }>}) {
  const { hash } = await params;
  const hashValue = !!hash ? hash : "";

  return (
    <>
      <div className="flex flex-col h-auto items-center justify-between">
        <HashFeedback>
          <DefaultFeedback />
        </HashFeedback>
        <div className="w-[32vmax] mb-10">
          <ShowEquivalentHash hashValue={hashValue} />
          <HashInput urlHash={hashValue} />
        </div>
      </div>
    </>
  );
}
