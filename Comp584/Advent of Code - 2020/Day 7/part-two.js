// Loads fs module for file system operations
const fs = require('fs');

// Parses the rules and builds a graph of what bags contain what other bags
function parseRules(input) {
    // Split input into individual rules
    const rules = input.trim().split('\n');
    
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
    // Create a map to store which bags are contained in each bag and in what quantity
    const containsMap = new Map();
    
    // Process each rule
    for (const rule of rules) {
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split
        // Split the rule into container bag and its contents
        const [containerPart, contentsPart] = rule.split(' bags contain ');
        
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
        // Initialize the container's contents as an empty array
        containsMap.set(containerPart, []);
    
        // Handle bags that contain no other bags
        if (contentsPart === 'no other bags.') {
            continue;
        }
    
        // Parse the contents part to extract each contained bag and its quantity
        const contentBags = contentsPart.split(', ').map(part => {
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions
            // Extract quantity and color using regex
            const match = part.match(/^(\d+) (.+?) bags?\.?$/);
            if (match) {
                return {
                    quantity: parseInt(match[1], 10),
                    color: match[2]
                };
            }
            return null;
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
        }).filter(bag => bag !== null);

        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
        // Add the contents to the container's entry in the map
        containsMap.set(containerPart, contentBags);
    }
    
    return containsMap;
}

// Recursively counts the total number of bags inside a given bag color
function countBagsInside(bagColor, containsMap, memo = new Map()) {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/has
    // If we've already calculated this bag's contents, return the memoized result
    if (memo.has(bagColor)) {
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get
        return memo.get(bagColor);
    }
    
    // Get the contents of this bag
    const contents = containsMap.get(bagColor) || [];
    
    // If this bag contains no other bags, return 0
    if (contents.length === 0) {
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
        memo.set(bagColor, 0);
        return 0;
    }
    
    // Calculate the total number of bags inside this one
    let total = 0;
    for (const { quantity, color } of contents) {
        // Each contained bag counts as 1 bag, plus all the bags inside it
        total += quantity + (quantity * countBagsInside(color, containsMap, memo));
    }
    
    // Memoize the result to avoid recalculating
    memo.set(bagColor, total);
    return total;
}

// Processes the input file and counts bags inside a shiny gold bag
function processInput(filePath) {
    // https://nodejs.org/api/fs.html
    // Read the input file asynchronously
    fs.readFile(filePath, 'utf-8', (err, data) => {
        // Handle errors in file reading
        if (err) {
            console.error('Error reading the file:', err);
            return;
        }
    
        // Parse the rules
        const containsMap = parseRules(data);
        
        // Count the total number of bags inside a shiny gold bag
        const result = countBagsInside('shiny gold', containsMap);
        
        // Output the result
        console.log(`Number of individual bags required inside a single shiny gold bag: ${result}`);
    });
}

// Define the input file path
const filePath = './input.txt';
// Execute the main function
processInput(filePath);