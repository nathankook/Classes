import 'package:flutter/material.dart';
import 'calculator_screen.dart';

// serves as main entry point of the Flutter app
void main() {
  runApp(CalculatorApp());
}

// main application widget
class CalculatorApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Calculator',
      theme: ThemeData.dark(),
      home: CalculatorScreen(),
    );
  }
}