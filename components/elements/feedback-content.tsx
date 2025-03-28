import getFeedback from "@/lib/get-feedback";
import HashFetchFeedback from "./hash-fetch-feedback";
import Link from "next/link";
import UpComponentForm from "./up-component-form";
import { Button } from "../ui/button";

export default async function FeedbackContent({ hashValue }: { hashValue: string }) {
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
            <Button variant='outline' className="text-gray-600 cursor-pointer">Cancel</Button>
          </Link>
          <UpComponentForm>
            Up to blockchain
          </UpComponentForm>
        </div>
      )}
    </>
  );
}