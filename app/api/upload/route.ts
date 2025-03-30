import { NextResponse } from "next/server";
import { ArweaveService } from "@/lib/services/arweave";
import { HashForm } from "@/types/hashform";
import { generateSHA256 } from "@/lib/sha-256-utils";
import arweave from "@/lib/config/arweave";
import { SSEEventData, SSEEventType } from "@/types/sseevent";

export async function POST(request: Request) {
  const body: HashForm = await request.json();
  if (!body.content) {
    return new NextResponse("Content is required", { status: 400 });
  }

  const arweaveService = new ArweaveService(arweave);
  
  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();

      const sendEvent = (type: SSEEventType, data: SSEEventData) => {
        const message = `event: ${type}\ndata: ${JSON.stringify(data)}\n\n`;
        controller.enqueue(encoder.encode(message));
      };

      const mine = () => arweave.api.get("mine");
      const hash = generateSHA256(body.content);

      try {
        sendEvent('progress', { state: `Verifying if hash #${hash.slice(0, 6)} already exists on blockchain...`, progress: 25 });
        const queryResults = await arweaveService.searchForHash(hash);
        if (!!queryResults && queryResults.length > 0) {
          sendEvent('error', { error: 409, message: `Hash #${hash.slice(0, 6)} already exists on blockchain.`, data: body.content, hash: hash, author: body.author, tx_id: queryResults[0].node.id });
          controller.close();
          return;
        }

        sendEvent('progress', { state: "Starting transaction...", progress: 50 });
        const results = await arweaveService.createTransaction(body, hash);
        if (!results) {
          sendEvent('error', { message: "Cannot create transaction.", error: 400 });
          controller.close()
          return;
        }
        if (results instanceof Error) {
          throw results;
        }
        const { uploader, transaction } = results;
        
        sendEvent('progress', { state: "Uploading data to blockchain...", progress: 50 });
        while (!uploader.isComplete) {
          await uploader.uploadChunk();
          console.log(
            `uploading chunk: ${uploader.uploadedChunks}/${uploader.totalChunks}`
          );
          const remainingPercent = 50 + ((50 * uploader.uploadedChunks)/uploader.totalChunks);
          sendEvent('progress', { state: "Uploading data to blockchain...", progress: remainingPercent });
        }
    
        if (process.env.NODE_ENV !== "production") {
          await mine();
        }

        sendEvent('complete', { 
          success: true,
          message: `Hash #${hash.slice(0, 6)} successfully inserted on blockchain.`,
          state: "",
          data: body.content,
          hash: hash,
          author: body.author,
          tx_id: transaction.id,
        });
      } catch (error: any) {
        sendEvent('error', { message: "Unknown error, try to fetch data again.", error: 400 });
        console.error(error);
      } finally {
        controller.close();
      }
    },
  });

  return new NextResponse(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}