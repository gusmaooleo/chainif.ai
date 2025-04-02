import { FeedbackType } from "./feedback";
import { SSEEvent } from "./sseevent";

export type ResponseType = {
  feedback: FeedbackType;
  data?: SSEEvent;
}