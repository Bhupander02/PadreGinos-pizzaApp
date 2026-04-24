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

## 🌐 Deployment Guide

### Deploy to Free Services

#### Option 1: Vercel (Frontend) + MongoDB Atlas (Database) + Render (Backend)

**Step 1: MongoDB Atlas Setup**

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account and cluster
3. Click "Connect" → "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your database password
6. Whitelist all IPs (0.0.0.0/0) for development

**Step 2: Deploy Backend to Render**

1. Go to [Render.com](https://render.com)
2. Create a new "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Add Environment Variable:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
6. Click "Create Web Service"
7. Copy your backend URL (e.g., `https://your-app.onrender.com`)

**Step 3: Deploy Frontend to Vercel**

1. Create `.env.production` file in project root:
```env
VITE_API_URL=https://your-backend-url.onrender.com
```

2. Go to [Vercel.com](https://vercel.com)
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Add Environment Variable:
   - `VITE_API_URL`: Your Render backend URL
6. Click "Deploy"

**Step 4: Update CORS Settings**

In `server/index.js`, update CORS:
```javascript
app.use(cors({
  origin: ['https://your-vercel-app.vercel.app', 'http://localhost:5173'],
  credentials: true
}));
```

Redeploy backend after this change.

---

#### Option 2: Netlify (Frontend) + Railway (Backend + Database)

**Step 1: Railway Setup**

1. Go to [Railway.app](https://railway.app)
2. Create new project
3. Add MongoDB database service
4. Add Node.js service for your backend
5. Configure environment:
   - Railway will auto-generate `MONGODB_URI`
   - Set `PORT` (Railway provides this automatically)
6. Deploy backend
7. Copy the public URL

**Step 2: Netlify Frontend**

1. Create `netlify.toml`:
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/api/*"
  to = "https://your-railway-backend.up.railway.app/api/:splat"
  status = 200
```

2. Deploy to Netlify via GitHub or drag & drop

---

### Environment Variables Summary

**Frontend (.env.production)**
```env
VITE_API_URL=https://your-backend-url.com
```

**Backend (.env)**
```env
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/pizzaapp
PORT=3001
```

## 📱 Add to Resume

Once deployed, add to your resume:

```
Portfolio Project: Padre Gino's Pizza App
Tech: React, Node.js, MongoDB, TanStack Router/Query
Live: https://your-app.vercel.app
• Built full-stack pizza ordering application with modern animations
• Implemented RESTful API with MongoDB for order persistence
• Deployed on cloud infrastructure (Vercel + Render + MongoDB Atlas)
```

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
