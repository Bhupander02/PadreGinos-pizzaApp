# 🚀 Quick Start Guide

## Run Locally (5 minutes)

### 1. Install Dependencies
```bash
# Frontend
npm install

# Backend
cd server
npm install
cd ..
```

### 2. Start MongoDB
**Option A - Local MongoDB:**
```bash
# Make sure MongoDB is running on localhost:27017
```

<!-- BrianHoltPizza -->

**Option B - MongoDB Atlas (Recommended):**
1. Go to https://mongodb.com/cloud/atlas
2. Create free cluster
3. Get connection string
4. Create `server/.env`:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/pizzaapp
PORT=3001
```

### 3. Run the App
Open 2 terminals:

**Terminal 1 - Backend:**
```bash
cd server
npm start
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

### 4. Open Browser
Go to http://localhost:5173

---

## Deploy to Production (10 minutes)

### Option 1: Vercel + Render (Free)

**A. Setup MongoDB Atlas:**
1. Sign up at https://mongodb.com/cloud/atlas
2. Create free M0 cluster
3. Get connection string
4. Add to Render environment variables

**B. Deploy Backend (Render):**
1. Sign up at https://render.com
2. New → Web Service
3. Connect GitHub repo
4. Settings:
   - Root Directory: `server`
   - Build: `npm install`
   - Start: `npm start`
5. Environment Variables:
   - `MONGODB_URI`: Your Atlas string
6. Deploy!

**C. Deploy Frontend (Vercel):**
1. Sign up at https://vercel.com
2. Import GitHub repo
3. Environment Variables:
   - `VITE_API_URL`: Your Render URL
4. Deploy!

### Option 2: All-in-One Railway

1. Sign up at https://railway.app
2. New Project → Deploy MongoDB
3. New Service → GitHub repo
4. Add environment variables
5. Deploy!

---

## Add to Resume

```
🍕 Padre Gino's Pizza App
Live: [your-url-here]
GitHub: [your-repo-here]

Full-stack pizza ordering app with real-time cart, 
MongoDB persistence, and modern animations.

Tech: React, Node.js, Express, MongoDB, TanStack Router/Query
```

---

## Need Help?

### Common Issues:

**❌ Can't connect to MongoDB**
- Use MongoDB Atlas (free tier)
- Whitelist all IPs (0.0.0.0/0)
- Check connection string format

**❌ CORS error**
```javascript
// In server/index.js, update:
app.use(cors({
  origin: ['https://your-frontend.vercel.app'],
  credentials: true
}));
```

**❌ API not found**
- Check VITE_API_URL points to backend
- Verify backend is deployed and running
- Test backend with: curl https://your-backend.com/health

---

## Testing the App

1. **Order a pizza**: Home → Order Now → Select pizza → Add to Cart
2. **Checkout**: Click Checkout button
3. **View history**: Home → Order History

---

## Free Hosting Options

| Service | Purpose | Free Tier |
|---------|---------|-----------|
| Vercel | Frontend | Unlimited |
| Render | Backend | 750 hrs/month |
| MongoDB Atlas | Database | 512 MB |
| Railway | All-in-one | $5 credit/month |
| Netlify | Frontend | 100 GB bandwidth |

**Recommended:** Vercel (Frontend) + Render (Backend) + MongoDB Atlas (DB)
