import * as fs from "fs";
import * as path from "path";
import { execFile } from "child_process";
import { ITrace } from "../trace/type";
import { ILlm } from "./type";
import {
  EMessage_role,
  ITalk,
  ITalkDataResult,
  ITalkHistory,
  ITalkQuestion,
  newTalkDataResult,
} from "../type";
import fetch from "node-fetch";
import { base64Prepare } from "../helper/file";
import { binarySplit } from "../helper/llm";
// @ts-expect-error ignore
globalThis.fetch = fetch;

export const LLM_BINARY = "binary";

export class BinaryLLM implements ILlm {
  async chat(chatData: ITalk): Promise<{ stream: boolean; data: ITalkDataResult }> {
    const dir = "/tmp"
    let filePath = path.join(dir, chatData.llm.model ?? "");
    
    chatData.conversation.question.files = await base64Prepare(chatData.conversation.question.files)
    const split = binarySplit(dir, chatData.llm.model)
    chatData.llm.model = split.model;
    filePath = split.filePath;

    try {
      await this.#downloadFileFromVercelBlob(chatData.llm.url ?? "", chatData.llm.model ?? "", filePath);
      await this.#setExecutablePermissions(filePath);

      const b64 = Buffer.from(JSON.stringify(chatData)).toString("base64");
      const output = await this.#executeFile(filePath, [b64]);
      const out: ITalkDataResult = JSON.parse(output);

      // this.#removeLocalFile(filePath);

      return {
        stream: chatData.llm.stream,
        data: out,
      };
    } catch (error) {
      console.error(error);
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
    msgs: ITalkHistory[],
    lastMessage: ITalkQuestion | undefined
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): any[] {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result: any[] = [];

    if (systemMessage) {
      result.push({
        role: "system",
        content: systemMessage,
      });
    }

    for (const msg of msgs) {
      switch (msg.role) {
        case EMessage_role.USER:
          result.push({
            role: "user",
            content: msg.content,
          });
          break;
        case EMessage_role.AI:
          result.push({
            role: "assistant",
            content: msg.content,
          });
          break;
        case EMessage_role.SYSTEM:
          result.push({
            role: "system",
            content: msg.content,
          });
          break;
        case EMessage_role.FUNCTION || EMessage_role.TOOL:
          continue;
          break;
      }
    }

    if (lastMessage) {
      result.push({
        role: "user",
        content: lastMessage.content,
      });
    }

    return result;
  }

  async #downloadFileFromVercelBlob(fileUrl: string, fileName: string, outputLocationPath: string): Promise<void> {
    if (fs.existsSync(outputLocationPath)) {
      return;
    }

    const response = await fetch(fileUrl);
    if (!response.ok) {
      throw new Error(`Failed to download file from ${fileUrl}`);
    }

    const fileStream = fs.createWriteStream(outputLocationPath);
    await new Promise((resolve, reject) => {
      response.body.pipe(fileStream);
      response.body.on("error", reject);
      fileStream.on("finish", resolve);
    });
  }

  #setExecutablePermissions(filePath: string): Promise<void> {
    return new Promise((resolve, reject) => {
      fs.chmod(filePath, "755", (err) => {
        if (err) {
          reject(`Error setting executable permissions: ${err.message}`);
        } else {
          resolve();
        }
      });
    });
  }

  async #executeFile(filePath: string, args: string[]): Promise<string> {
    return new Promise((resolve, reject) => {
      execFile(filePath, args, (error, stdout, stderr) => {
        if (error) {
          console.log("Error executing file")
          console.log(error)
          reject(`Error executing file: ${error}`);
          return;
        }

        if (stderr !== "") {
          reject(`Error run file: ${stderr}`);
          return;
        }

        resolve(stdout);
      });
    });
  }

  #removeLocalFile(filePath: string): void {
    fs.unlink(filePath, (err) => {
      if (err) {
        throw new Error(`Failed deleting file from ${filePath}, [${err.message}]`);
      }
    });
  }
}
