// Server Component
"use server";

import { Ollama } from "ollama";
import Home from "@/components/home";
import "@/app/globals.css";

async function* fetchOllamaMessage({ text }: { text: string }) {
  const ollama = new Ollama({ host: "http://127.0.0.1:11434" });
  const response = await ollama.chat({
    model: "llama3",
    messages: [{ role: "user", content: text }],
    stream: true,
  });

  for await (const part of response) {
    yield { content: part.message.content };
  }
}

export default async function Page() {
  async function handleOnAsk({ text }: { text: string }): Promise<{ content: string }[]> {
    "use server";

    const chunks: { content: string }[] = [];
    for await (const chunk of fetchOllamaMessage({ text })) {
      chunks.push(chunk);
    }
    return chunks;
  }

  return <Home onAsk={handleOnAsk} />;
}
