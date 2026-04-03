export const USER_COLLECTION = "users";

export const USER_ROLE = {
  USER: "user",
  ADMIN: "admin",
};

export const USER_STATUS = {
  ACTIVE: "active",
  INACTIVE: "inactive",
  BLOCKED: "blocked",
};

export const USER_PLAN = {
  FREE: "free",
  PRO: "pro",
  ENTERPRISE: "enterprise",
};

export function buildUserEntity({
  clerkId,
  email,
  firstName = "",
  lastName = "",
  username = "",
  imageUrl = "",
  role = USER_ROLE.USER,
  status = USER_STATUS.ACTIVE,
  plan = USER_PLAN.FREE,
  lastSignInAt = null,
  usage = {},
  preferences = {},
  rawClerkData = null,
  workspaceId = null,
  tenantId = null,
  createdAt = new Date(),
  updatedAt = new Date(),
}) {
  return {
    clerkId: clerkId?.trim(),
    email: email?.trim()?.toLowerCase?.() ?? "",
    firstName: firstName?.trim?.() ?? "",
    lastName: lastName?.trim?.() ?? "",
    username: username?.trim?.() ?? "",
    imageUrl,
    role,
    status,
    plan,
    lastSignInAt: lastSignInAt ? new Date(lastSignInAt) : null,
    usage: {
      uploadsCount: usage?.uploadsCount ?? 0,
      chatsCount: usage?.chatsCount ?? 0,
      tokensUsed: usage?.tokensUsed ?? 0,
    },
    preferences: {
      theme: preferences?.theme || "system",
    },
    rawClerkData,
    workspaceId,
    tenantId,
    createdAt,
    updatedAt,
  };
}

export function normalizeUserDocument(doc) {
  if (!doc) return null;

  return {
    id: doc._id?.toString(),
    clerkId: doc.clerkId,
    userId: doc.clerkId,
    email: doc.email,
    firstName: doc.firstName,
    lastName: doc.lastName,
    username: doc.username,
    imageUrl: doc.imageUrl,
    role: doc.role,
    status: doc.status,
    plan: doc.plan,
    lastSignInAt: doc.lastSignInAt,
    usage: doc.usage || {
      uploadsCount: 0,
      chatsCount: 0,
      tokensUsed: 0,
    },
    preferences: doc.preferences || { theme: "system" },
    rawClerkData: doc.rawClerkData || null,
    workspaceId: doc.workspaceId,
    tenantId: doc.tenantId,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  };
}

export function buildClerkUserSnapshot(clerkUser) {
  if (!clerkUser) {
    return null;
  }

  return {
    id: clerkUser.id,
    externalId: clerkUser.externalId ?? null,
    username: clerkUser.username ?? "",
    firstName: clerkUser.firstName ?? "",
    lastName: clerkUser.lastName ?? "",
    imageUrl: clerkUser.imageUrl ?? "",
    hasImage: Boolean(clerkUser.hasImage),
    primaryEmailAddressId: clerkUser.primaryEmailAddressId ?? null,
    primaryPhoneNumberId: clerkUser.primaryPhoneNumberId ?? null,
    emailAddresses:
      clerkUser.emailAddresses?.map((entry) => ({
        id: entry.id,
        emailAddress: entry.emailAddress,
        verificationStatus: entry.verification?.status ?? null,
      })) || [],
    phoneNumbers:
      clerkUser.phoneNumbers?.map((entry) => ({
        id: entry.id,
        phoneNumber: entry.phoneNumber,
        verificationStatus: entry.verification?.status ?? null,
      })) || [],
    publicMetadata: clerkUser.publicMetadata || {},
    privateMetadata: clerkUser.privateMetadata || {},
    unsafeMetadata: clerkUser.unsafeMetadata || {},
    lastSignInAt: clerkUser.lastSignInAt ?? null,
    createdAt: clerkUser.createdAt ?? null,
    updatedAt: clerkUser.updatedAt ?? null,
  };
}
