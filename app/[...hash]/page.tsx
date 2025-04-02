import ShowEquivalentHash from "@/components/ui-elements/show-equivalent-hash";
import SearchingForm from "@/components/forms/searching-form";
import FormProviderWrapper from "@/components/wrappers/form-provider-wrapper";
import ContentWrapper from "@/components/wrappers/content-wrapper";
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
    <div className="flex flex-col h-auto items-center justify-evenly">
      {!hashValue && (
        <ContentWrapper classname_f="w-[30rem]">
          <DefaultFeedback />
        </ContentWrapper>
      )}
      <FormProviderWrapper>
        {hashValue && (
          <ContentWrapper classname_f="h-full" classname_c="h-full">
            <FeedbackContent hashValue={hashValue} />
          </ContentWrapper>
        )}
        <div className="w-[32vmax] md:mb-10">
          <ShowEquivalentHash hashValue={hashValue} />
          <SearchingForm />
        </div>
      </FormProviderWrapper>
    </div>
  );
}
