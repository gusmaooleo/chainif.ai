import Image from "next/image";
import github from '@/public/github-logo.svg';
import contact from '@/public/contact-me.svg';
import about from '@/public/about.svg';

export default function Footer() {
  return (
    <footer className="flex w-screen gap-4 flex-row justify-end p-4">
      <Image src={github} alt="github-logo" />
      <Image src={contact} alt="contact-me" />
      <Image src={about} alt="about" />
    </footer>
  )
}