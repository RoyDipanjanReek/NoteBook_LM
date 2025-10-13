import { OpenAIEmbeddings } from "@langchain/openai";
import { QdrantVectorStore } from "@langchain/qdrant";

const embeddings = new OpenAIEmbeddings({
  openAIApiKey: process.env.OPENAI_API_KEY,
  model: "text-embedding-3-large",
});

let vectorStore = null;

export async function getVectorStore() {
  if (!vectorStore) {
    try {
      vectorStore = await QdrantVectorStore.fromExistingCollection(embeddings, {
        url: process.env.QDRANT_URL || "http://localhost:6333",
        collectionName: "notebookLM",
      });
    } catch (error) {
      console.log("Collection dose not exist, create new one");

      // If collection dosen't exist create new one.
      vectorStore = new QdrantVectorStore(embeddings, {
        url: process.env.QDRANT_URL || "http://localhost:6333",
        collectionName: "notebookLM",
      });
    }
  }
  return vectorStore;
}

export async function initializeVectorStore() {
  try {
    return await getVectorStore();
  } catch (error) {
    console.log("Error in initializing vector Store");
    throw error;
  }
}

export async function addDocuments(documents) {
  try {
    const store = await getVectorStore();
    await store.addDocuments(documents);
    return documents.length;
  } catch (error) {
    console.error("Error adding documents to vector store:", error);
    throw error;
  }
}

export async function searchSimilarDocuments(query, k = 5) {
  try {
    const store = await getVectorStore();
    const results = await store.similaritySearch(query, k);
    return results;
  } catch (error) {
    console.error("Error adding documents to vector store:", error);
    throw error;
  }
}
