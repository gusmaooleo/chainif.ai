import Arweave from "arweave";
import { ResponseWithData } from "arweave/node/lib/api";
import { JWKInterface } from "arweave/node/lib/wallet";

declare global {
  var arweaveKey: any;
  var publicKey: any;
}


/**
 * Get Arweave key and public key by the environment "dev" || "test" != "prod".
 * @param instance 
 * @returns 
 */
export const getArweaveKey = async (
  instance: Arweave
): Promise<{ key: JWKInterface; pk: string }> => {
  if (process.env.NODE_ENV === "production") {
    if (!process.env.ARWEAVE_KEY || !process.env.ARWEAVE_PKEY)
      throw new Error("ARWEAVE_KEY not provided.");
    return {
      key: JSON.parse(process.env.ARWEAVE_KEY),
      pk: process.env.ARWEAVE_PKEY,
    };
  }

  if (globalThis.arweaveKey && globalThis.publicKey)
    return { key: globalThis.arweaveKey, pk: globalThis.publicKey };

  const key = await instance.wallets.generate();
  globalThis.arweaveKey = key;
  globalThis.publicKey = await instance.wallets.jwkToAddress(key);
  return { key: key, pk: publicKey };
};


/**
 * Fetch the provided hash data.
 * @param pk 
 * @param hash 
 * @param instance 
 */
export const fetchHashData = async (
  pk: string, hash: string, instance: Arweave
): Promise<ResponseWithData<any> | undefined> => {
  try {
    const queryObject = {
      query: `{
        transactions (
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
            }
          }
        }
      }`,
    };

    const results = await instance.api.post('/graphql', queryObject);
    return results;
  } catch (error: any) {
    console.error(error)
  }
};


/**
 * Up the provided hash data to Arweave blockchain using the provided key.
 * @param pk 
 * @param hash 
 * @param instance 
 */
export const upHashData = async (
  pk: string, hash: string, instance: Arweave
): Promise<ResponseWithData<any> | undefined> => {
  try {
    
    
    return;
  } catch (error: any) {
    console.error(error)
  }
};