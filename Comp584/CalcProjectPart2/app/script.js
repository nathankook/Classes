// Display and button elements 
const display = document.querySelector('.display p');
const buttons = document.querySelectorAll('button');

// Variables to store calculator state
let currInput = '0';
let prevInput = '0';
let operation = null;
let reset = false;

// Add click event listeners to all buttons
buttons.forEach(button => {
  button.addEventListener('click', () =>  {
    // Get value of clicked button
    const value = button.textContent;
    
    // Handle different button types
    if (value === 'C') {
      clearCalc();
    } else if (value === '←') {
      deleteLast();
    } else if (['+', '-', 'x', '/'].includes(value)) {
      opInput(value);
    } else if (value === '=') {
      calculateResult();
    } else if (value >= '0' && value <= '9') {
      numInput(value);
    } else if (value === '%') {
      calcPercentage();
    } else if (value === '1/x') {
      calcReciprocal();
    } else if (value === 'x²') {
      calcSquare();
    } else if (value === '√x') {
      calcSquareRoot();
    } else if (value === '+/-') {
      toggleSign();
    }
    
    updateDisplay();
  });
});

// Function to handle number input
function numInput(num) {
  if (currInput === '0' || reset) {
    currInput = num;
    reset = false;
  } else {
    currInput += num;
  }
}

// Function to handle operation input
function opInput(op) {
  // If there's already an operation, calculate result first
  if (operation !== null && prevInput !== '') {
    calculateResult();
  }
  
  prevInput = currInput;
  operation = op;
  reset = true;
}

// Function to clear calculator and reset variables to initial state
function clearCalc() {
  currInput = '0';
  prevInput = '0';
  operation = null;
  reset = false;
  
}

// Function to delete last entry in calculator
function deleteLast() {
  if (currInput.length === 1) {
    currInput = '0';
  } else {
    currInput = currInput.slice(0,-1);
  }
}

// Function to calculate result
function calculateResult() {
  if (operation === null || prevInput === '') {
    return;
  }
  
  // variable to store result
  let result;
  // parse input curr and prev input as float (string -> float)
  const prev = parseFloat(prevInput);
  const curr = parseFloat(currInput);
  
  switch (operation) {
    case '+':
      result = prev + curr;
      break;
    case '-':
      result = prev - curr;
      break;
    case 'x':
      result = prev * curr;
      break;
    case '/':
      result = prev / curr;
      break;
    default:
      return;
  }
  
  // Handle division by zero error
  if (!isFinite(result)) {
    currInput = 'Error';
  } else {
    // Convert to string and remove trailing zeros for decimal numbers
    currInput = result.toString();
  }
  
  operation = null;
  prevInput = '';
}

// Function to calculate percentage
function calcPercentage() {
  if (currInput === '0' || currInput === 'Error') {
    return;
  }
  
  const value = parseFloat(currInput);
  
  // If no ongoing operation, then just convert to percentage
  if (operation === null || prevInput === '') {
    currInput = (value / 100).toString();
  // If there is an ongoing operation, calculate percentage of previous value
  } else {
    const prev = parseFloat(prevInput);
    
    switch (operation) {
      // For addition and subtraction, calculate percentage of previous value
      case '+':
      case '-':
        currInput = (prev * value / 100).toString();
        break;
      // For multiplication and division, just convert to percentage
      case 'x':
      case '/':
        currInput = (value / 100).toString();
        break;
    }
  }
}

// Function to calculate reciprocal
function calcReciprocal() {
  if (currInput === '0' || currInput === 'Error') {
    currInput = 'Error';
    return;
  }
  
  const value = parseFloat(currInput);
  const result = 1 / value;
  
  // Handle division by zero error
  if (!isFinite(result)) {
    currInput = 'Error';
  } else {
    // Convert to string and remove trailing zeros for decimal numbers
    currInput = result.toString();
  }
}

// Function to calculate square
function calcSquare() {
  if (currInput === 'Error') {
    return;
  }
  
  const value = parseFloat(currInput);
  // Result is just currInput * currInput
  const result = value * value;
  
  if (!isFinite(result)) {
    currInput = 'Error';
  } else {
    currInput = result.toString();
  }
}

// Function to calculate square root
function calcSquareRoot() {
  if (currInput === 'Error') {
    return;
  }
  
  const value = parseFloat(currInput);
  // Handles square root of negative number
  if (value < 0) {
    currInput = 'Error';
  // Math.sqrt to calculate square root of numbers > 0
  } else {
    const result = Math.sqrt(value);
    currInput = result.toString();
  }
}

// Function to toggle sign
function toggleSign() {
  if (currInput === '0' || currInput === 'Error') {
    return;
  }
  
  const value = parseFloat(currInput);
  // value is toggled by setting it to -value
  currInput = (-value).toString();
  
}

// Function to update calculator display
function updateDisplay() {
  display.textContent = currInput;
}