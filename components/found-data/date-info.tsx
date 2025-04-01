import { standardDateConvertion } from "@/lib/parseISODate";
import FoundDataElement from "./found-data-elements";

export default function DateInfo({ date }: { date?: string }) {
  return (
    <FoundDataElement title="Date:">
      <p className="text-sm text-gray-600">
        {standardDateConvertion(date, true)}
      </p>
    </FoundDataElement>
  );
}
