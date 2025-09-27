"use client";
import { useState } from "react";

export default function UplodeZone() {
  const [textInput, setTextInput] = useState("");
  const [urlInput, setUrlInput] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [activeTab, setActiveTab] = useState("file");
  const [uoloadedSources, setUoloadedSources] = useState([]);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    handleFileUplload(files);
  };
  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    handleFileUpload(files);
  };
  const handleFileUpload = async (files) => {
    setIsUploading(true);
    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("type", file);

      try {
        {
          /**fetch api */
        }

        const response = await fetch("/api/ingest", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const result = await response.json();

          setUoloadedSources((prev) => [
            ...prev,
            {
              name: file.name,
              type: file.type,
              size: file.size,
              chunks: file.chunks,
            },
          ]);
        }
      } catch (error) {
        console.error("Error in uploading file", error);
      }
    }

    setIsUploading(false);
  };

  const handleTextSubmit = async () => {
    if (!textInput.trim()) return;

    setIsUploading(true);

    try {
      const response = await fetch("/api/ingest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "text",
          content: textInput,
        }),
      });

      if (response.ok) {
        const result = await response.json();

        setIsUploading((prev) => [
          ...prev,
          {
            name: "Pasted Text",
            type: "text/plain",
            size: textInput.length,
            chunks: result.chunks,
          },
        ]);
        setTextInput("");
      }
    } catch (error) {
      console.error("Error in uploading Text", error);
    }

    setIsUploading(false);
  };
  const handleUrlSubmit = async () => {
    if (!urlInput.trim()) return;

    setIsUploading(true);

    try {
      const response = await fetch("/api/ingest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "url",
          content: urlInput,
        }),
      });

      if (response.ok) {
        const result = await response.json();

        setIsUploading((prev) => [
          ...prev,
          {
            name: new URL(urlInput).hostname,
            type: "url",
            url: urlInput,
            chunks: result.chunks,
          },
        ]);
        setUrlInput("");
      }
    } catch (error) {
      console.error("Error in uploading url", error);
    }
    setIsUploading(false);
  };

  return (
    <div className="space-y-4 sm:space-y-6 ">
      {/** Tab navigation */}
      <div className="flex space-x-1 bg-gray-700 p-1">
        <button
          onClick={() => setActiveTab("file")}
          className={`flex-1 px-2 text-xl sm:text-sm font-medium rounded-md transition-colors ${
            activeTab === "file"
              ? "bg-gray-600 text-white shadow-sm"
              : "text-gray-500 hover:text-white"
          }`}
        >
          Uplode File
        </button>

        <button
          onClick={() => setActiveTab("text")}
          className={`flex-1 px-2 text-xl sm:text-sm font-medium rounded-md transition-colors ${
            activeTab === "text"
              ? "bg-gray-600 text-white shadow-sm"
              : "text-gray-500 hover:text-white"
          }`}
        >
          Paste Text
        </button>

        <button
          onClick={() => setActiveTab("url")}
          className={`flex-1 px-2 text-xl sm:text-sm font-medium rounded-md transition-colors ${
            activeTab === "url"
              ? "bg-gray-600 text-white shadow-sm"
              : "text-gray-500 hover:text-white"
          }`}
        >
          Website URL
        </button>
      </div>

      {/**File Uplode Tab */}

      {activeTab === "file" && (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={` border-2 border-dashed rounded-lg p-4 sm:p-6 md:p-8 text-center transition-colors ${
            isDragging
              ? "border-blue-500 bg-blue-900/20"
              : "border-gray-600 hover:border-gray-500"
          }`}
        >
          <div className="mx-auto w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-gray-700 mb-3 sm:mb-4">
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
          </div>

          <h3 className="text-sm font-medium text-white mb-2">
            Darg and drop file here, or click to select
          </h3>
          <p className="text-xs text-gray-400 mb-3 sm:mb-4">
            Support PDF, CSV, TEXT, and markdown files
          </p>
          <input
            type="file"
            multiple
            accept=".pdf, .csv, .txt, .md"
            onChange={handleFileSelect}
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="inline-flex items-center px-3 py-2 sm:px-4 sm:py-2 bg-blue-600 text-white text-xs sm:text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
          >
            Select Files
          </label>
        </div>
      )}

      {activeTab === "text" && (
        <div className="space-y-3 sm:space-y-4">
          <textarea
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            placeholder="Paste your text here."
            className="w-full h-32 sm:h-40 px-3 py-2 bg-gray-700 border border-gray-600 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm"
          />
          <button
            onClick={handleTextSubmit}
            disabled={!textInput.trim() || isUploading}
            className="w-full px-3 py-2 sm:px-4 sm:py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
          >
            {isUploading ? "Processing" : "add text"}
          </button>
        </div>
      )}

      {activeTab === "url" && (
        <div className="space-y-3 sm:space-y-4">
          <input
            type="url"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="https/www.google.com"
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          />
          <button
            onClick={handleUrlSubmit}
            disabled={!urlInput.trim() || isUploading}
            className="w-full px-3 py-2 sm:px-4 sm:py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
          >
            {isUploading ? "Processing" : "add URL"}
          </button>
        </div>
      )}

      {/** Loader */}
      {isUploading && (
        <div className="flex items-center justify-center space-x-2 p-3 sm:p-4">
          <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-2 border-blue-600 border-t-transparent"></div>
          <span className="text-xs sm:text-sm text-gray-400">
            Processing your content...
          </span>
        </div>
      )}
    </div>
  );
}
