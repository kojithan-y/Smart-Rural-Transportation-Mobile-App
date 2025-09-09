# Smart Rural Transportation Backend

Backend API for the Smart Rural Transportation Mobile App built with Express.js and MongoDB.

## Features

- **User Authentication**: JWT-based authentication for passengers and drivers
- **Role-based Access**: Different user types (passenger, driver, admin)
- **Data Validation**: Comprehensive input validation using express-validator
- **Security**: Password hashing, rate limiting, CORS protection
- **Database**: MongoDB with Mongoose ODM

## API Endpoints

### Authentication
- `POST /api/auth/passenger/register` - Register new passenger
- `POST /api/auth/driver/register` - Register new driver
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### User Profile
- `GET /api/auth/profile` - Get user profile (protected)
- `PUT /api/auth/profile` - Update user profile (protected)

### Admin (if needed)
- `GET /api/auth/drivers` - Get all drivers (admin only)
- `GET /api/auth/passengers` - Get all passengers (admin only)

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file with your configuration:
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/smart-rural-transportation
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=7d
BCRYPT_ROUNDS=12
```

3. Start the server:
```bash
# Development
npm run dev

# Production
npm start
```

## Database Schema

### User Model
- `name`: String (required)
- `email`: String (required, unique)
- `password`: String (required, hashed)
- `role`: Enum ['passenger', 'driver']
- `phone`: String (optional)
- `isActive`: Boolean (default: true)
- `lastLogin`: Date
- `licenseNo`: String (driver only)
- `nic`: String (driver only)
- `busNumber`: String (driver only)
- `isVerified`: Boolean (default: false)

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Rate limiting (100 requests per 15 minutes)
- CORS protection
- Input validation and sanitization
- Helmet.js for security headers

## Error Handling

All API responses follow this format:
```json
{
  "success": boolean,
  "message": string,
  "data": object (optional),
  "errors": array (optional)
}
```
```

## Installation Instructions

1. **Install Dependencies**:
```bash
cd backend
npm install
```

2. **Set up MongoDB**:
   - Install MongoDB locally or use MongoDB Atlas
   - Update the `MONGODB_URI` in your `.env` file

3. **Start the Server**:
```bash
npm run dev
```

## API Usage Examples

### Register Passenger
```bash
POST /api/auth/passenger/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "+1234567890"
}
```

### Register Driver
```bash
POST /api/auth/driver/register
Content-Type: application/json

{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "password": "password123",
  "phone": "+1234567890",
  "licenseNo": "DL123456",
  "nic": "199012345678",
  "busNumber": "BUS-001"
}
```

### Login
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

This backend provides a complete authentication system that matches your Flutter frontend requirements with proper validation, security, and database management. The API is ready to be integrated with your mobile app!