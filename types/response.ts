import { FeedbackType } from "./feedback";
import { SSEEventData } from "./sseevent";

export type ResponseType = {
  feedback: FeedbackType;
  data?: SSEEventData;
}