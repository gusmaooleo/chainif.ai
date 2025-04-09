import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { OriginType } from "@/lib/constants/originOptions";
import Image from "next/image";

const DropdownMenuItems = ({
  optionsList,
  handleSetOrigin
}: {
  optionsList: Record<OriginType, { icon: string; value: string }>;
  handleSetOrigin: (origin: { icon: string; value: string }) => void;
}) => (
  <>
    {Object.keys(optionsList).map((key) => {
      const typedKey = key as keyof typeof optionsList;
      return (
        <DropdownMenuItem
          key={key}
          onClick={() => handleSetOrigin(optionsList[typedKey])}
          className="text-gray-600"
        >
          <Image
            src={optionsList[typedKey].icon}
            alt={key}
            height={20}
            width={20}
            loading="lazy"
          />
          {key}
        </DropdownMenuItem>
      );
    })}
  </>
);

export default DropdownMenuItems;