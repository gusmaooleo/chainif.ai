import Arweave from "arweave";

const arweave =
  process.env.NODE_ENV === "production"
    ? Arweave.init({
        host: "localhost",
        port: 1984,
        protocol: "http",
      })
    : Arweave.init({
        host: "arweave.net",
        port: 443,
        protocol: "https",
      });

export default arweave;
