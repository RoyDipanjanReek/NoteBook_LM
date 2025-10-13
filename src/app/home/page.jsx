import React from "react";
import UplodeZone from "../components/UplodeZone";
import Chat from "../components/ChatZone";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-600 ">
      {/** HEADER */}
      <header className="bg-gray-500 px-4 py-4">
        <div className="flex items-center space-x-2 sm:space-x-4">
          <h1 className="text-xl sm:text-2xl font-bold text-white">CopyBook</h1>
          <span className="px-2 py-1 bg-blue-800 text-xl font-medium rounded-full">
            LLM
          </span>
        </div>
      </header>

      {/**MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-4 py-4 sm:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 sm:gap-4">
          {/** LEFT SIDE -> UPLODE SECTION START HERE*/}
          <div className="bg-gray-800 rounded-xl shadow-sm border border-gray-700 overflow-hidden mb-4 lg:mb-0">
            <div className="p-4 sm:p-6 border-b border-gray-700">
              <h2 className="text-lg sm:text-xl font-semibold text-white mb-2">
                Upload Sources
              </h2>
              <p className="text-gray-400 text-sm">
                Add documents, paste text, or provide URLs to get started
              </p>
            </div>
            <div className="p-4 sm:p-6">
              <UplodeZone />
            </div>
          </div>

          {/** RIGHT SIDE -> CHAT SECTION */}
          <div className="bg-gray-800 rounded-xl shadow-sm border border-gray-700 overflow-hidden mb-4 lg:mb-0">
            <div className="p-4 sm:p-6 border-b border-gray-700">
              <h2 className="text-lg sm:text-xl font-semibold text-white mb-2">
                Chat with your Sources
              </h2>
              <p className="text-gray-400 text-sm">
                Ask questions about your uploaded content
              </p>
            </div>
            <Chat />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
