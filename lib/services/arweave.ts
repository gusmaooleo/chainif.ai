import { ArweaveCredentials } from "@/types/arweave-credentials";
import { HashForm } from "@/types/hashform";
import { ResponseWithData } from "arweave/node/lib/api";
import { TransactionUploader } from "arweave/node/lib/transaction-uploader";
import { generateSHA256 } from "../sha-256-utils";
import { hashFormSchema } from "../validation/hashform";
import Arweave from "arweave";
import * as yup from 'yup';
import Transaction from "arweave/node/lib/transaction";

declare global {
  var arweaveKey: any;
  var publicKey: any;
}


export class ArweaveService {
  constructor(private instance: Arweave) {}

  /**
   * Get Arweave key and public key by the environment "dev" || "test" != "prod".
   * @param instance
   * @returns
   */
  getArweaveKey = async (): Promise<ArweaveCredentials> => {
    if (process.env.NODE_ENV === "production") {
      if (!process.env.ARWEAVE_KEY || !process.env.ARWEAVE_PKEY)
        throw new Error("Fatal: ARWEAVE_KEY not provided.");
      return {
        key: JSON.parse(process.env.ARWEAVE_KEY),
        pk: process.env.ARWEAVE_PKEY,
      };
    }

    if (globalThis.arweaveKey && globalThis.publicKey)
      return { key: globalThis.arweaveKey, pk: globalThis.publicKey };

    const key = await this.instance.wallets.generate();
    globalThis.arweaveKey = key;
    globalThis.publicKey = await this.instance.wallets.jwkToAddress(key);
    await this.instance.api.get(`mint/${publicKey}/10000000000000000`);
    return { key: key, pk: publicKey };
  };

  /**
   * Fetch the provided hash data.
   * @param pk
   * @param hash
   * @param instance
   */
  searchForHash = async (
    hash: string
  ): Promise<any[] | undefined> => {
    try {
      const { pk } = await this.getArweaveKey();
      const queryObject = {
        query: `{
            transactions(
              owners:["${pk}"],
              tags: [
                {
                  name: "Hash",
                  values: ["${hash}"]
                }
              ]
            ) {
              edges {
                node {
                  id
                  owner {
                    address
                  }
                  tags {
                    name
                    value
                  }
                  block {
                    timestamp
                    height
                  }
                  data {
                    size
                    type
                  }
                  fee {
                    winston
                    ar
                  }
                }
              }
            }
          }`,
      };

      const results = await this.instance.api.post("/graphql", queryObject);
      return results.data.data.transactions.edges;
    } catch (error: any) {
      console.error(error);
    }
  };

  createTransaction = async (formData: HashForm, hash: string): Promise<{uploader: TransactionUploader, transaction: Transaction} | Error> => {    
    try {
      await hashFormSchema.validate(formData);
      
      const { key } = await this.getArweaveKey();

      let transaction = await this.instance.createTransaction(
        {
          data: formData.content,
        },
        key
      );

      transaction.addTag("Content-Type", "text/plain");
      transaction.addTag("Author", formData.author);
      transaction.addTag("Hash", hash);

      await this.instance.transactions.sign(transaction, key);
      const uploader = await this.instance.transactions.getUploader(transaction);

      return { uploader: uploader, transaction: transaction };
    } catch (error: any) {
      return error;
    }
  }

  /**
   * Up the provided hash data to Arweave blockchain using the provided key.
   * @param pk
   * @param hash
   * @param instance
   */
  upHashData = async (
    transaction: Transaction,
    uploader: TransactionUploader
  ): Promise<any> => {
    const mine = () => this.instance.api.get("mine");

    try {
      while (!uploader.isComplete) {
        await uploader.uploadChunk();
        console.log(
          `uploading chunk: ${uploader.uploadedChunks}/${uploader.totalChunks}`
        );
      }

      if (process.env.NODE_ENV !== "production") {
        await mine();
      }

      return await this.instance.api.get(`/${transaction.id}`);
    } catch (error: any) {
      console.error(error);
    }
  };
}