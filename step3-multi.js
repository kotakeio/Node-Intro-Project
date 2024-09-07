// step3-multi.js

const fs = require('fs');
const process = require('process');
const axios = require('axios');

// Function to read a file and print or write its content
function cat(path, writeToFile = null) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading ${path}:\n  ${err}`);
            process.exit(1);
        } else if (writeToFile) {
            writeFile(writeToFile, data);
        } else {
            console.log(data);
        }
    });
}

// Function to fetch content from a URL and print or write it
async function webCat(url, writeToFile = null) {
    try {
        const response = await axios.get(url);
        if (writeToFile) {
            writeFile(writeToFile, response.data);
        } else {
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
let pathStartIndex;
let writeToFile = null;

if (process.argv[2] === '--out') {
    writeToFile = process.argv[3]; // output file path
    pathStartIndex = 4; // files/URLs start after the 4th argument
} else {
    pathStartIndex = 2; // files/URLs start from the 2nd argument
}

// Loop through all the file paths or URLs provided in the command-line arguments
for (let i = pathStartIndex; i < process.argv.length; i++) {
    let currentPath = process.argv[i];

    // Check if the current path is a URL
    if (currentPath.startsWith('http://') || currentPath.startsWith('https://')) {
        webCat(currentPath, writeToFile);  // Handle URLs
    } else {
        cat(currentPath, writeToFile);     // Handle file paths
    }
}
