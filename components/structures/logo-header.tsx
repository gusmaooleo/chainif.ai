import Image from "next/image";

export default function LogoHeader() {
  return (
    <div className="flex items-center w-screen flex-col">
      <div className="flex items-center flex-col w-[20rem] my-20">
        <Image src="/svg-logo.svg" alt="logo" height={104.36} width={90.42} />
        <h1 className="text-5xl text-gray-600">chainif.AI</h1>
        <p className="text-center text-gray-400">Validate AI generated content and authorial texts.</p>
      </div>
    </div>
  );
}
