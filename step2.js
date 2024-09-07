// step2.js

const fs = require('fs');     // For reading files
const process = require('process'); // For handling command-line arguments and process control
const axios = require('axios'); // For fetching data from a URL

// Function to read a file and print its content
function cat(path) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading ${path}:\n  ${err}`);
            process.exit(1);
        } else {
            console.log(data);
        }
    });
}

// Function to fetch the content from a URL and print it
async function webCat(url) {
    try {
        // Axios fetches the URL and we await the response
        const response = await axios.get(url);
        // Print the content of the URL
        console.log(response.data);
    } catch (err) {
        // If there's an error (like a 404 or no connection), print the error message
        console.error(`Error fetching ${url}:\n  ${err}`);
        process.exit(1);
    }
}

// Get the argument from the command line (either a file path or a URL)
const input = process.argv[2];

// Check if the input looks like a URL (starts with "http:// or https://")
if (input.startsWith('http://') || input.startsWith('https://')) {
    // If it looks like a URL, call webCat
    webCat(input);
} else {
    // Otherwise, treat it as a file path and call cat
    cat(input);
}
