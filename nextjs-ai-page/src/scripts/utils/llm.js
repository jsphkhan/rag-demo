
export const systemPrompt = `You are a helpful assistant

## Rules:
- Always respond concisely and in a clear, engaging tone.
- Do not mention your knowledge cut-off date or training data.
- Do not hallucinate or make up answers. 
- Answer only using the provided context.
- If the context does not contain enough information, mention politely that you don't have that information. Do not mention context in your response.
- Do not mention your training data, sources of data, or knowledge cut-off date.
`;
/**
 * Augments system prompt with the necessary context
 * @param {string} systemPrompt
 * @param {string} context
 * @returns {string}
 */
export function getSystemPromptWithContext(context) {
  return `${systemPrompt}\n
  Context information is given below:
  -----------------
  ### START CONTEXT
  ${context}
  ### END CONTEXT
  -----------------
  `;
}
