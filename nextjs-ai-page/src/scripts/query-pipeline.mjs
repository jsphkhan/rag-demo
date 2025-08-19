/** 
 * Query pipeline
 * 
 * Runs a simple chat interface in the terminal
*/

import 'dotenv/config';
import { Settings, VectorStoreIndex } from 'llamaindex';
import { OpenAIEmbedding } from '@llamaindex/openai';
import { QdrantVectorStore } from '@llamaindex/qdrant';
import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';

import readline from "readline/promises";
import { stdin as input, stdout as output } from "process";

import { getSystemPromptWithContext } from './utils/llm.js';

// set embedding model
Settings.embedModel = new OpenAIEmbedding({
    modelType: 'text-embedding-3-small'
});

// define vector store
const collectionName = 'rag-demo-collection';
const vectorStore = new QdrantVectorStore({
    url: 'http://localhost:6333',
    collectionName,
    embeddingModel: Settings.embedModel
});

const index = await VectorStoreIndex.fromVectorStore(vectorStore);
const retriever = index.asRetriever({
    similarityTopK: 5
});

async function runQuery() {
    const rl = readline.createInterface({ input, output });

    while(true) {
        const query = await rl.question("\nQuery: ");
        const nodes = await retriever.retrieve({
            query
        });
        // console.log('------ No of nodes retrieved: ', nodes.length);
        // console.log('------ Example Node: ', nodes[0]);
        
        const textArr = nodes.map((node) => {
            return node.node.text;
        });
        const retrievedContext = textArr.join('\n\n');
        
        const contextedSystemPrompt = getSystemPromptWithContext(retrievedContext);
        // console.log('------ Contexted System Prompt: ', contextedSystemPrompt);

        const result = streamText({
            model: openai('gpt-4o-mini'),
            temperature: 0,
            system: contextedSystemPrompt,
            maxTokens: 500,
            prompt: query
        });

        for await (const chunk of result.textStream) {
            process.stdout.write(chunk);
        }
        console.log('\n');
    }
}
runQuery().catch(console.error);
