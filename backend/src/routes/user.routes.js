const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controllers');
const { authenticate, authorize } = require('../middlewares/auth.middleware');
const { validationRules } = require('../middlewares/validation.middleware');

// Public routes
router.post('/passenger/register', validationRules.passengerRegister, userController.registerPassenger);
router.post('/driver/register', validationRules.driverRegister, userController.registerDriver);
router.post('/login', validationRules.login, userController.login);

// Protected routes
router.use(authenticate); // All routes below require authentication

router.get('/profile', userController.getProfile);
router.put('/profile', userController.updateProfile);
router.post('/logout', userController.logout);

// Admin routes
router.get('/drivers', authorize('admin'), userController.getAllDrivers);
router.get('/passengers', authorize('admin'), userController.getAllPassengers);

module.exports = router;
