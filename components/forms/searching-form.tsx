"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { Input } from "../ui/input";
import { generateSHA256, validateSHA256 } from "@/utils/sha-256-utils";
import { setInputValue } from "@/lib/slices/form-slice";
import { RootState } from "@/utils/store";
import { FileWithPath, useDropzone } from "react-dropzone";
import React from "react";
import UpArchiveButton from "../ui-elements/up-archive-button";
import AcceptedFiles from "../ui-elements/accepted-files";
import { Button } from "../ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons/faMagnifyingGlass';

const SubmitButton = React.memo(() => (
  <Button type="submit" className="bg-d-button hover:bg-d-button-hover transition w-fit self-center">
    <FontAwesomeIcon icon={faMagnifyingGlass} />
    Search
  </Button>
));

export default function SearchingForm() {
  const { inputValue } = useSelector((state: RootState) => state.form);
  const { hash } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const [files, setFiles] = useState<FileWithPath[]>([]);
  const [localInput, setLocalInput] = useState(inputValue);
  const isValidHash = useMemo(() => validateSHA256(localInput), [localInput]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const clearAllFiles = () => {
    setFiles([]);
  };

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
    <form className="flex flex-col gap-10" onSubmit={handleSubmit}>
      <div className="flex flex-row gap-2">
        <div className="flex flex-row w-full">
          <Input
            className="rounded-full text-sm text-gray-600 placeholder:text-gray-300 pr-9 bg-gray-000"
            value={localInput}
            placeholder="Paste SHA256, authorial texts or ai generated content"
            onChange={handleInputChange}
          />
          <Image
            src={isValidHash ? "/svg-logo.svg" : "/svg-logo-bw.svg"}
            alt="svg-logo"
            width={22}
            height={22}
            className="relative ml-[-2rem]"
            priority
          />
        </div>
        <UpArchiveButton
          getInputProps={getInputProps}
          getRootProps={getRootProps}
        />
        {files.length > 0 && (
          <AcceptedFiles files={files} clearFiles={clearAllFiles} />
        )}
      </div>
      <SubmitButton />
    </form>
  );
}
