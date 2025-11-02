"use client";
import Image from "next/image";
import React, { useState } from "react";
import Typewriter from "typewriter-effect";

const HeroSection = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div>
      <section className="relative py-12 overflow-hidden bg-black sm:pb-16 lg:pb-20 xl:pb-24">
        <div className="px-4 mx-auto relative sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid items-center grid-cols-1 gap-y-12 lg:grid-cols-2 gap-x-16">
            <div>
              <h1 className="text-4xl font-normal text-white sm:text-5xl lg:text-6xl xl:text-7xl">
                Let's start{" "}
                <span className="text-amber-300 underline ">Chatting</span> with
                <Typewriter
                  className="text-blue-500 underline italic"
                  options={{
                    strings: ["PDF", "Sample Text", "Website URL"],
                    autoStart: true,
                    loop: true,
                  }}
                />
              </h1>
              <p className="mt-4 text-lg font-normal text-gray-400 sm:mt-8">
                CopyBookLM a Mini Retrieval-Augmented Generation (RAG) powered
                note-taking and knowledge assistant inspired by Google’s
                NotebookLM.
              </p>

              <div className="mt-8 sm:mt-12">
                <p className="text-lg font-normal text-white">
                  Trusted by 50k+ users
                </p>
                <div className="flex items-center mt-3">
                  <div className="flex">
                    {/* SVG stars unchanged */}
                    {/* ...existing code for SVG stars... */}
                  </div>
                  <span className="ml-2 text-base font-normal text-white">
                    {" "}
                    4.1/5{" "}
                  </span>
                  <span className="ml-1 text-base font-normal text-gray-500">
                    {" "}
                    (14k Reviews){" "}
                  </span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0">
                <svg
                  className="blur-3xl filter opacity-70"
                  style={{ filter: "blur(64px)" }}
                  width="444"
                  height="536"
                  viewBox="0 0 444 536"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M225.919 112.719C343.98 64.6648 389.388 -70.487 437.442 47.574C485.496 165.635 253.266 481.381 135.205 529.435C17.1445 577.488 57.9596 339.654 9.9057 221.593C-38.1482 103.532 107.858 160.773 225.919 112.719Z"
                    fill="url(#c)"
                  />
                  <defs>
                    <linearGradient
                      id="c"
                      x1="82.7339"
                      y1="550.792"
                      x2="-39.945"
                      y2="118.965"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop
                        offset="0%"
                        style={{ stopColor: "var(--color-cyan-500)" }}
                      />
                      <stop
                        offset="100%"
                        style={{ stopColor: "var(--color-purple-500)" }}
                      />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <Image
                className="relative h-[500] border-2 rounded-2xl"
                src="/home.png"
                alt="image"
                height={500}
                width={1200}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
