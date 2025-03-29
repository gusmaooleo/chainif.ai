import { validateSHA256 } from "@/lib/sha-256-utils";

export default function ShowEquivalentHash({hashValue}: {hashValue: string}) {
  if (hashValue && validateSHA256(hashValue)) {
    return (
      <div className="flex flex-row items-center px-2 mb-2 gap-2">
        <p className="truncate text-sm text-gray-400">
          <span className="italic">Equivalent SHA256: </span>
          {hashValue}
        </p>
      </div>
    );
  }
}
