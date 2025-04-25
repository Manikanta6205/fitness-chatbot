const { readWorkoutCSV } = require('../utils/csv_reader');
const { buildWorkoutContext } = require('../utils/llama_context_builder');

// Cache the workout data to avoid reading the CSV file on every request
let workoutDataCache = null;

/**
 * Loads workout data from CSV and caches it
 * @returns {Promise<Array>} - Workout data
 */
async function getWorkoutData() {
  if (!workoutDataCache) {
    try {
      workoutDataCache = await readWorkoutCSV();
    } catch (error) {
      console.error('Error loading workout data:', error);
      workoutDataCache = [];
    }
  }
  return workoutDataCache;
}

/**
 * Enhances a user prompt with workout context before sending to Llama
 * @param {string} userPrompt - Original user prompt
 * @returns {Promise<string>} - Enhanced prompt with context
 */
async function enhancePromptWithWorkoutContext(userPrompt) {
  const workoutData = await getWorkoutData();
  const workoutContext = buildWorkoutContext(workoutData);
  
  // Create a more concise and structured prompt
  return `
You are a friendly fitness assistant helping users with workout and diet advice.

REFERENCE INFORMATION:
${workoutContext}

USER REQUEST:
${userPrompt}

INSTRUCTIONS:
- Keep your response brief and focused (under 150 words)
- Use short paragraphs with line breaks after each sentence
- Bold important words related to fitness metrics, goals or instructions
- Use bullet points for lists (maximum 3-4 points)
- Include 1-2 relevant emojis maximum
- Avoid disclaimers or mentioning you're an AI
- Focus only on the most actionable advice
- End with a single motivational line when appropriate

Your response:
`;
}

/**
 * Sends a prompt to the Llama model with workout context
 * @param {string} userPrompt - User's original prompt
 * @returns {Promise<object>} - Llama's response
 */
async function askLlamaWithContext(userPrompt) {
  const enhancedPrompt = await enhancePromptWithWorkoutContext(userPrompt);
  
  // TODO: Replace with your actual Llama API call
  // For now, this is a placeholder that you'll need to update
  // with your actual implementation for calling the Llama model
  
  // Example placeholder:
  // const response = await yourLlamaClient.complete({ prompt: enhancedPrompt });
  // return response;
  
  console.log("Enhanced prompt with workout context:", enhancedPrompt);
  return {
    text: "This is a placeholder for the Llama API call with enhanced workout context"
  };
}

module.exports = {
  askLlamaWithContext,
  enhancePromptWithWorkoutContext,
  getWorkoutData // Exported for testing purposes
};
