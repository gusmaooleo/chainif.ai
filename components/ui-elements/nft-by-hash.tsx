"use client";

import { useEffect, useRef, useState } from 'react';
import { Gradient, SVG } from '@svgdotjs/svg.js';
import { Button } from '../ui/button';

type NFTGeneratorProps = {
  hash: string;
  className?: string;
};

export default function NftByHash({
  hash,
  className = ''
}: NFTGeneratorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svgString, setSvgString] = useState<string>('');
  const [svgUrl, setSvgUrl] = useState<string>('');

  const width = 350;
  const height = 350;

  useEffect(() => {
    if (!hash || !containerRef.current) return;

    containerRef.current.innerHTML = '';

    const canvas = SVG().addTo(containerRef.current);
    canvas.viewbox(0, 0, width, height);
    canvas.attr({ preserveAspectRatio: 'xMidYMid meet' });

    // background gradient
    const bgColor = `#${hash.substring(0, 6)}`;
    const gradient = canvas.gradient('radial', (add: Gradient) => {
      add.stop(0, bgColor);
      add.stop(1, `#${hash.substring(6, 12)}`);
    });
    canvas.rect(width, height).fill(gradient);

    const numShapes = parseInt(hash.substring(6, 8), 16) % 11 + 10;

    for (let i = 0; i < numShapes; i++) {
      const shapeType = parseInt(hash.substring(8 + i * 2, 9 + i * 2), 16) % 3;
      const x = parseInt(hash.substring(10 + i * 4, 12 + i * 4), 16) % width;
      const y = parseInt(hash.substring(12 + i * 4, 14 + i * 4), 16) % height;
      const size = parseInt(hash.substring(14 + i * 4, 16 + i * 4), 16) % 100 + 30;
      const color = `#${hash.substring(16 + i * 6, 22 + i * 6)}`;
      const rotation = parseInt(hash.substring(22 + i * 4, 24 + i * 4), 16) % 360;

      switch (shapeType) {
        case 0:
          canvas.circle(size)
            .center(x, y)
            .fill(color)
            .opacity(0.7);
          break;
        case 1:
          canvas.rect(size, size / 2)
            .move(x, y)
            .fill(color)
            .rotate(rotation, x, y);
          break;
        case 2:
          canvas.polygon(`${x},${y} ${x + size},${y} ${x + size / 2},${y + size}`)
            .fill(color)
            .opacity(0.5);
          break;
      }
    }

    canvas.text(`256-${hash.substring(0, 16)}`)
      .font({ 
        family: 'Helvetica Rounded, Arial Rounded MT Bold, sans-serif',
        size: 16 
      })
      .move(width - 198, height - 30)
      .fill('rgba(0, 0, 0, 0.6)');

    const svgStr = canvas.svg();
    setSvgString(svgStr);

    const blob = new Blob([svgStr], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    setSvgUrl(url);

    return () => {
      canvas.clear();
      URL.revokeObjectURL(url);
    };
  }, [hash]);

  const handleDownload = () => {
    if (!svgString) return;
    
    const link = document.createElement('a');
    link.href = svgUrl;
    link.download = `nft-${hash.substring(0, 8)}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <div
        ref={containerRef}
        className="self-center w-full aspect-square rounded-xl overflow-hidden"
      />
      <Button onClick={handleDownload}>Download NFT</Button>
    </div>
  );
}
