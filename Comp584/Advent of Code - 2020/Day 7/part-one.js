// Loads fs module for file system operations
const fs = require('fs');

// Parses the rules and builds a graph of which bags can contain which other bags
function parseRules(input) {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split
    // Split input into individual rules
    const rules = input.trim().split('\n');
    
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
    // Create a map to store which bags can be contained by which other bags
    // This is the reverse of what's in the rules (we want to know which bags can contain shiny gold)
    const canBeContainedBy = new Map();
    
    // Process each rule
    for (const rule of rules) {

        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split
        // Split the rule into container bag and its contents
        const [containerPart, contentsPart] = rule.split(' bags contain ');
    
        // Handle bags that contain no other bags
        if (contentsPart === 'no other bags.') {
            continue;
        }

        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
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
    
        // For each contained bag, add the container to its list of containers
        for (const contentBag of contentBags) {
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/has
            if (!canBeContainedBy.has(contentBag.color)) {
                canBeContainedBy.set(contentBag.color, []);
            }
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get
            canBeContainedBy.get(contentBag.color).push(containerPart);
        }
    }
    return canBeContainedBy;
}

// Counts all bag colors that can eventually contain a shiny gold bag
function countBagsThatCanContainShinyGold(rules) {
    const canBeContainedBy = parseRules(rules);
    
    // Set to track all bag colors that can eventually contain a shiny gold bag
    const canContainShinyGold = new Set();
    
    // Queue for BFS traversal, starting with bags that directly contain shiny gold
    const queue = canBeContainedBy.get('shiny gold') || [];
    
    // Perform BFS to find all bags that can eventually contain a shiny gold bag
    while (queue.length > 0) {
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/shift
        const currentBag = queue.shift();
    
        // If we've already processed this bag, skip it
        if (canContainShinyGold.has(currentBag)) {
            continue;
        }
        
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/add
        // Mark this bag as one that can eventually contain a shiny gold bag
        canContainShinyGold.add(currentBag);
    
        // Add all bags that can contain the current bag to the queue
        if (canBeContainedBy.has(currentBag)) {
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push
            queue.push(...canBeContainedBy.get(currentBag));
        }
    }
    
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/size
    // Return the count of unique bag colors that can eventually contain a shiny gold bag
    return canContainShinyGold.size;
}

// Processes the input file and counts bags that can contain shiny gold
function processInput(filePath) {
    // https://nodejs.org/api/fs.html
    // Read the input file asynchronously
    fs.readFile(filePath, 'utf-8', (err, data) => {
        // Handle errors in file reading
        if (err) {
            console.error('Error reading the file:', err);
            return;
        }
    
        // Count bags that can eventually contain a shiny gold bag
        const result = countBagsThatCanContainShinyGold(data);
    
        // Output the result
        console.log(`Number of bag colors that can eventually contain at least one shiny gold bag: ${result}`);
    });
}

// Define the input file path
const filePath = './input.txt';
// Execute the main function
processInput(filePath);