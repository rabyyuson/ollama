"use client";
import React, { useState } from "react";

export default function Home({
  onAsk,
}: {
  onAsk: ({ text }: { text: string }) => Promise<{ content: string }[]>;
}) {
  const [message, setMessage] = useState("");
  const [chunks, setChunks] = useState<{ content: string }[]>([]);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsFormSubmitted(true);
    setChunks([]);

    try {
      const newChunks = await onAsk({ text: message });
      setChunks(newChunks);
    } catch (error) {
      console.error("Error asking question:", error);
    } finally {
      setIsFormSubmitted(false);
    }
  };

  return (
    <div className="m-5">
      {Boolean(chunks.length) && (
        <div className="rounded-lg bg-slate-100 leading-7 p-5 mb-5 text-slate-800 text-base drop-shadow-md">
          {chunks.map((chunk, index) => (
            <DelayedChunk key={index} content={chunk.content} index={index} />
          ))}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="flex w-full border text-center text-black p-3 border-slate-200 drop-shadow-sm rounded-md text-slate-800"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="What would you like to ask?"
        />
        <button
          type="submit"
          className={`w-full mt-5 text-center items-center py-3 font-semibold leading-6 text-lg drop-shadow-md rounded-md text-white ${
            isFormSubmitted
              ? "bg-indigo-400 cursor-not-allowed"
              : "bg-indigo-500 hover:bg-indigo-400 transition ease-in-out duration-150"
          }`}
          disabled={isFormSubmitted}
        >
          {isFormSubmitted ? (
            <>
              <span className="flex flex-row text-center items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span>
                  Getting answers... please wait!
                </span>
              </span>
            </>
          ) : (
            <>
              Send
            </>
          )}
        </button>
      </form>
    </div>
  );
}

interface DelayedChunkProps {
  content: string;
  index: number;
}

const DelayedChunk: React.FC<DelayedChunkProps> = ({ content, index }) => {
  const [isVisible, setIsVisible] = useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 50); // Adjust delay time as needed

    return () => clearTimeout(timer);
  }, [index]);

  return (
    <span style={{ display: isVisible ? "inline" : "none" }}>
      {content}
    </span>
  );
};
