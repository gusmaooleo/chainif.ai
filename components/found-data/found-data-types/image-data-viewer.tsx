import Image from "next/image";
import { SerializableFile } from "@/types/serializable-file";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from '@fortawesome/free-solid-svg-icons/faDownload'

export function ImageDataViewer({ file }: { file: SerializableFile }) {
  const imageUrl = URL.createObjectURL(
    new Blob([new Uint8Array(file.data)], { type: file.type })
  );

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = file.name || 'downloaded-image';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(imageUrl);
  };

  return (
    <div className="flex flex-col gap-2 max-h-[50vmin] w-full rounded-lg mb-5 relative">
      <p className="font-medium text-gray-600">Image:</p>
      <Image 
        src={imageUrl}
        alt="Uploaded content"
        className="object-contain h-full w-auto rounded-lg"
        width={10000}
        height={10000}
      />
      <div className="flex w-full justify-end items-center gap-3">
        <p className="text-sm text-gray-600">{file.name}</p>
        <Button className="w-fit" onClick={handleDownload}>
          <FontAwesomeIcon icon={faDownload} />
        </Button>
      </div>
    </div>
  );
}