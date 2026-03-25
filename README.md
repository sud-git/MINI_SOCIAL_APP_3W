# 🌐 Social Post App

[![React](https://img.shields.io/badge/React-18.2.0-blue?logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-14+-green?logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7.0-green?logo=mongodb)](https://www.mongodb.com/)
[![Express.js](https://img.shields.io/badge/Express.js-4.18-black?logo=express)](https://expressjs.com/)
[![Material-UI](https://img.shields.io/badge/Material--UI-5.11-blue?logo=mui)](https://mui.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow)](LICENSE)
[![Stars](https://img.shields.io/github/stars/yourusername/social-post-app?style=social)](https://github.com/yourusername/social-post-app)

A modern, full-stack social media application where users can share posts, engage through likes and comments, and connect with a community. Built with React, Express.js, and MongoDB, featuring a focus on performance, security, and user experience.

**[Live Demo](https://your-deployed-app.com)** • **[Report Bug](https://github.com/yourusername/social-post-app/issues)** • **[Request Feature](https://github.com/yourusername/social-post-app/issues)**

---

## ✨ Features

### 👤 User Management
- **Secure Authentication** - Signup and login with JWT token-based authentication
- **Password Security** - Passwords hashed using bcryptjs (industry-standard)
- **Session Persistence** - Tokens stored in localStorage for seamless user experience
- **Protected Routes** - Automatic redirects based on authentication status

### 📝 Post Management
- **Create Posts** - Share posts with text content and/or images
- **Image Support** - Base64 encoding for easy image storage and retrieval
- **Edit & Delete** - Manage your own posts with full control
- **Chronological Feed** - Posts displayed in newest-first order

### ❤️ Social Interactions
- **Like System** - Like/unlike posts with real-time count updates
- **Comment Section** - Add comments to posts with automatic timestamps
- **User Attribution** - All interactions show who created them
- **Expandable Comments** - Smooth animations when viewing post comments

### 🎨 User Interface
- **Material Design** - Professional, polished components from Material-UI
- **Responsive Layout** - Optimized for desktop, tablet, and mobile devices
- **Smooth Animations** - Framer Motion animations for delightful interactions
- **Loading States** - Skeleton loaders and spinners for better UX
- **Toast Notifications** - Real-time feedback on user actions

### ⚡ Performance
- **Memoized Components** - Prevents unnecessary re-renders for optimal performance
- **Optimized Images** - Base64 encoding with efficient storage
- **Lazy Loading** - Smart loading of components and data
- **Fast API** - RESTful endpoints designed for quick responses

---

## 🛠️ Tech Stack

### Frontend Dependencies

| Technology | Version | Purpose |
|-----------|---------|---------|
| **React** | 18.2.0 | UI library and component framework |
| **React Router DOM** | v6 | Client-side routing with protected routes |
| **Material-UI (@mui)** | 5.11.0 | Professional component library and theming |
| **Framer Motion** | 10.18.0 | Smooth animations and transitions |
| **Notistack** | 3.0.2 | Toast notifications and alerts |
| **Date-fns** | 2.29.3 | Date formatting and manipulation utilities |
| **Emotion** | Latest | CSS-in-JS styling solution |

### Backend Dependencies

| Technology | Version | Purpose |
|-----------|---------|---------|
| **Express.js** | 4.18.2 | Web server framework and routing |
| **Node.js** | 14+ | JavaScript runtime environment |
| **MongoDB** | 7.0 | NoSQL document database |
| **Mongoose** | 7.0.0 | MongoDB object modeling with schema validation |
| **JWT** (jsonwebtoken) | 9.0.0 | Token-based authentication mechanism |
| **bcryptjs** | 2.4.3 | Password hashing and security |
| **CORS** | Latest | Cross-origin request handling |
| **Dotenv** | Latest | Environment variable management |

---

## 📋 Prerequisites & System Requirements

### Required Software
- **Node.js** (v14.0.0 or higher) - [Download](https://nodejs.org/)
- **npm** (v6.0.0 or higher) - Comes with Node.js
- **MongoDB** - [Local Install](https://docs.mongodb.com/manual/installation/) or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (Free)
- **Git** (v2.0+) - [Download](https://git-scm.com/)

### Recommended Tools
- **VS Code** - Code editor with extensions
- **Postman** - API testing tool
- **MongoDB Compass** - MongoDB client GUI
- **GitKraken** - Git client (optional)

### Verify Installation
```bash
node --version    # Should output v14.0.0 or higher
npm --version     # Should output v6.0.0 or higher
git --version     # Should output git version 2.0 or higher
```

---

## 🚀 Getting Started in 5 Minutes

### Step 1: Clone the Repository
```bash
git clone https://github.com/yourusername/social-post-app.git
cd social-post-app
```

### Step 2: Backend Setup
```bash
cd backend

# Install dependencies
npm install

# Create .env from example
cp .env.example .env

# Edit .env file with your configuration
# Windows:
notepad .env
# macOS/Linux:
nano .env
```

#### Backend .env Configuration
```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database (use local MongoDB or MongoDB Atlas)
MONGODB_URI=mongodb://localhost:27017/social-post-app
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/social-post-app?retryWrites=true&w=majority

# JWT Settings (change JWT_SECRET to a random string min 32 characters)
JWT_SECRET=your-random-secret-key-minimum-32-characters-long-for-security
JWT_EXPIRE=7d

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000
```

### Step 3: Frontend Setup
```bash
cd ../frontend

# Install dependencies
npm install

# Create .env from example
cp .env.example .env
```

#### Frontend .env Configuration
```env
# API Endpoint
REACT_APP_API_URL=http://localhost:5000/api
```

### Step 4: Start the Application

**Terminal 1 - Start Backend:**
```bash
cd backend
npm start
# Or use npm run dev for development with auto-reload
```

**Terminal 2 - Start Frontend:**
```bash
cd frontend
npm start
```

🎉 **Application will open at `http://localhost:3000`**

---

## 📁 Project Structure

```
social-post-app/
│
├── 📂 backend/
│   ├── 📂 config/
│   │   └── db.js                  # MongoDB connection setup
│   ├── 📂 controllers/
│   │   ├── authController.js      # User signup/login logic
│   │   └── postController.js      # Post CRUD & interactions
│   ├── 📂 middleware/
│   │   └── auth.js                # JWT verification middleware
│   ├── 📂 models/
│   │   ├── Post.js                # Post schema definition
│   │   └── User.js                # User schema definition
│   ├── 📂 routes/
│   │   ├── auth.js                # Authentication endpoints
│   │   └── posts.js               # Post endpoints
│   ├── .env                       # Environment variables (DO NOT COMMIT)
│   ├── .env.example               # Example env template
│   ├── server.js                  # Express app initialization
│   ├── package.json               # Dependencies & scripts
│   └── package-lock.json
│
├── 📂 frontend/
│   ├── 📂 public/
│   │   ├── favicon.ico
│   │   └── index.html             # HTML template
│   ├── 📂 src/
│   │   ├── 📂 components/
│   │   │   ├── Navbar.jsx         # Navigation bar
│   │   │   ├── CreatePost.jsx     # Post creation form
│   │   │   ├── EnhancedCreatePost.jsx
│   │   │   ├── EnhancedPostCard.jsx  # Enhanced post display
│   │   │   ├── EnhancedNavbar.jsx    # Enhanced navigation
│   │   │   ├── PostCard.jsx       # Basic post card
│   │   │   ├── CommentForm.jsx    # Memoized comment input
│   │   │   └── SkeletonLoader.jsx # Loading placeholder
│   │   ├── 📂 context/
│   │   │   └── AuthContext.jsx    # Global auth state (React Context)
│   │   ├── 📂 pages/
│   │   │   ├── Login.jsx          # Login page
│   │   │   ├── Signup.jsx         # Registration page
│   │   │   └── Feed.jsx           # Main posts feed
│   │   ├── 📂 services/
│   │   │   └── api.js             # API service layer
│   │   ├── App.jsx                # Main app router
│   │   ├── index.js               # React entry point
│   │   └── index.css              # Global styles
│   ├── .env                       # Environment variables (DO NOT COMMIT)
│   ├── .env.example               # Example env template
│   ├── package.json               # Dependencies & scripts
│   └── package-lock.json
│
├── 📄 ARCHITECTURE.md             # System design & data flow
├── 📄 CONTRIBUTING.md             # Contribution guidelines
├── 📄 DEPLOYMENT.md               # Production deployment guide
├── 📄 FEATURES.md                 # Detailed feature documentation
├── 📄 LICENSE                     # MIT License
├── 📄 PROJECT_STRUCTURE.md        # Detailed structure overview
├── 📄 README.md                   # This file
├── 📄 UI_ENHANCEMENTS.md          # UI improvement notes
├── 📄 UI_TRANSFORMATION.md        # UI transformation details
└── 📄 .gitignore                  # Git ignore rules
```

---

## 🔌 API Endpoints Documentation

### Authentication Endpoints (`/api/auth`)

#### POST `/signup` - Create New Account
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_doe",
    "email": "john@example.com",
    "password": "SecurePass123!"
  }'
```

**Response (Success):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "username": "john_doe",
    "email": "john@example.com"
  }
}
```

#### POST `/login` - User Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "SecurePass123!"
  }'
```

**Response (Success):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "username": "john_doe",
    "email": "john@example.com"
  }
}
```

### Posts Endpoints (`/api/posts`)

All post endpoints require authentication. Include token in Authorization header:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

#### GET `/` - Get All Posts
```bash
curl http://localhost:5000/api/posts \
  -H "Authorization: Bearer YOUR_TOKEN"
```

#### POST `/` - Create New Post
```bash
curl -X POST http://localhost:5000/api/posts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "content": "This is my first post!",
    "image": "data:image/jpeg;base64,iVBORw0KGgoAAAANS..."
  }'
```

#### PUT `/:id` - Update Post
```bash
curl -X PUT http://localhost:5000/api/posts/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "content": "Updated post content"
  }'
```

#### DELETE `/:id` - Delete Post
```bash
curl -X DELETE http://localhost:5000/api/posts/507f1f77bcf86cd799439011 \
  -H "Authorization: Bearer YOUR_TOKEN"
```

#### POST `/:id/like` - Like a Post
```bash
curl -X POST http://localhost:5000/api/posts/507f1f77bcf86cd799439011/like \
  -H "Authorization: Bearer YOUR_TOKEN"
```

#### POST `/:id/unlike` - Unlike a Post
```bash
curl -X POST http://localhost:5000/api/posts/507f1f77bcf86cd799439011/unlike \
  -H "Authorization: Bearer YOUR_TOKEN"
```

#### POST `/:id/comment` - Add Comment to Post
```bash
curl -X POST http://localhost:5000/api/posts/507f1f77bcf86cd799439011/comment \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "text": "Great post!"
  }'
```

---

## 🔐 Authentication & Security

### How Authentication Works

1. **User Registration**
   - User provides username, email, and password
   - Password is hashed using bcryptjs (10 rounds of salt)
   - User stored in MongoDB with hashed password
   - JWT token generated and returned

2. **User Login**
   - User provides email and password
   - Password compared with stored hash (bcryptjs.compare)
   - If match, JWT token generated for 7 days
   - Token stored in frontend localStorage

3. **Protected Requests**
   - Frontend automatically includes token in Authorization header
   - Backend middleware verifies token signature
   - Token decoded to extract user information
   - Unauthorized requests rejected with 401 error

4. **Token Storage**
   - Frontend: localStorage (persists across sessions)
   - Backend: JWT secret in .env (environment variable)

### Security Best Practices Implemented
- ✅ Passwords hashed with bcryptjs (10 salts)
- ✅ JWT tokens expire after 7 days
- ✅ CORS configured to prevent origin attacks
- ✅ Protected API endpoints require valid token
- ✅ Environment variables keep secrets safe
- ✅ Sensitive files excluded via .gitignore

---

## 🧪 Testing the Application

### Create Test Account
1. Click **"Sign Up"** on homepage
2. Fill in credentials:
   - **Username:** testuser (min 3 chars)
   - **Email:** test@example.com
   - **Password:** Test@123 (min 6 chars)
3. Click **"Create Account"**

### Test Creating a Post
1. Login with test account
2. Click **"Create a new post"**
3. Enter content: "Hello, this is my first post!"
4. Optionally upload an image
5. Click **"Post"**
6. Post appears at top of feed

### Test Like Feature
1. Click **❤️** icon on any post
2. Icon turns red and count increases
3. Click again to unlike
4. Count decreases and icon uncolors
5. Works for all users in real-time

### Test Comment Feature
1. Click **💬 Comment** button on post
2. Comment section expands smoothly
3. Type a comment: "Great post!"
4. Press **Ctrl+Enter** (or Cmd+Enter on Mac)
5. Comment appears with timestamp
6. Close comment section by clicking again

### Multi-User Testing
1. Open **private/incognito window**
2. Create **second user account**
3. Login to first account in regular window
4. Login to second account in incognito
5. Have both create posts
6. Like/comment on posts from other account
7. See interactions update in real-time

---

## 🚀 Production Deployment

### Deployment Checklist
- [ ] All environment variables configured
- [ ] MongoDB Atlas cluster set up
- [ ] JWT_SECRET changed to secure random value
- [ ] FRONTEND_URL updated to production domain
- [ ] CORS whitelist updated for production
- [ ] Backend running on production server
- [ ] Frontend built and deployed
- [ ] Custom domain configured (optional)
- [ ] SSL/HTTPS enabled
- [ ] Database backups configured
- [ ] Error monitoring set up (optional)

For detailed deployment instructions, see **[DEPLOYMENT.md](DEPLOYMENT.md)**

### Popular Deployment Platforms

**Backend Options:**
- [Heroku](https://www.heroku.com/) - Easy deployment, free tier available
- [Railway](https://railway.app/) - Modern alternative to Heroku
- [Render](https://render.com/) - Simple, free deployment
- [AWS EC2](https://aws.amazon.com/ec2/) - Full control, scalable
- [DigitalOcean](https://www.digitalocean.com/) - Affordable droplets

**Frontend Options:**
- [Vercel](https://vercel.com/) - Optimized for React, automatic deployments
- [Netlify](https://netlify.com/) - Easy deployment, serverless functions
- [GitHub Pages](https://pages.github.com/) - Free, built-in to GitHub
- [AWS S3 + CloudFront](https://aws.amazon.com/s3/) - CDN distribution
- [Surge.sh](https://surge.sh/) - Simple static hosting

**Database Options:**
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) - Cloud MongoDB (free tier)
- [AWS RDS](https://aws.amazon.com/rds/) - Full managed service

---

## 🔧 Development Scripts

### Backend Scripts
```bash
npm start       # Start production server (port 5000)
npm run dev     # Start with nodemon (auto-reload on file changes)
npm test        # Run test suite (if configured)
npm run lint    # Run ESLint (if configured)
```

### Frontend Scripts
```bash
npm start       # Start development server (port 3000)
npm run build   # Create optimized production build
npm run test    # Run test suite
npm run eject   # Eject from Create React App (⚠️ IRREVERSIBLE)
npm run lint    # Run ESLint (if configured)
```

---

## 🐛 Troubleshooting & Common Issues

### Backend Issues

#### ❌ Error: Cannot connect to MongoDB
```bash
# Solution 1: Check MongoDB is running
mongod --version
mongod  # Start MongoDB locally

# Solution 2: Verify connection string
# Local: mongodb://localhost:27017/social-post-app
# Atlas: mongodb+srv://user:pass@cluster.mongodb.net/social-post-app

# Solution 3: Check firewall settings
# MongoDB Atlas: Allow 0.0.0.0/0 in Network Access settings
```

#### ❌ Error: Port 5000 already in use
```bash
# Solution 1: Change port in .env
PORT=5001

# Solution 2: Kill process using port on Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Solution 2: Kill process on macOS/Linux
lsof -i :5000
kill -9 <PID>
```

#### ❌ JWT errors or authentication failing
```bash
# Solution 1: Verify JWT_SECRET exists in .env
# Change to strong random string (min 32 characters)
JWT_SECRET=your-random-string-here

# Solution 2: Clear localStorage and login again
# In browser console:
localStorage.clear();
window.location.reload();
```

### Frontend Issues

#### ❌ Error: Failed to fetch from API
```bash
# Solution 1: Check backend is running
# Terminal: cd backend && npm start

# Solution 2: Verify API URL in frontend .env
# Should be: REACT_APP_API_URL=http://localhost:5000/api

# Solution 3: Check CORS headers
# Backend should have: CORS enabled in server.js
# Frontend URL in whitelist
```

#### ❌ Error: Port 3000 already in use
```bash
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# macOS/Linux:
lsof -i :3000
kill -9 <PID>
```

#### ❌ Images not uploading
```bash
# Solution 1: Check image size (max 50MB in backend)
# Solution 2: Verify file is valid image format
# Solution 3: Check browser console for errors
# Open DevTools: F12 → Console tab
```

#### ❌ Comments or likes not updating
```bash
# Solution 1: Hard refresh browser
# Windows/Linux: Ctrl+Shift+R
# macOS: Cmd+Shift+R

# Solution 2: Clear browser cache
# DevTools → Application → Clear Storage

# Solution 3: Check network requests
# DevTools → Network tab → Look for failed requests
```

---

## 📚 Additional Documentation

- **[ARCHITECTURE.md](ARCHITECTURE.md)** - System design, data flow, and component relationships
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Detailed production deployment guide
- **[CONTRIBUTING.md](CONTRIBUTING.md)** - How to contribute code and report issues
- **[FEATURES.md](FEATURES.md)** - Complete feature documentation
- **[PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)** - Detailed folder structure
- **[UI_ENHANCEMENTS.md](UI_ENHANCEMENTS.md)** - UI improvements and design decisions
- **[UI_TRANSFORMATION.md](UI_TRANSFORMATION.md)** - UI transformation details

---

## 🤝 Contributing

We welcome contributions! Whether it's bug fixes, features, or documentation, your help makes this project better.

### Quick Contributing Guide

1. **Fork & Clone**
   ```bash
   git clone https://github.com/YOUR-USERNAME/social-post-app.git
   cd social-post-app
   ```

2. **Create Feature Branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make Changes**
   - Write clean, readable code
   - Add comments for complex logic
   - Test your changes thoroughly

4. **Commit with Clear Messages**
   ```bash
   git commit -m 'Add amazing feature'
   ```

5. **Push & Create Pull Request**
   ```bash
   git push origin feature/amazing-feature
   ```
   - Go to GitHub and open Pull Request
   - Describe what you changed and why

### Code Style Guidelines
- Use meaningful variable names (avoid `a`, `b`, `x`)
- Keep functions small and focused (single responsibility)
- Add comments for "why", not "what"
- Follow existing code patterns
- Test before submitting PR

### Report Bugs
- Go to [Issues](https://github.com/yourusername/social-post-app/issues)
- Click "New Issue"
- Use clear title and detailed description
- Include steps to reproduce
- Attach screenshots if applicable

### Suggest Features
- Go to [Issues](https://github.com/yourusername/social-post-app/issues)
- Start title with "Feature:"
- Explain why feature is useful
- Provide examples or mockups

Full guidelines in **[CONTRIBUTING.md](CONTRIBUTING.md)**

---

## 📄 License

This project is licensed under the **MIT License** - see [LICENSE](LICENSE) file for details.

### MIT License Summary
- ✅ You can use, copy, and modify freely
- ✅ You can distribute the code
- ✅ You can use in commercial projects
- ⚠️ Must include license and attribution
- ⚠️ No liability - use at your own risk

---

## 👨‍💻 Built With ❤️ By

This project demonstrates professional full-stack development with:
- **Clean, maintainable code** - Easy to read and modify
- **Best practices & patterns** - Industry-standard approaches
- **Secure authentication** - JWT + bcryptjs
- **Responsive design** - Works on all devices
- **Performance optimized** - Memoization & efficient rendering
- **Professional API design** - RESTful endpoints
- **Comprehensive documentation** - Clear guides for everyone

---

## 🆘 Support & Help

### Need Help?
- 📖 Check the [Troubleshooting](#-troubleshooting--common-issues) section
- 📄 Read the [DEPLOYMENT.md](DEPLOYMENT.md) for setup help
- 📝 Search [GitHub Issues](https://github.com/yourusername/social-post-app/issues)

### Found a Problem?
- 🐛 Report bug on [GitHub Issues](https://github.com/yourusername/social-post-app/issues)
- Include error message and steps to reproduce
- Attach screenshots if helpful

### Feature Requests
- 💡 Suggest ideas on [GitHub Issues](https://github.com/yourusername/social-post-app/issues)
- Describe use case and benefits
- Community voting helps prioritize

---

## 📊 Project Stats

- **Frontend Components:** 10+ React components
- **Backend Routes:** 12 API endpoints
- **Database Collections:** 2 (Users, Posts)
- **Lines of Code:** 3000+
- **Dependencies:** 30+ npm packages
- **Test Coverage:** Coming soon
- **Documentation Pages:** 8

---

## 🎯 Roadmap

### Coming Soon
- [ ] User profiles with bio and avatar
- [ ] Follow/unfollow functionality
- [ ] Direct messaging between users
- [ ] Post sharing and retweets
- [ ] Trending topics/hashtags
- [ ] User search functionality
- [ ] Dark mode theme
- [ ] Email notifications
- [ ] Mobile app (React Native)

---

## ⭐ Show Your Support

If you found this project helpful, please give it a **⭐ Star** on GitHub!

Your support encourages continued development and improvements.

```
"Building community, one post at a time" 🚀
```

---

## 📞 Stay Connected

- **GitHub:** [yourusername/social-post-app](https://github.com/yourusername/social-post-app)
- **Issues:** [Report bugs](https://github.com/yourusername/social-post-app/issues)
- **Discussions:** [Ask questions](https://github.com/yourusername/social-post-app/discussions)

---

<div align="center">

**[⬆ back to top](#-social-post-app)**

Made with ❤️ | [MIT License](LICENSE) | Last Updated: January 2024

</div>
