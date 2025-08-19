/** 
 * Simple RAG Chatbot
 * Augmenting the prompt with the knowledge context for the response
*/

import { openai } from '@ai-sdk/openai';
import { streamText, convertToCoreMessages } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

/**
 * Default
 */
const sysPrompt = `You are a helpful assistant. Your name is Max`


export async function POST(req) {
  const { messages } = await req.json();

  // filter out empty messages
  const coreMessages = convertToCoreMessages(messages).filter(
    (message) => message.content.length > 0,
  );

  const result = streamText({
    model: openai('gpt-4o-mini'),
    temperature: 0,
    system: sysPrompt,
    messages: coreMessages,
    maxTokens: 100
  });

  return result.toDataStreamResponse();
}