import 'package:flutter/material.dart';
import 'features/auth/role_select_screen.dart';
import 'features/auth/driver_login_screen.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Smart Rural Transportation',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: const Color(0xFF2563EB)),
        useMaterial3: true,
      ),
      initialRoute: '/',
      routes: {
        '/': (context) => const RoleSelectScreen(),
        '/auth/driver/login': (context) => const DriverLoginScreen(),
        '/driverHome': (context) => const _DriverHomePlaceholder(),
        '/auth/passenger/login': (context) => const _ComingSoonScreen(title: 'Passenger Login'),
        '/auth/admin/login': (context) => const _ComingSoonScreen(title: 'Admin Login'),
        '/auth/connector/login': (context) => const _ComingSoonScreen(title: 'Connector Login'),
      },
    );
  }
}

class _DriverHomePlaceholder extends StatelessWidget {
  const _DriverHomePlaceholder({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Driver Home')),
      body: const Center(child: Text('Driver Home')),
    );
  }
}

class _ComingSoonScreen extends StatelessWidget {
  final String title;
  const _ComingSoonScreen({super.key, required this.title});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text(title)),
      body: const Center(child: Text('Coming soon')),
    );
  }
}