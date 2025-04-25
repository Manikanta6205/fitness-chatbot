/**
 * Detects if the user message contains requests to change routine or diet
 * @param {string} userMessage - The message from the user
 * @returns {Object} - Object with change detection results
 */
function detectUserChanges(userMessage) {
  const message = userMessage.toLowerCase();
  
  // Initialize the result object
  const result = {
    hasChanges: false,
    changeType: null,
    details: {}
  };
  
  // Diet change detection
  if (message.includes('change my diet') || 
      message.includes('changing my diet') || 
      message.includes('new diet') || 
      message.includes('diet plan') ||
      (message.includes('diet') && (message.includes('change') || message.includes('update')))) {
    
    result.hasChanges = true;
    result.changeType = 'diet';
    
    // Extract information about the diet change
    result.details = extractDietChanges(message);
  }
  
  // Routine change detection
  else if (message.includes('change my routine') || 
           message.includes('changing my routine') || 
           message.includes('new routine') || 
           message.includes('workout plan') ||
           message.includes('exercise plan') ||
           (message.includes('routine') && (message.includes('change') || message.includes('update')))) {
    
    result.hasChanges = true;
    result.changeType = 'routine';
    
    // Extract information about the routine change
    result.details = extractRoutineChanges(message);
  }
  
  return result;
}

/**
 * Extracts diet change details from user message
 * @param {string} message - User message
 * @returns {Object} - Extracted diet details
 */
function extractDietChanges(message) {
  const dietDetails = {
    foodItems: [],
    mealFrequency: null,
    dietType: null,
    calorieTarget: null,
    timestamp: new Date().toISOString()
  };
  
  // Look for specific diet types
  const dietTypes = ['keto', 'vegan', 'vegetarian', 'paleo', 'mediterranean', 'carnivore', 'gluten-free', 'low-carb'];
  for (const dietType of dietTypes) {
    if (message.includes(dietType)) {
      dietDetails.dietType = dietType;
      break;
    }
  }
  
  // Look for calorie targets
  const calorieMatch = message.match(/(\d{3,4})\s*(?:kcal|calories|cal)/i);
  if (calorieMatch) {
    dietDetails.calorieTarget = parseInt(calorieMatch[1]);
  }
  
  // Extract food items (basic approach)
  const foodKeywords = ['eating', 'consume', 'food', 'meal'];
  for (const keyword of foodKeywords) {
    const index = message.indexOf(keyword);
    if (index !== -1) {
      // Extract text after the keyword to get potential food items
      const afterKeyword = message.substring(index + keyword.length);
      // Split by common separators and filter out empty items
      const items = afterKeyword.split(/(?:,|and|\n)+/)
        .map(item => item.trim())
        .filter(item => item.length > 2 && !item.startsWith('I') && !item.startsWith('i'));
      
      if (items.length > 0) {
        dietDetails.foodItems = [...dietDetails.foodItems, ...items.slice(0, 5)]; // Limit to 5 items
      }
    }
  }
  
  return dietDetails;
}

/**
 * Extracts routine change details from user message
 * @param {string} message - User message
 * @returns {Object} - Extracted routine details
 */
function extractRoutineChanges(message) {
  const routineDetails = {
    exercises: [],
    frequency: null,
    duration: null,
    goal: null,
    timestamp: new Date().toISOString()
  };
  
  // Look for workout frequency
  const frequencyMatch = message.match(/(\d+)\s*(?:times|days)\s*(?:a|per)\s*week/i);
  if (frequencyMatch) {
    routineDetails.frequency = `${frequencyMatch[1]} times per week`;
  }
  
  // Look for workout duration
  const durationMatch = message.match(/(\d+)\s*(?:minutes|mins|hours|hrs)/i);
  if (durationMatch) {
    routineDetails.duration = durationMatch[0];
  }
  
  // Look for fitness goals
  const goals = ['weight loss', 'muscle gain', 'strength', 'endurance', 'flexibility', 'toning'];
  for (const goal of goals) {
    if (message.includes(goal)) {
      routineDetails.goal = goal;
      break;
    }
  }
  
  // Extract exercises (basic approach)
  const exerciseKeywords = ['exercise', 'workout', 'training', 'doing'];
  for (const keyword of exerciseKeywords) {
    const index = message.indexOf(keyword);
    if (index !== -1) {
      // Extract text after the keyword to get potential exercises
      const afterKeyword = message.substring(index + keyword.length);
      // Split by common separators and filter out empty items
      const items = afterKeyword.split(/(?:,|and|\n)+/)
        .map(item => item.trim())
        .filter(item => item.length > 2 && !item.startsWith('I') && !item.startsWith('i'));
      
      if (items.length > 0) {
        routineDetails.exercises = [...routineDetails.exercises, ...items.slice(0, 5)]; // Limit to 5 exercises
      }
    }
  }
  
  return routineDetails;
}

module.exports = {
  detectUserChanges
};
