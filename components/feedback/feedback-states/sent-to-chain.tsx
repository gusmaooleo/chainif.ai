"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export default function SentToChain({ hash }: { hash: string }) {
  const [isAvailable, setIsAvailable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const checkTxStatus = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/check-tx-status?hash=${encodeURIComponent(hash)}`);
      const { available } = await response.json();
      setIsAvailable(available);
    } catch (error) {
      console.error("Failed to check transaction status:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAvailable) {
        checkTxStatus();
      }
    }, 5000);

    checkTxStatus();

    return () => clearInterval(interval);
  }, [hash]);

  const handleViewData = () => {
    window.location.replace(`/${hash}`)
  };

  return (
    <div className="flex items-center flex-col w-[25rem] gap-2 mt-15">
      <Image 
        src="/successfully-inserted-data.svg" 
        alt="logo" 
        height={104.36} 
        width={200} 
      />
      <h1 className="text-xl text-gray-600">Operation successfully completed</h1>
      <div className="text-center text-gray-400">
        Wait a few minutes until your transaction <span className="text-gray-500">#{hash.slice(0, 6)}</span> is confirmed
      </div>
      <Button 
        onClick={handleViewData} 
        disabled={!isAvailable}
        className="mt-5"
      >
        {isAvailable ? "View Data" : "Waiting confirmation..."}
      </Button>
    </div>
  );
}