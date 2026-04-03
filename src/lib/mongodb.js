import { MongoClient } from "mongodb";
import { OpenAIEmbeddings } from "@langchain/openai";

const mongoUri = process.env.MONGO_URI;
const mongoDbName = process.env.MONGO_DB_NAME || "notebookLM";
const mongoCollectionName = process.env.MONGO_COLLECTION_NAME || "vector_store";
const vectorField = "embedding";
const vectorIndexName = "embedding_vector_index";

const embeddings = new OpenAIEmbeddings({
  apiKey: process.env.OPENAI_API_KEY,
  model: "text-embedding-3-large",
});

let mongoClient = null;
let mongoDb = null;
let mongoCollection = null;
let vectorIndexEnsured = false;
let vectorSearchSupported = true;

async function connectMongo() {
  if (mongoCollection) return mongoCollection;

  if (!mongoUri) {
    throw new Error("Missing MONGO_URI environment variable");
  }

  if (!mongoClient) {
    mongoClient = new MongoClient(mongoUri);
    await mongoClient.connect();
  }

  const db = mongoClient.db(mongoDbName);
  mongoDb = db;
  mongoCollection = db.collection(mongoCollectionName);
  return mongoCollection;
}

async function ensureVectorIndex(dimension) {
  const collection = await connectMongo();
  if (vectorIndexEnsured) return collection;

  const db = collection.db;
  const collectionExists = await db
    .listCollections({ name: mongoCollectionName }, { nameOnly: true })
    .hasNext();

  if (!collectionExists) {
    await db.createCollection(mongoCollectionName);
  }

  try {
    const indexes = await collection.indexes();
    const alreadyExists = indexes.some((index) => index.name === vectorIndexName);

    if (!alreadyExists) {
      await collection.createIndex(
        { [vectorField]: "vector" },
        {
          name: vectorIndexName,
          dimensions: dimension,
          similarity: "cosine",
        }
      );
    }
  } catch (error) {
    const unsupportedVectorIndex =
      error.codeName === "CannotCreateIndex" ||
      error.code === 67 ||
      (error.message && error.message.includes("Unknown index plugin 'vector'"));

    if (unsupportedVectorIndex) {
      console.warn(
        "MongoDB vector index not supported in this deployment; falling back to in-memory similarity search.",
        error.message || error
      );
      vectorSearchSupported = false;
    } else {
      throw error;
    }
  }

  vectorIndexEnsured = true;
  return collection;
}

function normalizeDocument(doc) {
  return {
    pageContent: typeof doc.pageContent === "string" ? doc.pageContent : "",
    metadata: doc.metadata || {},
  };
}

export async function getDb() {
  if (!mongoDb) {
    await connectMongo();
  }

  return mongoDb;
}

export async function getVectorStore() {
  return connectMongo();
}

export async function initializeVectorStore() {
  try {
    await connectMongo();
  } catch (error) {
    console.error("Error in initializing vector Store", error);
    throw error;
  }
}

export async function addDocuments(documents) {
  try {
    if (!Array.isArray(documents) || documents.length === 0) {
      return 0;
    }

    const collection = await connectMongo();
    const normalizedDocs = documents.map(normalizeDocument);
    const texts = normalizedDocs.map((doc) => doc.pageContent);
    const embeddedVectors = await embeddings.embedDocuments(texts);

    if (!embeddedVectors || !embeddedVectors.length) {
      throw new Error("Failed to generate embeddings for documents");
    }

    await ensureVectorIndex(embeddedVectors[0].length);

    const docsToInsert = normalizedDocs.map((doc, index) => ({
      pageContent: doc.pageContent,
      metadata: doc.metadata,
      [vectorField]: embeddedVectors[index],
      createdAt: new Date(),
    }));

    const result = await collection.insertMany(docsToInsert);
    return result.insertedCount;
  } catch (error) {
    console.error("Error adding documents to vector store:", error);
    throw error;
  }
}

function cosineSimilarity(a, b) {
  if (!Array.isArray(a) || !Array.isArray(b) || a.length !== b.length) {
    return 0;
  }

  let dotProduct = 0;
  let magnitudeA = 0;
  let magnitudeB = 0;

  for (let i = 0; i < a.length; i += 1) {
    const x = a[i];
    const y = b[i];
    dotProduct += x * y;
    magnitudeA += x * x;
    magnitudeB += y * y;
  }

  if (magnitudeA === 0 || magnitudeB === 0) {
    return 0;
  }

  return dotProduct / (Math.sqrt(magnitudeA) * Math.sqrt(magnitudeB));
}

export async function searchSimilarDocuments(query, k = 5) {
  try {
    if (!query || typeof query !== "string") {
      throw new Error("Query must be a non-empty string");
    }

    const queryEmbedding = await embeddings.embedQuery(query);
    const collection = await ensureVectorIndex(queryEmbedding.length);

    if (vectorSearchSupported) {
      const results = await collection
        .find({
          $vectorSearch: {
            query: queryEmbedding,
            path: vectorField,
            k,
            similarity: "cosine",
          },
        })
        .toArray();

      return results.map((doc) => ({
        pageContent: doc.pageContent,
        metadata: doc.metadata,
      }));
    }

    const allDocuments = await collection.find().toArray();
    const scoredDocuments = allDocuments
      .map((doc) => ({
        doc,
        score: cosineSimilarity(queryEmbedding, doc[vectorField]),
      }))
      .filter((item) => typeof item.score === "number")
      .sort((a, b) => b.score - a.score)
      .slice(0, k)
      .map((item) => ({
        pageContent: item.doc.pageContent,
        metadata: item.doc.metadata,
      }));

    return scoredDocuments;
  } catch (error) {
    console.error("Error searching documents in vector store:", error);
    throw error;
  }
}
