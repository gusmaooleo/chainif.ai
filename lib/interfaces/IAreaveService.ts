import { TransactionUploader } from "arweave/node/lib/transaction-uploader";
import { RequestForm } from "@/types/form";
import { ArweaveCredentials } from "@/types/arweave-credentials";
import Transaction from "arweave/node/lib/transaction";

export interface IArweaveService {
  /**
   * Gets Arweave credentials (key and public key)
   * @returns Promise with Arweave credentials
   */
  getArweaveKey(): Promise<ArweaveCredentials>;

  /**
   * Searches for transactions containing the specified hash
   * @param hash The hash to search for
   * @returns Promise with array of transaction edges or undefined if not found
   */
  searchForHash(hash: string): Promise<any[] | undefined>;

  /**
   * Creates a new Arweave transaction
   * @param formData The data to be stored
   * @param hash The hash associated with the data
   * @returns Promise with transaction uploader and transaction object, or Error
   */
  createTransaction(
    formData: RequestForm,
    hash: string
  ): Promise<{ uploader: TransactionUploader; transaction: Transaction } | Error>;

  /**
   * Uploads data to Arweave blockchain
   * @param transaction The prepared transaction
   * @param uploader The transaction uploader
   * @returns Promise with the upload result
   * @deprecated Consider using alternative upload methods
   */
  upHashData(transaction: Transaction, uploader: TransactionUploader): Promise<any>;
}