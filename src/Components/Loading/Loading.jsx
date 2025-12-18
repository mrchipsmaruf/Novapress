import React from "react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black dark:bg-background-dark font-display">
      <div className="relative overflow-hidden">
        <h1 className="text-6xl logoText md:text-8xl font-medium tracking-wider text-white bg-clip-text bg-zinc-800 dark:bg-zinc-200">
          NOVAPRESS
        </h1>
        <div className="absolute top-0 left-0 w-full h-full">
          <div
            className="absolute top-0 left-0 w-full h-full bg-black/50 animate-revealText"
            style={{
              animation: "reveal-text 1.5s ease-in-out infinite",
            }}
          ></div>
        </div>
      </div>

      {/* Inline styles for keyframes */}
      <style>
        {`
          @keyframes reveal-text {
            0% { transform: translateX(-101%); }
            100% { transform: translateX(101%); }
          }
          .animate-revealText {
            animation: reveal-text 1.5s ease-in-out infinite;
          }
        `}
      </style>
    </div>
  );
};

export default Loading;
