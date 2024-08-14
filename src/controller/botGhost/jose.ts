import type { Request, Response} from "express";
import { ILlm } from "../../ai/llm/type";
import { AnthropicLLM, LLM_ANTHROPIC } from "../../ai/llm/anthropic";
import { CohereLLM, LLM_COHERE } from "../../ai/llm/cohere";
import { GroqLLM, LLM_GROQ } from "../../ai/llm/groq";
import { LLM_OLLAMA, OllamaLLM } from "../../ai/llm/ollama";
import { LLM_OPENAI, OpenaiLLM } from "../../ai/llm/openai";
import { LLM_PERPLEXITY, PerplexityLLM } from "../../ai/llm/perplexity";
import { LangFuseTrace } from "../../ai/trace/langfuse";
import { LunaryTrace } from "../../ai/trace/lunary";
import { ITalk, ITalkAssistant, ITalkConversation, ITalkLlm, ITalkMessage, ITalkQuestion, ITalkQuestionFile } from "../../ai/type";
import { Trace } from "../../ai/trace/trace";
import { LLM_BINARY, BinaryLLM } from "../../ai/llm/binary";
import { LLM_API, ApiLLM } from "../../ai/llm/api";
import { fetchOneAssistant, fetchOneConversation, fetchOneLlm } from "../../supabase/fetchOne";
import { fetchAllMessage } from "../../supabase/fetchAll";

export const botGhostJose = () => async (req: Request, res: Response) => {
  const chatData = await parse(req);

  let langFuseTrace = undefined;
  let lunaryTrace = undefined;
  if (
      (process.env.JOSE_API_LANGFUSE_SECRET_KEY !== "" && process.env.JOSE_API_LANGFUSE_SECRET_KEY !== undefined) &&
      (process.env.JOSE_API_LANGFUSE_PUBLIC_KEY !== "" && process.env.JOSE_API_LANGFUSE_PUBLIC_KEY !== undefined) &&
      (process.env.JOSE_API_LANGFUSE_HOST !== "" && process.env.JOSE_API_LANGFUSE_HOST !== undefined) &&
      1 === 1
  ) {
    // langFuseTrace = new LangFuseTrace(process.env.JOSE_API_LANGFUSE_SECRET_KEY, process.env.JOSE_API_LANGFUSE_PUBLIC_KEY, process.env.JOSE_API_LANGFUSE_HOST);
  }
  if (
    (process.env.JOSE_API_LUNARY_PUBLIC_KEY !== "" && process.env.JOSE_API_LUNARY_PUBLIC_KEY !== undefined) &&
    1 === 1
  ) {
    // lunaryTrace = new LunaryTrace(process.env.JOSE_API_LUNARY_PUBLIC_KEY);
  }

  try {
    const trace = new Trace();
    trace.init(langFuseTrace, lunaryTrace);
    trace.start(chatData, [`llm:${chatData.llm.object.company}`, `model:${chatData.llm.object.model}`, `stream:${chatData.llm.stream}`]);
    let llm: ILlm | undefined = undefined

    trace.llmStart(chatData);
    switch (chatData.llm.object.company) {
      case LLM_ANTHROPIC:
        llm = new AnthropicLLM(process.env.JOSE_API_ANTHROPIC_API_KEY)
        break;
      case LLM_API:
        chatData.llm.stream = false

        llm = new ApiLLM()
        break;
      case LLM_BINARY:
        chatData.llm.stream = false

        llm = new BinaryLLM()
        break;
      case LLM_COHERE:
        llm = new CohereLLM(process.env.JOSE_API_COHERE_API_KEY)
        break;
      case LLM_GROQ:
        llm = new GroqLLM(process.env.JOSE_API_GROQ_API_KEY)
        break;
      case LLM_OLLAMA:
        llm = new OllamaLLM(process.env.JOSE_API_OLLAMA_API_URL)
        break;
      case LLM_OPENAI:
        llm = new OpenaiLLM(process.env.JOSE_API_OPENAI_API_KEY)
        break;
      case LLM_PERPLEXITY:
        llm = new PerplexityLLM(process.env.JOSE_API_PERPLEXITY_API_KEY)
        break;
    }

    if (llm === undefined) {
      res.status(500);
      res.setHeader('Content-Type', 'application/json');
      console.error('Error processing request:', 'Unknown llm');
      res.json({"error": "Unknown llm"});
      res.end();
      return
    }

    const answer = await llm.chat(chatData);

    if (!answer.stream) {
      const r = llm.prepareResponse(chatData, answer.stream, trace, answer.data)
      console.log("SEND data")

      if (chatData.llm.outputFormat === "json") {
        res.json(r);
      } else {
        res.write("data: " + JSON.stringify(r) + "\n\n");
      }
      trace.finish()
      res.end();
      return;
    } else {
      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.flushHeaders();

      for await (const chunk of answer.data) {
        const r = llm.prepareResponse(chatData, answer.stream, trace, chunk)

        if (res.statusCode !== 200) {
          res.status(200);
        }
        console.log("STREAM data")

        res.write("data: " + JSON.stringify(r) + "\n\n");

        if (r.finish === true) {
          trace.finish()
          res.end();
          return;
        }
      }
    }
  } catch (error) {
    res.status(500);
    res.setHeader('Content-Type', 'application/json');
    console.error('Error processing request:', error);
    res.json({"error": error});
    res.end();
  }
};

const parse = async (req: Request): Promise<ITalk> => {
  const currentDate = new Date();
  let assistantId = req.body.assistantId || undefined;

  if (assistantId === undefined || assistantId === "") {
    const conversationData: ITalkConversation = await fetchOneConversation(req.body.conversationId)
    assistantId = conversationData.assistant
  }
  const assistantData: ITalkAssistant = await fetchOneAssistant(assistantId)
  const llmData: ITalkLlm = await fetchOneLlm(assistantData.llm)
  const historyData: ITalkMessage[] = await fetchAllMessage(req.body.conversationId)
  const questionData: ITalkQuestion = {
    content: req.body.query || "",
    files: []
  }

  if (req.body.queryType && req.body.queryType !== "text") {
    const questionFile: ITalkQuestionFile = {
      type: req.body.queryType,
      url: req.body.queryFile,
      path: undefined,
      base64: undefined,
    }
    questionData.files.push(questionFile)
  }

  return {
    id: req.body.messageId,
    llm: {
      key: assistantData.llm,
      object: llmData,
      temperature: assistantData.modelTemperature,
      stream: false,
      outputFormat: "json",
    },
    user: {
      id: req.body.userName,
      name: req.body.userName,
      email: undefined,
    },
    device: {
      name: req.body.device,
    },
    conversation: {
      id: req.body.conversationId,
      type: "assistant",
      system: assistantData.promptSystem,
      question: questionData,
      history: historyData,
    },
    assistant: {
      id: assistantId,
      object: assistantData,
    },
    snippet: {
      id: undefined,
      object: undefined,
    },
    createdAt: currentDate.toLocaleString(),
    result: undefined,
    context: undefined,
  };
};