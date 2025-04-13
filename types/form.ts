import { SerializableFile } from "./serializable-file";

export interface RequestForm {
  content: string | SerializableFile;
  author: string;
}
