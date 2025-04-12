import { NextResponse } from 'next/server';
import { ArweaveService } from '@/lib/services/ArweaveService';
import arweave from '@/lib/config/arweave';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const hash = searchParams.get('hash');
  
  if (!hash) {
    return NextResponse.json(
      { error: 'Hash parameter is required' },
      { status: 400 }
    );
  }

  try {
    const arweaveService = new ArweaveService(arweave);
    const results = await arweaveService.searchForHash(hash);
    
    return NextResponse.json({
      available: results && results.length > 0,
      data: results
    });
  } catch (error) {
    console.error('Error checking tx status:', error);
    return NextResponse.json(
      { error: 'Failed to check transaction status' },
      { status: 500 }
    );
  }
}