"use client";

import Image from "next/image";
import { Input } from "../ui/input";
import { FormEvent, useCallback, useMemo, useState } from "react";
import { generateSHA256, validateSHA256 } from "@/lib/sha-256-utils";
import { useRouter } from "next/navigation";

type HashInputProps = {
  urlHash: string;
};

export default function HashInput({ urlHash }: HashInputProps) {
  const [inputValue, setInputValue] = useState(urlHash);
  const isValidHash = useMemo(() => validateSHA256(inputValue), [inputValue]);
  const router = useRouter();

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const hash = isValidHash ? inputValue : generateSHA256(inputValue);
      router.push(`/${hash}`);
    },
    [isValidHash, inputValue, router]
  );

  return (
    <form className="flex flex-row" onSubmit={handleSubmit}>
      <Input
        className="rounded-full border-gray-400 text-sm text-gray-600 placeholder:text-gray-300 pr-9"
        value={inputValue}
        placeholder="Paste SHA256 or ai generated content"
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button type="submit" className="relative ml-[-2rem]">
        <Image
          src={isValidHash ? "/svg-logo.svg" : "/svg-logo-bw.svg"}
          alt="svg-logo"
          width={22}
          height={22}
        />
      </button>
    </form>
  );
}
