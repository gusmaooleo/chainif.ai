import Arweave from "arweave";

declare global {
  var arweaveInstance: Arweave | undefined;
}

const initializeArweave = (): Arweave => {
  if (process.env.NODE_ENV === "production") {
    return Arweave.init({
      host: "arweave.net",
      port: 443,
      protocol: "https",
    });
  }

  if (!globalThis.arweaveInstance) {
    globalThis.arweaveInstance = Arweave.init({
      host: "localhost",
      port: 1984,
      protocol: "http",
    });
    console.log("Running on development/test mode.");
  }

  return globalThis.arweaveInstance;
};

const arweave = initializeArweave();
export default arweave;