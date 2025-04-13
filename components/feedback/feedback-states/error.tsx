import { faCircleXmark } from "@fortawesome/free-solid-svg-icons/faCircleXmark";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React from "react";

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
