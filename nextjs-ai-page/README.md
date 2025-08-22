# Example Apps and Scripts for Building Corporate RAG Agents

## Presentation Slide [link](https://miro.com/app/board/uXjVJTV8eTs=/?share_link_id=29862812354)

## Presentation Date
`August 21, 2025`

This project showcases muitple apps and scripts on how to build a lightweight AI-powered page that augments LLM responses with context fetched from your content store.

---

## 🚀 Tech Stack

- Built using **Next.js** (Pages Router)
- Powered by **Vercel AI SDK** or compatible AI interface for seamless streaming responses
- Powered by **LlamaIndex** for ingesting documents and context retrieval
- Powered by **QDrant** Vector Database to store and retrieve vector embeddings
- Demonstrates **RAG**: embedding retrieval, context injection, and prompt augmentation
- Easy to integrate into your AI-capable applications

---

## ⚙️ Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- An OpenAI API key (or another compatible LLM provider)
- Docker

### Quick Setup

```bash
git clone https://github.com/jsphkhan/rag-demo.git
cd rag-demo/nextjs-ai-page
npm install   # or yarn install
cp .env.dist .env
# Add your environment variables:
# OPENAI_API_KEY=your_api_key
docker compose up
npm run dev
```


## Scripts
1. Prompt Engineering Examples
```bash
npm run run:prompt
```

2. Ingestion Pipeline (Basic RAG Demo)
```bash
npm run run:ingestion
```

3. Query Pipeline (Basic RAG Demo - Start chat in terminal)
```bash
npm run run:query
```

4. Ingestion Pipeline (Corporate RAG Demo - Ingest your custom document)
```bash
npm run run:ingestion-corporate
```

## Visualizations
Running the following scripts will open up your default web browser and open the visualization link

1. Chunk Overlap
```bash
npm run run:chunk-overlap-visualization
```

2. Chunk Size
```bash
npm run run:chunk-size-visualization
```

3. LLM Providers & Models
```bash
npm run run:llm-providers-visualization
```

4. Prompting techniques
```bash
npm run run:prompt-visualization
```

More visualization links are inside the presentation slides.
