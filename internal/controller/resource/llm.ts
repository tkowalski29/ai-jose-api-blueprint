import type { Request, Response} from "express";

export const resourceLlm = () => async (req: Request, res: Response) => {
  res.status(200);
  res.json(data);
  res.end();
};

const data: { key: string; title: string }[] = [
  // anthropic
  {
    key: "anthropic__claude-3-5-sonnet-20240620",
    title: "claude-3-5-sonnet-20240620",
  },
  {
    key: "anthropic__claude-3-opus-20240229",
    title: "claude-3-opus-20240229",
  },
  {
    key: "anthropic__claude-3-sonnet-20240229",
    title: "claude-3-sonnet-20240229",
  },
  {
    key: "anthropic__claude-3-haiku-20240307",
    title: "claude-3-haiku-20240307",
  },
  //cohere
  {
    key: "cohere__command-r-plus",
    title: "command-r-plus",
  },
  {
    key: "cohere__command-r",
    title: "command-r",
  },
  {
    key: "cohere__command",
    title: "command",
  },
  {
    key: "cohere__command-nightly",
    title: "command-nightly",
  },
  {
    key: "cohere__command-light",
    title: "command-light",
  },
  {
    key: "cohere__command-light-nightly",
    title: "command-light-nightly",
  },
  //groq
  {
    key: "groq__llama3-8b-8192",
    title: "llama3-8b-8192",
  },
  {
    key: "groq__llama3-70b-8192",
    title: "llama3-70b-8192",
  },
  {
    key: "groq__mixtral-8x7b-32768",
    title: "mixtral-8x7b-32768",
  },
  {
    key: "groq__gemma-7b-it",
    title: "gemma-7b-it",
  },
  {
    key: "groq__gemma2-9b-it",
    title: "gemma2-9b-it",
  },
  //ollama
  {
    key: "ollama__llama2",
    title: "llama2",
  },
  {
    key: "ollama__llama3",
    title: "llama3",
  },
  // openai
  {
    key: "openai__gpt-4o-2024-05-13",
    title: "gpt-4o-2024-05-13",
  },
  {
    key: "openai__gpt-4o",
    title: "gpt-4o",
  },
  {
    key: "openai__gpt-4-turbo-2024-04-09",
    title: "gpt-4-turbo-2024-04-09",
  },
  {
    key: "openai__gpt-4-turbo",
    title: "gpt-4-turbo",
  },
  {
    key: "openai__gpt-4-turbo-preview",
    title: "gpt-4-turbo-preview",
  },
  {
    key: "openai__gpt-4-1106-preview",
    title: "gpt-4-1106-preview",
  },
  {
    key: "openai__gpt-4",
    title: "gpt-4",
  },
  {
    key: "openai__gpt-4-0613",
    title: "gpt-4-0613",
  },
  {
    key: "openai__gpt-3.5-turbo-0125",
    title: "gpt-3.5-turbo-0125",
  },
  {
    key: "openai__gpt-3.5-turbo-1106",
    title: "gpt-3.5-turbo-1106",
  },
  {
    key: "openai__gpt-3.5-turbo-0613",
    title: "gpt-3.5-turbo-0613",
  },
  {
    key: "openai__gpt-3.5-turbo",
    title: "gpt-3.5-turbo",
  },
  //perplexity
  {
    key: "perplexity__llama-3-sonar-small-32k-chat",
    title: "llama-3-sonar-small-32k-chat",
  },
  {
    key: "perplexity__llama-3-sonar-small-32k-online",
    title: "llama-3-sonar-small-32k-online",
  },
  {
    key: "perplexity__llama-3-sonar-large-32k-chat",
    title: "llama-3-sonar-large-32k-chat",
  },
  {
    key: "perplexity__llama-3-sonar-large-32k-online",
    title: "llama-3-sonar-large-32k-online",
  },
  {
    key: "perplexity__llama-3-8b-instruct",
    title: "llama-3-8b-instruct",
  },
  {
    key: "perplexity__llama-3-70b-instruct",
    title: "llama-3-70b-instruct",
  },
  {
    key: "perplexity__mixtral-8x7b-instruct",
    title: "mixtral-8x7b-instruct",
  },
]