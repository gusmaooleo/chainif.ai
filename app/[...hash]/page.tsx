import HashFetchFeedback from "@/components/elements/hash-fetch-feedback";
import ShowEquivalentHash from "@/components/elements/show-equivalent-hash";
import HashInput from "@/components/elements/hash-input";
import { notFound } from "next/navigation";

type DynamicHashPageType = {
  params: Promise<{ hash: string[] }>;
}

export default async function DynamicHashPage({params}: DynamicHashPageType) {
  const { hash } = await params;
  const hashValue = !!hash ? hash[0] : "";


  if (!!hash && hash.length > 1) {
    notFound();
  }

  return (
    <div className="flex flex-col h-auto items-center justify-between">
      <HashFetchFeedback hash={!!hash ? hash[0] : ""} />
      <div className="w-[32vmax] mb-10">
        <ShowEquivalentHash hashValue={hashValue} />
        <HashInput />
      </div>
    </div>
  );
}
