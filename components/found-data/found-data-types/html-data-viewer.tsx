'use client';

import { useState, useEffect } from "react";
import FoundDataElement from "../ui-elements/found-data-elements";
import { SerializableFile } from "@/types/serializable-file";

export function HtmlDataViewer({ file }: { file: SerializableFile }) {
  const [iframeSrc, setIframeSrc] = useState<string | undefined>();

  useEffect(() => {
    const htmlString = new TextDecoder('utf-8').decode(new Uint8Array(file.data));
    const blob = new Blob([htmlString], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    setIframeSrc(url);

    return () => {
      URL.revokeObjectURL(url);
      setIframeSrc(undefined);
    };
  }, [file.data]);

  return (
    <FoundDataElement classname="h-[60vmin] w-[70vmin]" title="HTML Content:">
      <iframe
        src={iframeSrc}
        className="h-full w-full border rounded-lg bg-white"
        sandbox="allow-same-origin allow-popups"
        loading="lazy"
        referrerPolicy="no-referrer"
        allow=""
      />
    </FoundDataElement>
  );
}