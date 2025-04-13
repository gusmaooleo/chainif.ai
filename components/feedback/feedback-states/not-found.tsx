import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import UpDataForm from "@/components/forms/up-data-form/up-data-form";

export const NotFoundFeedback = React.memo(() => {
  return (
    <>
      <div className="flex items-center flex-col w-[20rem] gap-2">
        <Image
          src="/not-found-feedback.svg"
          alt="not-found"
          height={105}
          width={200}
        />
        <h1 className="text-xl text-gray-600 mt-5">
          We couldn&apos;t find the content
        </h1>
        <p className="text-center text-gray-400">
          Upload this content to the Arweave blockchain or search for another
          hash.
        </p>
      </div>
      <div className="flex flex-row gap-4 mt-10">
        <Link href="/">
          <Button variant="outline">Cancel</Button>
        </Link>
        <UpDataForm>Up to blockchain</UpDataForm>
      </div>
    </>
  );
})