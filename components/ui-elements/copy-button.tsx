"use client";

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { Button } from '../ui/button';

type CopyButtonProps = {
  textToCopy: string;
  label?: string;
  className?: string;
};

export function CopyButton({ textToCopy, label = 'Copiar', className }: CopyButtonProps) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Error on copy text: ', err);

      // fallback for old browsers
      const textArea = document.createElement('textarea');
      textArea.value = textToCopy;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  return (
    <Button
      onClick={handleCopy}
      size="sm"
      variant="ghost"
      className={`gap-2 ${className}`}
      aria-label={isCopied ? 'Copiado!' : `Copiar ${label}`}
    >
      {isCopied ? (
        <>
          <Check className="h-4 w-4" />
        </>
      ) : (
        <>
          <Copy className="h-4 w-4" />
        </>
      )}
    </Button>
  );
}