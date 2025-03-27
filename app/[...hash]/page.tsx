import HashFetchFeedback from "@/components/elements/hash-fetch-feedback";
import ShowEquivalentHash from "@/components/elements/show-equivalent-hash";
import ContentForm from "@/components/elements/content-form";
import FormProviderWrapper from "@/components/wrappers/form-provider-wrapper";
import { notFound } from "next/navigation";
import { validateSHA256 } from "@/lib/sha-256-utils";
import { searchForHash } from "@/lib/fetch/actions";
import { FeedbackType } from "@/types/feedback";

type DynamicHashPageType = {
  params: Promise<{ hash: string[] }>;
}

export default async function DynamicHashPage({params}: DynamicHashPageType) {
  const { hash } = await params;
  const hashValue = !!hash ? hash[0] : "";
  let feedback: FeedbackType = 'Default';


  if (!!hash && hash.length > 1) {
    notFound();
  }

  if (validateSHA256(hashValue)) {
    const queryResult = await searchForHash(hashValue);
    if (!!queryResult && queryResult.edges.length > 0) {
      feedback = 'Finded';
    } else {
      feedback = 'Not-Found';
    }
  } else {
    feedback = 'Invalid'
  }

  return (
    <div className="flex flex-col h-auto items-center justify-between">
      <HashFetchFeedback hash={feedback} />
      <div className="w-[32vmax] mb-10">
        <ShowEquivalentHash hashValue={hashValue} />
        <FormProviderWrapper>
          <ContentForm />
        </FormProviderWrapper>
      </div>
    </div>
  );
}
