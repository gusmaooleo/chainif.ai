"use client";

import { useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { optionsList, OriginType } from "@/lib/constants/originOptions";
import { RootState } from "@/lib/store";

type OriginDropdownSelectorType = {
  setOrigin: (origin: { icon: string; value: string }) => void;
};

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

export default function OriginDropdownSelector({
  setOrigin,
}: OriginDropdownSelectorType) {
  const { originValue } = useSelector((state: RootState) => state.form);

  const handleSetOrigin = useCallback(
    (origin: { icon: string; value: string }) => {
      setOrigin(origin);
    },
    [setOrigin]
  );

  const TriggerButton = useMemo(
    () => (
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="rounded-full p-2">
          <Image 
            src={originValue.icon} 
            alt="selected-icon" 
            height={20} 
            width={20}
            priority
          />
        </Button>
      </DropdownMenuTrigger>
    ),
    [originValue.icon]
  );

  return (
    <DropdownMenu>
      {TriggerButton}
      <DropdownMenuContent>
        <DropdownMenuItems 
          optionsList={optionsList} 
          handleSetOrigin={handleSetOrigin} 
        />
        <DropdownMenuSeparator />
        <DropdownMenuLabel className="text-gray-600">
          Select origin
        </DropdownMenuLabel>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}