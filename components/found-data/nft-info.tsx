import NftByHash from "../ui-elements/nft-by-hash";
import FoundDataElement from "./found-data-elements";

export default function NftInfo({hash}: {hash: string}) {
  return (
    <FoundDataElement title="NFT:" classname="sm:w-[350px] w-full">
      <NftByHash hash={hash} className="rounded-lg" />
    </FoundDataElement>
  )
}