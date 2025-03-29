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
        sendEvent('progress', { message: "Verifing if hash already exists on blockchain...", progress: 25 });
        await new Promise((resolve) => setTimeout(resolve, 1000))
        const queryResults = await arweaveService.searchForHash(hash);
        if (!!queryResults && queryResults.length > 0) {
          sendEvent('error', { error: "Hash already exists on blockchain." });
          controller.close();
          return;
        }

        sendEvent('progress', { message: "Starting transaction...", progress: 50 });
        await new Promise((resolve) => setTimeout(resolve, 1000))
        const results = await arweaveService.createTransaction(body, hash);
        if (!results) {
          sendEvent('error', { error: "Cannot create transaction." });
          controller.close()
          return;
        }
        if (results instanceof Error) {
          throw results;
        }
        const { uploader, transaction } = results;
        
        sendEvent('progress', { message: "Up data to blockchain...", progress: 50 });
        await new Promise((resolve) => setTimeout(resolve, 4000))
        while (!uploader.isComplete) {
          await uploader.uploadChunk();
          console.log(
            `uploading chunk: ${uploader.uploadedChunks}/${uploader.totalChunks}`
          );
          let remainingPercent = 50 + ((50 * uploader.uploadedChunks)/uploader.totalChunks);
          sendEvent('progress', { message: "Up data to blockchain...", progress: remainingPercent });
        }
    
        if (process.env.NODE_ENV !== "production") {
          await mine();
        }

        const insertedData = await arweave.api.get(`/${transaction.id}`);
        sendEvent('complete', { 
          success: true,
          message: "Data successfully inserted on blockchain.",
          data: insertedData.data,
          hash: hash,
        });
      } catch (error) {
        sendEvent('error', { error: "Unknown error, try to fetch data again." });
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