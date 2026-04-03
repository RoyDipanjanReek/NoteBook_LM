import { currentUser } from "@clerk/nextjs/server";
import { userRepository } from "@/repositories/user.repository";
import { userService } from "@/services/user.service";

export async function syncCurrentUser(clerkUserInput = null) {
  const clerkUser = clerkUserInput || (await currentUser());

  if (!clerkUser) {
    return null;
  }

  return userService.syncClerkUserProfile(clerkUser, {
    userRepository,
  });
}
