const fs = require('fs').promises;
const path = require('path');

/**
 * Updates user preferences in JSON file based on detected changes
 * @param {Object} changes - Object containing detected changes
 * @returns {Promise<void>}
 */
async function updateUserPreferences(changes) {
  try {
    // Use a single user.json file for all user data
    const fileName = 'user.json';
    const filePath = path.join(process.cwd(), fileName);
    
    // Try to read existing file
    let userData = {};
    try {
      const fileData = await fs.readFile(filePath, 'utf8');
      userData = JSON.parse(fileData);
    } catch (error) {
      // File doesn't exist or is invalid JSON, create a new one
      console.log(`Creating new ${fileName} file`);
      userData = {
        diet: { current: {}, history: [] },
        routine: { current: {}, history: [] }
      };
    }

    // Ensure the structure exists
    if (!userData.diet) userData.diet = { current: {}, history: [] };
    if (!userData.routine) userData.routine = { current: {}, history: [] };
    
    // Determine which section to update
    const section = changes.changeType === 'diet' ? 'diet' : 'routine';
    
    // Add new entry to history
    if (!userData[section].history) {
      userData[section].history = [];
    }
    
    userData[section].history.unshift(changes.details);
    
    // Keep history to a reasonable size
    if (userData[section].history.length > 10) {
      userData[section].history = userData[section].history.slice(0, 10);
    }
    
    // Update current preferences
    userData[section].current = changes.details;
    
    // Write back to file
    await fs.writeFile(filePath, JSON.stringify(userData, null, 2), 'utf8');
    console.log(`Updated ${fileName} with new ${changes.changeType} preferences`);
    
    return true;
  } catch (error) {
    console.error(`Error updating user preferences: ${error.message}`);
    throw error;
  }
}

module.exports = {
  updateUserPreferences
};
