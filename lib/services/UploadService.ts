import arweave from '@/lib/config/arweave';
import { generateSHA256 } from '@/utils/sha-256-utils';
import { HashForm } from '@/types/hashform';
import { ArweaveService } from './ArweaveService';
import { EventStreamService } from './EventStreamService';
import { TransactionUploader } from 'arweave/node/lib/transaction-uploader';

export class UploadService {
  private arweaveService: ArweaveService;

  constructor() {
    this.arweaveService = new ArweaveService(arweave);
  }

  private mine = () => arweave.api.get('mine');

  public async handleUpload(body: HashForm, eventStream: EventStreamService) {
    const hash = generateSHA256(body.content);

    try {
      const hasExistingHash = await this.checkExistingHash(hash, body, eventStream);
      if (hasExistingHash) {
        return;
      }

      const { uploader, transaction } = await this.createTransaction(body, hash, eventStream);
      await this.uploadData(uploader, eventStream);

      if (process.env.NODE_ENV !== 'production') {
        await this.mine();
      }

      this.sendSuccessEvent(hash, body, transaction.id, eventStream);
    } catch (error: any) {
      this.handleError(error, eventStream);
    } finally {
      eventStream.close();
    }
  }

  private async checkExistingHash(hash: string, body: HashForm, eventStream: EventStreamService): Promise<boolean> {
    eventStream.sendProgress(`Verifying if hash #${hash.slice(0, 6)} already exists on blockchain...`, 25);
    const queryResults = await this.arweaveService.searchForHash(hash);

    if (queryResults && queryResults.length > 0) {
      const response = queryResults[0].node;

      eventStream.sendComplete({
        message: `Hash #${hash.slice(0, 6)} already exists on blockchain.`,
        data: body.content,
        date: queryResults.length > 0
          ? new Date(response.block.timestamp * 1000).toISOString()
          : undefined,
        hash: hash,
        author: response.tags.find((obj: any) => obj.name === 'Author').value,
        tx_id: response.id,
      });
    }

    return !!queryResults && queryResults.length > 0;
  }

  private async createTransaction(body: HashForm, hash: string, eventStream: EventStreamService) {
    eventStream.sendProgress('Starting transaction...', 50);
    
    const results = await this.arweaveService.createTransaction(body, hash);
    if (!results) {
      throw new Error('Cannot create transaction');
    }
    if (results instanceof Error) {
      throw results;
    }
    
    return results;
  }

  private async uploadData(uploader: TransactionUploader, eventStream: EventStreamService) {
    eventStream.sendProgress('Uploading data to blockchain...', 50);
    
    while (!uploader.isComplete) {
      await uploader.uploadChunk();
      console.log(`uploading chunk: ${uploader.uploadedChunks}/${uploader.totalChunks}`);
      const remainingPercent = 50 + (50 * uploader.uploadedChunks) / uploader.totalChunks;
      eventStream.sendProgress('Uploading data to blockchain...', remainingPercent);
    }
  }

  private sendSuccessEvent(hash: string, body: HashForm, txId: string, eventStream: EventStreamService) {
    eventStream.sendComplete({
      success: true,
      message: `Hash #${hash.slice(0, 6)} successfully inserted on blockchain.`,
      state: '',
      data: body.content,
      date: new Date().toISOString(),
      hash: hash,
      author: body.author,
      tx_id: txId,
    });
  }

  private handleError(error: any, eventStream: EventStreamService) {
    eventStream.sendError({
      message: error.message,
      error: 400,
    });
  }
}