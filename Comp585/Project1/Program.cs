using System;

class Calculator
{
    static void Main()
    {
        // Stores the current result of calculations
        double result = 0;

        // Flag to check if it is the first input
        bool firstNum = true;

        // Stores the operator selected
        char op = ' ';

        // Display menu prompt
        Console.WriteLine("Welcome to Basic Calculator");
        Console.WriteLine("===========================");
        Console.WriteLine();
        Console.WriteLine("Enter numbers and operators (+ for addition, - for subtraction, * for multiplication, / for division, ^ for power).");
        Console.WriteLine("Press '=' to compute. Type 'C' to clear or 'Q' to quit.");
        Console.WriteLine();

        // Infinite loop to perform continuous calculations
        while (true)
        {
            // Prompts user to enter number and stores into string
            Console.Write("\nEnter a number: ");
            string input = Console.ReadLine();

            // If user wants to quit calculator, exit loop
            if (input.ToUpper() == "Q")
            {
                break;
            }

            // If user wants to clear calculator, set variables to initial state and restart loop
            if (input.ToUpper() == "C")
            {
                firstNum = true;
                result = 0;
                op = ' ';
                Console.WriteLine("\nCalculator cleared. Result reset to 0.");
                continue;
            }

            // Check if entered input is valid number; if not, restart loop
            if (!double.TryParse(input, out double num))
            {
                Console.WriteLine("That is not a valid number. Try again.");
                continue;
            }

            // If number input is first input, store it as the initial result
            if (firstNum)
            {
                result = num;
                firstNum = false;
            }
            else
            {
                // Perform the calculation w/ last operator entered
                result = Calculate(result, num, op);
                Console.WriteLine($"Current Result: {result}");
            }

            // Infinite loop to ensure that user enters valid operator
            while (true)
            {
                // Prompts user to enter operator
                Console.Write("\nEnter operator (+, -, *, /, ^) or '=' to compute: ");
                op = Console.ReadKey().KeyChar;
                Console.WriteLine();

                // Check if user entered valid operator
                if ("+-*/^=".Contains(op))
                {
                    break;
                }
                else
                {
                    Console.WriteLine("Invalid operator. Please only enter +, -, *, /, ^, or =. ");
                }
            }


            // If user enters '=', display final result and reset for new calculation
            if (op == '=')
            {
                Console.WriteLine($"Final result: {result}");
                firstNum = true;
            }
        }
        // When user quits, program exits
        Console.WriteLine("Goodbye!");
    }

    static double Calculate(double num1, double num2, char op)
    {
        // Switch statement that returns calculation based on operator
        switch (op)
        {
            case '+':
                return num1 + num2; // Addition
            case '-':
                return num1 - num2; // Subtraction
            case '*':
                return num1 * num2; // Multiplication
            case '/':
                if (num2 != 0)
                {
                    return num1 / num2; // Division (prevents division by 0)
                }
                else
                {
                    Console.WriteLine("Error: Cannot divide by 0.");
                    return num1;
                }
            case '^':
                return Math.Pow(num1, num2); // Exponentiation
            default:
                Console.WriteLine("Invalid operator.");
                return num1;
        }
    }
}