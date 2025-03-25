import Image from "next/image";
import github from '@/public/github-logo.svg';
import contact from '@/public/contact-me.svg';
import about from '@/public/about.svg';
import Link from "next/link";
import AboutDialogWrapper from "../wrappers/about-dialog-wrapper";

export default function Footer() {
  return (
    <footer className="flex w-screen gap-4 flex-row justify-end p-4">
      <Link href="https://github.com/gusmaooleo/chainif.ai" style={{marginTop: "1px"}}>
        <Image src={github} alt="github-logo" />
      </Link>
      <Image src={contact} alt="contact-me" />
      <AboutDialogWrapper>
        <Image src={about} alt="about" className="cursor-pointer" />
      </AboutDialogWrapper>
    </footer>
  )
}