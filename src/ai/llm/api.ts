import { ITrace } from "../trace/type";
import { ILlm } from "./type";
import {
  ITalk,
  ITalkDataResult,
  ITalkMessage,
  ITalkQuestion,
  newTalkDataResult,
} from "../type";
import fetch from "node-fetch";
// @ts-expect-error ignore
globalThis.fetch = fetch;

export const LLM_API = "api";

export class ApiLLM implements ILlm {
  async chat(chatData: ITalk): Promise<{ stream: boolean; data: ITalkDataResult }> {
    try {
      console.log(`${LLM_API} - request`)
      const response = await fetch(chatData.llm.object.fileDownloadUrl, {
        method: 'POST',
        body: JSON.stringify(chatData),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
      }
      console.log(`${LLM_API} - response`)
      const rsp = await response.json();

      if (rsp.error) {
        throw new Error(`HTTP error! Message: ${rsp.error}`);
      }

      const output: ITalk = rsp;
      const out: ITalkDataResult = output.result;
  
      console.log(`${LLM_API} - result`)
      return {
        stream: chatData.llm.stream,
        data: out,
      };
    } catch (error) {
      console.log(`${LLM_API} - An error occurred: ${error}`);
      throw error;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  prepareResponse(chatData: ITalk, stream: boolean, trace: ITrace, answer: any): ITalkDataResult {
    const a: ITalkDataResult = answer;
    let response: ITalkDataResult = newTalkDataResult();

    if (!stream) {
      response = a;

      trace.changeHelper({
        output: a.content,
        token: {
          prompt: 0,
          completion: 0,
        },
      });
    } else {
      response = a;

      trace.changeHelper({
        output: a.content,
        token: {
          prompt: 0,
          completion: 0,
        },
      });
    }

    return response;
  }

  #prepareMessage(
    systemMessage: string | undefined,
    msgs: ITalkMessage[],
    lastMessage: ITalkQuestion | undefined
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): any[] {
    return [];
  }
}
