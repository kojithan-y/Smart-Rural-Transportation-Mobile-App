const userService = require('../services/user.service');

class UserController {
  // Register passenger
  async registerPassenger(req, res) {
    try {
      const userData = {
        ...req.body,
        role: 'passenger'
      };

      const result = await userService.registerUser(userData);

      res.status(201).json({
        success: true,
        message: 'Passenger registered successfully',
        data: result
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  // Register driver
  async registerDriver(req, res) {
    try {
      const userData = {
        ...req.body,
        role: 'driver'
      };

      const result = await userService.registerUser(userData);

      res.status(201).json({
        success: true,
        message: 'Driver registered successfully',
        data: result
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  // Login user
  async login(req, res) {
    try {
      const { email, password } = req.body;

      const result = await userService.loginUser(email, password);

      res.status(200).json({
        success: true,
        message: 'Login successful',
        data: result
      });
    } catch (error) {
      res.status(401).json({
        success: false,
        message: error.message
      });
    }
  }

  // Get user profile
  async getProfile(req, res) {
    try {
      const user = await userService.getUserProfile(req.user._id);

      res.status(200).json({
        success: true,
        data: user
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        message: error.message
      });
    }
  }

  // Update user profile
  async updateProfile(req, res) {
    try {
      const updateData = req.body;
      const user = await userService.updateUserProfile(req.user._id, updateData);

      res.status(200).json({
        success: true,
        message: 'Profile updated successfully',
        data: user
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  // Get all drivers (admin only)
  async getAllDrivers(req, res) {
    try {
      const drivers = await userService.getAllDrivers();

      res.status(200).json({
        success: true,
        count: drivers.length,
        data: drivers
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  // Get all passengers (admin only)
  async getAllPassengers(req, res) {
    try {
      const passengers = await userService.getAllPassengers();

      res.status(200).json({
        success: true,
        count: passengers.length,
        data: passengers
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  // Logout (client-side token removal)
  async logout(req, res) {
    res.status(200).json({
      success: true,
      message: 'Logout successful'
    });
  }
}

module.exports = new UserController();