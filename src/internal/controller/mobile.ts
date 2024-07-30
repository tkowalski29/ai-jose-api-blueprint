import type { Request, Response} from "express";
import { ILlm } from "../ai/llm/type";
import { AnthropicLLM, LLM_ANTHROPIC } from "../ai/llm/anthropic";
import { CohereLLM, LLM_COHERE } from "../ai/llm/cohere";
import { GroqLLM, LLM_GROQ } from "../ai/llm/groq";
import { LLM_OLLAMA, OllamaLLM } from "../ai/llm/ollama";
import { LLM_OPENAI, OpenaiLLM } from "../ai/llm/openai";
import { LLM_PERPLEXITY, PerplexityLLM } from "../ai/llm/perplexity";
import { LangFuseTrace } from "../ai/trace/langfuse";
import { LunaryTrace } from "../ai/trace/lunary";
import { EMessage_role, ITalk, ITalkHistory } from "../ai/type";
import { Trace } from "../ai/trace/trace";

export const mobile = () => async (req: Request, res: Response) => {
  const chatData = await parse(req);

  let langFuseTrace = undefined;
  let lunaryTrace = undefined;
  if (
      (process.env.LANGFUSE_SECRET_KEY !== "" && process.env.LANGFUSE_SECRET_KEY !== undefined) &&
      (process.env.LANGFUSE_PUBLIC_KEY !== "" && process.env.LANGFUSE_PUBLIC_KEY !== undefined) &&
      (process.env.LANGFUSE_HOST !== "" && process.env.LANGFUSE_HOST !== undefined) &&
      1 === 1
  ) {
    // langFuseTrace = new LangFuseTrace(process.env.LANGFUSE_SECRET_KEY, process.env.LANGFUSE_PUBLIC_KEY, process.env.LANGFUSE_HOST);
  }
  if (
    (process.env.LUNARY_PUBLIC_KEY !== "" && process.env.LUNARY_PUBLIC_KEY !== undefined) &&
    1 === 1
  ) {
    // lunaryTrace = new LunaryTrace(process.env.LUNARY_PUBLIC_KEY);
  }

  try {
    const trace = new Trace();
    trace.init(langFuseTrace, lunaryTrace);
    trace.start(chatData, [`llm:${chatData.llm.llm}`, `stream:${chatData.llm.stream}`]);
    let llm: ILlm | undefined = undefined

    trace.llmStart(chatData);
    switch (chatData.llm.llm) {
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
      const r = llm.prepareResponse(chatData, answer.stream, trace, answer.data)
      res.write("data: " + JSON.stringify(r) + "\n\n");
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

        res.write("data: " + JSON.stringify(r) + "\n\n");
      }
    }

    trace.finish()
    res.end();
  } catch (error) {
    res.status(500);
    res.setHeader('Content-Type', 'application/json');
    console.error('Error processing request:', error);
    res.end();
  }
};

const parse = async (req: Request): Promise<ITalk> => {
  let _llm = req.body.llm.llm
  let _model = req.body.llm.model
  if (_llm === _model) {
    const chars = _llm.split('__');
    _llm = chars[0];
    _model = chars[1];
  }

  return {
    id: req.body.id,
    llm: {
      llm: _llm || undefined,
      model: _model || undefined,
      temperature: req.body.llm.temperature || undefined,
      stream: req.body.llm.stream || false,
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
      question: req.body.conversation.question,
      history: parseHistory(req.body.conversation.history),
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
  };
};

const parseHistory = (req: string): ITalkHistory[] => {
  let r: ITalkHistory[] = []

  try {
    if (req === undefined || req === "" || req === "[]") {
      return r
    }
  
    const parsedArray = JSON.parse(req);
    
    if (!Array.isArray(parsedArray) || parseHistory.length === 0) {
      return r
    }
  
    parsedArray.map(item => {
      if (item.question.content) {
        r.push({
          role: EMessage_role.USER,
          content: item.question.content,
        })
      }
      if (item.answer.content) {
        r.push({
          role: EMessage_role.AI,
          content: item.answer.content,
        })
      }
    });
  
    return r
  } catch(e) {
    return r
  }
}
