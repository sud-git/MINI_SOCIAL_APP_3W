# Installation Guide

Complete step-by-step instructions for setting up the Social Post App on your machine.

---

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Clone Repository](#clone-repository)
3. [Backend Setup](#backend-setup)
4. [Frontend Setup](#frontend-setup)
5. [Database Setup](#database-setup)
6. [Verify Installation](#verify-installation)
7. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### System Requirements
- **Operating System:** Windows, macOS, or Linux
- **RAM:** Minimum 2GB (4GB recommended)
- **Disk Space:** At least 1GB free space

### Required Software

#### 1. Node.js & npm

**Check if installed:**
```bash
node --version    # Should be v14.0.0 or higher
npm --version     # Should be v6.0.0 or higher
```

**If not installed:**

**Windows:**
1. Visit [nodejs.org](https://nodejs.org/)
2. Download LTS version
3. Run installer and follow prompts
4. Accept all defaults

**macOS:**
```bash
# Using Homebrew (recommended)
brew install node

# Or download from nodejs.org
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt update
sudo apt install nodejs npm
```

#### 2. Git

**Check if installed:**
```bash
git --version     # Should be 2.0 or higher
```

**If not installed:**
- **Windows:** [Download Git](https://git-scm.com/download/win)
- **macOS:** `brew install git`
- **Linux:** `sudo apt install git`

#### 3. MongoDB

Choose one option:

**Option A: Local MongoDB (Recommended for Development)**

**Windows:**
1. Download [MongoDB Community Server](https://www.mongodb.com/try/download/community)
2. Run installer as administrator
3. Follow setup wizard
4. MongoDB will run as a Windows service

**Verify:**
```bash
mongod --version   # Should show version
```

**Option B: MongoDB Atlas (Cloud - Easiest)**

1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Click "Sign Up"
3. Create account
4. Create a free cluster (M0 tier)
5. Copy connection string (you'll need this later)

---

## Clone Repository

### Using Git (Recommended)

```bash
# Clone the repository
git clone https://github.com/yourusername/social-post-app.git

# Enter directory
cd social-post-app
```

### Using GitHub Desktop
1. Open [GitHub Desktop](https://desktop.github.com/)
2. Click "File" → "Clone repository"
3. Enter: `https://github.com/yourusername/social-post-app.git`
4. Choose local path
5. Click "Clone"

---

## Backend Setup

### Step 1: Navigate to Backend
```bash
cd backend
```

### Step 2: Install Dependencies
```bash
npm install
```

This will download and install all dependencies (Express, Mongoose, etc.)
Takes 1-2 minutes to complete.

### Step 3: Create Environment File

**Windows:**
```bash
copy .env.example .env
```

**macOS/Linux:**
```bash
cp .env.example .env
```

### Step 4: Configure Environment Variables

**Open `.env` file** with your text editor:

**Windows:**
```bash
notepad .env
```

**macOS/Linux:**
```bash
nano .env   # or vim .env
```

**Configure these values:**

```env
# Server Port
PORT=5000

# Environment
NODE_ENV=development

# MongoDB Connection
# Option 1 - Local MongoDB:
MONGODB_URI=mongodb://localhost:27017/social-post-app

# Option 2 - MongoDB Atlas (replace username, password, clustername):
# MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/social-post-app?retryWrites=true&w=majority

# JWT Settings (create a random string, min 32 characters)
JWT_SECRET=your-random-secret-key-here-minimum-32-characters-for-security
JWT_EXPIRE=7d

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000
```

### Step 5: Verify Backend

```bash
# Test if server starts
npm start

# You should see:
# Server running on port 5000
# Connected to MongoDB
```

**Press Ctrl+C** to stop the server (we'll keep it running later)

---

## Frontend Setup

### Step 1: Navigate to Frontend

```bash
# From project root (not backend)
cd frontend
```

### Step 2: Install Dependencies

```bash
npm install
```

Takes 2-3 minutes. You might see some warnings - these are usually safe.

### Step 3: Create Environment File

**Windows:**
```bash
copy .env.example .env
```

**macOS/Linux:**
```bash
cp .env.example .env
```

### Step 4: Configure Environment Variables

**Open `.env` file:**

**Windows:**
```bash
notepad .env
```

**macOS/Linux:**
```bash
nano .env
```

**Set this value:**

```env
# Backend API URL
REACT_APP_API_URL=http://localhost:5000/api
```

### Step 5: Verify Frontend

```bash
# Test if React app builds
npm run build

# Should complete without errors
# Creates "build" folder
```

---

## Database Setup

### Local MongoDB Setup

**Start MongoDB service:**

**Windows:**
```bash
# MongoDB runs automatically as Windows service
# Verify it's running:
mongod --version
```

**macOS:**
```bash
# If installed via Homebrew:
brew services start mongodb-community
```

**Linux:**
```bash
sudo systemctl start mongod
sudo systemctl enable mongod    # Auto-start on boot
```

**Verify connection:**
```bash
mongosh                         # MongoDB CLI
# Should connect successfully
# Type: exit (to quit)
```

### MongoDB Atlas Setup

If using cloud MongoDB:

1. **Create Cluster**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Sign in to your account
   - Click "Create" → Create new cluster
   - Choose Free tier (M0)
   - Select a region near you
   - Create cluster

2. **Create Database User**
   - Go to "Security" → "Database Access"
   - Click "Add New Database User"
   - Username: `admin`
   - Password: Create strong password (save it!)
   - Click "Add User"

3. **Whitelist IP Address**
   - Go to "Security" → "Network Access"
   - Click "Add IP Address"
   - Choose "Allow access from anywhere" (0.0.0.0/0)
   - Click "Confirm"

4. **Get Connection String**
   - Go to "Databases" → "Connect"
   - Select "Connect your application"
   - Copy MongoDB+SRV connection string
   - Replace `<password>` with your actual password
   - Use as `MONGODB_URI` in backend `.env`

---

## Verify Installation

### Check All Components

```bash
# Terminal 1: Verify Node.js
node --version
npm --version

# Terminal 2: Check MongoDB (if local)
mongosh

# Terminal 3: Navigate and check backend
cd backend
npm start
# Wait for "Connected to MongoDB" message

# Terminal 4: Navigate and check frontend (new terminal)
cd frontend
npm start
# Wait for "Compiled successfully" message
```

### Test Login

1. Open browser: `http://localhost:3000`
2. Click "Sign Up"
3. Create account with:
   - Username: `testuser` (min 3 chars)
   - Email: `test@example.com`
   - Password: `Test@123` (min 6 chars)
4. Click "Create Account"
5. Should redirect to Feed page
6. **Success! ✅**

---

## Running the Application

### Development Mode (with auto-reload)

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev    # Uses nodemon for auto-reload
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start      # React development server
```

### Production Mode

**Terminal 1 - Backend:**
```bash
cd backend
npm start      # Regular node server
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run build  # Create optimized build
npm install -g serve  # Need to install serve once
serve -s build         # Serve the build folder
```

---

## Troubleshooting Common Issues

### ❌ npm: command not found
```
Cause: Node.js not installed or not in PATH
Fix: Reinstall Node.js from nodejs.org
```

### ❌ Port 5000 already in use
```bash
# Windows: Kill process
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux: Kill process
lsof -i :5000
kill -9 <PID>
```

### ❌ Cannot find module
```bash
# Make sure you're in correct directory
pwd    # Check current directory
cd backend  # Navigate to backend

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### ❌ MongoDB connection error
```
Error: MongoServerError: connect ECONNREFUSED 127.0.0.1:27017

Solutions:
1. Start MongoDB service (see database setup)
2. Check MONGODB_URI in .env
3. Ensure MongoDB is installed correctly
4. Use MongoDB Atlas if local setup fails
```

### ❌ CORS errors
```
Error: Access to XMLHttpRequest blocked by CORS

Solutions:
1. Ensure backend is running on port 5000
2. Check FRONTEND_URL in backend/.env
3. Check REACT_APP_API_URL in frontend/.env
4. Filpaths: hard refresh browser (Ctrl+Shift+R)
```

### ❌ Port 3000 already in use
```bash
# Windows: Kill process
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# macOS/Linux: Kill process
lsof -i :3000
kill -9 <PID>
```

### ❌ npm install takes forever
```bash
# Clear cache
npm cache clean --force

# Try installing again
npm install
```

---

## Next Steps

1. ✅ Installation complete
2. 📖 Read [README.md](README.md) for features
3. 🏗️ Check [ARCHITECTURE.md](ARCHITECTURE.md) for design
4. 🚀 See [DEPLOYMENT.md](DEPLOYMENT.md) to deploy

---

## Getting Help

- Check [README.md](README.md) → Troubleshooting section
- Search [GitHub Issues](https://github.com/yourusername/social-post-app/issues)
- Open a new issue with:
  - What you did
  - What went wrong
  - Error message
  - Your operating system

---

**Installation Completed Successfully! 🎉**

Next: Start the application with the commands in "Running the Application" section above.
