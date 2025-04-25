const { askLlamaWithContext } = require('./services/llama_service');
const { detectUserChanges } = require('./utils/change_detector');
const { updateUserPreferences } = require('./utils/json_updater');

// Example of how to use it in your chatbot
async function handleUserMessage(userMessage) {
  try {
    // Detect if the user is requesting changes to their routine or diet
    const changes = detectUserChanges(userMessage);
    
    if (changes.hasChanges) {
      // Update the user preferences JSON with the detected changes
      await updateUserPreferences(changes);
      
      // Format the change details in a user-friendly way
      const formattedChanges = formatChangesForUser(changes);
      
      // Generate a confirmation message about the changes
      const confirmationPrompt = `The user has updated their ${changes.changeType} with these changes: ${JSON.stringify(changes.details)}. Please provide a friendly confirmation and helpful recommendations based on these changes.`;
      
      const llamaResponse = await askLlamaWithContext(confirmationPrompt);
      
      // Format the full response
      return formatResponse({
        success: true,
        title: `✅ ${changes.changeType.toUpperCase()} UPDATED`,
        changes: formattedChanges,
        message: llamaResponse
      });
    }
    
    // Normal flow for non-change requests
    const llamaResponse = await askLlamaWithContext(userMessage);
    return formatResponse({
      success: true,
      message: llamaResponse
    });
  } catch (error) {
    console.error('Error getting response from Llama:', error);
    return formatResponse({
      success: false,
      title: "❌ ERROR",
      message: "I'm sorry, I encountered an error processing your request."
    });
  }
}

/**
 * Formats changes in a user-friendly way
 * @param {Object} changes - Object containing detected changes
 * @returns {string} - Formatted changes text
 */
function formatChangesForUser(changes) {
  const details = changes.details;
  let result = '';
  
  if (changes.changeType === 'diet') {
    result += details.dietType ? `🍽️ Diet Type: ${details.dietType}\n` : '';
    result += details.calorieTarget ? `🔢 Calorie Target: ${details.calorieTarget}\n` : '';
    
    if (details.foodItems && details.foodItems.length > 0) {
      result += '🥗 Food Items:\n';
      details.foodItems.forEach(item => {
        result += `  • ${item}\n`;
      });
    }
  } else if (changes.changeType === 'routine') {
    result += details.goal ? `🎯 Goal: ${details.goal}\n` : '';
    result += details.frequency ? `🔄 Frequency: ${details.frequency}\n` : '';
    result += details.duration ? `⏱️ Duration: ${details.duration}\n` : '';
    
    if (details.exercises && details.exercises.length > 0) {
      result += '💪 Exercises:\n';
      details.exercises.forEach(exercise => {
        result += `  • ${exercise}\n`;
      });
    }
  }
  
  return result;
}

/**
 * Formats the final response for better readability
 * @param {Object} options - Response options
 * @returns {string} - Formatted response
 */
function formatResponse(options) {
  let response = '';
  
  if (options.title) {
    response += `<b>${options.title}</b>\n\n`;
  }
  
  if (options.changes) {
    response += `${options.changes}\n`;
  }
  
  if (options.message) {
    // Clean up the message
    let cleanMessage = options.message
      .replace(/^I am an AI assistant/i, '')
      .replace(/^As an AI language model/i, '')
      .replace(/^Based on the workout database/i, '')
      .trim();
      
    // Add formatting for important words
    cleanMessage = cleanMessage
      .replace(/(\b(important|key|essential|remember|note|tip|warning)\b)/gi, '<b>$1</b>')
      .replace(/(\d+\s*(reps|sets|minutes|seconds|hours|days|weeks))/gi, '<b>$1</b>')
      .replace(/(protein|carbs|fats|calories)/gi, '<b>$1</b>');
    
    // Improve line breaks for better readability
    cleanMessage = cleanMessage
      .replace(/\n{3,}/g, '\n\n')  // Reduce excessive line breaks
      .replace(/([.:!?])\s+/g, '$1\n')  // Add line breaks after sentences
      .replace(/\n{3,}/g, '\n\n');  // Clean up again
      
    response += cleanMessage;
  }
  
  // Ensure the response is not too lengthy
  if (response.length > 500) {
    // Split into paragraphs and take only the most important ones
    const paragraphs = response.split('\n\n');
    if (paragraphs.length > 3) {
      response = paragraphs.slice(0, 3).join('\n\n') + '\n\n<b>...</b>';
    }
  }
  
  return response;
}

// Export the function to use in your application
module.exports = {
  handleUserMessage
};