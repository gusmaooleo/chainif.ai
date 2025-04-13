import { ChangeEvent, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import Image from 'next/image';

interface SearchInputProps {
  value: string;
  isValidHash: boolean;
  onChange: (value: string) => void;
  disabled: boolean
}

export const SearchInput = ({ value, isValidHash, onChange, disabled }: SearchInputProps) => {
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value),
    [onChange]
  );

  return (
    <div className="flex flex-row w-full">
      <Input
        className="rounded-full text-sm text-gray-600 placeholder:text-gray-300 pr-9 bg-gray-000"
        value={value}
        placeholder="Paste SHA256, authorial texts or ai generated content"
        onChange={handleChange}
        disabled={disabled}
      />
      <Image
        src={isValidHash ? "/svg-logo.svg" : "/svg-logo-bw.svg"}
        alt="svg-logo"
        width={22}
        height={22}
        className="relative ml-[-2rem]"
        priority
      />
    </div>
  );
};