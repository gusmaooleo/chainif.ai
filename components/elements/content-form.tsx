"use client";

import Image from "next/image";
import { Input } from "../ui/input";
import { FormEvent, useCallback, useMemo } from "react";
import { generateSHA256, validateSHA256 } from "@/lib/sha-256-utils";
import { redirect, useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setInputValue, setOriginValue } from "@/lib/slices/form-slice";
import { RootState } from "@/lib/store";
import OriginDropdownSelector from "./origin-dropdown-selector";

export default function ContentForm() {
  const { inputValue, originValue } = useSelector((state: RootState) => state.form);
  const isValidHash = useMemo(() => validateSHA256(inputValue), [inputValue]);
  const dispatch = useDispatch();
  const { hash } = useParams();

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!inputValue) {
        return;
      }

      const format = `${inputValue} \n//${originValue.value}`;
      const genHash = isValidHash ? inputValue : generateSHA256(format);
      
      if (!!hash && (genHash === hash[0])) {
        return;
      }
      redirect(`/${genHash}`);
    },
    [isValidHash, inputValue, originValue]
  );

  return (
    <form className="flex flex-row gap-2" onSubmit={handleSubmit}>
      <div className="flex flex-row w-full">
        <Input
          className="rounded-full text-sm text-gray-600 placeholder:text-gray-300 pr-9"
          value={inputValue}
          placeholder="Paste SHA256, authorial texts or ai generated content"
          onChange={(e) => dispatch(setInputValue(e.target.value))}
        />
        <button type="submit" className="relative ml-[-2rem]">
          <Image
            src={isValidHash ? "/svg-logo.svg" : "/svg-logo-bw.svg"}
            alt="svg-logo"
            width={22}
            height={22}
            className="cursor-pointer"
          />
        </button>
      </div>
      <OriginDropdownSelector setOrigin={(value) => dispatch(setOriginValue(value))} />
    </form>
  );
}