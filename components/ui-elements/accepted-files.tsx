import { SerializableFile, SupportedFileTypes, SupportedMimeTypes } from "@/types/serializable-file";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faFile } from "@fortawesome/free-solid-svg-icons/faFile";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons/faFilePdf";
import { faFileLines } from "@fortawesome/free-solid-svg-icons/faFileLines";
import { faFileCode } from "@fortawesome/free-solid-svg-icons/faFileCode";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons/faCircleXmark";
import { faFileImage } from "@fortawesome/free-solid-svg-icons/faFileImage";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"


export default function AcceptedFiles({
  file,
  clearFiles,
}: {
  file: SerializableFile;
  clearFiles: () => void;
}) {
  let icon: IconDefinition;

  switch (file.type as SupportedFileTypes) {
    case SupportedMimeTypes.HTML:
      icon = faFileCode;
      break;
    case SupportedMimeTypes.PDF:
      icon = faFilePdf;
      break;
    case SupportedMimeTypes.TEXT:
      icon = faFileLines;
      break;
    case SupportedMimeTypes.PNG:
      icon = faFileImage;
      break;  
    case SupportedMimeTypes.JPEG:
      icon = faFileImage;
      break;
    case SupportedMimeTypes.SVG:
      icon = faFileImage;
      break;
    case SupportedMimeTypes.GIF:
      icon = faFileImage;
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
            {file.name}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
