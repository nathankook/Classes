// Loads fs module for file system operations
const fs = require('fs');

// Decodes a boarding pass to get the seat ID
function getSeatId(boardingPass) {
    // Convert each character to its binary representation
    let binaryString = '';
    
    for (const char of boardingPass) {
        if (char === 'F' || char === 'L') {
            // F (front) and L (left) are equivalent to 0 in binary
            binaryString += '0';
        } else if (char === 'B' || char === 'R') {
            // B (back) and R (right) are equivalent to 1 in binary
            binaryString += '1';
        }
    }

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt
    // Convert the binary string to decimal to get the seat ID
    // The first 7 bits represent the row, and the last 3 bits represent the column
    // Together they form the unique seat ID
    return parseInt(binaryString, 2);
}

// Finds your missing seat ID
function findYourSeat(boardingPasses) {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
    // Convert all boarding passes to seat IDs
    const seatIds = boardingPasses.map(pass => getSeatId(pass));
    
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
    // Sort the seat IDs in ascending order for easier processing
    seatIds.sort((a, b) => a - b);
    
    console.log(`Total number of boarding passes: ${boardingPasses.length}`);
    console.log(`Lowest seat ID: ${seatIds[0]}`);
    console.log(`Highest seat ID: ${seatIds[seatIds.length - 1]}`);
    
    // Look for a gap in the sequence - this will be your seat
    // Your seat has IDs +1 and -1 from yours present in the list
    for (let i = 0; i < seatIds.length - 1; i++) {
        const current = seatIds[i];
        const next = seatIds[i + 1];
    
        // If there's a gap of exactly 2 between consecutive seats,
        // your seat is the one in between (current + 1)
        if (next - current === 2) {
            return current + 1;
        }
    }
    
    // If no gap found, return an error value
    return -1;
}

// Processes input file
function processInput(filePath) {
    // https://nodejs.org/en/learn/manipulating-files/reading-files-with-nodejs
    // Read the input file asynchronously
    fs.readFile(filePath, 'utf-8', (err, data) => {
        // Handle errors in file reading
        if (err) {
            console.error('Error reading the file:', err);
            return;
        }
    
        // Split the input into lines to get individual boarding passes
        const boardingPasses = data.trim().split('\n');
    
        // Find your seat ID by identifying the gap in the sequence
        const yourSeatId = findYourSeat(boardingPasses);
    
        if (yourSeatId === -1) {
            console.log("Could not find your seat. Check the input data.");
        } else {
            console.log(`Your seat ID is: ${yourSeatId}`);
        }
    });
}

// Define the input file path
const filePath = './input.txt';
// Execute the main function to find your seat
processInput(filePath);