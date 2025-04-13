import arweave from "@/lib/config/arweave";
import { generateSHA256 } from "@/utils/sha-256-utils";
import { RequestForm } from "@/types/form";
import { ArweaveService } from "./ArweaveService";
import { TransactionUploader } from "arweave/node/lib/transaction-uploader";
import { IUploadService } from "../interfaces/IUploadService";
import { IEventStreamService } from "../interfaces/IEventStreamService";
import { TransactionValidationTypes } from "@/types/transaction-validation-states";
import redis from "../config/redis";

export class UploadService implements IUploadService {
  private arweaveService: ArweaveService;

  constructor() {
    this.arweaveService = new ArweaveService(arweave);
  }

  private mine = () => arweave.api.get("mine");

  public async handleUpload(
    body: RequestForm,
    eventStream: IEventStreamService
  ) {
    const hash = generateSHA256(body.content);

    try {
      const hasExistingHash = await this.checkExistingHash(
        hash,
        body,
        eventStream
      );
      if (hasExistingHash) {
        return;
      }

      const { uploader, transaction } = await this.createTransaction(
        body,
        hash,
        eventStream
      );
      await this.uploadData(uploader, eventStream);

      if (process.env.NODE_ENV !== "production") {
        await this.mine();
      }

      this.sendSuccessEvent(hash, body, transaction.id, eventStream);
    } catch (error: any) {
      this.handleError(error, eventStream);
    } finally {
      eventStream.close();
    }
  }

  private async checkExistingHash(
    hash: string,
    body: RequestForm,
    eventStream: IEventStreamService
  ): Promise<boolean> {
    eventStream.sendProgress(
      `Verifying if hash #${hash.slice(0, 6)} already exists on blockchain...`,
      25
    );
    const queryResults = await this.arweaveService.searchForHash(hash);

    if (queryResults && queryResults.length > 0) {
      const response = queryResults[0].node;

      eventStream.sendComplete({
        message: `Hash #${hash.slice(0, 6)} already exists on blockchain.`,
        data: body.content,
        date:
          queryResults.length > 0
            ? new Date(response.block.timestamp * 1000).toISOString()
            : undefined,
        hash: hash,
        author: response.tags.find((obj: any) => obj.name === "Author").value,
        tx_id: response.id,
      });
    }

    return !!queryResults && queryResults.length > 0;
  }

  private async createTransaction(
    body: RequestForm,
    hash: string,
    eventStream: IEventStreamService
  ) {
    eventStream.sendProgress("Starting transaction...", 50);

    const results = await this.arweaveService.createTransaction(body, hash);
    if (!results) {
      throw new Error("Cannot create transaction");
    }
    if (results instanceof Error) {
      throw results;
    }

    return results;
  }

  private async uploadData(
    uploader: TransactionUploader,
    eventStream: IEventStreamService
  ) {
    eventStream.sendProgress("Uploading data to blockchain...", 50);

    while (!uploader.isComplete) {
      await uploader.uploadChunk();
      console.log(
        `uploading chunk: ${uploader.uploadedChunks}/${uploader.totalChunks}`
      );
      const remainingPercent =
        50 + (50 * uploader.uploadedChunks) / uploader.totalChunks;
      eventStream.sendProgress(
        "Uploading data to blockchain...",
        remainingPercent
      );
    }
  }

  private async sendSuccessEvent(
    hash: string,
    body: RequestForm,
    txId: string,
    eventStream: IEventStreamService
  ) {
    await redis.set(`hash:${hash}`, TransactionValidationTypes.Pending, { ex: 7200 });
    
    eventStream.sendComplete({
      success: true,
      message: `Hash #${hash.slice(0, 6)} successfully inserted on blockchain.`,
      state: "",
      data: "wait for the transaction to be mined",
      date: new Date().toISOString(),
      hash: hash,
      author: body.author,
      tx_id: txId,
    });
  }

  private handleError(error: any, eventStream: IEventStreamService) {
    eventStream.sendError({
      message: error.message,
      error: 400,
    });
  }
}
