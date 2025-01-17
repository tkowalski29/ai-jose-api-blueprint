import type { Request, Response} from "express";
import { AnthropicLLM, LLM_ANTHROPIC } from "../../llm/anthropic";
import { CohereLLM, LLM_COHERE } from "../../llm/cohere";
import { GroqLLM, LLM_GROQ } from "../../llm/groq";
import { LLM_OLLAMA, OllamaLLM } from "../../llm/ollama";
import { LLM_OPENAI, OpenaiLLM } from "../../llm/openai";
import { LLM_PERPLEXITY, PerplexityLLM } from "../../llm/perplexity";
import { LangFuseTrace } from "../../trace/langfuse";
import { LunaryTrace } from "../../trace/lunary";
import { Trace } from "../../trace/trace";
import { LLM_BINARY, BinaryLLM } from "../../llm/binary";
import { LLM_API, ApiLLM } from "../../llm/api";
import { ITalk } from "../../data/talk";
import { InterfaceLlm } from "../../data/llm";

export const raycastJose = () => async (req: Request, res: Response) => {
  const chatData = await parse(req);

  let langFuseTrace = undefined;
  let lunaryTrace = undefined;
  if (
      (process.env.JOSE_API_LANGFUSE_SECRET_KEY !== "" && process.env.JOSE_API_LANGFUSE_SECRET_KEY !== undefined) &&
      (process.env.JOSE_API_LANGFUSE_PUBLIC_KEY !== "" && process.env.JOSE_API_LANGFUSE_PUBLIC_KEY !== undefined) &&
      (process.env.JOSE_API_LANGFUSE_HOST !== "" && process.env.JOSE_API_LANGFUSE_HOST !== undefined) &&
      1 === 1
  ) {
    langFuseTrace = new LangFuseTrace(process.env.JOSE_API_LANGFUSE_SECRET_KEY, process.env.JOSE_API_LANGFUSE_PUBLIC_KEY, process.env.JOSE_API_LANGFUSE_HOST);
  }
  if (
    (process.env.JOSE_API_LUNARY_PUBLIC_KEY !== "" && process.env.JOSE_API_LUNARY_PUBLIC_KEY !== undefined) &&
    1 === 1
  ) {
    lunaryTrace = new LunaryTrace(process.env.JOSE_API_LUNARY_PUBLIC_KEY);
  }

  try {
    const trace = new Trace();
    trace.init(langFuseTrace, lunaryTrace);
    trace.start(chatData, [`llm:${chatData.llm.object.company}`, `model:${chatData.llm.object.model}`, `stream:${chatData.llm.stream}`]);
    let llm: InterfaceLlm | undefined = undefined

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
      res.json(r);
    } else {
      res.setHeader('Content-Type', 'application/x-ndjson');
      res.setHeader('Transfer-Encoding', 'chunked');
      res.flushHeaders();

      for await (const chunk of answer.data) {
        const r = llm.prepareResponse(chatData, answer.stream, trace, chunk)

        if (res.statusCode !== 200) {
          res.status(200);
        }
        res.write(JSON.stringify(r) + '\n');
      }
    }

    trace.finish()
    res.end();
  } catch (error) {
    res.status(500);
    res.setHeader('Content-Type', 'application/json');
    console.error('Error processing request:', error);
    res.json({"error": error});
    res.end();
  }
};

const parse = async (req: Request): Promise<ITalk> => {
  return {
    id: req.body.id,
    llm: {
      key: req.body.llm.key,
      object: req.body.llm.object,
      temperature: req.body.llm.temperature || undefined,
      stream: req.body.llm.stream || false,
      outputFormat: req.body.llm.outputFormat || "stream",
    },
    user: {
      id: req.body.user.id,
      name: req.body.user.name,
      email: req.body.user.email || undefined,
    },
    device: {
      name: req.body.device.name,
    },
    conversation: {
      id: req.body.conversation.id,
      type: req.body.conversation.type,
      system: req.body.conversation.system || undefined,
      schema: req.body.conversation.schema || undefined,
      question: req.body.conversation.question,
      history: req.body.conversation.history || [],
    },
    assistant: {
      id: req.body.assistant.id,
      object: req.body.assistant.object,
    },
    snippet: {
      id: req.body.snippet.id || undefined,
      object: req.body.snippet.object || undefined,
    },
    createdAt: req.body.createdAt,
    result: req.body.result || undefined,
    context: undefined,
  };
};
