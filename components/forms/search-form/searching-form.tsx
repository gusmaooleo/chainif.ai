"use client";

import { FormEvent, useCallback, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useDropzone } from "react-dropzone";
import { RootState } from "@/lib/config/store";
import { setInputValue, setFileInputValue } from "@/lib/slices/form-slice";
import { generateSHA256, validateSHA256 } from "@/utils/sha-256-utils";
import { SearchInput } from "./assets/search-input";
import { SearchButton } from "./assets/search-button";
import { FileUploadSection } from "./assets/file-upload-section";
import { buildSerializableFile } from "@/utils/file-int8array-utils";
import { toast } from "sonner";

export default function SearchingForm() {
  const router = useRouter();
  const { hash } = useParams();
  const dispatch = useDispatch();

  const { inputValue, fileInputValue } = useSelector(
    (state: RootState) => state.form
  );
  const isValidHash = useMemo(() => validateSHA256(inputValue), [inputValue]);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const serializableFile = await buildSerializableFile(acceptedFiles[0]);
        dispatch(setFileInputValue(serializableFile));
        dispatch(setInputValue(""));
      }
    },
    [dispatch]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: {
      "application/pdf": [".pdf"],
      "image/*": [".png", ".jpg", ".jpeg", ".svg", ".gif"],
      "text/*": [".html"],
    },
    maxSize: 5 * (1024 * 1024), //5mb
    onDropRejected: () => {
      toast.error("Error: The file is very large, enter less than 5 mb", {
        position: "top-right",
        style: { backgroundColor: "#FF6568", color: "#fdfdfd" },
      });
    },
  });

  const clearAllFiles = useCallback(() => {
    dispatch(setFileInputValue(null));
  }, [dispatch]);

  const handleInputChange = useCallback(
    (value: string) => {
      dispatch(setInputValue(value));
      if (fileInputValue) {
        dispatch(setFileInputValue(null));
      }
    },
    [dispatch, fileInputValue]
  );

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!inputValue && !fileInputValue) return;
      if (hash && inputValue === hash[0]) return;

      const hashToUse = fileInputValue
        ? generateSHA256(fileInputValue)
        : isValidHash
        ? inputValue
        : generateSHA256(inputValue);

      router.push(`/${hashToUse}`);
    },
    [inputValue, fileInputValue, isValidHash, hash, router]
  );

  return (
    <form className="flex flex-col gap-10" onSubmit={handleSubmit}>
      <div className="flex flex-row gap-2">
        <SearchInput
          value={inputValue}
          isValidHash={isValidHash}
          onChange={handleInputChange}
          disabled={!!fileInputValue}
        />
        <FileUploadSection
          file={fileInputValue}
          getRootProps={getRootProps}
          getInputProps={getInputProps}
          clearFiles={clearAllFiles}
        />
      </div>
      <SearchButton isDisabled={!inputValue && !fileInputValue} />
    </form>
  );
}
