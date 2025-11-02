import { QdrantVectorStore } from "@langchain/qdrant";
import { OpenAIEmbeddings } from "@langchain/openai";
import dotenv from "dotenv";

// Load env varable
dotenv.config({ path: ".env.local" });

const embedding = new OpenAIEmbeddings({
  openAIApiKey: process.env.OPENAI_API_KEY,
  model: "text-embedding-3-large",
});

async function setupQdrant() {
  try {
    console.log("Setting up Qdrant vector store");

    const vectorStore = new QdrantVectorStore(embedding, {
      url: process.env.QDRANT_URL || "http://localhost:6333",
      collectionName: "notebookMini_LLM",
    });

    // Add a dummy document to create the collection
    await vectorStore.addDocuments([
      {
        pageContent: "This is a test document to initialize the collection",
        metadata: {
          sources: "setup",
          type: "test",
        },
      },
    ]);

    console.log('✅ Qdrant collection "noteBook_mini" created successfully');
    process.exit(0);
  } catch (error) {
    console.error("❌ Error setting up Qdrant:", error);
    process.exit(1);
  }
}

setupQdrant();
