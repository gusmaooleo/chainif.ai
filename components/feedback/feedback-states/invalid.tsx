import { faCircleXmark } from "@fortawesome/free-solid-svg-icons/faCircleXmark";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";

export function InvalidFeedback() {
  return (
    <div className="flex items-center flex-col w-[20rem] gap-2">
      <Image
        src="/invalid-feedback.svg"
        alt="invalid-feedback"
        height={105}
        width={200}
      />
      <div className="flex items-center flex-row gap-2 mt-5">
        <h1 className="text-xl text-gray-600">Invalid SHA256 hash</h1>
        <FontAwesomeIcon icon={faCircleXmark} className="text-error w-5" />
      </div>
      <p className="text-center text-gray-400">
        Check that the content provided or the route has been correctly defined.
      </p>
    </div>
  );
}