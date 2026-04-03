import { getCollection } from "@/lib/db";
import { USER_COLLECTION, normalizeUserDocument } from "@/models/user.model";

function buildFilter(query, { tenantId } = {}) {
  return tenantId ? { ...query, tenantId } : { ...query };
}

let indexesEnsured = false;

async function ensureUserIndexes() {
  if (indexesEnsured) {
    return;
  }

  const collection = await getCollection(USER_COLLECTION);

  await Promise.all([
    collection.createIndex({ clerkId: 1 }, { unique: true, name: "clerkId_unique" }),
    collection.createIndex({ email: 1 }, { unique: true, name: "email_unique" }),
  ]);

  indexesEnsured = true;
}

export const userRepository = {
  async createUser(userEntity, { tenantId } = {}) {
    await ensureUserIndexes();
    const collection = await getCollection(USER_COLLECTION);
    const result = await collection.insertOne({ ...userEntity, tenantId });
    return normalizeUserDocument({ _id: result.insertedId, ...userEntity, tenantId });
  },

  async getUserById(userId, { tenantId } = {}) {
    const collection = await getCollection(USER_COLLECTION);
    const filter = buildFilter({ clerkId: userId }, { tenantId });
    const user = await collection.findOne(filter);
    return normalizeUserDocument(user);
  },

  async getUserByEmail(email, { tenantId } = {}) {
    const collection = await getCollection(USER_COLLECTION);
    const filter = buildFilter({ email }, { tenantId });
    const user = await collection.findOne(filter);
    return normalizeUserDocument(user);
  },

  async updateUser(userId, updatePayload, { tenantId } = {}) {
    const collection = await getCollection(USER_COLLECTION);
    const filter = buildFilter({ clerkId: userId }, { tenantId });
    const result = await collection.findOneAndUpdate(
      filter,
      { $set: { ...updatePayload, updatedAt: new Date() } },
      { returnDocument: "after" }
    );
    return normalizeUserDocument(result?.value ?? result);
  },

  async deleteUser(userId, { tenantId } = {}) {
    const collection = await getCollection(USER_COLLECTION);
    const filter = buildFilter({ clerkId: userId }, { tenantId });
    const result = await collection.deleteOne(filter);
    return result.deletedCount === 1;
  },

  async upsertUserByClerkId(userEntity, { tenantId } = {}) {
    await ensureUserIndexes();
    const collection = await getCollection(USER_COLLECTION);
    const filter = buildFilter({ clerkId: userEntity.clerkId }, { tenantId });
    const now = new Date();
    const {
      role,
      status,
      plan,
      usage,
      preferences,
      createdAt,
      ...mutableFields
    } = userEntity;

    const result = await collection.findOneAndUpdate(
      filter,
      {
        $set: {
          ...mutableFields,
          tenantId,
          updatedAt: now,
        },
        $setOnInsert: {
          role,
          status,
          plan,
          usage,
          preferences,
          createdAt: createdAt || now,
        },
      },
      {
        upsert: true,
        returnDocument: "after",
      }
    );

    return normalizeUserDocument(result?.value ?? result);
  },
};
