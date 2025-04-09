import { SupportedFileTypes } from "@/types/file-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FileWithPath } from "react-dropzone";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faFile } from "@fortawesome/free-solid-svg-icons/faFile";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons/faFilePdf";
import { faFileLines } from "@fortawesome/free-solid-svg-icons/faFileLines";
import { faFileCode } from "@fortawesome/free-solid-svg-icons/faFileCode";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons/faCircleXmark";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"


export default function AcceptedFiles({
  files,
  clearFiles,
}: {
  files: readonly FileWithPath[];
  clearFiles: () => void;
}) {
  let icon: IconDefinition;

  switch (files[0].type as SupportedFileTypes) {
    case "text/html":
      icon = faFileCode;
      break;
    case "application/pdf":
      icon = faFilePdf;
      break;
    case "text/plain":
      icon = faFileLines;
      break;
    default:
      icon = faFile;
      break;
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className="w-fit">
          <div className="flex flex-col w-fit justify-center gap-2">
            <div className="flex items-center justify-center h-[2.2rem] w-[2.2rem] bg-gray-100 border border-gray-200 shadow-sm rounded-full relative">
              <FontAwesomeIcon icon={icon} className="text-gray-400" />
              <FontAwesomeIcon
                icon={faCircleXmark}
                className="absolute top-[-5px] right-[-5px] text-error w-5 cursor-pointer"
                onClick={clearFiles}
              />
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>
            {files[0].name}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
