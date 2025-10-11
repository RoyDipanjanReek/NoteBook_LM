import { ChatOpenAI } from "@langchain/openai";

import { PromptTemplate } from "@langchain/core/prompts";
import {
  RunnablePassthrough,
  RunnableSequence,
} from "@langchain/core/runnables";
import { searchSimilarDocuments } from "./qdrant";
import { StringOutputParser } from "@langchain/core/dist/output_parsers";

//  Supress token counting warnings
const originalConsoleWarn = console.warn;
const originalConsoleError = console.error;

function suppressTokens() {
  console.warn = (...args) => {
    const massage = args.join("");

    if (
      massage.includes("Failed to calculate number of token") ||
      massage.includes("Falling back to approximate count")
    ) {
      return;
    }
    originalConsoleWarn(...args);
  };

  console.error = (args) => {
    const massage = args.join("");
    if (
      massage.includes("Failed to calculate number of token") ||
      massage.includes("Falling back to approximate count") ||
      massage.includes("ECONNRESET")
    ) {
      return;
    }
    originalConsoleError(...args);
  };
}
// apply supression
suppressTokens();

//Initializing openAi
const llm = new ChatOpenAI({
  openAIApiKey: process.env.openAIApiKey,
  model: "gpt-3.5-turbo",
  temperature: 0.1,
  streaming: true,
  // Disable token counting to prevent network error
  cache: false,
  maxRetries: 2,
  // Configure request timeout and retries
  timeout: 3000, // 30 sec
  requestOptions: {
    // Disable autometic token counting
    headers: {
      "User-Agent": "NoteBook-LLM",
    },
  },
});

// RAG prompt template
const ragPromptSyntex = PromptTemplate.fromTemplate(
  `
    You are a helpfull ai assistant that answers questions based on strictly on the provide context.

    Rules:
    1. Only answer based on the information provide in the context below.
    2. If the context doesn't contain information to answer the question, respond with "I don't know based on the provide sources."
    3. Be concise but comprehensive in your answers.
    4. When possible, mention which source the information comes from.
    5. Do not make up or infer information not present in the context.

    Context: 
    {context}

    Question: {question}

    Answer
    `
);

function formatDoument(docs) {
  return docs
    .map((doc, index) => {
      const source = doc.metadata?.source || "Unknown source";
      const type = doc.metadata?.type || "document";
      return `Source ${index + 1} (${type} : ${source}):\n ${
        doc.pageContent
      }\n`;
    })
    .join("\n---\n");
}

//Create RAG Chain
export function createRAGChain() {
  const chain = RunnableSequence.from([
    {
      context: async (input) => {
        const relevantDocs = await searchSimilarDocuments(input.question, 5);
        return formatDoument(relevantDocs);
      },
      question: new RunnablePassthrough(),
    },
    ragPromptSyntex,
    llm,
    new StringOutputParser(),
  ]);
  return chain;
}

// Function to get the ans with streming
export async function getStreamingAnswer(question) {
    try {
        const chain = createRAGChain()
        const stream = await chain.stream({question})
        return stream
    } catch (error) {
        console.error('Error to getting streaming ans');
        throw error
    }
}

// Function to get the non-streming ans
export async function getAnswer(question) {
    try {
        const chain = createRAGChain()
        const ans = await chain.invoke({question})
        return ans
    } catch (error) {
          console.error('Error to getting ans');
        throw error
    }
}