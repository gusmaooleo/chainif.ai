"use server";

import { ArweaveService } from "../../../lib/services/arweave";
import { validateSHA256 } from "@/lib/sha-256-utils";
import { ResponseType } from "@/types/response";
import arweave from "../../../lib/config/arweave";

async function searchForHash(hash: string): Promise<{ foundValues: any[], data: any } | undefined> {
  try {
    const arwaveSerice = new ArweaveService(arweave);
    const foundValues = await arwaveSerice.searchForHash(hash);
    if (!foundValues || foundValues.length === 0) {
      return { foundValues: [], data: null }
    }
    const data = await arweave.api.get(`/${foundValues[0].node.id}`);

    return {
      foundValues: foundValues,
      data: data.data,
    }
  } catch (error: any) {
    console.error(error)
  }
}

export default async function getFeedback(hashValue: string): Promise<ResponseType> {
  if (!validateSHA256(hashValue)) return { feedback: 'Invalid' };
  await new Promise((resolve) => setTimeout(resolve, 2000))
  
  const queryResult = await searchForHash(hashValue);
  return {
    feedback: !!queryResult?.foundValues && (queryResult.foundValues.length > 0) ? 'Found' : 'Not-Found',
    data: {
      data: queryResult?.data,
      hash: hashValue,
      author: !!queryResult?.foundValues[0] && queryResult?.foundValues[0].node.tags.find((obj: any) => obj.name === 'Author').value,
    }
  }
}
