import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { getUserDailyUsage, DAILY_QUESTION_LIMIT, getRemainingQuestions } from "@/lib/usage";
import { isAdminIdentity } from "@/lib/auth";

export async function GET() {
  const { userId } = auth();
  const clerkUser = await currentUser();

  if (!userId) {
    return NextResponse.json(
      { error: "Authentication required" },
      { status: 401 }
    );
  }

  const isAdmin = isAdminIdentity({
    userId,
    email: clerkUser?.primaryEmailAddress?.emailAddress,
  });

  if (isAdmin) {
    return NextResponse.json({
      isAdmin: true,
      limit: null,
      remaining: null,
      used: null,
    });
  }

  const usage = await getUserDailyUsage(userId);
  const remaining = getRemainingQuestions(usage.count);

  return NextResponse.json({
    isAdmin: false,
    used: usage.count,
    limit: DAILY_QUESTION_LIMIT,
    remaining,
    date: usage.date,
  });
}
