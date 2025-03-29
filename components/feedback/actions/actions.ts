"use server";

import { ArweaveService } from "../../../lib/services/arweave";
import { FeedbackType } from "@/types/feedback";
import { validateSHA256 } from "@/lib/sha-256-utils";
import arweave from "../../../lib/config/arweave";

async function searchForHash(hash: string): Promise<any[] | undefined> {
  try {
    const arwaveSerice = new ArweaveService(arweave);
    return await arwaveSerice.searchForHash(hash);
  } catch (error: any) {
    console.error(error)
  }
}

export default async function getFeedback(hashValue: string): Promise<FeedbackType> {
  if (!validateSHA256(hashValue)) return 'Invalid';
  
  const queryResult = await searchForHash(hashValue);
  return !!queryResult && (queryResult?.length > 0) ? 'Found' : 'Not-Found';
}