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

  const queryResult = await searchForHash(hashValue);
  const hasFoundValues = !!queryResult?.foundValues && queryResult.foundValues.length > 0;

  const firstFoundValue = queryResult?.foundValues?.[0];
  const date = queryResult && queryResult.foundValues.length > 0 ? new Date(queryResult?.foundValues[0].node.block.timestamp * 1000).toISOString() : undefined;
  const txId = firstFoundValue?.node.id;
  const authorTag = firstFoundValue?.node.tags.find((obj: any) => obj.name === 'Author');
  const author = authorTag?.value;

  return {
    feedback: hasFoundValues ? 'Found' : 'Not-Found',
    data: {
      message: `We find the content for #${hashValue.slice(0, 6)} hash.`,
      tx_id: txId,
      data: queryResult?.data,
      hash: hashValue,
      date: date,
      author: author
    }
  };
}
