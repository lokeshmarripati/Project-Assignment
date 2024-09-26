import 'package:flutter/material.dart';
import 'package:flutter_local_notifications/flutter_local_notifications.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Simple Reminder App',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: ReminderScreen(),
    );
  }
}

class ReminderScreen extends StatefulWidget {
  @override
  _ReminderScreenState createState() => _ReminderScreenState();
}

class _ReminderScreenState extends State<ReminderScreen> {
  FlutterLocalNotificationsPlugin flutterLocalNotificationsPlugin;
  
  String _selectedDay;
  TimeOfDay _selectedTime;
  String _selectedActivity;
  
  final List<String> _daysOfWeek = [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
  ];
  
  final List<String> _activities = [
    'Wake up', 'Go to gym', 'Breakfast', 'Meetings', 'Lunch', 'Quick nap', 
    'Go to library', 'Dinner', 'Go to sleep'
  ];

  @override
  void initState() {
    super.initState();
    flutterLocalNotificationsPlugin = FlutterLocalNotificationsPlugin();
    var initializationSettingsAndroid = AndroidInitializationSettings('@mipmap/ic_launcher');
    var initializationSettings = InitializationSettings(android: initializationSettingsAndroid);
    flutterLocalNotificationsPlugin.initialize(initializationSettings);
  }

  Future<void> _scheduleNotification() async {
    var time = Time(_selectedTime.hour, _selectedTime.minute, 0);
    
    var androidDetails = AndroidNotificationDetails('reminder', 'Daily Reminder', 'Notification to remind about your activity');
    var generalNotificationDetails = NotificationDetails(android: androidDetails);
    
    await flutterLocalNotificationsPlugin.showDailyAtTime(
      0, 
      'Reminder: $_selectedActivity', 
      'Time to $_selectedActivity', 
      time, 
      generalNotificationDetails,
    );
  }

  void _selectTime(BuildContext context) async {
    final TimeOfDay picked = await showTimePicker(
      context: context,
      initialTime: TimeOfDay.now(),
    );
    if (picked != null) {
      setState(() {
        _selectedTime = picked;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Simple Reminder App'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: <Widget>[
            DropdownButton<String>(
              hint: Text('Select Day of the Week'),
              value: _selectedDay,
              onChanged: (newValue) {
                setState(() {
                  _selectedDay = newValue;
                });
              },
              items: _daysOfWeek.map((day) {
                return DropdownMenuItem(
                  child: new Text(day),
                  value: day,
                );
              }).toList(),
            ),
            SizedBox(height: 20),
            ElevatedButton(
              onPressed: () => _selectTime(context),
              child: Text('Select Time'),
            ),
            SizedBox(height: 20),
            DropdownButton<String>(
              hint: Text('Select Activity'),
              value: _selectedActivity,
              onChanged: (newValue) {
                setState(() {
                  _selectedActivity = newValue;
                });
              },
              items: _activities.map((activity) {
                return DropdownMenuItem(
                  child: new Text(activity),
                  value: activity,
                );
              }).toList(),
            ),
            SizedBox(height: 40),
            ElevatedButton(
              onPressed: _scheduleNotification,
              child: Text('Set Reminder'),
            ),
          ],
        ),
      ),
    );
  }
}
