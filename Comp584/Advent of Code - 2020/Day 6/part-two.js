// Loads fs module for file system operations
const fs = require('fs');

// Counts questions to which EVERYONE answered "yes" in each group and sums them
function countEveryoneYesAnswers(input) {
    // Split input into groups (separated by blank lines)
    const groups = input.trim().split('\n\n');
    console.log(`Total number of groups: ${groups.length}`);

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
    // Process each group to count questions where everyone answered "yes"
    const counts = groups.map((group) => {
        // Split group into individual person's answers
        const personAnswers = group.split('\n');
    
        // If there's only one person, all of their "yes" answers count
        if (personAnswers.length === 1) {
            return personAnswers[0].length;
        }
        
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
        // Initialize with all possible answers from the first person
        const firstPersonAnswers = new Set(personAnswers[0]);
    
        // Intersect with each subsequent person's answers
        // Only keep answers that everyone has in common
        for (let i = 1; i < personAnswers.length; i++) {
            const currentAnswers = new Set(personAnswers[i]);
        
            // Remove answers from our tracking set that aren't in current person's answers
            for (const answer of firstPersonAnswers) {
                if (!currentAnswers.has(answer)) {
                    firstPersonAnswers.delete(answer);
                }
            }
            
            // Early exit if we already have no common answers
            if (firstPersonAnswers.size === 0) {
                break;
            }
        }
    
        // Count answers where everyone said "yes"
        return firstPersonAnswers.size;
    });

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
    // Sum all the counts to get the total
    const sum = counts.reduce((total, count) => total + count, 0);
    return sum;
}

// Processes the input file and counts the sum of "everyone yes" answers
function processInput(filePath) {
    // https://nodejs.org/en/learn/manipulating-files/reading-files-with-nodejs
    // Read the input file asynchronously
    fs.readFile(filePath, 'utf-8', (err, data) => {
        // Handle errors in file reading
        if (err) {
            console.error('Error reading the file:', err);
            return;
        }
    
        // Count questions where everyone answered "yes"
        const result = countEveryoneYesAnswers(data);
    
        // Output the result
        console.log(`Sum of questions to which everyone answered "yes" across all groups: ${result}`);
    });
}

// Define the input file path
const filePath = './input.txt';
// Execute the main function
processInput(filePath);