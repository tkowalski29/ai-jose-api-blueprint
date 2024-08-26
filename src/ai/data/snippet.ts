export const SnippetDefaultTemperature = "0.7";

export interface ISnippet {
  typeCommunication: string;
  snippetId: string;
  title: string;
  description: string | undefined;
  category: string;
  emoji: string;
  model: string;
  modelTemperature: string;
  promptSystem: string | undefined;
  webhookUrl: string | undefined;
  isLocal: boolean;
  tag: [] | undefined;
  schema: any | undefined;
  postSchema: any | undefined;
}
