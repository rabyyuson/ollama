An [Ollama](https://ollama.com/) AI powered application.

## Requirements

This requires that **Ollama** is installed locally and running on http://localhost:11434. Also make sure to create a **.env** file and add the following values including API keys:

```bash
LANGCHAIN_TRACING_V2="true"
LANGCHAIN_API_KEY="{YOUR_API_KEY}"
LANGCHAIN_CALLBACKS_BACKGROUND="true"
ANTHROPIC_API_KEY="{YOUR_API_KEY}"
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
