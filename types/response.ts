import { FeedbackType } from "./feedback";

type ResponseData = {
  author?: string;
  message: string;
  tx_id?: string;
  hash: string;
  data: any;
}

export type ResponseType = {
  feedback: FeedbackType;
  data?: ResponseData;
}