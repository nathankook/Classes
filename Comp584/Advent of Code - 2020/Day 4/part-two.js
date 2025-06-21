// Loads fs module for file system operations
const fs = require('fs');

// Validates passports according to specific field requirements
function validatePassports(input) {
    // Split the input into individual passports (separated by blank lines)
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split
    const passports = input.split('\n\n');

    // Define required fields (excluding cid which is optional)
    const requiredFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];

    // Validation functions for each field
    // Each validator takes a field value and returns true if valid, false otherwise
    const validators = {
        // Birth Year - four digits; at least 1920 and at most 2002
        byr: (value) => {
            // Convert string to integer with base 10
            const year = parseInt(value, 10);
            // Check that it's 4 digits and within valid range
            return value.length === 4 && year >= 1920 && year <= 2002;
        },
    
        // Issue Year - four digits; at least 2010 and at most 2020
        iyr: (value) => {
            const year = parseInt(value, 10);
            return value.length === 4 && year >= 2010 && year <= 2020;
        },
    
        // Expiration Year - four digits; at least 2020 and at most 2030
        eyr: (value) => {
            const year = parseInt(value, 10);
            return value.length === 4 && year >= 2020 && year <= 2030;
        },
    
        // Height - a number followed by either cm or in
        // If cm, the number must be at least 150 and at most 193
        // If in, the number must be at least 59 and at most 76
        hgt: (value) => {
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions
            // Use regex to extract the numeric part and unit part
            // Matches pattern: (digits)(cm or in)
            const match = value.match(/^(\d+)(cm|in)$/);

            // If no match found, the format is invalid
            if (!match) return false;

            // Extract and parse the numeric height value
            const height = parseInt(match[1], 10);
            // Extract the unit (cm or in)
            const unit = match[2];

            // Apply different validation rules based on unit
            if (unit === 'cm') {
                return height >= 150 && height <= 193;
            } else if (unit === 'in') {
                return height >= 59 && height <= 76;
            }

            // If unit is neither cm nor in, invalid
            return false;
        },
    
        // Hair Color - a # followed by exactly six characters 0-9 or a-f
        hcl: (value) => {
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions
            // Use regex to validate the format
            // # followed by exactly 6 hexadecimal digits
            return /^#[0-9a-f]{6}$/.test(value);
        },
    
        // Eye Color - exactly one of: amb blu brn gry grn hzl oth
        ecl: (value) => {
            // List of valid eye colors
            const validColors = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'];
            // Check if value is in the list
            return validColors.includes(value);
        },
    
        // Passport ID - a nine-digit number, including leading zeroes
        pid: (value) => {
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions
            // Use regex to validate format
            // Exactly 9 digits (0-9)
            return /^[0-9]{9}$/.test(value);
        },
    
        // Country ID - ignored, missing or not
        // Always returns true since this field is optional
        cid: () => true
        };

    // Counter for valid passports
    let validCount = 0;

    // Process each passport in the input
    for (const passport of passports) {
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace
        // Normalize passport data by replacing newlines with spaces
        // This handles multi-line passports and makes processing uniform
        const normalizedPassport = passport.replace(/\n/g, ' ');
    
        // Extract and organize all fields from the passport
        // Create an object where keys are field names and values are field values
        const fields = {};
    
        // Split passport data by spaces to get individual field entries
        normalizedPassport.split(' ').forEach(field => {
            // Skip empty fields (in case of extra spaces)
            if (field) {
                // Split each field at the colon to separate key from value
                // Example: "ecl:gry" becomes key="ecl", value="gry"
                const [key, value] = field.split(':');
                
                // Store in the fields object for easy lookup
                fields[key] = value;
            }
        });
    
        // Validate the passport - check if all required fields are present AND valid
        // Use the 'every' method to ensure ALL required fields meet both conditions
        const isValid = requiredFields.every(field => {
            // Check: 1) field exists in the passport AND 2) it passes its validator function
            return field in fields && validators[field](fields[field]);
        });
    
        // If the passport is valid, increment our counter
        if (isValid) {
            validCount++;
        }
    }

    // Return the total count of valid passports
    return validCount;
}

// Reads input file and processes passport data
function processInput(filePath) {
    // https://nodejs.org/en/learn/manipulating-files/reading-files-with-nodejs
    // Read file asynchronously
    fs.readFile(filePath, 'utf-8', (err, data) => {
        // Handle errors in file reading
        if (err) {
            console.error('Error reading the file:', err);
            return;
        }
    
        // Process the input and get the result
        const result = validatePassports(data);
        
        // Output the result to console
        console.log(`# of valid passports: ${result}`);
    });
}

// Define the input file path
const filePath = './input.txt';
// Execute the main function to start processing
processInput(filePath);