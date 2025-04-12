import { Suspense } from 'react';
import Image from "next/image";
import { Spinner } from '../ui/spinner';

function QRCodeImage({ url }: { url: string }) {
  return (
    <Image
      src={`/api/qrcode?text=${url}`}
      alt="address-qrcode"
      width={200}
      height={200}
    />
  );
}

export default function QRCodeBlock({ url }: { url: string }) {
  return (
    <Suspense fallback={<Spinner />}>
      <QRCodeImage url={url} />
    </Suspense>
  );
}