import { Spinner } from "../ui/spinner";

export default function DefaultLoading() {
  return (
    <div className="flex flex-col gap-4 w-[20rem] mt-30">
      <Spinner size={"ultralarge"} className="text-gray-600" />
      <p className="text-center text-gray-600">Searching your data on Arweave blockchain.</p>
    </div>
  )
}