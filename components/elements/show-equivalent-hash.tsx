import { faCircleCheck } from "@fortawesome/free-regular-svg-icons/faCircleCheck";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons/faCircleXmark";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { validateSHA256 } from "@/lib/sha-256-utils";

export default function ShowEquivalentHash({hashValue}: {hashValue: string}) {
  if (hashValue) {
    return (
      <div className="flex flex-row items-center px-2 mb-2 gap-2">
        <p className="truncate text-sm text-gray-400">
          <span className="italic">Equivalent SHA256: </span>
          {hashValue}
        </p>
        {validateSHA256(hashValue) ?
          <FontAwesomeIcon icon={faCircleCheck} className="text-success w-5" /> :
          <FontAwesomeIcon icon={faCircleXmark} className="text-error w-5" />
        }
      </div>
    );
  }
}
