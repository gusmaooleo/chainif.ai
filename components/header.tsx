import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <div className="flex justify-start w-auto m-5">
      <Link href={'/'}>
        <Image src={'/svg-logo.svg'} alt="logo" width={30} height={30} />
      </Link>
    </div>
  );
}