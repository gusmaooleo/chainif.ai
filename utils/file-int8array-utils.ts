import { SerializableFile, SupportedFileTypes } from "@/types/serializable-file";

/**
 * Converts a File object to Uint8Array (serializable).
 * @param file - File to be converted.
 * @returns Promise<Uint8Array> - Binary data of file.
 */
const fileToUint8Array = async (file: File): Promise<Uint8Array> => {
  const arrayBuffer = await file.arrayBuffer();
  return new Uint8Array(arrayBuffer);
};

/**
 * Rebuilds a File by an Uint8Array.
 * @param uint8Array - Original binary data of file.
 * @param fileName - Original file name (ex: "document.pdf").
 * @param mimeType - File type (ex: "application/pdf").
 * @returns File - The file to be rebuilded.
 */
const uint8ArrayToFile = (
  uint8Array: Uint8Array,
  fileName: string,
  mimeType: string
): File => {
  const blob = new Blob([uint8Array], { type: mimeType });
  return new File([blob], fileName, { type: mimeType });
};

const buildSerializableFile = async (
  file: File
): Promise<SerializableFile> => {
  const data = await fileToUint8Array(file);
  return {
    name: file.name,
    type: file.type as SupportedFileTypes,
    data: Array.from(data)
  }
}

export { fileToUint8Array, uint8ArrayToFile, buildSerializableFile }