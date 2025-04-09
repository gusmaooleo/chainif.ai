import crypto from "crypto";

const generateSHA256 = async (content: string | File): Promise<string> => {
  if (typeof content === 'string' && content.length === 0) {
    return "";
  }
  const hash = crypto.createHash("sha256");
  
  if (typeof content === 'string') {
    hash.update(content, 'utf-8');
  } else if (content instanceof File) {
    const arrayBuffer = await content.arrayBuffer();
    hash.update(new Uint8Array(arrayBuffer));
  } else {
    throw new Error('Unsupported content type for SHA256 generation');
  }

  return hash.digest('hex');
};

const validateSHA256 = (hash: string): boolean => {
  return (
    typeof hash === "string" &&
    hash.length === 64 &&
    /^[a-fA-F0-9]+$/.test(hash)
  );
};

export { generateSHA256, validateSHA256 };
