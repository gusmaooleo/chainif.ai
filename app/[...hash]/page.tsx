import HashFetchFeedback from "@/components/elements/hash-fetch-feedback";
import { notFound } from "next/navigation";

type DynamicHashPageType = {
  params: Promise<{ hash: string[] }>;
}

export default async function DynamicHashPage({params}: DynamicHashPageType) {
  const { hash } = await params;

  if (hash.length > 1) {
    notFound();
  }

  return (
    <HashFetchFeedback hash={hash[0]} />
  );
}
