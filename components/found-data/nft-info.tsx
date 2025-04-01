import NftByHash from "../ui-elements/nft-by-hash";
import FoundDataElement from "./found-data-elements";

export default function NftInfo({hash}: {hash: string}) {
  return (
    <FoundDataElement classname="w-full self-center">
      <NftByHash hash={hash} className="self-center rounded-lg w-full max-w-[350px]" title="NFT:" />
    </FoundDataElement>
  )
}