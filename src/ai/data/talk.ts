import { ReplacePlaceholders } from "../common/clear";
import { AssistantDefaultTemperature, IAssistant } from "./assistant"
import { ConversationSelectedTypeSnippet } from "./conversation"
import { ILlm } from "./llm";
import { IMessage } from "./message";
import { ISnippet, SnippetDefaultTemperature } from "./snippet"

export interface ITalk {
  id: string;
  llm: {
    key: string,
    object: ILlm,
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
    schema: any | undefined;
    question: ITalkQuestion;
    history: IMessage[];
  };
  assistant: {
    id: string;
    object: IAssistant;
  };
  snippet: {
    id: string | undefined;
    object: ISnippet | undefined;
  };
  createdAt: string;
  result: ITalkDataResult | undefined;
  context: any | undefined;
}

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
  assistant: IAssistant | undefined;
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
  funcCall: ITalkDataFunctionCall | undefined;
  funcCallArguments: any | undefined;
}

export interface ITalkDataFunctionCall {
  name: string;
  arguments: boolean;
}

export const initData = (d: ITalk): ITalk => {
  let promptString = d.assistant.object.promptSystem;
  d.llm.temperature = d.assistant.object.modelTemperature || AssistantDefaultTemperature;
  if (d.snippet.object?.promptSystem && d.conversation.type === ConversationSelectedTypeSnippet) {
    promptString = d.snippet.object.promptSystem;
    d.llm.temperature = d.snippet.object.modelTemperature || SnippetDefaultTemperature;
  }
  d.conversation.system = ReplacePlaceholders(d, promptString);

  return d;
};

export const newTalkDataResult = (): ITalkDataResult => {
  return {
    content: "",
    finish: false,
    createdAt: new Date().toISOString(),
    assistant: undefined,
    image: undefined,
    action: undefined,
    funcCall: undefined,
    funcCallArguments: undefined,
  };
};
