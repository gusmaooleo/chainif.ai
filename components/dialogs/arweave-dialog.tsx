import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ArweaveService } from "@/lib/services/ArweaveService";
import arweaveimg from "@/public/arweave-logo.svg";
import Image from "next/image";
import arweave from "@/lib/config/arweave";
import { CopyButton } from "../ui-elements/copy-button";
import QRCodeBlock from "../ui-elements/qrcode";

export default async function ArweaveDialog({
  children,
}: React.PropsWithChildren) {
  const arweaveService = new ArweaveService(arweave);
  const { pk } = await arweaveService.getArweaveKey();

  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <div className="flex flex-row items-center gap-2">
              <Image src={arweaveimg} alt="svg-logo" width={20} height={20} />
              <p>Arweave</p>
            </div>
          </DialogTitle>
          <DialogDescription className="text-justify text-gray-600">
            This DApp operates on the{" "}
            <a className="underline" href="https://arweave.org/">
              Arweave
            </a>{" "}
            blockchain, the purpose of which is the permanent and immutable
            storage of information. Once entered, data can neither be altered
            nor corrupted.
          </DialogDescription>
        </DialogHeader>
        
        <DonateTextBox pk={pk} />
        <DonateQRCodeBox pk={pk} />
      </DialogContent>
    </Dialog>
  );
}

export function DonateTextBox({ pk }: { pk: string }) {
  return (
    <div className="flex flex-col gap-2">
      <DialogDescription className="text-justify text-gray-600">
        To help this platform keep running, you can{" "}
        <span className="text-d-button">donate AR coins</span>.
      </DialogDescription>

      <div className="flex justify-between items-center bg-gray-200 rounded-lg border border-gray-300 shadow-sm font-[Fira_Code] p-3 w-full">
        <p className="truncate text-sm text-gray-500">{pk}</p>
        <CopyButton textToCopy={pk} />
      </div>
    </div>
  );
}

export function DonateQRCodeBox({ pk }: { pk: string }) {
  return (
    <div className="flex flex-col gap-2">
      <DialogDescription className="text-justify text-gray-600">
        Or using <span className="text-d-button">QR code</span>:
      </DialogDescription>

      <div className="flex flex-row w-full">
        <QRCodeBlock url={`https://viewblock.io/arweave/address/${pk}`} />
        <div className="flex flex-col items-center justify-center w-full gap-2">
          <Image
            src={`/svg-logo.svg`}
            alt="svg-logo"
            width={100}
            height={100}
          />
          <p>
            Thank <span className="text-d-button">you</span>!
          </p>
        </div>
      </div>
    </div>
  );
}
