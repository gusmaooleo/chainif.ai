import QRCode from 'qrcode';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const text = searchParams.get('text')

  try {
    if (!text) throw new Error("Cannot find 'text' params");
    const dataUrl = await QRCode.toDataURL(text, {
      errorCorrectionLevel: 'H',
      scale: 15,
      margin: 1
    });
    const base64 = dataUrl.replace(/^data:image\/png;base64,/, '');
    const buffer = Buffer.from(base64, 'base64');

    return new Response(buffer, {
      headers: {
        'Content-Type': 'image/png',
        'Content-Disposition': 'inline; filename="qrcode.png"',
      },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: `Failed to generate QR Code: ${err.message}` }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
