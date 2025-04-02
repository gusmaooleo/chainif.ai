import Image from "next/image";
import github from '@/public/github-logo.svg';
import arweave from '@/public/arweave-logo-rs.svg';
import about from '@/public/about.svg';
import Link from "next/link";
import AboutDialog from "./dialogs/about-dialog";
import ArweaveDialog from "./dialogs/arweave-dialog";

export default function Footer() {
  return (
    <footer className="flex w-screen justify-end p-4">
      <div className="flex flex-row gap-4 bg-gray-100 px-4 py-1 rounded-full border border-gray-200 shadow-sm items-center">
        <ArweaveDialog>
          <Image src={arweave} alt="arweave" className="cursor-pointer" />
        </ArweaveDialog>
        <Link href="https://github.com/gusmaooleo/chainif.ai" style={{marginTop: "1px"}}>
          <Image src={github} alt="github-logo" />
        </Link>
        <AboutDialog>
          <Image src={about} alt="about" className="cursor-pointer" width={22} height={22} />
        </AboutDialog>
      </div>
    </footer>
  )
}