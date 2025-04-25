/**
 * Formats workout data as context for the Llama model
 * @param {Array} workoutData - Array of workout data objects
 * @returns {string} - Formatted context string
 */
function buildWorkoutContext(workoutData) {
  if (!workoutData || !workoutData.length) {
    return '';
  }

  // Create a concise summary of available workout data
  let context = "Available workout information from megaGymDataset:\n";
  
  // Get column names from the first entry
  const columns = Object.keys(workoutData[0]);
  context += `Available data fields: ${columns.join(', ')}\n\n`;
  
  // Count workout types if such a column exists
  if (columns.includes('type') || columns.includes('category')) {
    const typeField = columns.includes('type') ? 'type' : 'category';
    const workoutTypes = new Set(workoutData.map(workout => workout[typeField]));
    context += `Types of workouts: ${Array.from(workoutTypes).join(', ')}\n\n`;
  }
  
  // Add some example workouts (limiting to avoid making context too long)
  const exampleCount = Math.min(5, workoutData.length);
  context += `Examples of ${exampleCount} workouts:\n`;
  
  for (let i = 0; i < exampleCount; i++) {
    const workout = workoutData[i];
    const workoutInfo = Object.entries(workout)
      .map(([key, value]) => `${key}: ${value}`)
      .join(', ');
    context += `- ${workoutInfo}\n`;
  }
  
  context += `\nTotal workout database entries: ${workoutData.length}\n`;
  
  return context;
}

module.exports = {
  buildWorkoutContext
};
