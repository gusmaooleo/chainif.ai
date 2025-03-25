import HashInput from "@/components/elements/hash-input";
import ShowEquivalentHash from "@/components/elements/show-equivalent-hash";

type HashLayoutType = {
  children: React.ReactNode;
  params: Promise<{ hash: string[] }>;
}

export default async function HashLayout({ children, params }: HashLayoutType) {
  const { hash } = await params;
  const hashValue = !!hash ? hash[0] : "";
  
  return (
    <div className="flex flex-col h-auto items-center justify-between">
      {children}
      <div className="w-[32vmax] mb-10">
        <ShowEquivalentHash hashValue={hashValue} />
        <HashInput urlHash={hashValue} />
      </div>
    </div>
  );
}
