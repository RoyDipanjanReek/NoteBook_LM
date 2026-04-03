import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI;
const dbName = process.env.MONGO_DB_NAME || "notebookLM";

let client = null;
let database = null;

export async function connectDb() {
  if (!uri) {
    throw new Error("MONGO_URI is required in environment variables.");
  }

  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
    database = client.db(dbName);
  }

  return database;
}

export async function getCollection(name) {
  const db = await connectDb();
  return db.collection(name);
}

export function getDbClient() {
  if (!client) {
    throw new Error("MongoDB client not initialized. Call connectDb() first.");
  }

  return client;
}
