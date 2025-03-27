"use server";

import { fetchHashData, getArweaveKey } from "../services/arweave";
import arweave from "../config/arweave";

export async function searchForHash(hash: string): Promise<{ edges: any[] } | undefined> {
  try {
    const { pk } = await getArweaveKey(arweave);
    const fetchResult = await fetchHashData(pk, hash, arweave);
    return fetchResult?.data.data.transactions;
  } catch (error: any) {
    console.error(error)
  }
}

export async function upHashToChain(hash: string) {
  try {
    const { key, pk } = await getArweaveKey(arweave);


  } catch (error) {
    console.error(error);
  }
}