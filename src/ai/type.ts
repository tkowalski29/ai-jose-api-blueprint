import { ReplacePlaceholders } from "./logic/clear";

export const AssistantDefaultTemperature = "0.7";
export const SnippetDefaultTemperature = "0.7";
export const ConversationSelectedTypeAssistant = "assistant";
export const ConversationSelectedTypeSnippet = "snippet";

export enum EMessage_role {
  USER = "user",
  AI = "ai",
  SYSTEM = "system",
  FUNCTION = "function",
  TOOL = "tool",
}

export interface ITalk {
  id: string;
  llm: {
    key: string,
    object: ITalkLlm,
    temperature: string | undefined;
    stream: boolean;
    outputFormat: string;
  };
  user: {
    id: string;
    name: string;
    email: string | undefined;
  };
  device: {
    name: string;
  };
  conversation: {
    id: string;
    type: string;
    system: string | undefined;
    question: ITalkQuestion;
    history: ITalkMessage[];
  };
  assistant: {
    id: string;
    object: ITalkAssistant;
  };
  snippet: {
    id: string | undefined;
    object: ITalkSnippet | undefined;
  };
  createdAt: string;
  result: ITalkDataResult | undefined;
  context: any | undefined;
}

export const initData = (d: ITalk): ITalk => {
  let promptString = d.assistant.object.promptSystem;
  d.llm.temperature = d.assistant.object.modelTemperature || AssistantDefaultTemperature;
  let model = d.assistant.object.model;
  if (d.snippet.object?.promptSystem && d.conversation.type === ConversationSelectedTypeSnippet) {
    promptString = d.snippet.object.promptSystem;
    d.llm.temperature = d.snippet.object.modelTemperature || SnippetDefaultTemperature;
    model = d.snippet.object.model;
  }
  const models = model.split("__");
  d.llm.object.company = models[0];
  d.llm.object.model = models[1];
  d.conversation.system = ReplacePlaceholders(d, promptString);

  return d;
};

export interface ITalkQuestion {
  content: string;
  files: ITalkQuestionFile[] | undefined;
}
export interface ITalkQuestionFile {
  type: string;
  path: string | undefined;
  base64: string | undefined;
  url: string | undefined;
}

export interface ITalkDataResult {
  content: string;
  finish: boolean;
  createdAt: string;
  assistant: ITalkAssistant | undefined;
  image:
    | {
        exist: boolean;
        url: string[] | undefined;
      }
    | undefined;
  action:
    | {
        type: string;
        name: string;
        status: string;
      }
    | undefined;
}

export const newTalkDataResult = (): ITalkDataResult => {
  return {
    content: "",
    finish: false,
    createdAt: new Date().toISOString(),
    assistant: undefined,
    image: undefined,
    action: undefined,
  };
};

export interface ITalkAssistant {
  typeCommunication: string;
  assistantId: string;
  title: string;
  description: string;
  emoji: string;
  avatar: string;
  model: string;
  modelTemperature: string;
  promptSystem: string;
  webhookUrl: string | undefined;
  additionalData: string | undefined;
  snippet: string[] | undefined;
  isLocal: boolean;
  llm: string | undefined;
}

export interface ITalkSnippet {
  typeCommunication: string;
  snippetId: string;
  title: string;
  category: string;
  emoji: string;
  model: string;
  modelTemperature: string;
  promptSystem: string;
  webhookUrl: string | undefined;
  isLocal: boolean;
}

export interface ITalkLlm {
  key: string;
  title: string;
  company: string;
  model: string;
  trainingDataTo: string | undefined;
  tokens: {
    contextWindow: number | undefined;
    maxOutput: number | undefined;
  } | undefined;
  isLocal: boolean;
  fileDownloadUrl: string | undefined;
  fileDownloadName: string | undefined;
}

export interface ITalkMessage {
  messageId: string;
  createdAt: string;
  updatedAt: string | undefined;
  question: ITalkQuestion;
  answer: ITalkDataResult | undefined;
  conversation: string;
  answerContent: string | undefined;
}

export interface ITalkConversation {
  conversationId: string;
  createdAt: string;
  updatedAt: string | undefined;
  summary: string | undefined;
  title: string | undefined;
  responseStream: boolean;
  assistant: string;
  assistantTitle: string;
  assistantAvatar: string;
  device: string | undefined;
  userName: string | undefined;
}
