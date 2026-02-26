# Excelora - Online Class Management Platform

Production-level full-stack platform for managing online classes with admin, teacher, and student roles. Built with React (frontend), Node.js + Express (backend), and MongoDB.

## Features

- **Authentication & Authorization**
  - JWT-based login/register
  - Role-based access control (Admin, Teacher, Student)
  - Password hashing with bcrypt

- **Admin Dashboard**
  - User management (create, view, delete students/teachers/admins)
  - Create and manage classes
  - View payment reports with filters
  - Assign teachers and students to classes

- **Teacher Dashboard**
  - View assigned classes
  - Upload class materials (notes, PDFs)
  - Mark student attendance
  - View enrolled students

- **Student Dashboard**
  - View enrolled classes
  - Join live classes via meeting links
  - Download class materials
  - Make monthly payments via Razorpay
  - View payment history

- **Payment System**
  - Razorpay integration for monthly subscriptions
  - Payment status tracking (Paid/Pending)
  - Payment history and reports

- **File Uploads**
  - Multer-based file storage
  - Teachers can upload class materials
  - Static file serving

## Tech Stack

**Frontend:**
- React 18 + Vite
- React Router v6
- Axios for API calls
- TailwindCSS for styling

**Backend:**
- Node.js + Express
- MongoDB + Mongoose
- JWT for authentication
- Razorpay payment integration
- Express Validator for input validation

## Project Structure

```
Excelora Classes/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── classController.js
│   │   ├── paymentController.js
│   │   ├── adminController.js
│   │   ├── materialController.js
│   │   └── attendanceController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   ├── roleMiddleware.js
│   │   └── uploadMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Class.js
│   │   └── Payment.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── classRoutes.js
│   │   ├── paymentRoutes.js
│   │   ├── adminRoutes.js
│   │   ├── materialRoutes.js
│   │   └── attendanceRoutes.js
│   ├── utils/
│   │   ├── errorHandler.js
│   │   └── validate.js
│   ├── uploads/
│   ├── server.js
│   ├── package.json
│   ├── .env.example
│   └── README.md
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── Toasts.jsx
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   └── ToastContext.jsx
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── AdminUsers.jsx
│   │   │   ├── CreateClass.jsx
│   │   │   ├── AdminPayments.jsx
│   │   │   ├── TeacherDashboard.jsx
│   │   │   ├── TeacherMaterials.jsx
│   │   │   ├── AttendancePage.jsx
│   │   │   ├── StudentDashboard.jsx
│   │   │   ├── PaymentPage.jsx
│   │   │   ├── StudentPayments.jsx
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   ├── classService.js
│   │   │   └── paymentService.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.cjs
│   ├── postcss.config.cjs
│   ├── package.json
│   ├── .env.example
│   └── README.md
└── README.md (this file)
```

## Prerequisites

- **Node.js** v16+ and npm
- **MongoDB Atlas** account (free tier available)
- **Razorpay** account (for payments; optional for dev)
- **Git** for version control

## Installation & Setup

### 1. Backend Setup

```bash
cd "Final React Project/Excelora Classes/backend"
npm install
```

Create a `.env` file from `.env.example`:

```bash
cp .env.example .env
```

Edit `.env` and fill in:

```dotenv
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/excelora?retryWrites=true&w=majority
JWT_SECRET=your_secret_key_here
PORT=5000
RAZORPAY_KEY_ID=rzp_live_xxxxxxxxxxxx
RAZORPAY_KEY_SECRET=your_razorpay_secret
```

**MongoDB Atlas Setup:**
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Add a database user and note the connection string
4. Replace username/password in MONGO_URI

### 2. Frontend Setup

```bash
cd "Final React Project/Excelora Classes/frontend"
npm install
```

Create a `.env` file from `.env.example`:

```bash
cp .env.example .env
```

Edit `.env`:

```dotenv
VITE_BACKEND_URL=http://localhost:5000/api
VITE_RAZORPAY_KEY=rzp_test_xxxxxxxxxxxx
```

## Running the Project

### Option 1: Run Backend & Frontend in Separate Terminals

**Terminal 1 - Backend:**

```bash
cd "Final React Project/Excelora Classes/backend"
npm run dev
# Server will run on http://localhost:5000
```

**Terminal 2 - Frontend:**

```bash
cd "Final React Project/Excelora Classes/frontend"
npm run dev
# App will run on http://localhost:5173
```

### Option 2: Quick Start with concurrently (Single Terminal)

From the root directory:

```bash
npm install -g concurrently
concurrently "cd backend && npm run dev" "cd frontend && npm run dev"
```

## API Endpoints

### Auth
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user (protected)

### Classes
- `POST /api/classes` - Create class (admin only)
- `GET /api/classes` - List user's classes
- `GET /api/classes/:id` - Get class details
- `PUT /api/classes/:id` - Update class (admin only)
- `DELETE /api/classes/:id` - Delete class (admin only)

### Payments
- `POST /api/payments/create-order` - Create Razorpay order
- `POST /api/payments/verify` - Verify payment signature
- `GET /api/payments` - Get user's payment history

### Admin
- `GET /api/admin/users` - List users (pagination support)
- `POST /api/admin/users` - Create user
- `PUT /api/admin/users/:id` - Update user
- `DELETE /api/admin/users/:id` - Delete user

### Materials & Attendance
- `POST /api/materials/:classId/upload` - Upload material (teacher/admin)
- `POST /api/attendance/:classId/mark` - Mark attendance (teacher/admin)
- `GET /api/attendance/:classId` - Get attendance records

## Validation

**Server-side** (Express Validator):
- Email format validation
- Password length (min 6 chars)
- Required field checks
- Amount validation for payments

**Client-side**:
- Form field emptiness checks
- Toast notifications for errors
- Real-time input feedback

## Test Accounts (for Development)

After setup, register test accounts via the frontend:

1. **Admin**
   - Email: `admin@test.com`
   - Password: `password123`
   - Role: Admin

2. **Teacher**
   - Email: `teacher@test.com`
   - Password: `password123`
   - Role: Teacher

3. **Student**
   - Email: `student@test.com`
   - Password: `password123`
   - Role: Student

## Key Features Walkthrough

### Admin Flow
1. Login as admin
2. Go to "User Management" to create students/teachers
3. Go to "Create Class" and assign teachers/students
4. View "Payments Report" to see student payment status

### Teacher Flow
1. Login as teacher
2. View "My Classes" dashboard
3. Go to "Upload Materials" to add class notes/PDFs
4. Go to "Attendance" to mark student attendance

### Student Flow
1. Register and login as student
2. View "My Classes" to see enrolled classes
3. Go to "Payments" and click "Pay Now" for monthly subscription
4. Complete Razorpay checkout
5. Download materials from class

## File Uploads

Uploaded materials are stored in `backend/uploads/` and served at `http://localhost:5000/uploads/{filename}`.

## Troubleshooting

### Backend won't start
- Check MongoDB connection string in `.env`
- Ensure PORT 5000 is not in use

### Frontend won't load
- Check `VITE_BACKEND_URL` in `.env` matches backend URL
- Clear browser cache and restart dev server

### Payment not working
- Verify Razorpay keys in `.env`
- Use test keys from Razorpay dashboard in development

### File upload fails
- Ensure `backend/uploads/` directory exists
- Check file size limits (default: 50MB via Multer)

## Deployment

### Frontend (Vercel)
1. Connect GitHub repo to Vercel
2. Set build command: `npm run build` in `frontend/`
3. Add env vars: `VITE_BACKEND_URL` pointing to production backend

### Backend (Render or Railway)
1. Connect GitHub repo
2. Set start command: `npm start` (points to `node server.js`)
3. Add env vars for MongoDB, JWT, Razorpay

## Security Notes

- All passwords are hashed with bcrypt
- JWT tokens expire in 7 days
- Role-based middleware protects admin routes
- CORS is enabled (configure in production)
- Input validation prevents injection attacks

## License

MIT

## Support

For issues or questions, refer to backend/README.md and frontend/README.md for component-level details.
