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
            // second element is the min count
            // third element is max count
            // fourth element is the letter
            // fifth element is the password
        const match = line.match(/(\d+)-(\d+) ([a-z]): ([a-z]+)/)

        if (match) {
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt
            const min = parseInt(match[1]);
            const max = parseInt(match[2]);
            const letter = match[3];
            const password = match[4];

            // new RegExp creates a regular expression object dynamically using:
                // letter - the variable containing the character that we are looking for
                // 'g' flag stands for global and tells the regex engine to find all matches
                // https://www.geeksforgeeks.org/what-is-the-role-of-global-regexp-in-javascript/
            // password.match applies the regex to the password string
            const letterCount = (password.match(new RegExp(letter, 'g')) || []).length;

            // If letter count is less than min and more than max
            if (letterCount >= min && letterCount <= max) {
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