export const SupportedMimeTypes = {
  HTML: "text/html",
  TEXT: "text/plain",
  PDF: "application/pdf",
  PNG: "image/png",
  JPEG: "image/jpeg",
  SVG: "image/svg+xml",
} as const;

export type SupportedFileTypes = typeof SupportedMimeTypes[keyof typeof SupportedMimeTypes];

export type SerializableFile = {
  name: string;
  type: SupportedFileTypes;
  data: number[]
}