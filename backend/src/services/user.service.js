const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

class UserService {
  // Generate JWT token
  generateToken(userId) {
    return jwt.sign(
      { userId },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE || '7d' }
    );
  }

  // Register new user
  async registerUser(userData) {
    try {
      // Check if user already exists
      const existingUser = await User.findOne({ email: userData.email });
      if (existingUser) {
        throw new Error('User with this email already exists');
      }

      // Check for driver-specific unique fields
      if (userData.role === 'driver') {
        const existingLicense = await User.findOne({ licenseNo: userData.licenseNo });
        if (existingLicense) {
          throw new Error('Driver with this license number already exists');
        }

        const existingNIC = await User.findOne({ nic: userData.nic });
        if (existingNIC) {
          throw new Error('Driver with this NIC already exists');
        }

        const existingBus = await User.findOne({ busNumber: userData.busNumber });
        if (existingBus) {
          throw new Error('Driver with this bus number already exists');
        }
      }

      // Create new user
      const user = new User(userData);
      await user.save();

      // Generate token
      const token = this.generateToken(user._id);

      return {
        user: user.toJSON(),
        token
      };
    } catch (error) {
      throw error;
    }
  }

  // Login user
  async loginUser(email, password) {
    try {
      // Find user and include password for comparison
      const user = await User.findOne({ email }).select('+password');
      
      if (!user) {
        throw new Error('Invalid email or password');
      }

      if (!user.isActive) {
        throw new Error('Account is deactivated');
      }

      // Compare password
      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        throw new Error('Invalid email or password');
      }

      // Update last login
      user.lastLogin = new Date();
      await user.save();

      // Generate token
      const token = this.generateToken(user._id);

      return {
        user: user.toJSON(),
        token
      };
    } catch (error) {
      throw error;
    }
  }

  // Get user profile
  async getUserProfile(userId) {
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (error) {
      throw error;
    }
  }

  // Update user profile
  async updateUserProfile(userId, updateData) {
    try {
      const user = await User.findByIdAndUpdate(
        userId,
        { $set: updateData },
        { new: true, runValidators: true }
      );

      if (!user) {
        throw new Error('User not found');
      }

      return user;
    } catch (error) {
      throw error;
    }
  }

  // Get all drivers (for admin purposes)
  async getAllDrivers() {
    try {
      const drivers = await User.find({ role: 'driver' }).select('-password');
      return drivers;
    } catch (error) {
      throw error;
    }
  }

  // Get all passengers (for admin purposes)
  async getAllPassengers() {
    try {
      const passengers = await User.find({ role: 'passenger' }).select('-password');
      return passengers;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new UserService();