import { SerializableFile } from "@/types/serializable-file";
import { TextDataViewer } from "./found-data-types/text-data-viewer";
import { ImageDataViewer } from "./found-data-types/image-data-viewer";
import { PdfDataViewer } from "./found-data-types/pdf-data-viewer";
import { HtmlDataViewer } from "./found-data-types/html-data-viewer";

export default function DataInfo({ data }: { data: string | SerializableFile }) {
  if (typeof data === 'string') {
    return <TextDataViewer data={data} />;
  }

  switch (true) {
    case data.type.includes("image/"):
      return <ImageDataViewer file={data} />;
    
    case data.type.includes("application/pdf"):
      return <PdfDataViewer file={data} />;
    
    case data.type.includes("text/html"):
      return <HtmlDataViewer file={data} />;
    
    default:
      return <TextDataViewer data={new TextDecoder().decode(new Uint8Array(data.data))} />;
  }
}