import Image from "next/image";
import FoundDataElement from "./found-data-elements";
import { optionsList } from "@/lib/constants/originOptions";

export default function AuthorInfo({ author }: { author?: string }) {

  const getAuthorIcon = (): [string, string | undefined] => {
    const key = Object.keys(optionsList).find(
      (key: string) => optionsList[key].value === author
    );
    if (!key) {
      return [optionsList["Authorial"].icon, author];
    }

    if (key === "Authorial") {
      return [optionsList[key].icon, author];
    }

    return [optionsList[key].icon, key];
  };
  
  return (
    <FoundDataElement title="Author:" classname="w-auto">
      <div className="flex items-center flex-row gap-2">
        <Image src={getAuthorIcon()[0]} alt="Author" width={25} height={25} />
        <p className="truncate text-sm text-gray-600 capitalize">
          {getAuthorIcon()[1]}
        </p>
      </div>
    </FoundDataElement>
  );
}
