# ⚡ NexusCRM — Final Term Project

A full-featured **Customer Relationship Management (CRM) System** built with the **MERN + Next.js** stack.

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Internet connection (uses MongoDB Atlas)

### 1. Start the Backend
```bash
cd backend
npm install
npm run seed     # Seeds 15 customers + admin user (run once)
npm start        # Starts API on http://localhost:5000
```

### 2. Start the Frontend
```bash
cd frontend
npm install
npm run dev      # Starts Next.js on http://localhost:3000
```

### 3. Login
Open **http://localhost:3000** and use:
- **Email:** `admin@crm.com`
- **Password:** `admin123456`

---

## 📁 Project Structure

```
Final_Term_Project_CRM/
├── backend/                   # Express.js REST API
│   ├── config/db.js           # MongoDB connection
│   ├── middleware/auth.js     # JWT middleware
│   ├── models/                # User, Customer, Invoice schemas
│   ├── controllers/           # Business logic
│   ├── routes/                # API routes
│   ├── seed.js                # 15 customer seed data
│   └── server.js              # Entry point
│
└── frontend/                  # Next.js 16 App Router
    ├── app/
    │   ├── login/             # Login page
    │   ├── register/          # Registration page
    │   └── dashboard/
    │       ├── page.tsx       # Overview with stats
    │       ├── customers/     # Customer CRUD pages
    │       └── invoices/      # Invoice generation
    ├── components/
    │   ├── Sidebar.tsx        # Navigation sidebar
    │   └── Chatbot.tsx        # Rule-based chatbot
    ├── context/AuthContext.tsx # JWT auth state
    └── lib/api.ts             # Axios instance
```

---

## 🔌 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login + get JWT token |
| GET | `/api/auth/me` | Get current user (protected) |

### Customers (all protected — require Bearer token)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/customers` | List all customers |
| POST | `/api/customers` | Create customer |
| GET | `/api/customers/:id` | Get single customer |
| PUT | `/api/customers/:id` | Update customer |
| DELETE | `/api/customers/:id` | Delete customer |

### Invoices (all protected)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/invoices` | List all invoices |
| POST | `/api/invoices` | Create invoice |
| GET | `/api/invoices/:id` | Get single invoice |
| DELETE | `/api/invoices/:id` | Delete invoice |

---

## 🌟 Features Implemented

### I. Authentication System
- ✅ User registration with name, email, password
- ✅ bcryptjs password hashing
- ✅ JWT token generation on login
- ✅ Protected routes (frontend + backend)
- ✅ Logout clears localStorage token
- ✅ 401 Unauthorized for invalid tokens

### II. Customer Management
- ✅ Add / View / Update / Delete customers
- ✅ MongoDB schema with validation
- ✅ 15 pre-seeded customer records
- ✅ All input fields validated

### III. Search & Filter
- ✅ Live search by name, email, company
- ✅ Filter by status (Lead / Active / Inactive)
- ✅ Dynamic — no page reload

### IV. Next.js Frontend
- ✅ App Router with layouts
- ✅ Login & Registration pages
- ✅ Dashboard overview
- ✅ Protected routing (redirect if not authed)
- ✅ Reusable components
- ✅ Axios with JWT interceptor

### V. Invoice Generation
- ✅ Select customer + add line items
- ✅ Tax & discount calculation
- ✅ Invoice preview modal
- ✅ PDF download with jsPDF
- ✅ Saved to MongoDB

### VI. Notification System
- ✅ react-hot-toast for all operations
- ✅ Success / Error / Loading toasts
- ✅ Custom dark theme styling

### VII. Chatbot
- ✅ Rule-based (no external AI)
- ✅ Commands: help, show customers, add customer, invoice, dashboard
- ✅ Auto-navigates on command
- ✅ Floating widget in dashboard

### VIII. UI / Code Quality
- ✅ Catppuccin Mocha dark theme
- ✅ Glassmorphism + gradient accents
- ✅ Responsive layout
- ✅ Clean folder structure
- ✅ TypeScript throughout

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 16, React 19, TypeScript |
| Styling | Tailwind CSS v4 + Custom CSS |
| HTTP Client | Axios |
| PDF | jsPDF |
| Notifications | react-hot-toast |
| Backend | Node.js, Express.js v5 |
| Database | MongoDB Atlas (Mongoose v9) |
| Auth | JWT + bcryptjs |

---

## 🔐 Environment Variables

### Backend `.env`
```env
PORT=5000
MONGODB_URI=mongodb+srv://...
JWT_SECRET=crm_super_secret_jwt_key_2024_final_project
JWT_EXPIRE=7d
```

### Frontend `.env.local`
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```
