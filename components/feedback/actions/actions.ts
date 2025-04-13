"use server";

import { ArweaveService } from "../../../lib/services/ArweaveService";
import { validateSHA256 } from "@/utils/sha-256-utils";
import { ResponseType } from "@/types/response";
import arweave from "../../../lib/config/arweave";
import { SerializableFile } from "@/types/serializable-file";
import { Tag } from "@/types/arweave-response";

// TODO: improve this.
async function searchForHash(
  hash: string
): Promise<
  { foundValues: any[]; data: string | SerializableFile | null } | undefined
> {
  try {
    const arwaveSerice = new ArweaveService(arweave);
    const foundValues = await arwaveSerice.searchForHash(hash);
    if (!foundValues || foundValues.length === 0) {
      return { foundValues: [], data: null };
    }

    const response = await arweave.api.get(`/${foundValues[0].node.id}`, {
      responseType: "arraybuffer",
    });
    const contentType = response.headers.get("content-type");

    if (contentType?.includes("text/plain")) {
      const textDecoder = new TextDecoder("utf-8");
      return {
        foundValues: foundValues,
        data: textDecoder.decode(response.data) as string
      }
    }

    const fileName: Tag = foundValues[0].node.tags.find(
      (obj: Tag) => obj.name === "File-Name"
    );

    return {
      foundValues: foundValues,
      data: {
        type: contentType,
        data: Array.from(new Uint8Array(response.data)),
        name: fileName.value,
      } as SerializableFile
    };
  } catch (error: any) {
    console.error(error);
    throw new Error("Error when searching for transaction data");
  }
}

export default async function getFeedback(
  hashValue: string
): Promise<ResponseType> {
  const txStatus = await fetch(`/api/check-tx-status?hash=${encodeURIComponent(hashValue)}`);

  if (!validateSHA256(hashValue)) return { feedback: "Invalid" };

  const queryResult = await searchForHash(hashValue);
  const hasFoundValues =
    queryResult &&
    queryResult.foundValues &&
    queryResult.foundValues.length > 0;

  const firstFoundValue = queryResult?.foundValues?.[0];
  const date =
    queryResult && queryResult.foundValues.length > 0
      ? new Date(
          queryResult?.foundValues[0].node.block.timestamp * 1000
        ).toISOString()
      : undefined;
  const txId = firstFoundValue?.node.id;
  const authorTag = firstFoundValue?.node.tags.find(
    (obj: any) => obj.name === "Author"
  );
  const author = authorTag?.value;

  return {
    feedback: hasFoundValues ? "Found" : "Not-Found",
    data: {
      type: "complete",
      message: `We find the content for #${hashValue.slice(0, 6)} hash.`,
      success: true,
      state: "",
      tx_id: txId,
      data: queryResult?.data!,
      hash: hashValue,
      date: date,
      author: author,
    },
  };
}
