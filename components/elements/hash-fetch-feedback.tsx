import { FoundFeedback, InvalidFeedback, NotFoundFeedback } from "./feedback-states";
import { FeedbackType } from "@/types/feedback";

export default function HashFetchFeedback({feedbackType, hash}: {feedbackType: FeedbackType, hash: string}) {
  let children: React.ReactNode;

  switch(feedbackType) {
    case 'Found':
      children = <FoundFeedback hash={hash} />;
      break;
    case 'Not-Found':
      children = <NotFoundFeedback />;
      break;
    case 'Invalid':
      children = <InvalidFeedback />;
      break; 
    default:
      children = <></>;
      break;
  }

  return children;
}
