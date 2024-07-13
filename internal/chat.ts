import type { Request } from "express";
import { getCustomSystemMessage, context } from './ai/logic/messages.ts';
import { IChat } from "./ai/type.ts";

export const parseRequest = async (req: Request): Promise<IChat> => {
  const messages = req.body.messages.history;
  // messages.shift();

  const formattedMessages = [
    ...(await getCustomSystemMessage(context)),
    ...messages,
  ];

  return { 
    id: req.body.id, 
    user: {
      id: "test",
    },
    llm: req.body.llm, 
    model: req.body.model, 
    stream: req.body.stream, 
    messages: {
      message: req.body.messages.message,
      prompt: req.body.messages.prompt,
      history: req.body.messages.history
    },
  };
};
