import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DropzoneInputProps, DropzoneRootProps } from "react-dropzone";
import { faUpload } from "@fortawesome/free-solid-svg-icons/faUpload";

type UpArchiveButtonType = {
  getRootProps: <T extends DropzoneRootProps>(props?: T) => T;
  getInputProps: <T extends DropzoneInputProps>(props?: T) => T;
};

export default function UpArchiveButton({
  getRootProps,
  getInputProps,
}: UpArchiveButtonType) {
  return (
    <div
      {...getRootProps({
        className:
          "flex items-center justify-center min-w-[2.25rem] bg-gray-600 rounded-full hover:bg-gray-500 transition dropzone relative cursor-pointer",
      })}
    >
      <FontAwesomeIcon icon={faUpload} color="#fdfdfd" />
      <input className="absolute w-full h-full z-[100]" {...getInputProps()} />
    </div>
  );
}
