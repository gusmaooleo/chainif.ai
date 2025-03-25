import { faCircleCheck } from "@fortawesome/free-regular-svg-icons/faCircleCheck";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ShowEquivalentHash({hashValue}: {hashValue: string}) {
  if (hashValue) {
    return (
      <div className="flex flex-row items-center px-2 mb-2">
        <p className="truncate text-sm text-gray-400">
          <span className="italic">Equivalent SHA256: </span>
          {hashValue}
        </p>
        <FontAwesomeIcon icon={faCircleCheck} className="text-success w-5" />
      </div>
    );
  }
}
