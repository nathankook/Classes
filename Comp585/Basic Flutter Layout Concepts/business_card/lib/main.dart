import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
void main() {
  runApp(const MyApp());
}

// main app widget
class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider(
      create: (context) => AppState(),
      child: MaterialApp(
        title: 'Business Card',
        theme: ThemeData(
          useMaterial3: true,
          colorScheme: ColorScheme.fromSeed(seedColor: Colors.blueGrey)
        ),
        home: Nav(),
      ),
    );
  }
}

// state class for controlling UI
class AppState extends ChangeNotifier {
  // boolean to control whether contact details are visible
  bool showDetails = false;

  // toggles the state of show details
  void toggleDetails() {
    showDetails = !showDetails;
    notifyListeners();
  }
}

// stateful widget that manages navigation between pages
class Nav extends StatefulWidget {
  @override
  State<Nav> createState() => _NavState();
}

class _NavState extends State<Nav> {
  int selectedIndex = 0;

  @override
  Widget build(BuildContext context) {
    Widget page;

    // switch statement to control which page is shown based on the selectedIndex
    switch(selectedIndex) {
      case 0:
        page = BusinessCard();
        break;
      case 1:
        page = ContactInfo();
        break;
      default:
        throw UnimplementedError('no widget for $selectedIndex');
    }

    return LayoutBuilder(
      builder: (context, constraints) {
        return Scaffold(
          body: Row(
            children: [
              SafeArea(
                child: NavigationRail(
                  extended: constraints.maxWidth >= 600,
                  destinations: [
                    NavigationRailDestination(
                      icon: Icon(Icons.person),
                      label: Text('Card'),
                    ),
                    NavigationRailDestination(
                      icon: Icon(Icons.contact_mail),
                      label: Text('Contact'),
                    ),
                  ],
                  selectedIndex: selectedIndex, // highlights the selected tab
                  onDestinationSelected: (index) {
                    setState(() {
                      selectedIndex = index; // updates index when tab is clicked
                    });
                  },
                ),
              ),
              Expanded(
                child: Container(
                  color: Theme.of(context).colorScheme.primaryContainer,
                  child: page,
                ),
              ),
            ],
          ),
        );
      }
    );
  }
}

// widget for displaying business card
class BusinessCard extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    var appState = context.watch<AppState>();

    return Center(
      child: Card(
        elevation: 10,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
        color: Colors.white,
        margin: const EdgeInsets.all(20),
        child: Padding(
          padding: const EdgeInsets.all(20),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              // Profile picture
              const CircleAvatar(
                radius: 50,
                backgroundImage: AssetImage('assets/profilepic.jpg'),
              ),
              const SizedBox(height: 10),

              // Name
              const Text(
                'Nathan Kook',
                style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold),
              ),


              // Job Description
              const Text(
                'Novice Flutter Developer',
                style: TextStyle(fontSize: 16, color: Colors.grey),
              ),

              const SizedBox(height: 10),

              ElevatedButton(
                onPressed: () {
                  appState.toggleDetails();
                },
                child: Text(appState.showDetails ? 'Hide Details' : 'Show Details'),
              ),

              // if showDetails is true, show additional details
              if (appState.showDetails) ...[
                const Divider(),

                // Phone number
                const ListTile(
                  leading: Icon(Icons.phone),
                  title: Text('123-456-7890')
                ),
                
                // Email
                const ListTile(
                  leading: Icon(Icons.email),
                  title: Text('nathankook@example.com'),
                ),
              ]
            ],
          ),
        ),
      ),
    );
  }
}


// widget for displaying contact information page
class ContactInfo extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: const [
          Icon(Icons.phone, size: 50),
          SizedBox(height: 10),
          Text(
            'Phone: 123-456-7890',
            style: TextStyle(fontSize: 18),
          ),
          SizedBox(height: 20),
          Icon(Icons.email, size: 50),
          SizedBox(height: 10),
          Text(
            'Email: nathankook@example.com',
            style: TextStyle(fontSize: 18),
          ),
        ],
      ),
    );
  }
}

