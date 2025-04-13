"use client";

import FoundDataElement from "../ui-elements/found-data-elements";
import { useState, useEffect } from "react";
import { SerializableFile } from "@/types/serializable-file";

export function PdfDataViewer({ file }: { file: SerializableFile }) {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  useEffect(() => {
    const blob = new Blob([new Uint8Array(file.data)], { type: file.type });
    const url = URL.createObjectURL(blob);
    setPdfUrl(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [file.data, file.type]);

  return (
    <FoundDataElement classname="h-full" title="File:">
      <embed 
        src={`${pdfUrl}`}
        type="application/pdf"
        className="h-full w-[60vmin]"
      />
    </FoundDataElement>
  );
}