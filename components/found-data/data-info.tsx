import FoundDataElement from "./found-data-elements";
import { CopyButton } from "../ui-elements/copy-button";

export default function DataInfo({ data }: { data: string }) {
  return (
    <FoundDataElement classname="md:w-full" title="Data:">
      <div className="bg-gray-200 h-full w-full md:w-[46vmin] rounded-lg p-4 text-sm relative border border-gray-300">
        <CopyButton textToCopy={data} className="absolute top-1 right-1" />
        <div className="font-[Fira_Code] h-[calc(100%)] overflow-auto">
          <pre className="whitespace-pre-wrap m-0">{data}</pre>
        </div>
      </div>
    </FoundDataElement>
  );
}
