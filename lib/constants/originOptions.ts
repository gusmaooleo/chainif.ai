import authorial from '@/public/authorial.svg';
import chatgpt from '@/public/chatgpt.svg';
import deepseek from '@/public/deepseek.svg';
import gemini from '@/public/gemini.svg';
import grok from '@/public/grok.svg';


export enum OriginType {
  Authorial = "Authorial",
  Gemini = "Gemini",
  ChatGPT = "ChatGPT",
  DeepSeek = "DeepSeek",
  Grok = "Grok",
}

export const optionsList: Record<string, { icon: string; value: string }> = {
  [OriginType.Authorial]: {
    icon: authorial,
    value: "authorial-text",
  },
  [OriginType.Gemini]: {
    icon: gemini,
    value: "ai-generated-gemini",
  },
  [OriginType.ChatGPT]: {
    icon: chatgpt,
    value: "ai-generated-chatgpt",
  },
  [OriginType.DeepSeek]: {
    icon: deepseek,
    value: "ai-generated-deepseek",
  },
  [OriginType.Grok]: {
    icon: grok,
    value: "ai-generated-grok",
  },
};
