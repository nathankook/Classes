// Loads fs module for file system operations
const fs = require('fs');

// Counts unique "yes" answers for each group and sums them
function countYesAnswers(input) {
    // Split input into groups (separated by blank lines)
    // Each group represents all the answers from people in that group
    const groups = input.trim().split('\n\n');
    
    console.log(`Total number of groups: ${groups.length}`);
    
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
    // Process each group to count unique "yes" answers
    const counts = groups.map((group, index) => {
        // Split group into individual person's answers
        // Each line represents one person's answers
        const personAnswers = group.split('\n');
        
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
        // Create a Set to track unique "yes" answers in this group
        // Using a Set automatically handles duplicates
        const uniqueYesAnswers = new Set();
    
        // Process each person's answers
        for (const answers of personAnswers) {
            // Each character in the string represents a "yes" answer to that question
            // For example, "abc" means the person answered "yes" to questions a, b, and c
            for (const answer of answers) {
                // Add this answer to our Set
                uniqueYesAnswers.add(answer);
            }
        }
    
        // Count unique "yes" answers for this group
        // This is simply the size of our Set
        const count = uniqueYesAnswers.size;
        
        return count;
    });
    
    // Sum all the counts to get the total
    const sum = counts.reduce((total, count) => total + count, 0);
    
    return sum;
}

// Processes the input file and counts the sum of unique "yes" answers
function processInput(filePath) {
    // https://nodejs.org/en/learn/manipulating-files/reading-files-with-nodejs
    // Read the input file asynchronously
    fs.readFile(filePath, 'utf-8', (err, data) => {
        // Handle errors in file reading
        if (err) {
            console.error('Error reading the file:', err);
            return;
        }
    
        // Count unique "yes" answers
        const result = countYesAnswers(data);
        
        // Output the result
        console.log(`Sum of unique "yes" answers across all groups: ${result}`);
    });
}

// Define the input file path
const filePath = './input.txt';
// Execute the main function
processInput(filePath);