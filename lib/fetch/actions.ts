"use server";

import { ArweaveService } from "../services/arweave";
import arweave from "../config/arweave";

export async function searchForHash(hash: string): Promise<any[] | undefined> {
  try {
    const arwaveSerice = new ArweaveService(arweave);
    return await arwaveSerice.searchForHash(hash);
  } catch (error: any) {
    console.error(error)
  }
}