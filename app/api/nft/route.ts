import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const hash = searchParams.get("hash");

  if (!hash) {
    return new NextResponse("Hash parameter is required", { status: 400 });
  }

  const width = 350;
  const height = 350;

  try {
    const bgColor = `#${hash.substring(0, 6)}`;
    const bgColor2 = `#${hash.substring(6, 12)}`;

    let svgContent = "";
    const numShapes = (parseInt(hash.substring(6, 8), 16) % 11) + 10;

    for (let i = 0; i < numShapes; i++) {
      const shapeType = parseInt(hash.substring(8 + i * 2, 9 + i * 2), 16) % 3;
      const x = parseInt(hash.substring(10 + i * 4, 12 + i * 4), 16) % width;
      const y = parseInt(hash.substring(12 + i * 4, 14 + i * 4), 16) % height;
      const size =
        (parseInt(hash.substring(14 + i * 4, 16 + i * 4), 16) % 100) + 30;
      const color = `#${hash.substring(16 + i * 6, 22 + i * 6)}`;
      const rotation =
        parseInt(hash.substring(22 + i * 4, 24 + i * 4), 16) % 360;

      const getSafeNumber = (value: number, fallback: number, max?: number) => {
        const num = isNaN(value) ? fallback : value;
        return max ? Math.min(num, max) : num;
      };

      switch (shapeType) {
        case 0:
          const circleSize = getSafeNumber(size, 50, width);
          const circleX = getSafeNumber(x, width / 2, width);
          const circleY = getSafeNumber(y, height / 2, height);
          svgContent += `<circle cx="${circleX}" cy="${circleY}" r="${
            circleSize / 2
          }" fill="${color}" opacity="0.7" />`;
          break;
        case 1:
          const rectWidth = getSafeNumber(size, 50, width);
          const rectHeight = getSafeNumber(size / 2, 25, height);
          const rectX = getSafeNumber(x, 0, width);
          const rectY = getSafeNumber(y, 0, height);
          svgContent += `<rect x="${rectX}" y="${rectY}" width="${rectWidth}" height="${rectHeight}" fill="${color}" transform="rotate(${rotation}, ${
            rectX + rectWidth / 2
          }, ${rectY + rectHeight / 2})" />`;
          break;
        case 2:
          const safeX = getSafeNumber(x, 100, width);
          const safeY = getSafeNumber(y, 100, height);
          const safeSize = getSafeNumber(size, 100, Math.min(width, height));
          svgContent += `<polygon points="${safeX},${safeY} ${
            safeX + safeSize
          },${safeY} ${safeX + safeSize / 2},${
            safeY + safeSize
          }" fill="${color}" opacity="0.5" />`;
          break;
      }
    }

    const svgStr = `
      <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <metadata id="secret">
            {"SHA256":"${hash}"}
          </metadata>
          <radialGradient id="bgGradient">
            <stop offset="0%" stop-color="${bgColor}" />
            <stop offset="100%" stop-color="${bgColor2}" />
          </radialGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#bgGradient)" />
        ${svgContent}
      </svg>
    `;

    return new NextResponse(svgStr, {
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "no-store, max-age=0",
      },
    });
  } catch (error) {
    console.error("Error generating NFT:", error);
    return new NextResponse("Error generating NFT", { status: 500 });
  }
}
