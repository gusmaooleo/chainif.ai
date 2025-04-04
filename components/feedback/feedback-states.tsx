import { faCircleCheck } from "@fortawesome/free-solid-svg-icons/faCircleCheck";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons/faCircleXmark";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons/faArrowUpRightFromSquare";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import UpDataForm from "../forms/up-data-form";
import React from "react";

export function DefaultFeedback() {
  return (
    <div className="flex items-center flex-col w-[20rem] gap-2">
      <Image src="/svg-logo.svg" alt="logo" height={104.36} width={90.42} />
      <h1 className="text-5xl text-gray-600">chainif.AI</h1>
      <p className="text-center text-gray-400">
        Validate AI generated content and authorial texts.
      </p>
    </div>
  );
}

export function FoundFeedback({
  title,
  tx_id,
}: {
  title?: string;
  tx_id?: string;
}) {
  return (
    <div className="flex items-center flex-row gap-2 pr-4 pl-4 md:p-0">
      <h1 className="text-xl md:text-2xl text-gray-600">{title}</h1>
      <div className="flex flex-col md:flex-row gap-3 md:ml-4 items-center">
        <FontAwesomeIcon
          icon={faCircleCheck}
          className="text-success text-xl"
        />
        <a
          href={`https://viewblock.io/arweave/tx/${tx_id}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon
            icon={faArrowUpRightFromSquare}
            className="text-gray-600 text-sm"
          />
        </a>
      </div>
    </div>
  );
}

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

export function InvalidFeedback() {
  return (
    <div className="flex items-center flex-col w-[20rem] gap-2">
      <Image
        src="/invalid-feedback.svg"
        alt="invalid-feedback"
        height={105}
        width={200}
      />
      <div className="flex items-center flex-row gap-2 mt-5">
        <h1 className="text-xl text-gray-600">Invalid SHA256 hash</h1>
        <FontAwesomeIcon icon={faCircleXmark} className="text-error w-5" />
      </div>
      <p className="text-center text-gray-400">
        Check that the content provided or the route has been correctly defined.
      </p>
    </div>
  );
}

export function ErrorFeedback({ error }: { error?: string }) {
  return (
    <div className="flex items-center flex-col w-[20rem] gap-2">
      <Image
        src="/invalid-feedback.svg"
        alt="invalid-feedback"
        height={105}
        width={200}
      />
      <div className="flex items-center flex-row gap-2 mt-5">
        <h1 className="text-xl text-gray-600">Error on fetching data</h1>
        <FontAwesomeIcon icon={faCircleXmark} className="text-error w-5" />
      </div>
      <p className="text-center text-gray-400">{error}</p>
    </div>
  );
}
