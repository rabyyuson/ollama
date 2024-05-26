"use server";

import { ChatAnthropic } from "@langchain/anthropic";
import { AIMessage, HumanMessage, SystemMessage } from "@langchain/core/messages";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";

async function fetchAnthropicMessage() {
  const model = new ChatAnthropic({
    model: "claude-3-opus-20240229",
    temperature: 0,
  });

  const messages = [
    new HumanMessage({ content: "Hi! I'm Bob" }),
    new AIMessage({ content: "Hello Bob! How can I assist you today?" }),
    new HumanMessage({ content: "What's my name?" }),
  ];

  return await model.invoke(messages);

  const systemTemplate = "Translate the following into {language}:";
  const promptTemplate = ChatPromptTemplate.fromMessages([
    ["system", systemTemplate],
    ["user", "{text}"],
  ]);

  const parser = new StringOutputParser();
  const chain = promptTemplate.pipe(model).pipe(parser);

  const result = await chain.invoke({ language: "tagalog", text: "hi there" });
  return result;
}

export default async function Page() {
  const message = await fetchAnthropicMessage();
  console.log(message)

  return (
    <div>Content...</div>
  );
}
