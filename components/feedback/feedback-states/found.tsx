import { faCircleCheck } from "@fortawesome/free-solid-svg-icons/faCircleCheck";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons/faArrowUpRightFromSquare";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export function FoundFeedback({
  title,
  tx_id,
}: {
  title?: string;
  tx_id?: string;
}) {
  return (
    <div className="flex items-center flex-row gap-2 pr-4 pl-4 md:p-0">
      <h1 className="text-xl md:text-2xl text-gray-600">{title}</h1>
      <div className="flex flex-col md:flex-row gap-3 md:ml-4 items-center">
        <FontAwesomeIcon
          icon={faCircleCheck}
          className="text-success text-xl"
        />
        <a
          href={`https://viewblock.io/arweave/tx/${tx_id}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon
            icon={faArrowUpRightFromSquare}
            className="text-gray-600 text-sm"
          />
        </a>
      </div>
    </div>
  );
}