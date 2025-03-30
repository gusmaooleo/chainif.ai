import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons/faArrowLeft";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ContentWrapper from "@/components/wrappers/content-wrapper";
import notFoundPage from '@/public/not-found-page.svg';
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Chainif.AI",
  description: "Sorry, we didn't find anything here.",
};

export default async function NotFound() {
  return (
    <ContentWrapper>
      <div className="flex flex-col gap-4 items-center">
        <Image src={notFoundPage} alt="not-found-page vector" width={512} height={512} />
        <h1 className="text-gray-600 text-lg mt-20">Sorry, we didn&apos;t find anything here.</h1>
        <p className="text-gray-400 text-center">Do you want to return to the main page?</p>
        <Link href={"/"} className="mt-10">
          <Button className="bg-d-button hover:bg-d-button-hover cursor-pointer">
            <FontAwesomeIcon icon={faArrowLeft} />
            Back
          </Button>
        </Link>
      </div>
    </ContentWrapper>
  );
}
