const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

/**
 * Reads workout data from the megaGymDataset.csv file in the root directory
 * @returns {Promise<Array>} - Promise resolving to array of workout data objects
 */
function readWorkoutCSV() {
  return new Promise((resolve, reject) => {
    const results = [];
    // Using the specific CSV filename mentioned by the user
    const filePath = path.join(process.cwd(), 'megaGymDataset.csv');
    
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => {
        console.log(`Successfully loaded ${results.length} workout entries from megaGymDataset.csv`);
        resolve(results);
      })
      .on('error', (error) => {
        console.error(`Error reading megaGymDataset.csv: ${error.message}`);
        reject(error);
      });
  });
}

module.exports = {
  readWorkoutCSV
};
