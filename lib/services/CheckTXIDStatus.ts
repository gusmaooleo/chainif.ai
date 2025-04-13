import { TransactionTypes, TransactionValidationTypes } from "@/types/transaction-validation-states";
import redis from "../config/redis";
import { ArweaveService } from "./ArweaveService";
import arweave from "../config/arweave";

export type TXIDStatusResponse = {
  available: boolean | TransactionTypes;
  data?: any;
}

export class CheckTXIDStatus {
  static async check(hash: string): Promise<TXIDStatusResponse> {
    try {
      const arweaveService = new ArweaveService(arweave);
      const results = await arweaveService.searchForHash(hash);
  
      if (results && results.length > 0) {
        await redis.del(`hash:${hash}`);
      }
      
      return {
        available: !!(results && results.length > 0),
        data: results
      };
    } catch (error: any) {
      throw error;
    }
  }
}