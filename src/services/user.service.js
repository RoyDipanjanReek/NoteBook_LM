import {
  buildClerkUserSnapshot,
  buildUserEntity,
  USER_PLAN,
  USER_ROLE,
  USER_STATUS,
} from "@/models/user.model";

export const userService = {
  async createUserProfile(userId, payload, { userRepository } = {}) {
    if (!userId) {
      throw new Error("Missing authenticated userId.");
    }

    if (!payload?.email) {
      throw new Error("Email is required to create a user profile.");
    }

    const existingUser = await userRepository.getUserById(userId, {
      tenantId: payload.tenantId,
    });

    if (existingUser) {
      throw new Error("A user profile already exists for this Clerk user.");
    }

    const userEntity = buildUserEntity({
      clerkId: userId,
      email: payload.email,
      firstName: payload.firstName,
      lastName: payload.lastName,
      username: payload.username,
      imageUrl: payload.imageUrl,
      role: payload.role || USER_ROLE.USER,
      status: payload.status || USER_STATUS.ACTIVE,
      plan: payload.plan || USER_PLAN.FREE,
      lastSignInAt: payload.lastSignInAt || null,
      usage: payload.usage,
      preferences: payload.preferences,
      rawClerkData: payload.rawClerkData || null,
      workspaceId: payload.workspaceId || null,
      tenantId: payload.tenantId || null,
    });

    return userRepository.createUser(userEntity, {
      tenantId: payload.tenantId,
    });
  },

  async getUserProfile(userId, { userRepository } = {}) {
    if (!userId) {
      throw new Error("Missing authenticated userId.");
    }

    const profile = await userRepository.getUserById(userId);
    if (!profile) {
      throw new Error("User profile not found.");
    }

    return profile;
  },

  async updateUserProfile(userId, payload, { userRepository } = {}) {
    if (!userId) {
      throw new Error("Missing authenticated userId.");
    }

    if (!payload || Object.keys(payload).length === 0) {
      throw new Error("Update payload cannot be empty.");
    }

    return userRepository.updateUser(userId, payload, {
      tenantId: payload.tenantId,
    });
  },

  async syncClerkUserProfile(clerkUser, { userRepository } = {}) {
    if (!clerkUser?.id) {
      throw new Error("Missing Clerk user id.");
    }

    const email = clerkUser.primaryEmailAddress?.emailAddress?.trim?.();

    if (!email) {
      throw new Error("Clerk user is missing a primary email address.");
    }

    const userEntity = buildUserEntity({
      clerkId: clerkUser.id,
      email,
      firstName: clerkUser.firstName,
      lastName: clerkUser.lastName,
      username: clerkUser.username,
      imageUrl: clerkUser.imageUrl,
      role: USER_ROLE.USER,
      status: USER_STATUS.ACTIVE,
      plan: USER_PLAN.FREE,
      lastSignInAt: clerkUser.lastSignInAt,
      rawClerkData: buildClerkUserSnapshot(clerkUser),
    });

    return userRepository.upsertUserByClerkId(userEntity);
  },
};
