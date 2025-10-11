import { getStreamingAnswer } from "@/lib/langchain";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    const encoder = new TextEncoder();
    const strem = new ReadableStream({
      async start(controller) {
        try {
          const answerStream = await getStreamingAnswer(message);

          for await (const chunk of answerStream) {
            const data = JSON.stringify({ content: chunk });
            controller.enqueue(encoder.encode(`data: ${data}\n\n`));
          }

          controller.enqueue(encoder.enqueue(`data: [DONE]\n\n`));
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

    return new Response(strem, {
      headers: {
        "Content-Type": "text/plain; charset = utf-8",
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
