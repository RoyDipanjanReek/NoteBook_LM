import { processFile, ProcessText, processURL } from "@/lib/loaders";
import { addDocuments, initializeVectorStore } from "@/lib/qdrant";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    // check env variable that is it correct or not or missing. We need to check that first.
    if (!process.env.OPENAI_API_KEY) {
      console.log("Missing openai api key");
      return NextResponse.json(
        {
          error: "Missing open ai api key. Please set open ai key.",
        },
        { status: 500 }
      );
    }

    console.log("Initialized vector store...");
    await initializeVectorStore();

    console.log("Successfully initialized vector store");

    const content_Type = request.headers.get("content-type");
    let documents = [];

    if (content_Type?.includes("multipart/form-data")) {
      console.log("Processing file uplode");

      //Handle file uplode
      const fromData = await request.fromData();
      const file = fromData.get("file");
      const type = fromData.get("type");

      if (!file || type !== "file") {
        return NextResponse.json(
          { error: "Invalid file uplode" },
          { status: 400 }
        );
      }
      console.log(`Processing file: ${file.name}, type: ${file.type}`);
      const buffer = Buffer.from(await file.arrayBuffer());
      documents = await processFile(file, buffer);
    } else {
      console.log("Processing JSON data");

      //Handle Json data(text or URL)
      const body = await request.json();
      const { type, content } = body;

      if (!type || !content) {
        return NextResponse.json(
          { error: "Missing type or content" },
          { status: 404 }
        );
      }

      if (type === "text") {
        documents = await ProcessText(content);
      } else if (type === "url") {
        documents = await processURL(content);
      } else {
        return NextResponse.json({ error: "Invalid type" }, { status: 400 });
      }
    }

    const chunksAdded = await addDocuments(documents);
    console.log(`Successfully added ${chunksAdded} chunk to vector store`);

    return NextResponse.json({
      success: true,
      chunks: chunksAdded,
      message: `Successfully processed and ${chunksAdded} chunk to the knowledge base`,
    });
  } catch (error) {
    console.error("Error in ingest API: ", error);
    console.error("Error stack:", error.stack);

    return NextResponse.json(
      {
        error: "failed to process content",
        details: error.message,
        stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}
