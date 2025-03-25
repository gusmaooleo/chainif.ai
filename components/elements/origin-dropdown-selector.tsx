"use client";

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import { Button } from "../ui/button";
import { optionsList } from "@/lib/factories/dropdown-options-factory";
import { useState } from "react";
import Image from "next/image";

type OriginDropdownSelectorType = {
  setOrigin: (origin: string) => void;
};

export default function OriginDropdownSelector({
  setOrigin,
}: OriginDropdownSelectorType) {
  const [iconRef, setIconRef] = useState<string>(optionsList.Authorial.icon);

  const handleSetOrigin = ({
    icon,
    value,
  }: {
    icon: string;
    value: string;
  }) => {
    setOrigin(value);
    setIconRef(icon);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="rounded-full p-2">
          <Image
            src={iconRef}
            alt="selected-icon"
            height={20}
            width={20}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {Object.keys(optionsList).map((key) => {
          const typedKey = key as keyof typeof optionsList;
          return (
            <DropdownMenuItem
              key={key}
              onClick={(_) => handleSetOrigin(optionsList[typedKey])}
              className="text-gray-600"
            >
              <Image
                src={optionsList[typedKey]["icon"]}
                alt={key}
                height={20}
                width={20}
              />
              {key}
            </DropdownMenuItem>
          );
        })}
        <DropdownMenuSeparator />
        <DropdownMenuLabel className="text-gray-600">Select origin</DropdownMenuLabel>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
