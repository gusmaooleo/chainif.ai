import { NextResponse } from 'next/server';
import { HashForm } from '@/types/hashform';
import { UploadService } from '@/lib/services/UploadService';
import { EventStreamService } from '@/lib/services/EventStreamService';

export async function POST(request: Request) {
  const body: HashForm = await request.json();
  if (!body.content) {
    return new NextResponse('Content is required', { status: 400 });
  }

  const stream = new ReadableStream({
    async start(controller) {
      const eventStream = new EventStreamService(controller);
      const uploadService = new UploadService();
      
      await uploadService.handleUpload(body, eventStream);
    },
  });

  return new NextResponse(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  });
}