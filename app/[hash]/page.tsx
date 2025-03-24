import { Input } from "@/components/ui/input";

export default function DynamicHashPage({
  params,
}: {
  params: { hash: string };
}) {
  let hashValue = !!params.hash ? params.hash : "";

  return (
    <main className="flex-grow w-screen my-10">
      <div className="flex flex-col h-full items-center w-screen">
        <div className="w-[32vmax]">

          <Input className="rounded-full border-gray-400 text-sm text-gray-600">

          </Input>
        </div>
      </div>
    </main>
  );
}
