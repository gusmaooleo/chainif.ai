"use client";

import { memo, useRef, useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Spinner } from '../ui/spinner';

type NFTGeneratorProps = {
  hash: string;
  className?: string;
  title?: string;
};

const NftImageContainer = memo(function NftImageContainer({
  hash,
  title,
  className = ''
}: NFTGeneratorProps) {
  const cache = useRef<{[key: string]: string}>({});
  const [isLoading, setIsLoading] = useState(false);
  const svgUrl = `/api/nft?hash=${encodeURIComponent(hash)}`;

  useEffect(() => {
    if (!cache.current[hash]) {
      setIsLoading(true);
      fetch(svgUrl)
        .then(res => res.text())
        .then(svg => {
          cache.current[hash] = svg;
        })
        .finally(() => setIsLoading(false));
    }
  }, [hash, svgUrl]);

  const handleDownload = async () => {
    try {
      if (!cache.current[hash]) {
        const response = await fetch(svgUrl);
        cache.current[hash] = await response.text();
      }
      
      const blob = new Blob([cache.current[hash]], { type: 'image/svg+xml' });
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
      {isLoading ? (
        <div className="self-center w-full aspect-square flex items-center justify-center">
          <Spinner className="text-gray-600" />
        </div>
      ) : (
        <img
          src={svgUrl}
          alt="Generated NFT"
          className="self-center w-full aspect-square rounded-xl"
          key={hash}
          onLoad={() => setIsLoading(false)}
        />
      )}
      <Button onClick={handleDownload} disabled={isLoading}>
        {isLoading ? 'Preparing...' : 'Download NFT'}
      </Button>
    </div>
  );
});

export default function NftByHash(props: NFTGeneratorProps) {
  return <NftImageContainer {...props} />;
}