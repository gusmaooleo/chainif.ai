import crypto from "crypto";

const generateSHA256 = (content: string): string => {
  if (content.length === 0) {
    return "";
  }

  return crypto.createHash("sha256").update(content).digest("hex");
};

const validateSHA256 = (hash: string): boolean => {
  return (
    typeof hash === "string" &&
    hash.length === 64 &&
    /^[a-fA-F0-9]+$/.test(hash)
  );
};

export { generateSHA256, validateSHA256 };
