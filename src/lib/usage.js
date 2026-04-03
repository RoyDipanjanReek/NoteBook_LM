import { getDb } from "@/lib/mongodb";

export const USAGE_COLLECTION_NAME = "question_usage";
export const DAILY_QUESTION_LIMIT = 3;

function getTodayDateString() {
  return new Date().toISOString().slice(0, 10);
}

async function ensureUsageIndex(collection) {
  await collection.createIndex(
    { userId: 1, date: 1 },
    { unique: true, name: "user_date_unique" }
  );
}

export async function getUsageCollection() {
  const db = await getDb();
  const collection = db.collection(USAGE_COLLECTION_NAME);
  await ensureUsageIndex(collection);
  return collection;
}

export async function getUserDailyUsage(userId) {
  const collection = await getUsageCollection();
  const today = getTodayDateString();
  const doc = await collection.findOne({ userId, date: today });
  return {
    userId,
    date: today,
    count: doc?.count ?? 0,
  };
}

export async function incrementUserDailyUsage(userId, increment = 1) {
  const collection = await getUsageCollection();
  const today = getTodayDateString();
  const result = await collection.findOneAndUpdate(
    { userId, date: today },
    {
      $inc: { count: increment },
      $setOnInsert: { createdAt: new Date() },
      $set: { updatedAt: new Date() },
    },
    {
      upsert: true,
      returnDocument: "after",
    }
  );

  return result.value;
}

export function getRemainingQuestions(count) {
  return Math.max(0, DAILY_QUESTION_LIMIT - count);
}
