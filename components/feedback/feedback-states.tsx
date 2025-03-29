import { faCircleCheck } from "@fortawesome/free-solid-svg-icons/faCircleCheck";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons/faCircleXmark"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image"

export function DefaultFeedback() {
  return (
    <div className="flex items-center flex-col w-[20rem] gap-2">
      <Image src="/svg-logo.svg" alt="logo" height={104.36} width={90.42} />
      <h1 className="text-5xl text-gray-600">chainif.AI</h1>
      <p className="text-center text-gray-400">Validate AI generated content and authorial texts.</p>
    </div>
  )
}

export function FoundFeedback({hash}: {hash: string}) {
  return (
    <div className="flex items-center flex-row gap-2 mt-5">
      <h1 className="text-2xl text-gray-600">We find the content for #{hash.slice(0, 6)} hash</h1>
      <FontAwesomeIcon icon={faCircleCheck} className="text-success w-6" />
    </div>
  )
}

export function NotFoundFeedback() {
  return (
    <div className="flex items-center flex-col w-[20rem] gap-2">
      <Image src="/not-found-feedback.svg" alt="not-found" height={105} width={200} />
      <h1 className="text-xl text-gray-600 mt-5">We couldn't find the content</h1>
      <p className="text-center text-gray-400">Upload this content to the Arweave blockchain or search for another hash.</p>
    </div>
  )
}

export function InvalidFeedback() {
  return (
    <div className="flex items-center flex-col w-[20rem] gap-2">
      <Image src="/invalid-feedback.svg" alt="invalid-feedback" height={105} width={200} />
      <div className="flex items-center flex-row gap-2 mt-5">
        <h1 className="text-xl text-gray-600">Invalid SHA256 hash</h1>
        <FontAwesomeIcon icon={faCircleXmark} className="text-error w-5" />
      </div>
      <p className="text-center text-gray-400">Check that the content provided or the route has been correctly defined.</p>
    </div>
  )
}