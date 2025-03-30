"use client";

import { useSelector } from "react-redux";
import { Spinner } from "../ui/spinner";
import { RootState } from "@/lib/store";

export default function DefaultLoading() {
  const { eventData } = useSelector((state: RootState) => state.sse);
  
  return (
    <div className="flex flex-col gap-4 w-[20rem] mt-30">
      <Spinner size={"ultralarge"} className="text-gray-600" />
      <p className="text-center text-gray-600">{(eventData && eventData.state) ? eventData.state : "Searching your data on Arweave blockchain."}</p>
    </div>
  )
}