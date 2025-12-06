# 🚗 Vehicle Rental Management API

A complete Node.js + Express + TypeScript + PostgreSQL backend for managing users, vehicles, and bookings with proper authentication, authorization, and business rules.

---

## 🛠️ Tech Stack
- Node.js
- Express.js
- TypeScript
- PostgreSQL (pg)
- JWT Authentication
- Bcrypt Password Hashing

---

## 📦 Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone <repository-url>
cd project-folder
```

### 2️⃣ Install dependencies
```bash
npm install
```

### 3️⃣ Create `.env` file
```
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=yourpassword
DB_NAME=vehicle_rental

JWT_SECRET=your_secret_key
```

### 4️⃣ Run the project
```bash
npm run dev
```

---

## 🚀 API Endpoints

### 🔐 1. User Registration
- **Access:** Public
- **Description:** Register a new user account
- **Endpoint:** POST `/api/v1/auth/signup`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "securePassword123",
  "phone": "01712345678",
  "role": "customer"
}
```

### 🔐 2. User Login
- **Access:** Public
- **Description:** Login and receive JWT token
- **Endpoint:** POST `/api/v1/auth/signin`

**Request Body:**
```json
{
  "email": "john.doe@example.com",
  "password": "securePassword123"
}
```

---

## 🚘 Vehicle Management

### 3. Create Vehicle
- **Access:** Admin only
- **Description:** Add a new vehicle
- **Endpoint:** POST `/api/v1/vehicles`
- **Headers:** Authorization: Bearer `<jwt_token>`

**Request Body:**
```json
{
  "vehicle_name": "Toyota Camry 2024",
  "type": "car",
  "registration_number": "ABC-1234",
  "daily_rent_price": 50,
  "availability_status": "available"
}
```

### 4. Get All Vehicles
- **Access:** Public
- **Endpoint:** GET `/api/v1/vehicles`

### 5. Get Vehicle by ID
- **Access:** Public
- **Endpoint:** GET `/api/v1/vehicles/:vehicleId`

### 6. Update Vehicle
- **Access:** Admin only
- **Endpoint:** PUT `/api/v1/vehicles/:vehicleId`
- **Headers:** Authorization: Bearer `<jwt_token>`

**Request Body:**
```json
{
  "vehicle_name": "Toyota Camry 2024 Premium",
  "type": "car",
  "registration_number": "ABC-1234",
  "daily_rent_price": 55,
  "availability_status": "available"
}
```

### 7. Delete Vehicle
- **Access:** Admin only
- **Condition:** Only if no active bookings exist
- **Endpoint:** DELETE `/api/v1/vehicles/:vehicleId`
- **Headers:** Authorization: Bearer `<jwt_token>`

---

## 👥 User Management

### 8. Get All Users
- **Access:** Admin only
- **Endpoint:** GET `/api/v1/users`
- **Headers:** Authorization: Bearer `<jwt_token>`

### 9. Update User
- **Access:** Admin or Own Profile
- **Endpoint:** PUT `/api/v1/users/:userId`
- **Headers:** Authorization: Bearer `<jwt_token>`

**Request Body:**
```json
{
  "name": "John Doe Updated",
  "email": "john.updated@example.com",
  "phone": "+1234567899",
  "role": "admin"
}
```

### 10. Delete User
- **Access:** Admin only
- **Condition:** Only if no active bookings exist
- **Endpoint:** DELETE `/api/v1/users/:userId`
- **Headers:** Authorization: Bearer `<jwt_token>`

---

## 📅 Booking Management

### 11. Create Booking
- **Access:** Customer or Admin
- **Description:** Auto price calculation & update vehicle availability
- **Endpoint:** POST `/api/v1/bookings`
- **Headers:** Authorization: Bearer `<jwt_token>`

**Request Body:**
```json
{
  "customer_id": 1,
  "vehicle_id": 2,
  "rent_start_date": "2024-01-15",
  "rent_end_date": "2024-01-20"
}
```

### 12. Get All Bookings
- **Access:** Admin → all bookings, Customer → own bookings only
- **Endpoint:** GET `/api/v1/bookings`
- **Headers:** Authorization: Bearer `<jwt_token>`

### 13. Update Booking
- **Access:** Role-based
- **Endpoint:** PUT `/api/v1/bookings/:bookingId`
- **Headers:** Authorization: Bearer `<jwt_token>`

**Customer Cancellation:**
```json
{
  "status": "cancelled"
}
```
**Admin Mark as Returned:**
```json
{
  "status": "returned"
}
```

---

## 📘 Summary
This backend system supports:
- User Authentication
- Role-based Authorization
- Vehicle CRUD Operations
- Booking Management
- Auto Rent Price Calculation
- Admin-Controlled Operations