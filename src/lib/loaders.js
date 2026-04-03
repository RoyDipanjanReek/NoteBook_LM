import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { Document } from "langchain/document";
import Papa from "papaparse";
import { JSDOM } from "jsdom";
import { Readability } from "@mozilla/readability";

const textSplitter = new RecursiveCharacterTextSplitter({
  chunkSize: 1200,
  chunkOverlap: 200,
  separators: ["\n\n", "\n", " ", ""],
});

export async function processFile(file, fileBuffer) {
  console.log(
    `Processing file: ${file.name}, type: ${file.type}, size: ${fileBuffer.length} bytes`
  );

  let content = "";

  try {
    if (file.type === "application/pdf") {
      console.log("Processing PDF with pdf2json...");

      // Temporarily suppress console warnings during PDF processing
      const originalWarn = console.warn;
      console.warn = () => {}; // Suppress warnings

      try {
        // Use pdf2json which is more Next.js friendly
        const PDFParser = (await import("pdf2json")).default;

        // Create a promise-based wrapper for pdf2json
        const pdfText = await new Promise((resolve, reject) => {
          const pdfParser = new PDFParser();

          pdfParser.on("pdfParser_dataError", (errData) => {
            console.error("PDF parsing error:", errData.parserError);
            reject(new Error(`PDF parsing failed: ${errData.parserError}`));
          });

          pdfParser.on("pdfParser_dataReady", (pdfData) => {
            try {
              // Extract text from parsed PDF data
              let textContent = "";
              if (pdfData.Pages) {
                pdfData.Pages.forEach((page) => {
                  if (page.Texts) {
                    page.Texts.forEach((text) => {
                      if (text.R) {
                        text.R.forEach((textRun) => {
                          if (textRun.T) {
                            textContent += decodeURIComponent(textRun.T) + " ";
                          }
                        });
                      }
                    });
                  }
                  textContent += "\n";
                });
              }
              resolve(textContent.trim());
            } catch (parseError) {
              reject(
                new Error(`Failed to extract text: ${parseError.message}`)
              );
            }
          });

          // Parse the buffer
          try {
            pdfParser.parseBuffer(fileBuffer);
          } catch (bufferError) {
            reject(
              new Error(`Failed to parse PDF buffer: ${bufferError.message}`)
            );
          }
        });

        content = pdfText;
        console.log("PDF parsing completed, text length:", content.length);

        if (!content || content.trim().length === 0) {
          throw new Error("No text content could be extracted from the PDF");
        }
      } finally {
        // Restore console.warn
        console.warn = originalWarn;
      }
    } else if (file.type === "text/csv" || file.name.endsWith(".csv")) {
      const csvText = fileBuffer.toString("utf-8");
      const parsed = Papa.parse(csvText, { header: true });
      content = parsed.data
        .map((row) =>
          Object.entries(row)
            .map(([k, v]) => `${k}: ${v}`)
            .join(", ")
        )
        .join("\n");
    } else if (
      file.type === "text/plain" ||
      file.type === "text/markdown" ||
      file.name.endsWith(".txt") ||
      file.name.endsWith(".md")
    ) {
      content = fileBuffer.toString("utf-8");
    } else {
      throw new Error(`Unsupported file type: ${file.type}`);
    }

    const chunks = await textSplitter.splitText(content);
    return chunks.map(
      (chunk, index) =>
        new Document({
          pageContent: chunk,
          metadata: {
            source: file.name,
            type: file.type,
            chunk: index,
            totalChunks: chunks.length,
          },
        })
    );
  } catch (error) {
    console.error("Error processing file:", error);
    throw new Error(`Failed to process file: ${error.message}`);
  }
}

export async function processText(text) {
  try {
    const chunks = await textSplitter.splitText(text);
    return chunks.map(
      (chunk, index) =>
        new Document({
          pageContent: chunk,
          metadata: {
            source: "direct_text",
            type: "text",
            chunk: index,
            totalChunks: chunks.length,
          },
        })
    );
  } catch (error) {
    console.error("Error processing text:", error);
    throw new Error(`Failed to process text: ${error.message}`);
  }
}

export async function processUrl(url) {
  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch URL: ${response.status} ${response.statusText}`);
    }

    const html = await response.text();
    const dom = new JSDOM(html);
    const reader = new Readability(dom.window.document);
    const article = reader.parse();

    let content = article?.textContent?.trim();
    let title = article?.title || url;

    if (!content) {
      const document = dom.window.document;
      document
        .querySelectorAll(
          "script, style, noscript, iframe, header, footer, nav, aside"
        )
        .forEach((node) => node.remove());
      content = document.body?.textContent?.trim() || "";
    }

    if (!content) {
      const htmlText = html
        .replace(/<script[\s\S]*?<\/script>/gi, " ")
        .replace(/<style[\s\S]*?<\/style>/gi, " ")
        .replace(/<noscript[\s\S]*?<\/noscript>/gi, " ")
        .replace(/<[^>]+>/g, " ")
        .replace(/\s+/g, " ")
        .trim();

      content = htmlText;
    }

    if (!content || !content.trim()) {
      throw new Error("Could not extract content from URL");
    }

    const chunks = await textSplitter.splitText(content.trim());
    return chunks.map(
      (chunk, index) =>
        new Document({
          pageContent: chunk,
          metadata: {
            source: url,
            type: "url",
            title,
            chunk: index,
            totalChunks: chunks.length,
          },
        })
    );
  } catch (error) {
    console.error("Error processing URL:", error);
    throw new Error(`Failed to process URL: ${error.message}`);
  }
}
