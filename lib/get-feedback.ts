import { FeedbackType } from "@/types/feedback";
import { searchForHash } from "./fetch/actions";
import { validateSHA256 } from "./sha-256-utils";

export default async function getFeedback(hashValue: string): Promise<FeedbackType> {
  if (!validateSHA256(hashValue)) return 'Invalid';
  
  const queryResult = await searchForHash(hashValue);
  return !!queryResult && (queryResult?.edges?.length > 0) ? 'Found' : 'Not-Found';
}
