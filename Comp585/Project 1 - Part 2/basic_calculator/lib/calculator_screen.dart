import 'package:flutter/material.dart';
import 'calculator_logic.dart';
import 'history_screen.dart';
import 'button.dart';

// main calculator screen that users interact with
class CalculatorScreen extends StatefulWidget {
  @override
  _CalculatorScreenState createState() => _CalculatorScreenState();
}

// state class for managing calculator operations and UI updates
class _CalculatorScreenState extends State<CalculatorScreen> {
  // manages calculator logic
  final CalculatorLogic _calculatorLogic = CalculatorLogic();

  // handles button clicks
  void _onButtonClick(String value) {
    setState(() {
      _calculatorLogic.processInput(value);
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Calculator"),
        actions: [
          IconButton(
            icon: Icon(Icons.history),
            onPressed: () => Navigator.push(
              context,
              MaterialPageRoute(
                builder: (context) => HistoryScreen(
                  historyList: _calculatorLogic.historyList,
                  clearHistory: () {
                    setState(() {
                      // clears history on user request
                      _calculatorLogic.clearHistory();
                    });
                  },
                ),
              ),
            ),
          ),
        ],
      ),
      body: Column(
        children: [
          Expanded(
            child: Container(
              alignment: Alignment.bottomRight,
              padding: EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.end,
                mainAxisAlignment: MainAxisAlignment.end,
                children: [
                  Text(
                    // displays the ongoing calculation history
                    _calculatorLogic.historyDisplay,
                    style: TextStyle(fontSize: 24, color: Colors.grey),
                  ),
                  Text(
                    // displays the current input and result
                    _calculatorLogic.result,
                    style: TextStyle(fontSize: 48, fontWeight: FontWeight.bold),
                  ),
                ],
              ),
            ),
          ),
          // grid of calculator buttons
          GridView.count(
            shrinkWrap: true,
            crossAxisCount: 4,
            children: [
              '%', '√', 'x²', '1/x',
              'C', 'CE', '⌫', '/',
              '7', '8', '9', 'x',
              '4', '5', '6', '-',
              '1', '2', '3', '+',
              '+/-', '0', '.', '=',
            ].map((text) => CalculatorButton(text, _onButtonClick)).toList(),
          ),
        ],
      ),
    );
  }
}