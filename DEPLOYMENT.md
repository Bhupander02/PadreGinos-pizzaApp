# 📋 Deployment Checklist

## Before Deployment

### 1. MongoDB Atlas Setup
- [ ] Create MongoDB Atlas account
- [ ] Create free M0 cluster
- [ ] Create database user
- [ ] Whitelist IP: 0.0.0.0/0 (allow from anywhere)
- [ ] Copy connection string
- [ ] Test connection locally

### 2. Code Preparation
- [ ] Update CORS settings in `server/index.js` with your frontend URL
- [ ] Remove console.logs (optional)
- [ ] Test app locally with both frontend and backend running
- [ ] Verify all features work (add to cart, checkout, view orders)

### 3. Environment Variables Ready
- [ ] Backend: `MONGODB_URI` (from Atlas)
- [ ] Frontend: `VITE_API_URL` (will be backend URL)

## Deploy Backend (Render.com)

- [ ] Sign up at https://render.com
- [ ] Create new "Web Service"
- [ ] Connect GitHub repository
- [ ] Configure:
  - Root Directory: `server`
  - Build Command: `npm install`
  - Start Command: `npm start`
  - Environment: Node
- [ ] Add environment variable: `MONGODB_URI`
- [ ] Click "Create Web Service"
- [ ] Wait for deployment (5-10 minutes first time)
- [ ] Copy the URL (e.g., `https://your-app-name.onrender.com`)
- [ ] Test endpoint: visit `https://your-app-name.onrender.com/health`
- [ ] Should see: `{"status":"OK","mongodb":1}`

## Deploy Frontend (Vercel.com)

- [ ] Create `.env.production` file:
  ```
  VITE_API_URL=https://your-backend.onrender.com
  ```
- [ ] Sign up at https://vercel.com
- [ ] Click "Import Project"
- [ ] Connect GitHub repository
- [ ] Configure:
  - Framework Preset: Vite
  - Root Directory: ./
  - Build Command: `npm run build`
  - Output Directory: `dist`
- [ ] Add Environment Variable:
  - Name: `VITE_API_URL`
  - Value: Your Render backend URL
- [ ] Click "Deploy"
- [ ] Wait for deployment (2-3 minutes)
- [ ] Copy Vercel URL

## Post-Deployment

### Update Backend CORS
- [ ] In `server/index.js`, update CORS to include your Vercel URL:
  ```javascript
  app.use(cors({
    origin: [
      'https://your-app.vercel.app',
      'http://localhost:5173'
    ],
    credentials: true
  }));
  ```
- [ ] Commit and push changes
- [ ] Render will auto-redeploy

### Testing
- [ ] Visit your Vercel URL
- [ ] Test ordering a pizza
- [ ] Verify checkout works
- [ ] Check order history page
- [ ] Test on mobile device
- [ ] Test cart functionality
- [ ] Verify toast notifications appear

## Add to Resume/Portfolio

- [ ] Add live URL to resume
- [ ] Add GitHub repository link
- [ ] Screenshot the app for portfolio
- [ ] Write project description:

```
Padre Gino's Pizza - Full-Stack E-Commerce Application
• Built modern pizza ordering platform with React, Node.js, Express, and MongoDB
• Implemented RESTful API with persistent data storage and order management
• Designed responsive UI with advanced CSS animations and gradient effects
• Deployed to production using Vercel, Render, and MongoDB Atlas
Live: [your-vercel-url]
Code: [your-github-url]
```

## Troubleshooting

### Backend not starting
- [ ] Check Render logs
- [ ] Verify MongoDB connection string
- [ ] Ensure all environment variables are set
- [ ] Check MongoDB IP whitelist

### Frontend can't reach backend
- [ ] Verify `VITE_API_URL` is correct
- [ ] Check CORS settings
- [ ] Ensure backend is running (visit /health endpoint)
- [ ] Check browser console for errors

### MongoDB connection fails
- [ ] Verify connection string format
- [ ] Check database user credentials
- [ ] Ensure IP whitelist includes 0.0.0.0/0
- [ ] Test connection string locally first

## Free Tier Limitations

### Render (Backend)
- Free tier: 750 hours/month
- Spins down after 15 min of inactivity
- First request after sleep: ~30 seconds
- Workaround: Use a service like UptimeRobot to ping every 14 minutes

### Vercel (Frontend)
- Unlimited deployments
- 100 GB bandwidth/month
- Instant, always on

### MongoDB Atlas (Database)
- 512 MB storage (enough for thousands of orders)
- Shared cluster
- No credit card required

## Optional Enhancements

- [ ] Add custom domain (Vercel supports this free)
- [ ] Set up analytics (Vercel Analytics)
- [ ] Add error tracking (Sentry free tier)
- [ ] Set up GitHub Actions for automated testing
- [ ] Add Lighthouse CI for performance monitoring

## Success! 🎉

Your portfolio-ready pizza app is now live and can be shared with potential employers!

Next steps:
1. Share the link on LinkedIn
2. Add to your portfolio website
3. Include in job applications
4. Show it during interviews
