import Link from "next/link";
import { Button } from "../ui/button";
import UpDataForm from "../forms/up-data-form";
import getFeedback from "./actions/actions";
import {
  FoundFeedback,
  InvalidFeedback,
  NotFoundFeedback,
} from "./feedback-states";
import FoundData from "../ui-elements/found-data";

export default async function FeedbackContent({ hashValue }: { hashValue: string }) {
  if (!hashValue) {
    return <></>;
  }
  let children: React.ReactNode;
  const feedback = await getFeedback(hashValue);

  switch (feedback.feedback) {
    case "Found":
      children = feedback.data ? <FoundData data={feedback.data} /> : null;
      break;
    case "Not-Found":
      children = <NotFoundFeedback />;
      break;
    case "Invalid":
      children = <InvalidFeedback />;
      break;
    default:
      children = <></>;
      break;
  }

  return (
    <>
      {children}
      {feedback.feedback === "Not-Found" && (
        <div className="flex flex-row gap-4 mt-10">
          <Link href="/">
            <Button variant="outline" className="text-gray-600 cursor-pointer">
              Cancel
            </Button>
          </Link>
          <UpDataForm>Up to blockchain</UpDataForm>
        </div>
      )}
    </>
  );
}
