import { JWKInterface } from "arweave/node/lib/wallet";

export interface ArweaveCredentials {
  key: JWKInterface;
  pk: string;
}