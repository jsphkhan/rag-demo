/** 
 * Prompt Engineering Examples
*/

import 'dotenv/config';
import { openai } from '@ai-sdk/openai';
import { generateText } from 'ai';

const SYSTEM_PROMPT = `You are a helpful assistant.`;

/**
 * Zero shot prompting
 * You give the model a task without any examples. The prompt just describes what you want.
 */
const PROMPT = `Translate the following English sentence to French: "I love pizza."`;

/**
 * One shot prompting
 * You provide one example along with the instruction
 * The example demonstrates the format or type of answer you expect.
 * When you want to show the model exactly the style or format of output.
 */
// const PROMPT = `Translate the following to French: "Good morning". 
// Use the example below:

// Example: "Hello" → "Bonjour"`;

/**
 * Few shot prompting
 * You provide a few examples (typically 2–10) before asking the actual task.
 * The examples act as a guide for the model, improving accuracy.
 * When tasks are more complex and you want to reduce errors.
 */
// const PROMPT = `Classify the sentiment of the following movie reviews as Positive or Negative.

// Example 1: "I loved this movie! The acting was amazing and the story was touching." → Positive
// Example 2: "This film was terrible. The plot made no sense and it was boring." → Negative
// Example 3: "An absolute masterpiece with stunning visuals and a great soundtrack." → Positive

// Now classify this review:
// "I couldn’t enjoy the movie, it was too slow and predictable." → ?
// `;


/**
 * Chain of thought prompting
 * You prompt the model to reason step by step before giving an answer.
 * Encourages logical reasoning or multi-step calculation.
 * For reasoning tasks, math problems, or multi-step instructions.
 */
// Math problem
// const PROMPT = `Solve this math problem step by step: If I have 3 apples and buy 5 more, how many apples do I have?`;

// Logical reasoning
// const PROMPT = `Question: Tom is taller than Jerry. Mike is shorter than Tom but taller than Jerry. Who is the tallest?
// Explain your reasoning step by step.`;


/**
 * Instruction prompting
 * You give the model explicit instructions about the desired output.
 */
// const PROMPT = `Summarize the following paragraph in 1 sentence within 20 words.
// # Paragraph: 
// "Artificial intelligence is transforming many industries by automating tasks, 
// analyzing large datasets, and providing insights that were previously impossible 
// to obtain. Companies are investing heavily in AI research to stay competitive."`;


/**
 * Contextual prompting
 * The prompt includes context or conversation history so the model can respond
 * Chatbots or applications needing context-aware responses.
 */
// Context example
// const PROMPT = `Given the follwing context, answer the question.
// # Context: Dubai is 20 degree celcius today with a chance of light showers.
// # Question: Will it rain in Dubai today?
// `;

// Conversation history example
const messageHistory = [
    {
        role: 'assistant',
        content: 'Welcome. How can I help you today?'
    },
    {
        role: 'user',
        content: 'My laptop keeps overheating when I run multiple apps. I am using a Macbook Pro 2023.'
    },
    {
        role: 'assistant',
        content: 'Have you tried checking for background processes and cleaning the fan vents?'
    },
    {
        role: 'user',
        content: 'Yes, I did that, but its still overheating. What else can I do? (Answer in 1 sentence.)'
    },
    {
        role: 'user',
        content: 'Which laptop I am using?'
    }
];


// LLM generate text
const response = await generateText({
    model: openai('gpt-4o-mini'),
    system: SYSTEM_PROMPT,
    prompt: PROMPT,
    // messages: messageHistory,
    temperature: 0
});

console.log('## Response:');
console.log(response.text);
console.log('\n\n');