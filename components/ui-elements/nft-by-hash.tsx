"use client";

import { Suspense } from 'react';
import { Button } from '../ui/button';
import { Spinner } from '../ui/spinner';

type NFTGeneratorProps = {
  hash: string;
  className?: string;
  title?: string;
};

export default function NftByHash({
  hash,
  title,
  className = ''
}: NFTGeneratorProps) {
  return (
    <Suspense fallback={<Spinner className="text-gray-600" />}>
      <NftImageContainer hash={hash} title={title} className={className} />
    </Suspense>
  );
}

function NftImageContainer({
  hash,
  title,
  className = ''
}: NFTGeneratorProps) {
  const svgUrl = `/api/nft?hash=${encodeURIComponent(hash)}`;

  const handleDownload = async () => {
    try {
      const response = await fetch(svgUrl);
      const svgString = await response.text();
      
      const blob = new Blob([svgString], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `nft-${hash.substring(0, 8)}.svg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading NFT:', error);
    }
  };

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <p className="font-medium text-gray-600">{title}</p>
      <img
        src={svgUrl}
        alt="Generated NFT"
        className="self-center w-full aspect-square rounded-xl"
      />
      <Button onClick={handleDownload}>Download NFT</Button>
    </div>
  );
}