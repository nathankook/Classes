import 'package:flutter/material.dart';

// stateless widget that represents individual buttons
class CalculatorButton extends StatelessWidget {
  // text on button
  final String label;
  //function to execute when button is clicked
  final Function(String) onTap;
  // initializes button
  CalculatorButton(this.label, this.onTap);

  // button styling
  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () => onTap(label),
      child: Container(
        margin: EdgeInsets.all(4),
        decoration: BoxDecoration(
          color: Colors.grey[850],
          borderRadius: BorderRadius.circular(10),
        ),
        child: Center(
          child: Text(
            label,
            style: TextStyle(fontSize: 24, color: Colors.white),
          ),
        ),
      ),
    );
  }
}
