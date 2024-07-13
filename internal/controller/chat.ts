import type { Request, Response} from "express";
import { parseRequest } from "../chat";
import { ILlm } from "../ai/llm/type";
import { AnthropicLLM, LLM_ANTHROPIC } from "../ai/llm/anthropic";
import { CohereLLM, LLM_COHERE } from "../ai/llm/cohere";
import { GroqLLM, LLM_GROQ } from "../ai/llm/groq";
import { LLM_OLLAMA, OllamaLLM } from "../ai/llm/ollama";
import { LLM_OPENAI, OpenaiLLM } from "../ai/llm/openai";
import { LLM_PERPLEXITY, PerplexityLLM } from "../ai/llm/perplexity";
import { LangFuseTrace } from "../ai/trace/langfuse";
import { LunaryTrace } from "../ai/trace/lunary";
import { Trace } from "../ai/trace/trace";

export const chat = () => async (req: Request, res: Response) => {
  try {
    const chatData = await parseRequest(req);
    const trace = new Trace(
      new LangFuseTrace(process.env.LANGFUSE_SECRET_KEY, process.env.LANGFUSE_PUBLIC_KEY, process.env.LANGFUSE_HOST),
      new LunaryTrace(process.env.LUNARY_PUBLIC_KEY)
    )
    trace.init(chatData, [`llm:${chatData.llm}`, `stream:${chatData.stream}`]);
    let llm: ILlm | undefined = undefined

    trace.llmStart(chatData);
    switch (chatData.llm) {
      case LLM_ANTHROPIC:
        llm = new AnthropicLLM(process.env.ANTHROPIC_API_KEY)
        break;
      case LLM_COHERE:
        llm = new CohereLLM(process.env.COHERE_API_KEY)
        break;
      case LLM_GROQ:
        llm = new GroqLLM(process.env.GROQ_API_KEY)
        break;
      case LLM_OLLAMA:
        llm = new OllamaLLM(process.env.OLLAMA_API_URL)
        break;
      case LLM_OPENAI:
        llm = new OpenaiLLM(process.env.OPENAI_API_KEY)
        break;
      case LLM_PERPLEXITY:
        llm = new PerplexityLLM(process.env.PERPLEXITY_API_KEY)
        break;
    }

    if (llm === undefined) {
      res.status(500);
      res.setHeader('Content-Type', 'application/json');
      console.error('Error processing request:', 'Unknown llm');
      res.end();
      return
    }

    const answer = await llm.chat(chatData);

    if (!answer.stream) {
      const r = llm.prepareResponse(answer.stream, trace, answer.data)
      res.json(r);
    } else {
      res.setHeader('Content-Type', 'application/x-ndjson');
      res.setHeader('Transfer-Encoding', 'chunked');

      for await (const chunk of answer.data) {
        const r = llm.prepareResponse(answer.stream, trace, chunk)

        if (res.statusCode !== 200) {
          res.status(200);
        }
        res.write(JSON.stringify(r) + '\n');
      }
    }

    trace.end()
    res.end();
  } catch (error) {
    res.status(500);
    res.setHeader('Content-Type', 'application/json');
    console.error('Error processing request:', error);
    res.end();
  }
};
