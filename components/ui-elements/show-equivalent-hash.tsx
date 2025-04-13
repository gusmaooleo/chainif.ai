'use client';

import { validateSHA256 } from "@/utils/sha-256-utils";
import { RootState } from "@/lib/config/store";
import { useSelector } from "react-redux";

export default function ShowEquivalentHash({hashValue}: {hashValue: string}) {
  const { feedbackValue } = useSelector((state: RootState) => state.form);
  
  if (feedbackValue === 'Found') {
    return null
  }
  
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
