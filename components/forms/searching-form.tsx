"use client";

import { FormEvent, useCallback, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { Input } from "../ui/input";
import { generateSHA256, validateSHA256 } from "@/lib/sha-256-utils";
import { setInputValue, setOriginValue } from "@/lib/slices/form-slice";
import { RootState } from "@/lib/store";
import OriginDropdownSelector from "../ui-elements/origin-dropdown-selector";

const SubmitButton = ({ isValidHash }: { isValidHash: boolean }) => (
  <button type="submit" className="relative ml-[-2rem]">
    <Image
      src={isValidHash ? "/svg-logo.svg" : "/svg-logo-bw.svg"}
      alt="svg-logo"
      width={22}
      height={22}
      className="cursor-pointer"
      priority
    />
  </button>
);

export default function SearchingForm() {
  const router = useRouter();
  const { inputValue } = useSelector((state: RootState) => state.form);
  const dispatch = useDispatch();
  const { hash } = useParams();

  const [localInput, setLocalInput] = useState(inputValue);
  const isValidHash = useMemo(() => validateSHA256(localInput), [localInput]);

  const updateReduxInput = useCallback(
    (value: string) => {
      dispatch(setInputValue(value));
    },
    [dispatch]
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setLocalInput(value);
      updateReduxInput(value);
    },
    [updateReduxInput]
  );

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!localInput) return;

      const genHash = isValidHash ? localInput : generateSHA256(localInput);
      if (hash && genHash === hash[0]) return;
      
      router.push(`/${genHash}`);
    },
    [localInput, isValidHash, hash, router]
  );

  return (
    <form className="flex flex-row gap-2" onSubmit={handleSubmit}>
      <div className="flex flex-row w-full">
        <Input
          className="rounded-full text-sm text-gray-600 placeholder:text-gray-300 pr-9"
          value={localInput}
          placeholder="Paste SHA256, authorial texts or ai generated content"
          onChange={handleInputChange}
        />
        <SubmitButton isValidHash={isValidHash} />
      </div>
      <OriginDropdownSelector setOrigin={useCallback((value) => dispatch(setOriginValue(value)), [dispatch])} />
    </form>
  );
}