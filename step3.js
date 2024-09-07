// step3.js

const fs = require('fs');       // For reading files and writing to files
const process = require('process'); // For handling command-line arguments and process control
const axios = require('axios');  // For fetching data from a URL

// Function to read a file and print or write its content
function cat(path, writeToFile = null) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading ${path}:\n  ${err}`);
            process.exit(1);
        } else if (writeToFile) {
            // Write content to a file if --out is specified
            writeFile(writeToFile, data);
        } else {
            // Print the content to the console if no --out option
            console.log(data);
        }
    });
}

// Function to fetch content from a URL and print or write it
async function webCat(url, writeToFile = null) {
    try {
        const response = await axios.get(url);
        if (writeToFile) {
            // Write content to a file if --out is specified
            writeFile(writeToFile, response.data);
        } else {
            // Print content to the console if no --out option
            console.log(response.data);
        }
    } catch (err) {
        console.error(`Error fetching ${url}:\n  ${err}`);
        process.exit(1);
    }
}

// Function to write content to a file and handle any write errors
function writeFile(path, content) {
    fs.writeFile(path, content, 'utf8', (err) => {
        if (err) {
            console.error(`Couldn't write ${path}:\n  ${err}`);
            process.exit(1);
        }
    });
}

// Determine if there's an --out option
let path;
let writeToFile = null;

if (process.argv[2] === '--out') {
    // If --out is the first argument, the next argument is the output file path
    writeToFile = process.argv[3];
    // The file path or URL is the 4th argument
    path = process.argv[4];
} else {
    // If no --out, the path is just the 2nd argument
    path = process.argv[2];
}

// Check if the path is a URL or a file path
if (path.startsWith('http://') || path.startsWith('https://')) {
    webCat(path, writeToFile);  // Call webCat for URLs
} else {
    cat(path, writeToFile);     // Call cat for file paths
}
