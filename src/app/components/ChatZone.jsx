"use client";

import { useState, useRef, useEffect } from "react";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, []);

  const clearChat = () => {
    setMessages([]);
  };

  // const handleSummarize = () => {};

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!input.trim() || isLoading) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: input,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.error || "Failed to get response");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      let assistentMessage = { role: "assistant", content: "" };

      setMessages((prev) => [...prev, assistentMessage]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) return;

        const chunk = decoder.decode(value);
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6);
            if (data === "[DONE]") {
              setIsLoading(false);
              return;
            }

            try {
              const parsed = JSON.parse(data);

              if (parsed.content) {
                assistentMessage.content += parsed.content;
                setMessages((prev) => {
                  const newMessage = [...prev];
                  newMessage[newMessage.length - 1] = { ...assistentMessage };
                  return newMessage;
                });
              }
            } catch (error) {
              console.log(error);
            }
          }
        }
      }
    } catch (error) {
      console.error("Error in sending message", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Please try again. SORRY",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex flex-col h-[calc(100vh-200px)] sm:h-[calc(100vh-240px)] lg:h-[calc(100vh-280px)]">
      {/* header*/}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 border-b border-[color:var(--border)] bg-[color:var(--surface)]">
        <div className="flex items-center space-x-2 mb-2 sm:mb-0">
          <div className="w-2 h-2 bg-[color:var(--accent)] rounded-full"></div>
          <span className="text-xs sm:text-sm font-medium text-[color:var(--muted)]">
            Ready to Chat
          </span>
        </div>
        <div className="flex space-x-2">
          <button
            
            disabled={isLoading}
            className="px-2 py-1 sm:px-3 sm:py-1 text-xs font-medium text-[color:var(--accent)] bg-[color:var(--surface-strong)] rounded-full hover:bg-[color:var(--surface)] transition-colors disabled:opacity-50"
          >
            Summarize All
          </button>
          <button
            onClick={clearChat}
            className="px-2 py-1 sm:px-3 sm:py-1 text-xs font-medium text-[color:var(--muted)] bg-[color:var(--surface-strong)] rounded-full hover:bg-[color:var(--surface)] transition-colors"
          >
            Clear Chat
          </button>
        </div>
      </div>

      {/**message section */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 ">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-center px-4">
            <div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[color:var(--surface-strong)] rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 text-[color:var(--muted)]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>
              <h3 className="text-base sm:text-lg font-medium text-[color:var(--text)] mb-2">
                Start a conversation
              </h3>
              <p className="text-[color:var(--muted)] text-sm max-w-sm">
                Upload some sources and ask questions about them. I&apos;ll
                provide answers based on your content.
              </p>
              <div className="mt-4 sm:mt-6 space-y-2">
                <p className="text-xs text-[color:var(--muted)]">Try asking:</p>
                <div className="space-y-1 text-xs text-[color:var(--muted)]">
                  <p>&ldquo;What are the main topics covered?&rdquo;</p>
                  <p>&ldquo;Can you summarize this document?&rdquo;</p>
                  <p>&ldquo;What insights can you extract?&rdquo;</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] sm:max-w-[80%] rounded-lg px-3 py-2 sm:px-4 sm:py-2 ${
                    message.role === "user"
                      ? "bg-[color:var(--accent)] text-[color:var(--surface-strong)]"
                      : "bg-[color:var(--surface-strong)] text-[color:var(--text)]"
                  }`}
                >
                  {message.role === "assistant" && (
                    <div className="flex items-center space-x-2 mb-1">
                      <div className="w-3 h-3 sm:w-4 sm:h-4 bg-[color:var(--accent)] rounded-full"></div>
                      <span className="text-xs font-medium text-[color:var(--muted)]">
                        AI Assistant
                      </span>
                    </div>
                  )}
                  <div className="text-xs sm:text-sm whitespace-pre-wrap">
                    {message.content}
                  </div>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-[color:var(--surface-strong)] rounded-lg px-3 py-2 sm:px-4 sm:py-2 max-w-[85%] sm:max-w-[80%]">
                  <div className="flex items-center space-x-2 mb-1">
                    <div className="w-3 h-3 sm:w-4 sm:h-4 bg-[color:var(--accent)] rounded-full"></div>
                    <span className="text-xs font-medium text-[color:var(--muted)]">
                      AI Assistant
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-[color:var(--muted)] rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-[color:var(--muted)] rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-[color:var(--muted)] rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      <div className="border-t border-[color:var(--border)] p-3 sm:p-4 bg-[color:var(--surface)]">
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question about your sources..."
            disabled={isLoading}
            className="flex-1 px-3 py-2 bg-[color:var(--surface-strong)] border border-[color:var(--border)] text-[color:var(--text)] placeholder:text-[color:var(--muted)] rounded-lg focus:ring-2 focus:ring-[color:var(--accent)] focus:border-transparent disabled:opacity-50 text-sm"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="px-3 py-2 sm:px-4 sm:py-2 bg-[color:var(--accent)] text-[color:var(--surface-strong)] font-medium rounded-lg hover:bg-[color:var(--accent-strong)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-3 w-3 sm:h-4 sm:w-4 border-2 border-white border-t-transparent"></div>
            ) : (
              <svg
                className="w-3 h-3 sm:w-4 sm:h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
