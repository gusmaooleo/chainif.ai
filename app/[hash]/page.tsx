import Image from "next/image";
import { Input } from "@/components/ui/input";

export default function DynamicHashPage({params,}: {params: { hash: string };}) {
  let hashValue = !!params.hash ? params.hash : "";

  return (
    <div className="w-[32vmax]">
      <div className="flex flex-row">
        <Input 
          className="rounded-full border-gray-400 text-sm text-gray-600 placeholder:text-gray-300" 
          defaultValue={hashValue}
          placeholder="Paste SHA256 or ai generated content"
        >

        </Input>

        <Image src={'/svg-logo-bw.svg'} alt="svg-logo" width={22} height={22} className="relative ml-[-2rem]" />
      </div>
    </div>
  );
}
