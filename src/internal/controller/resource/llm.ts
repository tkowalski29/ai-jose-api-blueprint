import type { Request, Response} from "express";
import { ITalkLlm } from "../../ai/type";

export const resourceLlm = () => async (req: Request, res: Response) => {
  res.status(200);
  res.json(Object.assign(
    dataAnthropic,
    dataCohere,
    dataGroq,
    dataOllama,
    dataOpenai,
    dataPerplexity
  ));
  res.end();
};

const dataAnthropic: ITalkLlm[] = [
  {
    key: "anthropic__claude-3-5-sonnet-20240620",
    title: "claude-3-5-sonnet-20240620",
    company: "anthropic",
    model: "claude-3-5-sonnet-20240620",
    trainingDataTo: "04.2024",
    tokens: {
      contextWindow: 200000,
      maxOutput: 8192,
    },
    isLocal: false,
  },
  {
    key: "anthropic__claude-3-opus-20240229",
    title: "claude-3-opus-20240229",
    company: "anthropic",
    model: "claude-3-opus-20240229",
    trainingDataTo: "08.2023",
    tokens: {
      contextWindow: 200000,
      maxOutput: 4096,
    },
    isLocal: false,
  },
  {
    key: "anthropic__claude-3-sonnet-20240229",
    title: "claude-3-sonnet-20240229",
    company: "anthropic",
    model: "claude-3-sonnet-20240229",
    trainingDataTo: "08.2023",
    tokens: {
      contextWindow: 200000,
      maxOutput: 4096,
    },
    isLocal: false,
  },
  {
    key: "anthropic__claude-3-haiku-20240307",
    title: "claude-3-haiku-20240307",
    company: "anthropic",
    model: "claude-3-haiku-20240307",
    trainingDataTo: "08.2023",
    tokens: {
      contextWindow: 200000,
      maxOutput: 4096,
    },
    isLocal: false,
  },
]
const dataCohere: ITalkLlm[] = [
  {
    key: "cohere__command-r-plus",
    title: "command-r-plus",
    company: "cohere",
    model: "command-r-plus",
    trainingDataTo: undefined,
    tokens: {
      contextWindow: 128000,
      maxOutput: 4096,
    },
    isLocal: false,
  },
  {
    key: "cohere__command-r",
    title: "command-r",
    company: "cohere",
    model: "command-r",
    trainingDataTo: undefined,
    tokens: {
      contextWindow: 128000,
      maxOutput: 4096,
    },
    isLocal: false,
  },
  {
    key: "cohere__command",
    title: "command",
    company: "cohere",
    model: "command",
    trainingDataTo: undefined,
    tokens: {
      contextWindow: 4096,
      maxOutput: 4096,
    },
    isLocal: false,
  },
  {
    key: "cohere__command-nightly",
    title: "command-nightly",
    company: "cohere",
    model: "command-nightly",
    trainingDataTo: undefined,
    tokens: {
      contextWindow: 128000,
      maxOutput: 128000,
    },
    isLocal: false,
  },
  {
    key: "cohere__command-light",
    title: "command-light",
    company: "cohere",
    model: "command-light",
    trainingDataTo: undefined,
    tokens: {
      contextWindow: 4096,
      maxOutput: 4096,
    },
    isLocal: false,
  },
  {
    key: "cohere__command-light-nightly",
    title: "command-light-nightly",
    company: "cohere",
    model: "command-light-nightly",
    trainingDataTo: undefined,
    tokens: {
      contextWindow: 4096,
      maxOutput: 4096,
    },
    isLocal: false,
  },
]
const dataGroq: ITalkLlm[] = [
  {
    key: "groq__llama-3.1-405b-reasoning",
    title: "llama-3.1-405b-reasoning",
    company: "groq",
    model: "llama-3.1-405b-reasoning",
    trainingDataTo: undefined,
    tokens: {
      contextWindow: 131072,
      maxOutput: undefined,
    },
    isLocal: false,
  },
  {
    key: "groq__llama-3.1-70b-versatile",
    title: "llama-3.1-70b-versatile",
    company: "groq",
    model: "llama-3.1-70b-versatile",
    trainingDataTo: undefined,
    tokens: {
      contextWindow: 131072,
      maxOutput: undefined,
    },
    isLocal: false,
  },
  {
    key: "groq__llama-3.1-8b-instant",
    title: "llama-3.1-8b-instant",
    company: "groq",
    model: "llama-3.1-8b-instant",
    trainingDataTo: undefined,
    tokens: {
      contextWindow: 131072,
      maxOutput: undefined,
    },
    isLocal: false,
  },
  {
    key: "groq__llama3-groq-70b-8192-tool-use-preview",
    title: "llama3-groq-70b-8192-tool-use-preview",
    company: "groq",
    model: "llama3-groq-70b-8192-tool-use-preview",
    trainingDataTo: undefined,
    tokens: {
      contextWindow: 8192,
      maxOutput: undefined,
    },
    isLocal: false,
  },
  {
    key: "groq__llama3-groq-8b-8192-tool-use-preview",
    title: "llama3-groq-8b-8192-tool-use-preview",
    company: "groq",
    model: "llama3-groq-8b-8192-tool-use-preview",
    trainingDataTo: undefined,
    tokens: {
      contextWindow: 8192,
      maxOutput: undefined,
    },
    isLocal: false,
  },
  {
    key: "groq__llama3-70b-8192",
    title: "llama3-70b-8192",
    company: "groq",
    model: "llama3-70b-8192",
    trainingDataTo: undefined,
    tokens: {
      contextWindow: 8192,
      maxOutput: undefined,
    },
    isLocal: false,
  },
  {
    key: "groq__llama3-8b-8192",
    title: "llama3-8b-8192",
    company: "groq",
    model: "llama3-8b-8192",
    trainingDataTo: undefined,
    tokens: {
      contextWindow: 8192,
      maxOutput: undefined,
    },
    isLocal: false,
  },
  {
    key: "groq__mixtral-8x7b-32768",
    title: "mixtral-8x7b-32768",
    company: "groq",
    model: "mixtral-8x7b-32768",
    trainingDataTo: undefined,
    tokens: {
      contextWindow: 32768,
      maxOutput: undefined,
    },
    isLocal: false,
  },
  {
    key: "groq__gemma-7b-it",
    title: "gemma-7b-it",
    company: "groq",
    model: "gemma-7b-it",
    trainingDataTo: undefined,
    tokens: {
      contextWindow: 8192,
      maxOutput: undefined,
    },
    isLocal: false,
  },
  {
    key: "groq__gemma2-9b-it",
    title: "gemma2-9b-it",
    company: "groq",
    model: "gemma2-9b-it",
    trainingDataTo: undefined,
    tokens: {
      contextWindow: 8192,
      maxOutput: undefined,
    },
    isLocal: false,
  },
]
const dataOllama: ITalkLlm[] = [
  {
    key: "ollama__llama3.1",
    title: "llama3.1",
    company: "ollama",
    model: "llama3.1",
    trainingDataTo: undefined,
    tokens: {
      contextWindow: undefined,
      maxOutput: undefined,
    },
    isLocal: true,
  },
  {
    key: "ollama__llama3",
    title: "llama3",
    company: "ollama",
    model: "llama3",
    trainingDataTo: undefined,
    tokens: {
      contextWindow: undefined,
      maxOutput: undefined,
    },
    isLocal: true,
  },
  {
    key: "ollama__llama2",
    title: "llama2",
    company: "ollama",
    model: "llama2",
    trainingDataTo: undefined,
    tokens: {
      contextWindow: undefined,
      maxOutput: undefined,
    },
    isLocal: true,
  },
]
const dataOpenai: ITalkLlm[] = [
  {
    key: "openai__gpt-4o-mini",
    title: "gpt-4o-mini",
    company: "openai",
    model: "gpt-4o-mini",
    trainingDataTo: "10.2023",
    tokens: {
      contextWindow: 128000,
      maxOutput: 16384,
    },
    isLocal: false,
  },
  {
    key: "openai__gpt-4o-mini-2024-07-18",
    title: "gpt-4o-mini-2024-07-18",
    company: "openai",
    model: "gpt-4o-mini-2024-07-18",
    trainingDataTo: "10.2023",
    tokens: {
      contextWindow: 128000,
      maxOutput: 16384,
    },
    isLocal: false,
  },
  {
    key: "openai__gpt-4o-2024-05-13",
    title: "gpt-4o-2024-05-13",
    company: "openai",
    model: "gpt-4o-2024-05-13",
    trainingDataTo: "10.2023",
    tokens: {
      contextWindow: 128000,
      maxOutput: 4096,
    },
    isLocal: false,
  },
  {
    key: "openai__gpt-4o",
    title: "gpt-4o",
    company: "openai",
    model: "gpt-4o",
    trainingDataTo: "10.2023",
    tokens: {
      contextWindow: 128000,
      maxOutput: 4096,
    },
    isLocal: false,
  },
  {
    key: "openai__gpt-4-turbo-2024-04-09",
    title: "gpt-4-turbo-2024-04-09",
    company: "openai",
    model: "gpt-4-turbo-2024-04-09",
    trainingDataTo: "12.2023",
    tokens: {
      contextWindow: 128000,
      maxOutput: 4096,
    },
    isLocal: false,
  },
  {
    key: "openai__gpt-4-turbo",
    title: "gpt-4-turbo",
    company: "openai",
    model: "gpt-4-turbo",
    trainingDataTo: "12.2023",
    tokens: {
      contextWindow: 128000,
      maxOutput: 4096,
    },
    isLocal: false,
  },
  {
    key: "openai__gpt-4-turbo-preview",
    title: "gpt-4-turbo-preview",
    company: "openai",
    model: "gpt-4-turbo-preview",
    trainingDataTo: "12.2023",
    tokens: {
      contextWindow: 128000,
      maxOutput: 4096,
    },
    isLocal: false,
  },
  {
    key: "openai__gpt-4-1106-preview",
    title: "gpt-4-1106-preview",
    company: "openai",
    model: "gpt-4-1106-preview",
    trainingDataTo: "04.2023",
    tokens: {
      contextWindow: 128000,
      maxOutput: 4096,
    },
    isLocal: false,
  },
  {
    key: "openai__gpt-4",
    title: "gpt-4",
    company: "openai",
    model: "gpt-4",
    trainingDataTo: "09.2021",
    tokens: {
      contextWindow: 8192,
      maxOutput: 8192,
    },
    isLocal: false,
  },
  {
    key: "openai__gpt-4-0613",
    title: "gpt-4-0613",
    company: "openai",
    model: "gpt-4-0613",
    trainingDataTo: "09.2021",
    tokens: {
      contextWindow: 8192,
      maxOutput: 8192,
    },
    isLocal: false,
  },
  {
    key: "openai__gpt-3.5-turbo-0125",
    title: "gpt-3.5-turbo-0125",
    company: "openai",
    model: "gpt-3.5-turbo-0125",
    trainingDataTo: "09.2021",
    tokens: {
      contextWindow: 16385,
      maxOutput: 4096,
    },
    isLocal: false,
  },
  {
    key: "openai__gpt-3.5-turbo-1106",
    title: "gpt-3.5-turbo-1106",
    company: "openai",
    model: "gpt-3.5-turbo-1106",
    trainingDataTo: "09.2021",
    tokens: {
      contextWindow: 16385,
      maxOutput: 4096,
    },
    isLocal: false,
  },
  {
    key: "openai__gpt-3.5-turbo-0613",
    title: "gpt-3.5-turbo-0613",
    company: "openai",
    model: "gpt-3.5-turbo-0613",
    trainingDataTo: "09.2021",
    tokens: {
      contextWindow: 16385,
      maxOutput: 4096,
    },
    isLocal: false,
  },
  {
    key: "openai__gpt-3.5-turbo",
    title: "gpt-3.5-turbo",
    company: "openai",
    model: "gpt-3.5-turbo",
    trainingDataTo: "09.2021",
    tokens: {
      contextWindow: 16385,
      maxOutput: 4096,
    },
    isLocal: false,
  },
]
const dataPerplexity: ITalkLlm[] = [
  {
    key: "perplexity__llama-3-sonar-small-32k-online",
    title: "llama-3-sonar-small-32k-online",
    company: "perplexity",
    model: "llama-3-sonar-small-32k-online",
    trainingDataTo: undefined,
    tokens: {
      contextWindow: 28000,
      maxOutput: undefined,
    },
    isLocal: false,
  },
  {
    key: "perplexity__llama-3-sonar-small-32k-chat",
    title: "llama-3-sonar-small-32k-chat",
    company: "perplexity",
    model: "llama-3-sonar-small-32k-chat",
    trainingDataTo: undefined,
    tokens: {
      contextWindow: 32768,
      maxOutput: undefined,
    },
    isLocal: false,
  },
  {
    key: "perplexity__llama-3-sonar-large-32k-online",
    title: "llama-3-sonar-large-32k-online",
    company: "perplexity",
    model: "llama-3-sonar-large-32k-online",
    trainingDataTo: undefined,
    tokens: {
      contextWindow: 28000,
      maxOutput: undefined,
    },
    isLocal: false,
  },
  {
    key: "perplexity__llama-3-sonar-large-32k-chat",
    title: "llama-3-sonar-large-32k-chat",
    company: "perplexity",
    model: "llama-3-sonar-large-32k-chat",
    trainingDataTo: undefined,
    tokens: {
      contextWindow: 32768,
      maxOutput: undefined,
    },
    isLocal: false,
  },
  {
    key: "perplexity__llama-3.1-sonar-small-128k-online",
    title: "llama-3.1-sonar-small-128k-online",
    company: "perplexity",
    model: "llama-3.1-sonar-small-128k-online",
    trainingDataTo: undefined,
    tokens: {
      contextWindow: 127072,
      maxOutput: undefined,
    },
    isLocal: false,
  },
  {
    key: "perplexity__llama-3.1-sonar-small-128k-chat",
    title: "llama-3.1-sonar-small-128k-chat",
    company: "perplexity",
    model: "llama-3.1-sonar-small-128k-chat",
    trainingDataTo: undefined,
    tokens: {
      contextWindow: 131072,
      maxOutput: undefined,
    },
    isLocal: false,
  },
  {
    key: "perplexity__llama-3.1-sonar-large-128k-online",
    title: "llama-3.1-sonar-large-128k-online",
    company: "perplexity",
    model: "llama-3.1-sonar-large-128k-online",
    trainingDataTo: undefined,
    tokens: {
      contextWindow: 127072,
      maxOutput: undefined,
    },
    isLocal: false,
  },
  {
    key: "perplexity__llama-3.1-sonar-large-128k-chat",
    title: "llama-3.1-sonar-large-128k-chat",
    company: "perplexity",
    model: "llama-3.1-sonar-large-128k-chat",
    trainingDataTo: undefined,
    tokens: {
      contextWindow: 131072,
      maxOutput: undefined,
    },
    isLocal: false,
  },
]
