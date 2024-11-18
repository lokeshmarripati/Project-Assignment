import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider(
      create: (_) => UserProvider(),
      child: MaterialApp(
        debugShowCheckedModeBanner: false,
        title: 'User List App',
        theme: ThemeData(primarySwatch: Colors.blue),
        home: const UserListScreen(),
      ),
    );
  }
}



class User {
  final String name;
  final String email;

  User({required this.name, required this.email});

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      name: json['name'],
      email: json['email'],
    );
  }
}


class UserProvider extends ChangeNotifier {
  List<User> _users = [];
  bool _isLoading = false;
  String? _errorMessage;

  List<User> get users => _users;
  bool get isLoading => _isLoading;
  String? get errorMessage => _errorMessage;

  Future<void> fetchUsers() async {
    _isLoading = true;
    _errorMessage = null;
    notifyListeners();

    try {
      final response = await http
          .get(Uri.parse('https://jsonplaceholder.typicode.com/users'));

      if (response.statusCode == 200) {
        final List<dynamic> data = json.decode(response.body);
        _users = data.map((json) => User.fromJson(json)).toList();
      } else {
        _errorMessage = 'Failed to load users: ${response.statusCode}';
      }
    } catch (e) {
      _errorMessage = 'An error occurred: $e';
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }
}


class UserListScreen extends StatelessWidget {
  const UserListScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final userProvider = Provider.of<UserProvider>(context);

    return Scaffold(
      appBar: AppBar(
        title: const Text('User List'),
      ),
      body: RefreshIndicator(
        onRefresh: userProvider.fetchUsers,
        child: userProvider.isLoading
            ? const Center(child: CircularProgressIndicator())
            : userProvider.errorMessage != null
                ? Center(
                    child: Text(
                      userProvider.errorMessage!,
                      style: const TextStyle(color: Colors.red, fontSize: 16),
                    ),
                  )
                : ListView.builder(
                    itemCount: userProvider.users.length,
                    itemBuilder: (context, index) {
                      final user = userProvider.users[index];
                      return ListTile(
                        leading: CircleAvatar(
                          child: Text(user.name[0]),
                        ),
                        title: Text(user.name),
                        subtitle: Text(user.email),
                      );
                    },
                  ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: userProvider.fetchUsers,
        child: const Icon(Icons.refresh),
      ),
    );
  }
}
