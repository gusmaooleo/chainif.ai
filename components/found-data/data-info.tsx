import FoundDataElement from "./found-data-elements";
import { CopyButton } from "../ui-elements/copy-button";
import { SerializableFile } from "@/types/serializable-file";
import Image from "next/image";

export default function DataInfo({ data }: { data: string | SerializableFile }) {
  if (typeof data === 'string') {
    return (
      <FoundDataElement classname="md:w-full" title="Data:">
        <div className="bg-gray-200 max-h-[40rem] w-full md:w-[46vmin] rounded-lg p-4 text-sm relative border border-gray-300">
          <CopyButton textToCopy={data} className="absolute top-1 right-1" />
          <div className="font-[Fira_Code] h-[calc(100%)] overflow-auto">
            <pre className="whitespace-pre-wrap m-0">{data}</pre>
          </div>
        </div>
      </FoundDataElement>
    );
  }

  const convertImage = (): string => {
    const intArray = new Uint8Array(data.data);
    const blob = new Blob([intArray], {type: data.type});
    const url = URL.createObjectURL(blob);
    return url;
  }

  if (data.type.includes("image/")) {
    return (
      <>
        <Image 
          src={convertImage()}
          alt="imagem"
          width={500}
          height={100}
        />
      </>
    )
  }
}
