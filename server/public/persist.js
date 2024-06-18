const fs = require('fs-extra');
const path = require('path');

// Path to the JSON file
const jsonFilePath = path.join(__dirname, 'JSON', 'data.json');

// Helper function to read member data from JSON file
function readMembersFromFile() {
    try {
        const data = fs.readJsonSync(jsonFilePath);
        return data.members || [];
    } catch (error) {
        console.error('Error reading JSON file:', error);
        return [];
    }
}

// Helper function to write member data to JSON file
function writeMembersToFile(members) {
    try {
        fs.writeJsonSync(jsonFilePath, { members });
    } catch (error) {
        console.error('Error writing to JSON file:', error);
    }
}

module.exports = {readMembersFromFile, writeMembersToFile}
