import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Image from "next/image"

export default function AboutDialog({ children }: React.PropsWithChildren) {
  return (
    <Dialog>
      <DialogTrigger>
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <div className="flex flex-row items-center gap-2">
              <Image src={'/svg-logo.svg'} alt="svg-logo" width={20} height={20} />
              <p>Chainif.AI</p>
            </div>
          </DialogTitle>
          <div className="flex flex-col gap-3 my-4">
            <DialogDescription className="text-justify text-gray-600">
              ChainifAI is an innovative project designed to validate texts generated by artificial intelligence (AI) by leveraging blockchain technology. 
            </DialogDescription>
            <DialogDescription className="text-justify text-gray-600">
              Its primary purpose is to ensure transparency, authenticity, and immutability of AI-generated content. The project accomplishes this by generating a unique SHA-256 hash for each AI-created text and securely storing this hash within a blockchain. By doing so, ChainifAI allows any user or organization to independently verify the originality and integrity of AI-generated documents. 
            </DialogDescription>
            <DialogDescription className="text-justify text-gray-600">
            This validation process ensures that the content remains tamper-proof and verifiable at any point in the future, significantly enhancing trust and accountability in AI-driven outputs across various applications and industries.
            </DialogDescription>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}