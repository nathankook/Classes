// Loads fs module for file system operations
// https://nodejs.org/api/fs.html
const fs = require('fs');

// Function to count number of valid passwords
function countValidPasswords(passwords) {
    // Split the input into lines
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/trim
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split
    const lines = passwords.trim().split('\n');

    // Keeps track of number of valid passwords
    let validCount = 0;

    for (const line of lines) {
        // Parse the line using regex
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions
        // match array:
            // first element is full match (original line)
            // second element is the first position
            // third element is second position
            // fourth element is the letter
            // fifth element is the password
        const match = line.match(/(\d+)-(\d+) ([a-z]): ([a-z]+)/)

        if (match) {
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt
            const min = parseInt(match[1]) - 1;
            const pos2 = parseInt(match[2]) - 1;
            const letter = match[3];
            const password = match[4];
            
            // Boolean variables to check if letter is at the positions 1 and 2
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/charAt
            const pos1Match = password.charAt(pos1) === letter;
            const pos2Match = password.charAt(pos2) === letter;

            // XOR condition to check if only one of these positions contains the letter
            if (pos1Match !== pos2Match ) {
                // Increment valid count
                validCount++;
            }
        }
    }
    // Return valid count
    return validCount;
}

// Read and parse the input file
function processInput(filePath) {
    // https://nodejs.org/en/learn/manipulating-files/reading-files-with-nodejs
    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return;
        }
        // Find result
        const result = countValidPasswords(data);
        // Return result to console
        console.log(`Valid passwords: ${result}`);
    });
}

// Set filePath to input.txt
const filePath = './input.txt';
// Execute function
processInput(filePath);