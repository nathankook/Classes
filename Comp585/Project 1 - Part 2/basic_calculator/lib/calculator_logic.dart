import 'dart:math'; // Importing math library for mathematical operations like square root

class CalculatorLogic {
  // Variables to store the input, result, and calculation history
  String input = "";
  String result = "0";
  String historyDisplay = "";

  // Variables to store operands and operator
  double? operand1;
  double? operand2;
  String? operator;

  // Flag to determine if input should be reset
  bool shouldResetInput = false;

  // List to keep track of calculation history
  List<String> historyList = [];

  // Method to process user input (numbers, operators, functions)
  void processInput(String value) {
    if (value == "C") {
      // Clear all calculator data
      resetCalculator();
    } else if (value == "CE") {
      // Clear only the current input without affecting previous calculations
      input = "";
      result = "0";
    } else if (value == "⌫") {
      // Handle backspace functionality
      if (input.isNotEmpty) {
        input = input.substring(0, input.length - 1);
        result = input.isEmpty ? "0" : input;
      }
    } else if (value == "=") {
      // When "=" is pressed, perform the calculation if possible
      if (operator != null && operand1 != null) {
        if (input.isNotEmpty) {
          operand2 = double.tryParse(input) ?? operand2;
        }
        calculate();
        operator = null; // Reset operator after calculation
      }
    } else if (["+", "-", "x", "/"].contains(value)) {
      // Handling arithmetic operators
      if (operand1 == null) {
        // If no previous operand, parse the current input as operand1
        operand1 = double.tryParse(input) ?? 0;
      } else if (!shouldResetInput) {
        // Prevents immediate calculation if pressing operator after "="
        if (input.isNotEmpty) {
          operand2 = double.tryParse(input) ?? 0;
          calculate();
        }
      }
      
      operator = value; // Store the selected operator
      historyDisplay = "$operand1 $operator";
      shouldResetInput = true;
      input = ""; // Clear input for the next number entry
    } else if (value == "+/-") {
      // Toggle sign of the input value
      if (input.isNotEmpty) {
        double num = double.tryParse(input) ?? 0;
        num = -num;
        input = num.toString();
        result = input;
      }
    } else if (value == "%") {
      // Percentage operation
      double num = double.tryParse(input) ?? 0;
      if (operand1 != null && operator != null) {
        operand2 = (operand1! * num) / 100; // Calculate percentage based on operand1
        result = operand2.toString();
        historyDisplay = "$operand1 $operator $input%";
      } else {
        result = (num / 100).toString();
        historyDisplay = "$input% = $result";
      }
      input = result;
      shouldResetInput = true;
    } else if (value == "√") {
      double num = double.tryParse(input) ?? 0;
      result = num >= 0 ? sqrt(num).toString() : "Error";
      historyDisplay = "√($input) = $result";
      operand1 = double.tryParse(result) ?? operand1; // Store result for continuous calculations
      shouldResetInput = true;
    } else if (value == "x²") {
      double num = double.tryParse(input) ?? 0;
      result = (num * num).toString();
      historyDisplay = "$input² = $result";
      operand1 = double.tryParse(result) ?? operand1;
      shouldResetInput = true;
    } else if (value == "1/x") {
      double num = double.tryParse(input) ?? 0;
      result = num != 0 ? (1 / num).toString() : "Error";
      historyDisplay = "1/$input = $result";
      operand1 = double.tryParse(result) ?? operand1;
      shouldResetInput = true;
    } else {
      // Handling number and decimal inputs
      if (shouldResetInput) {
        input = ""; // Reset input for a new number entry
        shouldResetInput = false;
      }
      input += value;
      result = input;

      // Update history display if an operator is already selected
      if (operator != null) {
        historyDisplay = "$operand1 $operator $input";
      }
    }
  }

  // Method to perform arithmetic calculations
  void calculate() {
    if (operand1 != null && operator != null) {
      operand2 ??= operand1; // If "=" is pressed multiple times, reuse last operand2
      double calculation = 0;

      // Perform the calculation based on the operator
      switch (operator) {
        case "+":
          calculation = operand1! + operand2!;
          break;
        case "-":
          calculation = operand1! - operand2!;
          break;
        case "x":
          calculation = operand1! * operand2!;
          break;
        case "/":
          if (operand2 != 0) {
            calculation = operand1! / operand2!;
          } else {
            result = "Error"; // Prevent division by zero
            return;
          }
          break;
      }

      result = calculation.toString();
      historyDisplay = "$operand1 $operator $operand2 = $result";
      historyList.add(historyDisplay); // Save the operation in history

      // Store result for continuous calculations
      operand1 = calculation;
      operand2 = null;
      shouldResetInput = true;
    }
  }

  // Method to reset the calculator
  void resetCalculator() {
    input = "";
    result = "0";
    historyDisplay = "";
    operand1 = operand2 = null;
    operator = null;
    shouldResetInput = false;
  }

  // Method to clear the calculation history
  void clearHistory() {
    historyList.clear();
  }
}
