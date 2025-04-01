import { CopyButton } from "../ui-elements/copy-button";
import FoundDataElement from "./found-data-elements";

export default function ChecksumInfo({ hash }: { hash: string }) {
  return (
    <FoundDataElement title="Checksum:" classname="md:w-[350px]">
      <div className="flex items-center flex-row gap-2">
        <p className="truncate text-sm text-gray-600">{hash}</p>
        <CopyButton textToCopy={hash} />
      </div>
    </FoundDataElement>
  );
}
