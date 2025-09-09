const { body, validationResult } = require('express-validator');

// Handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map(err => ({
        field: err.path,
        message: err.msg,
        value: err.value
      }))
    });
  }
  next();
};

// Common validation rules
const commonValidations = {
  name: body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
    
  email: body('email')
    .trim()
    .toLowerCase()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please enter a valid email'),
    
  password: body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters'),
    
  phone: body('phone')
    .optional()
    .trim()
    .matches(/^[\d\s\-\+\(\)]{9,15}$/)
    .withMessage('Please enter a valid phone number')
};

// Driver-specific validations
const driverValidations = {
  licenseNo: body('licenseNo')
    .trim()
    .toUpperCase()
    .notEmpty()
    .withMessage('License number is required')
    .matches(/^[A-Z0-9-]{6,20}$/)
    .withMessage('Please enter a valid license number'),
    
  nic: body('nic')
    .trim()
    .toUpperCase()
    .notEmpty()
    .withMessage('NIC is required')
    .matches(/^(\d{9}[VX]|\d{12})$/)
    .withMessage('Please enter a valid NIC (e.g., 199012345678 or 123456789V)'),
    
  busNumber: body('busNumber')
    .trim()
    .toUpperCase()
    .notEmpty()
    .withMessage('Bus number is required')
    .matches(/^[A-Z0-9-\/]{2,15}$/)
    .withMessage('Please enter a valid bus number')
};

// Validation rules for different endpoints
const validationRules = {
  passengerRegister: [
    commonValidations.name,
    commonValidations.email,
    commonValidations.password,
    commonValidations.phone,
    handleValidationErrors
  ],
  
  driverRegister: [
    commonValidations.name,
    commonValidations.email,
    commonValidations.password,
    commonValidations.phone,
    driverValidations.licenseNo,
    driverValidations.nic,
    driverValidations.busNumber,
    handleValidationErrors
  ],
  
  login: [
    commonValidations.email,
    body('password').notEmpty().withMessage('Password is required'),
    handleValidationErrors
  ]
};

module.exports = {
  validationRules,
  handleValidationErrors
};
