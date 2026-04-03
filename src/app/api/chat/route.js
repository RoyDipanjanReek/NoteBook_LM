import { getStreamingAnswer } from "@/lib/langchain";
import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import {
  getUserDailyUsage,
  incrementUserDailyUsage,
  DAILY_QUESTION_LIMIT,
} from "@/lib/usage";
import { isAdminIdentity } from "@/lib/auth";

export async function POST(request) {
  try {
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

    if (!isAdmin) {
      const usage = await getUserDailyUsage(userId);
      if (usage.count >= DAILY_QUESTION_LIMIT) {
        return NextResponse.json(
          {
            error: "Daily question limit reached",
            limit: DAILY_QUESTION_LIMIT,
            remaining: 0,
          },
          { status: 403 }
        );
      }

      await incrementUserDailyUsage(userId);
    }

    const { message } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          const answerStream = await getStreamingAnswer(message);

          for await (const chunk of answerStream) {
            const data = JSON.stringify({ content: chunk });
            controller.enqueue(encoder.encode(`data: ${data}\n\n`));
          }

          controller.enqueue(encoder.encode(`data: [DONE]\n\n`));
          controller.close();
        } catch (error) {
          console.error("Error in streaming:", error);
          const errorData = JSON.stringify({
            error: "Failed to generate response",
            details: error.message,
          });
          controller.enqueue(encoder.encode(`data: ${errorData}\n\n`));
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream; charset=utf-8",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Error in chat API:", error);
    return NextResponse.json(
      { error: "Failed to process chat message", details: error.message },
      { status: 500 }
    );
  }
}