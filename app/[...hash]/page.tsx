import HashFetchFeedback from "@/components/elements/hash-fetch-feedback";
import ShowEquivalentHash from "@/components/elements/show-equivalent-hash";
import ContentForm from "@/components/elements/content-form";
import FormProviderWrapper from "@/components/wrappers/form-provider-wrapper";
import DefaultHashContentWrapper from "@/components/wrappers/default-hash-content-wrapper";
import DefaultLoading from "@/components/elements/default-loading";
import getFeedback from "@/lib/get-feedback";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { DefaultFeedback } from "@/components/elements/feedback-states";
import UpComponentForm from "@/components/elements/up-component-form";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type DynamicHashPageType = {
  params: Promise<{ hash: string[] }>;
}

async function FeedbackContent({ hashValue }: { hashValue: string }) {
  if (!hashValue) {
    return <></>
  }

  const feedback = await getFeedback(hashValue);
  return (
    <>
      <HashFetchFeedback feedbackType={feedback} hash={hashValue} />
      {feedback === 'Not-Found' && (
        <div className="flex flex-row gap-4 mt-10">
          <Link href="/">
            <Button variant='outline'>Cancel</Button>
          </Link>
          <UpComponentForm>
            Up to blockchain
          </UpComponentForm>
        </div>
      )}
    </>
  );
}

export default async function DynamicHashPage({ params }: DynamicHashPageType) {
  const { hash } = await params;
  const hashValue = hash?.[0] || "";

  if (hash?.length > 1) {
    notFound();
  }

  return (
    <div className="flex flex-col h-auto items-center justify-between">
      {/* not lost SEO advantages */}
      {!hashValue && (
        <DefaultHashContentWrapper>
          <DefaultFeedback />
        </DefaultHashContentWrapper>
      )}
      <FormProviderWrapper>
        <DefaultHashContentWrapper>
          <Suspense fallback={<DefaultLoading />}>
            <FeedbackContent hashValue={hashValue} />
          </Suspense>
        </DefaultHashContentWrapper>
        <div className="w-[32vmax] mb-10">
          <ShowEquivalentHash hashValue={hashValue} />
          <ContentForm />
        </div>
      </FormProviderWrapper>
    </div>
  );
}