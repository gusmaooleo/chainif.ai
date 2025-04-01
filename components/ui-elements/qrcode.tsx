import Image from "next/image";

export default function QRCodeBlock({ url }: { url: string }) {
  return (
    <Image
      src={`/api/qrcode?text=${url}`}
      alt="addess-qrcode"
      width={200}
      height={200}
    />
  );
}
