// Loads fs module for file system operations
const fs = require('fs');

// Function to check valid passports
function validatePassports(input) {
  // Split the input into individual passports (separated by blank lines)
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split
  const passports = input.split('\n\n');

  // Define required fields (excluding cid which is optional)
  const requiredFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];

  // Count valid passports
  let validCount = 0;

  // Process each passport
  for (const passport of passports) {
    // Replace newlines with spaces to handle multi-line passports
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace
    const normalizedPassport = passport.replace(/\n/g, ' ');
    
    // Extract all fields from the passport
    const fields = {};
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split
    // Splits the passport string at spaces into an array of field strings
    // Iterates through each field string in the array
    normalizedPassport.split(' ').forEach(field => {
      // Checks if the field string is not empty
      if (field) {
        // Splits the field string at the colon into key and value
        const [key, value] = field.split(':');
        //Adds the key-value pair to the fields object
        fields[key] = value;
      }
    });
    
    // Check if all required fields are present
    const isValid = requiredFields.every(field => field in fields);
    
    // If is valid is true
    if (isValid) {
      // Update valid count
      validCount++;
    }
  }
  
  // Return valid count
  return validCount;
}

// Read and parse the input file
function processInput (filePath) {
    // https://nodejs.org/en/learn/manipulating-files/reading-files-with-nodejs
    // Read file asynchronously
    fs.readFile(filePath, 'utf-8', (err, data) => {
        // Error when reading input file
        if (err) {
            console.error('Error reading the file:', err);
            return;
        }
        
        // Find result
        const result = validatePassports(data);

        // Return result to console
        console.log(`# of valid passports: ${result}`);
    });
}

// Set filePath to input.txt
const filePath = './input.txt';
// Execute function
processInput(filePath);