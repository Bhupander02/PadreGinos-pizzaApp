# 🍕 Padre Gino's Pizza App - Portfolio Project

A modern, fully-animated pizza ordering application built with React, TanStack Router, MongoDB, and Express. Features smooth animations, beautiful gradients, and a complete backend implementation.

## ✨ Features

- 🎨 **Modern UI/UX** - Beautiful gradients, smooth animations, contemporary design
- 🛒 **Shopping Cart** - Add, remove, and checkout pizzas
- 📦 **Order History** - View past orders with pagination
- 🗄️ **MongoDB Database** - Persistent order storage
- 📱 **Responsive Design** - Works perfectly on mobile and desktop
- 🎯 **Animated Interactions** - Hover effects, transitions, loading states
- 🔔 **Toast Notifications** - User-friendly feedback messages

## 🚀 Tech Stack

### Frontend
- React 19
- TanStack Router (routing)
- TanStack Query (data fetching)
- Framer Motion (animations)
- Axios (HTTP client)
- React Hot Toast (notifications)
- Lucide React (icons)
- Vite (build tool)

### Backend
- Node.js + Express
- MongoDB + Mongoose
- CORS enabled
- RESTful API

## 📦 Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas account)

### 1. Clone/Extract the Project
```bash
cd pizza-app-enhanced
```

### 2. Install Frontend Dependencies
```bash
npm install
```

### 3. Install Backend Dependencies
```bash
cd server
npm install
cd ..
```

### 4. Configure Environment Variables

Create `server/.env` file:
```env
MONGODB_URI=mongodb://localhost:27017/pizzaapp
PORT=3001
```

For MongoDB Atlas (recommended for production):
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/pizzaapp
PORT=3001
```

### 5. Run the Application

**Development Mode:**

Terminal 1 (Backend):
```bash
cd server
npm run dev
```

Terminal 2 (Frontend):
```bash
npm run dev
```

Access the app at `http://localhost:5173`

## 🎨 Features Showcase

### Animations
- Fade-in page transitions
- Hover effects on buttons and cards
- Cart item slide-in animations
- Floating brand title
- Shimmer loading states
- Scale animations on interactions

### Color Scheme
- Primary: `#ff6b35` (Orange gradient)
- Secondary: `#4ecdc4` (Turquoise)
- Accent: `#ffe66d` (Yellow)
- Background: Dark theme (`#0f0f1e`)

### User Experience
- Toast notifications for all actions
- Loading spinners
- Empty state messages
- Responsive design
- Accessible form controls

## 📂 Project Structure

```
pizza-app-enhanced/
├── src/
│   ├── routes/           # Route components
│   ├── api/              # API helpers
│   ├── App.jsx           # Main app
│   ├── Cart.jsx          # Cart component
│   ├── Pizza.jsx         # Pizza display
│   ├── style.css         # Global styles
│   └── contexts.jsx      # React contexts
├── server/
│   ├── index.js          # Express server + MongoDB
│   ├── package.json      # Backend dependencies
│   └── .env.example      # Environment template
├── public/               # Static assets
├── package.json          # Frontend dependencies
└── vite.config.js        # Vite configuration
```

## 🔧 API Endpoints

- `GET /api/pizzas` - Get all available pizzas
- `POST /api/order` - Place a new order
- `GET /api/past-orders?page=1` - Get paginated order history
- `GET /health` - Health check

## 🎯 MongoDB Schema

```javascript
Order {
  cart: [{
    pizza: { id, name, description, image, sizes },
    size: String,
    price: String
  }],
  total: Number,
  date: Date,
  orderNumber: String
}
```

## 🐛 Troubleshooting

**CORS Error:**
- Ensure backend URL is correct in frontend env
- Verify CORS settings in `server/index.js`

**MongoDB Connection Failed:**
- Check MongoDB Atlas IP whitelist
- Verify connection string in `.env`
- Ensure database user has correct permissions

**API Not Found:**
- Verify backend is running
- Check proxy settings in `vite.config.js`
- Ensure API_URL is set correctly

## 📄 License

This is a portfolio project. Feel free to use for learning and showcase purposes.

## 🙏 Credits

Built as a modern portfolio piece demonstrating full-stack web development skills.
