"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { FileWithPath, useDropzone } from "react-dropzone";
import { RootState } from "@/utils/store";
import { setInputValue } from "@/lib/slices/form-slice";
import { generateSHA256, validateSHA256 } from "@/utils/sha-256-utils";
import { SearchInput } from "./assets/search-input";
import { SearchButton } from "./assets/search-button";
import { FileUploadSection } from "./assets/file-upload-section";

export default function SearchingForm() {
  const { inputValue } = useSelector((state: RootState) => state.form);
  const dispatch = useDispatch();

  const { hash } = useParams();
  const router = useRouter();

  const [files, setFiles] = useState<FileWithPath[]>([]);
  const [localInput, setLocalInput] = useState(inputValue);

  const isValidHash = useMemo(() => validateSHA256(localInput), [localInput]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: useCallback((acceptedFiles: File[]) => {
      setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
    }, []),
  });
  const clearAllFiles = useCallback(() => setFiles([]), []);

  const updateReduxInput = useCallback(
    (value: string) => dispatch(setInputValue(value)),
    [dispatch]
  );

  const handleInputChange = useCallback(
    (value: string) => {
      setLocalInput(value);
      updateReduxInput(value);
    },
    [updateReduxInput]
  );

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!localInput && !files) return;

      let genHash: string;
      if (files.length > 0) {
        const file = files[0];
        genHash = await generateSHA256(file);
      } else {
        genHash = isValidHash ? localInput : (await generateSHA256(localInput));
      }
      
      if (hash && genHash === hash[0]) return;
      router.push(`/${genHash}`);
    },
    [localInput, isValidHash, hash, router, files]
  );

  return (
    <form className="flex flex-col gap-10" onSubmit={handleSubmit}>
      <div className="flex flex-row gap-2">
        <SearchInput
          value={localInput}
          isValidHash={isValidHash}
          onChange={handleInputChange}
          disabled={files.length > 0}
        />
        <FileUploadSection
          files={files}
          getRootProps={getRootProps}
          getInputProps={getInputProps}
          clearFiles={clearAllFiles}
        />
      </div>
      <SearchButton />
    </form>
  );
}
