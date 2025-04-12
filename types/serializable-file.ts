export const SupportedMimeTypes = {
  HTML: "text/html",
  TEXT: "text/plain",
  PDF: "application/pdf",
  PNG: "image/png",
  JPEG: "image/jpeg",
  GIF: "image/gif",
  SVG: "image/svg+xml",
} as const;

export type SupportedFileTypes = typeof SupportedMimeTypes[keyof typeof SupportedMimeTypes];

type FileExtension = ".html" | ".txt" | ".pdf" | ".png" | ".jpg" | ".jpeg" | ".svg" | ".gif";

export const SupportedMimeToExtension: Record<SupportedFileTypes, FileExtension[]> = {
  "text/html": [".html"],
  "text/plain": [".txt"],
  "application/pdf": [".pdf"],
  "image/png": [".png"],
  "image/jpeg": [".jpg", ".jpeg"],
  "image/gif": [".gif"],
  "image/svg+xml": [".svg"],
};

export type SerializableFile = {
  name: string;
  type: SupportedFileTypes;
  data: number[]
}