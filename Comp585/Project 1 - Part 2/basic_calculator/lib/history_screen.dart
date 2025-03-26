import 'package:flutter/material.dart';

// Stateless widget to display the calculation history
class HistoryScreen extends StatelessWidget {
  // List to store calculation history
  final List<String> historyList;
  // function to clear the history
  final VoidCallback clearHistory;

  HistoryScreen({required this.historyList, required this.clearHistory});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("Calculation History")),
      body: Column(
        children: [
          Expanded(
            // Display a message if there is no history
            child: historyList.isEmpty
                ? Center(child: Text("No history available."))
                // Display a scrollable list of history items
                : ListView.builder(
                    itemCount: historyList.length,
                    itemBuilder: (context, index) {
                      return ListTile(
                        title: Text(historyList[index]),
                      );
                    },
                  ),
          ),
          // Button to clear history
          ElevatedButton(
            onPressed: () {
              clearHistory();
              Navigator.pop(context);
            },
            child: Text("Clear History"),
          ),
        ],
      ),
    );
  }
}