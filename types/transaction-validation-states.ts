export const TransactionValidationTypes = {
  Pending: "pending",
  Validated: "validated",
  NotInserted: "not-inserted"
} as const;

export type TransactionTypes = typeof TransactionValidationTypes[keyof typeof TransactionValidationTypes];