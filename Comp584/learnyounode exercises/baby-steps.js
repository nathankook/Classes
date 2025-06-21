// Initialize sum as 0
let sum = 0;

// Process.argv allows us to access command-line arguments
// Process object has an argv property which is an array containing the entire command line 

// For loop that starts at index 2 (first element is node and second element is path to file)
// If i is less than the length of the arguments passed in
for (let i = 2; i < process.argv.length; i++) {
    // Add the command line argument as a number to the current sum
    sum += Number(process.argv[i]);
}

// Print sum to console
console.log(sum);