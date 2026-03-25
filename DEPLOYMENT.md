# 🚀 Deployment Guide

This guide covers deploying the Social Post App to production platforms.

## 📋 Prerequisites

Before deploying, ensure you have:
- ✅ MongoDB Atlas account (free tier available)
- ✅ Backend hosting account (Heroku, Railway, or similar)
- ✅ Frontend hosting account (Vercel, Netlify, or similar)
- ✅ GitHub repository set up

---

## 🗄️ Step 1: Setup MongoDB Atlas

### Create Cluster
1. Go to [mongodb.com/cloud](https://mongodb.com/cloud)
2. Sign up for free account
3. Create new project
4. Build new cluster (choose Free tier)
5. Select region closest to your users

### Create Database User
1. Go to Security → Database Access
2. Click "Add New Database User"
3. Create username and password
4. Save password securely

### Get Connection String
1. Go to Database → Overview
2. Click "Connect"
3. Choose "Connect your application"
4. Copy MongoDB+SRV connection string
5. Replace `<password>` with your password
6. Save for later use

**Connection String Format:**
```
mongodb+srv://username:password@cluster-name.mongodb.net/social-post-app?retryWrites=true&w=majority
```

### Whitelist IPs (if needed)
1. Go to Security → Network Access
2. Add IP addresses or choose "Allow access from anywhere" (0.0.0.0/0) for development

---

## 🔧 Step 2: Deploy Backend

### Option A: Heroku (Recommended)

#### Setup
```bash
# Install Heroku CLI
# macOS: brew tap heroku/brew && brew install heroku
# Windows: Download from https://devcenter.heroku.com/articles/heroku-cli

# Login to Heroku
heroku login

# Create app
heroku create your-app-name

# Check apps
heroku apps
```

#### Configure Environment Variables
```bash
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/social-post-app
heroku config:set JWT_SECRET=generate-strong-random-key-here
heroku config:set FRONTEND_URL=https://your-frontend.vercel.app
```

#### Deploy
```bash
# From backend folder
cd backend
git push heroku main

# Monitor logs
heroku logs --tail
```

#### Verify Deployment
```bash
heroku open
# Should see "Server running on port" in logs
```

### Option B: Railway

1. Connect to GitHub at [railway.app](https://railway.app)
2. Select social-post-app repository
3. Railway auto-detects Node.js
4. Set environment variables in dashboard
5. Deploy automatically

### Option C: AWS EC2

1. Launch Ubuntu instance
2. SSH into server
3. Install Node.js, MongoDB
4. Clone repository
5. Configure .env
6. Run with PM2

```bash
npm install -g pm2
pm2 start backend/server.js --name "social-post-api"
pm2 save
pm2 startup
```

---

## 🌐 Step 3: Deploy Frontend

### Option A: Vercel (Easiest)

#### Setup
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Import project
4. Enable "Deploy on Push"

#### Configure
1. In Project Settings → Environment Variables:
   ```
   REACT_APP_API_URL=https://your-backend.herokuapp.com/api
   ```

2. Deploy automatic on git push

#### Verify
- Should see "Production Deployment" status
- App opens at `your-project.vercel.app`

### Option B: Netlify

1. Go to [netlify.com](https://netlify.com)
2. Connect GitHub account
3. Select repository
4. Build settings:
   - Build command: `npm run build`
   - Publish directory: `build`

5. Add environment variable:
   ```
   REACT_APP_API_URL=https://your-backend.herokuapp.com/api
   ```

### Option C: AWS S3 + CloudFront

1. Build production:
   ```bash
   npm run build
   ```

2. Upload to S3
3. Set up CloudFront
4. Configure custom domain

---

## ✅ Post-Deployment Checklist

### Backend
- [ ] Server running at correct URL
- [ ] MongoDB connected successfully
- [ ] Hello health check endpoint: `/api/health`
- [ ] CORS configured properly
- [ ] Environment variables set

### Frontend
- [ ] App loads at correct URL
- [ ] Can sign up successfully
- [ ] Can create posts
- [ ] Can like/comment
- [ ] No console errors

### Testing
- [ ] API calls from frontend work
- [ ] Images upload successfully
- [ ] Like/comment features work
- [ ] Authentication persists
- [ ] Performance acceptable

### Monitoring
- [ ] Set up error logging (Sentry)
- [ ] Monitor server logs
- [ ] Check database usage
- [ ] Setup uptime monitoring

---

## 🔓 Environment Variables Summary

### Backend

```env
# Production Backend .env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/social-post-app
JWT_SECRET=your-strong-secret-key-min-32-chars
JWT_EXPIRE=7d
FRONTEND_URL=https://your-frontend.vercel.app
```

### Frontend

```env
# Production Frontend .env
REACT_APP_API_URL=https://your-backend.herokuapp.com/api
```

---

## 🆘 Troubleshooting

### Backend Won't Deploy
```bash
# Check logs
heroku logs --tail

# Redeploy
git push heroku main --force

# Check stack
heroku buildpacks
```

### Frontend Can't Reach API
- [ ] Check `REACT_APP_API_URL` is correct
- [ ] Check backend server is running
- [ ] Check CORS is enabled in backend
- [ ] Check network requests in DevTools

### MongoDB Connection Failed
- [ ] Verify connection string
- [ ] Check IP whitelist (allow 0.0.0.0/0 or add your IP)
- [ ] Check username/password
- [ ] Check cluster status in MongoDB Atlas

### Slow Application
- [ ] Check database indexes
- [ ] Monitor server resources
- [ ] Check network latency
- [ ] Consider database optimization

---

## 📊 Performance Tips

1. **Database**
   - Index frequently queried fields
   - Archive old data
   - Monitor query performance

2. **Server**
   - Enable gzip compression
   - Use caching headers
   - Optimize middleware

3. **Frontend**
   - Code splitting (React.lazy)
   - Image optimization
   - Minify CSS/JS (automatic with build)

---

## 🔐 Security for Production

1. **Secrets**
   - Use strong JWT_SECRET
   - Never commit .env
   - Rotate secrets regularly

2. **HTTPS**
   - Use SSL certificates
   - Redirect HTTP to HTTPS
   - Set HSTS headers

3. **API**
   - Rate limiting
   - Input validation
   - CORS carefully configured

4. **Database**
   - Regular backups
   - IP whitelisting
   - Strong passwords

---

## 📱 Domain & DNS

### Custom Domain on Vercel
1. Add domain in Vercel dashboard
2. Update DNS records (shown in Vercel)
3. Wait for DNS propagation (up to 48 hours)

### Custom Domain on Heroku
1. Add domain: `heroku domains:add www.example.com`
2. Update DNS CNAME to Heroku
3. SSL auto-configured

---

## 🎯 Next Steps

1. **Monitor Performance**
   - Set up error tracking (Sentry)
   - Monitor uptime (UptimeRobot)
   - Track user analytics

2. **Scale When Needed**
   - Upgrade server tier
   - Add caching layer (Redis)
   - Consider load balancer

3. **Continuous Improvement**
   - Gather user feedback
   - Fix bugs quickly
   - Add new features
   - Monitor metrics

---

## 📞 Support

Need help?
- Check GitHub Issues
- Review Heroku documentation
- Check Vercel documentation
- Contact MongoDB support

---

**🎉 Congratulations! Your app is live!**
