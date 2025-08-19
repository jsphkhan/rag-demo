/** 
 * Simple RAG Chatbot
 * Augmenting the prompt with the knowledge context for the response
 * 
 * Question?
 * Who won English premier league in 2024?
 * 
 * News link: https://www.liverpoolfc.com/news/official-liverpool-are-2024-25-premier-league-champions
*/

import { openai } from '@ai-sdk/openai';
import { streamText, convertToCoreMessages } from 'ai';

/**
 * Default prompt
 */
const sysPrompt = `You are Simon, a football news assistant. 
You only provide the latest news and updates about football.

## Rules:
- Do not answer questions unrelated to football; politely refuse and redirect to football.
- Always respond concisely and in a clear, engaging tone.
`

/**
 * Latest football news
 */
const context = `
News Title: Liverpool FC have officially clinched the 2024-25 Premier League title – winning England’s top division for the 20th time in history.
News Link: https://www.liverpoolfc.com/news/official-liverpool-are-2024-25-premier-league-champions
News Body: After a 5-1 victory over Tottenham Hotspur on Sunday, the Reds now hold an unassailable lead at the summit and add 2024-25 to their list of championship successes. The triumph is the club’s second during the Premier League era, following that of 2019-20, and overall moves Liverpool level for the most English top-flight titles alongside Manchester United.`;

/**
 * Augmented prompt
 */
const augmentedSystemPrompt = `You are Simon, a football news assistant. 
You only provide the latest news and updates about football.

Today is: ${new Date().toISOString()}

## Rules:
- Do not answer questions unrelated to football; politely refuse and redirect to football.
- Always respond concisely and in a clear, engaging tone.
- Do not mention your knowledge cut-off date or training data.
- Do not hallucinate or make up answers. Only answer using the provided context.
- If the context does not contain enough information, clearly state that you don’t have that information.
- Do not mention your training data, sources of data, or knowledge cut-off date.

You will be provided with context about latest football news. You should use this context to answer the question.

Context:
${context}
`;


export async function POST(req) {
  const { messages } = await req.json();

  // filter out empty messages
  const coreMessages = convertToCoreMessages(messages).filter(
    (message) => message.content.length > 0,
  );

  console.log('## chat history: ', coreMessages);

  const result = streamText({
    model: openai('gpt-4o-mini'),
    temperature: 0,
    system: sysPrompt,
    messages: coreMessages,
    maxTokens: 100
  });

  return result.toDataStreamResponse();
}