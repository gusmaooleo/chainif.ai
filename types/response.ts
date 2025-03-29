import { FeedbackType } from "./feedback";

type ResponseData = {
  author?: string;
  hash: string;
  data: any;
}

export type ResponseType = {
  feedback: FeedbackType;
  data?: ResponseData;
}