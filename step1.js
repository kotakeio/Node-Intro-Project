// step1.js

// Import the 'fs' module for file system operations
const fs = require('fs');
const process = require('process');

// Function to read a file and print its content
function cat(path) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            // If there's an error (like file not found), print the error and stop execution
            console.error(`Error reading ${path}:\n  ${err}`);
            process.exit(1); // Stop the script with a failure code
        } else {
            // If no error, print the file contents
            console.log(data);
        }
    });
}

// Get the file path from the command line arguments (process.argv[2] is the 3rd argument)
const filePath = process.argv[2];

// Call the cat function with the file path from the command line
cat(filePath);
