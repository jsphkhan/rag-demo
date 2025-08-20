/**
 * Augments system prompt with the necessary context
 * @param {string} systemPrompt
 * @param {string} context
 * @returns {string}
 */
export function getSystemPromptWithContext(systemPrompt, context) {
  return `${systemPrompt}\n
  Context information is given below:
  -----------------
  ### START CONTEXT
  ${context}
  ### END CONTEXT
  -----------------
  `;
}
