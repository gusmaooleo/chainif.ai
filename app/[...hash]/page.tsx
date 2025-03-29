import ShowEquivalentHash from "@/components/ui-elements/show-equivalent-hash";
import SearchingForm from "@/components/forms/searching-form";
import FormProviderWrapper from "@/components/wrappers/form-provider-wrapper";
import DefaultHashContentWrapper from "@/components/wrappers/default-hash-content-wrapper";
import FeedbackContent from "@/components/feedback/feedback-content";
import { DefaultFeedback } from "@/components/feedback/feedback-states";
import { notFound } from "next/navigation";

type DynamicHashPageType = {
  params: Promise<{ hash: string[] }>;
};

export default async function DynamicHashPage({ params }: DynamicHashPageType) {
  const { hash } = await params;
  const hashValue = hash?.[0] || "";

  if (hash?.length > 1) {
    notFound();
  }

  return (
    <div className="flex flex-col h-auto items-center justify-between">
      {/* does not lost SEO advantages */}
      {!hashValue && (
        <div className="flex items-center w-screen flex-col h-full w-[30rem]">
          <div className="flex flex-col items-center h-full">
            <DefaultFeedback />
          </div>
        </div>
      )}
      <FormProviderWrapper>
        <DefaultHashContentWrapper>
          <FeedbackContent hashValue={hashValue} />
        </DefaultHashContentWrapper>
        <div className="w-[32vmax] mb-10">
          <ShowEquivalentHash hashValue={hashValue} />
          <SearchingForm />
        </div>
      </FormProviderWrapper>
    </div>
  );
}
