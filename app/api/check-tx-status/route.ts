import { NextResponse } from 'next/server';
import { CheckTXIDStatus } from '@/lib/services/CheckTXIDStatus';

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
    const response = await CheckTXIDStatus.check(hash);
    return NextResponse.json(response)
  } catch (error) {
    console.error('Error checking tx status:', error);
    return NextResponse.json(
      { error: 'Failed to check transaction status' },
      { status: 500 }
    );
  }
}