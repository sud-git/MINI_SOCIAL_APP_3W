# Architecture & Data Flow Guide

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     CLIENT (BROWSER)                        │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              React Application                       │   │
│  │  ┌────────────────────────────────────────────────┐  │   │
│  │  │           App.jsx (Router)                     │  │   │
│  │  │  ┌──────────────────────────────────────────┐  │  │   │
│  │  │  │     Pages (Login, Signup, Feed)          │  │  │   │
│  │  │  │  ┌────────────────────────────────────┐  │  │  │   │
│  │  │  │  │  Components (Navbar, PostCard...)  │  │  │  │   │
│  │  │  │  └────────────────────────────────────┘  │  │  │   │
│  │  │  └──────────────────────────────────────────┘  │  │   │
│  │  │                                                 │  │   │
│  │  │  AuthContext (State Management)                │  │   │
│  │  │  - user, token, login(), logout()              │  │   │
│  │  └────────────────────────────────────────────────┘  │   │
│  │                                                        │   │
│  │  Services Layer (api.js)                            │   │
│  │  - authAPI.signup, login                            │   │
│  │  - postsAPI.create, like, comment                   │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
│                    HTTP/JSON (REST API)                     │
└──────────────────────────────────────────────────────────────┘
                           ↓↑
┌──────────────────────────────────────────────────────────────┐
│                  SERVER (Node.js/Express)                    │
│  ┌──────────────────────────────────────────────────────┐    │
│  │  Routes (auth.js, posts.js)                        │    │
│  │  ├─ POST /api/auth/signup                          │    │
│  │  ├─ POST /api/auth/login                           │    │
│  │  ├─ POST /api/posts/create                         │    │
│  │  ├─ GET /api/posts                                 │    │
│  │  ├─ PUT /api/posts/like/:id                        │    │
│  │  └─ POST /api/posts/comment/:id                    │    │
│  └──────────────────────────────────────────────────────┘    │
│                           ↓↑                                  │
│  ┌──────────────────────────────────────────────────────┐    │
│  │  Middleware (auth.js)                              │    │
│  │  - JWT token verification                          │    │
│  │  - User authentication check                       │    │
│  └──────────────────────────────────────────────────────┘    │
│                           ↓↑                                  │
│  ┌──────────────────────────────────────────────────────┐    │
│  │  Controllers                                        │    │
│  │  - authController.js (signup, login)               │    │
│  │  - postController.js (CRUD, like, comment)         │    │
│  └──────────────────────────────────────────────────────┘    │
│                           ↓↑                                  │
│  ┌──────────────────────────────────────────────────────┐    │
│  │  Models (Mongoose)                                 │    │
│  │  - User.js (username, email, password)             │    │
│  │  - Post.js (text, image, likes, comments)          │    │
│  └──────────────────────────────────────────────────────┘    │
└──────────────────────────────────────────────────────────────┘
                           ↓↑
┌──────────────────────────────────────────────────────────────┐
│              DATABASE (MongoDB)                              │
│  ┌──────────────────────────────────────────────────────┐    │
│  │  Collections:                                       │    │
│  │  - users { _id, username, email, password, ... }   │    │
│  │  - posts { _id, userId, username, text, image,     │    │
│  │           likes[], comments[], createdAt, ... }    │    │
│  └──────────────────────────────────────────────────────┘    │
└──────────────────────────────────────────────────────────────┘
```

## 🔄 Data Flow Sequences

### 1. Signup Flow

```
User Input (Username, Email, Password)
         ↓
Frontend api.signup() - POST request
         ↓
Backend route /auth/signup
         ↓
authController.signup()
         ↓
Validate input (unique email/username)
         ↓
Hash password with bcrypt
         ↓
Save User to MongoDB
         ↓
Generate JWT token
         ↓
Return token + user data
         ↓
Frontend stores in localStorage
         ↓
Update AuthContext (user, token)
         ↓
Redirect to /feed
```

### 2. Login Flow

```
User Input (Email, Password)
         ↓
Frontend api.login() - POST request
         ↓
Backend route /auth/login
         ↓
authController.login()
         ↓
Find user by email in MongoDB
         ↓
Compare password with bcrypt
         ↓
If match: Generate JWT token
         ↓
Return token + user data
         ↓
If no match: Return error
         ↓
Frontend stores token in localStorage
         ↓
Update AuthContext
         ↓
Redirect to /feed
```

### 3. Create Post Flow

```
User Input (Text, Image)
         ↓
CreatePost component
         ↓
Validate (at least text or image)
         ↓
Frontend api.createPost() - POST with Bearer token
         ↓
Backend route /posts/create
         ↓
Middleware auth.js verifies JWT
         ↓
postController.createPost()
         ↓
Get user details from JWT
         ↓
Create Post object with:
  - userId
  - username
  - text
  - image
  - likes: []
  - comments: []
         ↓
Save to MongoDB
         ↓
Return created post
         ↓
Frontend Feed refreshes posts
         ↓
New post appears at top
```

### 4. Like Post Flow

```
User Clicks Heart Icon
         ↓
PostCard component
         ↓
Frontend api.likePost() - PUT with Bearer token
         ↓
Backend route /posts/like/:id
         ↓
Middleware verifies JWT
         ↓
postController.likePost()
         ↓
Find post by ID
         ↓
Check if username in likes array
         ↓
If exists: Remove (unlike)
If not: Add (like)
         ↓
Save updated post
         ↓
Return updated post + liked status
         ↓
Frontend updates like array
         ↓
UI updates instantly (heart color, count)
```

### 5. Comment Flow

```
User Types Comment + Clicks Reply
         ↓
PostCard component
         ↓
Frontend api.addComment() - POST with Bearer token
         ↓
Backend route /posts/comment/:id
         ↓
Middleware verifies JWT
         ↓
postController.addComment()
         ↓
Find post by ID
         ↓
Create comment object:
  - username (from JWT)
  - text (from form)
  - createdAt (timestamp)
         ↓
Push to post.comments array
         ↓
Save post
         ↓
Return updated post + comment
         ↓
Frontend refreshes post data
         ↓
Comment appears in section
```

### 6. Get Feed Flow

```
Feed page loads
         ↓
useEffect hook
         ↓
Frontend api.getAllPosts() - GET request
         ↓
Backend route /posts
         ↓
postController.getAllPosts()
         ↓
Query MongoDB: Post.find().sort({ createdAt: -1 })
         ↓
Return all posts (newest first)
         ↓
Frontend sets posts state
         ↓
Map posts to PostCard components
         ↓
Render feed with all posts
```

## 🔐 Authentication & Security

### JWT Token Flow

```
1. User logs in
2. Server generates JWT:
   - Header: { alg: "HS256", typ: "JWT" }
   - Payload: { id: user._id, iat: timestamp }
   - Signature: HMAC-SHA256(header + payload, secret)
3. Token sent to frontend
4. Frontend stores in localStorage
5. For protected routes:
   - Frontend includes: Authorization: Bearer <token>
   - Backend middleware decodes and verifies
   - If valid: attach user to request, allow route
   - If invalid/expired: reject request
```

### Password Security

```
User submits password
         ↓
Pre-save hook in User model
         ↓
Generate salt (bcrypt.genSalt(10))
         ↓
Hash password (bcrypt.hash(password, salt))
         ↓
Replace plain password with hash
         ↓
Save to MongoDB
         ↓
For login: Compare submitted password
         ↓
bcrypt.compare(submitted, stored hash)
         ↓
Returns true/false
```

## 📊 Data Models

### User Schema
```javascript
{
  _id: ObjectId,
  username: String (unique),
  email: String (unique),
  password: String (hashed),
  createdAt: Date
}
```

### Post Schema
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  username: String,
  text: String,
  image: String (base64 or URL),
  likes: [String] // array of usernames
  comments: [
    {
      username: String,
      text: String,
      createdAt: Date
    }
  ],
  createdAt: Date
}
```

## 🔌 API Request/Response Examples

### Signup Request
```
POST /api/auth/signup
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "secure123"
}

Response (201):
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "username": "john_doe",
    "email": "john@example.com"
  }
}
```

### Create Post Request
```
POST /api/posts/create
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "text": "Amazing day today!",
  "image": "data:image/jpeg;base64,/9j/4AAQSkZJRg..."
}

Response (201):
{
  "success": true,
  "post": {
    "_id": "507f1f77bcf86cd799439012",
    "userId": "507f1f77bcf86cd799439011",
    "username": "john_doe",
    "text": "Amazing day today!",
    "image": "data:image/jpeg;base64/...",
    "likes": [],
    "comments": [],
    "createdAt": "2024-03-24T10:30:00Z"
  }
}
```

### Like Post Request
```
PUT /api/posts/507f1f77bcf86cd799439012/like
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

Response (200):
{
  "success": true,
  "post": {
    "_id": "507f1f77bcf86cd799439012",
    "likes": ["john_doe"],
    ...
  },
  "liked": true
}
```

## 💾 State Management

### AuthContext
```
Provides:
- user: Current logged-in user object
- token: JWT token stored in localStorage
- loading: Initial load state
- isAuthenticated: Boolean check
- login(user, token): Set user and token
- logout(): Clear user and token
```

### Feed Component State
```
- posts: Array of all posts from API
- loading: Boolean for loading state
- Triggers fetch on mount
- Refreshes after create post
- Refreshes after add comment
- Updates like in local state
```

## 🔄 Component Communication

```
App.jsx (Router + AuthProvider)
│
├── Navbar (accesses AuthContext)
│   └── Uses user, logout from context
│
├── Login/Signup (accesses AuthContext)
│   └── Calls login() to update context
│
└── Feed (main content)
    ├── Navbar (props: none needed)
    ├── CreatePost (props: onPostCreated callback)
    │   └── Calls postsAPI.createPost()
    │   └── Calls onPostCreated() to refresh
    │
    └── PostCard (props: post, onLiked, onCommentAdded)
        ├── Like button calls postsAPI.likePost()
        ├── Comment button toggles comment section
        └── Submit calls postsAPI.addComment()
```

## ⚡ Performance Considerations

1. **Image Optimization**: Consider compressing images before base64 encoding
2. **Pagination**: Current design loads all posts - add pagination for scale
3. **Caching**: Consider caching posts to reduce API calls
4. **Lazy Loading**: Load comments only when expanded
5. **Database Indexes**: createdAt is indexed for sorting efficiency
6. **Token Refresh**: Implement refresh token mechanism

## 🚀 Deployment Considerations

### Backend Deployment
1. Use environment variables for all secrets
2. Set proper CORS origins
3. Use MongoDB Atlas for production database
4. Enable HTTPS
5. Add rate limiting middleware
6. Implement comprehensive logging

### Frontend Deployment
1. Build optimized production bundle
2. Deploy to CDN (Vercel, Netlify)
3. Set correct API URL in environment
4. Enable service workers for offline support
5. Optimize images and code splitting

---

This architecture supports:
✅ Scalable design
✅ Clean separation of concerns
✅ Secure authentication
✅ Real-time updates
✅ Easy testing
✅ Production readiness
