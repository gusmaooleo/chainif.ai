"use server";

import { fetchHashData, getArweaveKey, upHashData } from "../services/arweave";
import { HashForm } from "@/types/hashform";
import { generateSHA256 } from "../sha-256-utils";
import arweave from "../config/arweave";

export async function searchForHash(hash: string): Promise<{ edges: any[] } | undefined> {
  try {
    await new Promise((response) => setTimeout(response, 1000))
    const { pk } = await getArweaveKey(arweave);
    const fetchResult = await fetchHashData(pk, hash, arweave);
    return fetchResult?.data.data.transactions;
  } catch (error: any) {
    console.error(error)
  }
}

export async function upHashToChain(formData: HashForm): Promise<{ edges: any[] } | undefined> {
  try {
    const credentials = await getArweaveKey(arweave);
    const hash = generateSHA256(formData.content);
    const fetchResult = await upHashData(credentials, hash, arweave, formData);
    return fetchResult?.data.data.transactions;
  } catch (error: any) {
    console.error(error);
  }
}