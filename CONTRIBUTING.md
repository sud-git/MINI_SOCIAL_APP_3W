# Contributing to Social Post App

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing to the project.

## 🎯 Code of Conduct

### Our Pledge
We are committed to providing a welcoming and inspiring community for all. Please read and adhere to our Code of Conduct:

- **Be Respectful** - Treat all contributors with respect
- **Be Inclusive** - Welcome people from all backgrounds
- **Be Professional** - Keep discussions constructive and on-topic
- **Be Open** - Accept feedback gracefully

## 🔄 How to Contribute

### 1. Report Bugs
Found a bug? Please create an issue with:
- Clear, descriptive title
- Step-by-step reproduction steps
- Expected behavior vs actual behavior
- Your environment (OS, Node version, etc.)
- Screenshots if applicable

**Example:**
```
Title: Login page crashes when email contains spaces
Steps:
1. Click Sign Up
2. Enter email: "test @example.com"
3. Click Create Account
Expected: Should validate and show error
Actual: Page crashes with white screen
```

### 2. Suggest Enhancements
Have a feature idea? Create an issue with:
- Clear, descriptive title starting with "Feature:"
- Detailed description of the feature
- Why this feature would be useful
- Possible implementation approach

**Example:**
```
Title: Feature: Add user profile page
Description: Users should have a profile page showing:
- User information (username, email, joined date)
- All posts by that user
- Number of followers/following
- Edit profile button for own profile

Benefits:
- Better user experience
- Social features discovery
```

### 3. Submit Code Changes

#### Setup Development Environment
```bash
# Clone repository
git clone https://github.com/yourusername/social-post-app.git
cd social-post-app

# Install dependencies
cd backend && npm install
cd ../frontend && npm install

# Create feature branch
git checkout -b feature/your-feature-name
```

#### Make Changes
- Follow existing code style
- Add comments for complex logic
- Test thoroughly
- Keep commits small and focused

#### Frontend Changes
```bash
cd frontend

# Test your changes
npm start

# Make sure builds without errors
npm run build
```

#### Backend Changes
```bash
cd backend

# Test with nodemon
npm run dev

# Check for any linting issues
npm run lint (if available)
```

#### Database Changes
- Never modify production database manually
- Document schema changes in comments
- Update ARCHITECTURE.md if schema changes

### 4. Submit a Pull Request

1. **Push your branch:**
   ```bash
   git push origin feature/your-feature-name
   ```

2. **Create Pull Request:**
   - Go to GitHub repository
   - Click "New Pull Request"
   - Select your branch
   - Fill in PR template:

   ```markdown
   ## Description
   Brief description of changes

   ## Type of Change
   - [ ] Bug fix
   - [ ] New feature
   - [ ] Breaking change
   - [ ] Documentation update

   ## Related Issues
   Fixes #123

   ## Testing
   How to test these changes:
   1. Step 1
   2. Step 2

   ## Checklist
   - [ ] Code follows style guidelines
   - [ ] Self-review completed
   - [ ] Comments added for complex logic
   - [ ] Tests pass
   - [ ] No console errors
   ```

3. **Wait for Review:**
   - Respond to feedback promptly
   - Make requested changes
   - Push updates to same branch
   - PR updates automatically

## 📝 Coding Standards

### General Rules
- Use meaningful variable/function names
- Keep functions small (< 50 lines)
- Add comments for "why", not "what"
- Follow DRY principle (Don't Repeat Yourself)
- Proper error handling

### Frontend (React)
```javascript
// Good: Clear, descriptive name and structure
const UserProfileCard = ({ user, onEdit }) => {
  const handleEdit = async () => {
    // Comment explaining complex logic
    try {
      await updateUser(user.id, newData);
      setUser(newData);
    } catch (error) {
      console.error('Failed to update user:', error);
      setError(error.message);
    }
  };

  return (
    <Box sx={{ /* styles */ }}>
      {/* JSX content */}
    </Box>
  );
};

export default UserProfileCard;
```

**Rules:**
- Use functional components with hooks
- Props destructuring for clarity
- Use Material-UI components
- Style with sx prop or emotion
- Error handling in try-catch

### Backend (Node.js/Express)
```javascript
// Good: Clear error handling and validation
exports.createPost = async (req, res) => {
  try {
    const { text, image } = req.body;
    
    // Validate input
    if (!text && !image) {
      return res.status(400).json({ 
        message: 'Text or image required' 
      });
    }

    // Get user data
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create post
    const post = new Post({
      userId: req.user.id,
      username: user.username,
      text: text || '',
      image: image || ''
    });

    await post.save();

    res.status(201).json({
      success: true,
      post
    });
  } catch (error) {
    // Always handle errors
    res.status(500).json({ message: error.message });
  }
};
```

**Rules:**
- Always validate input
- Check user exists before operations
- Proper error handling
- Descriptive HTTP status codes
- Return json responses consistently

## 🧪 Testing

### Before Submitting PR:

**Frontend:**
```bash
cd frontend
npm start
# Test in browser
# Check console for errors
npm run build  # Ensure builds
```

**Backend:**
```bash
cd backend
npm run dev
# Test endpoints with Postman/curl
# Check server logs for errors
```

### Manual Testing Checklist
- [ ] Feature works as expected
- [ ] No console errors
- [ ] No network errors
- [ ] Works on mobile (if UI change)
- [ ] Database updates correctly
- [ ] Existing features still work

## 📋 Pull Request Process

1. **Before submitting:**
   - [ ] Tested locally
   - [ ] No linting errors
   - [ ] Code follows style guide
   - [ ] Updated ARCHITECTURE.md (if needed)
   - [ ] Commit messages are clear

2. **PR will be reviewed:**
   - [ ] Code quality check
   - [ ] Testing verification
   - [ ] Style consistency
   - [ ] Documentation updates
   - [ ] Performance impact

3. **After approval:**
   - [ ] Squash commits if needed
   - [ ] Rebase on main
   - [ ] Merge to main branch

## 🚀 Commit Message Guidelines

### Format
```
<type>(<scope>): <subject>

<body>

<footer>
```

### Type
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation change
- `style:` Code style change (no logic change)
- `refactor:` Code refactoring
- `perf:` Performance improvement
- `test:` Test addition/update

### Examples
```
feat(posts): add image upload support

Implement Base64 image encoding for post creation.
Allows users to upload images up to 5MB.

Fixes #123
```

```
fix(auth): resolve jwt token expiration issue

Token now correctly refreshes after 7 days.
Updated middleware to handle expired tokens.
```

## 📚 Documentation

### Update ARCHITECTURE.md if:
- Database schema changes
- API endpoints added/removed
- Major flow changes
- New components added

### Update README.md if:
- Installation steps change
- New features added
- Dependencies change
- Configuration requirements change

## 🔍 Code Review Process

- **Checklist items are verified**
- **Code is tested locally**
- **Style guide is followed**
- **Performance is considered**
- **Documentation is updated**
- **Tests pass**

**Reviewers may request changes.** This is normal! Respond to feedback professionally:
- Ask questions if unclear
- Explain your approach
- Make requested changes
- Thank reviewers

## 🎓 Learning Resources

- [React Documentation](https://react.dev)
- [Express.js Guide](https://expressjs.com)
- [MongoDB Docs](https://docs.mongodb.com)
- [Material-UI Docs](https://mui.com)

## ❓ Questions?

- Open a Discussion on GitHub
- Check existing Issues
- Email maintainers
- Be patient and respectful

## 🙋 Recognition

All contributors will be:
- Listed in README contributors section
- Credited in commit history
- Appreciated for their work

Thank you for contributing! 🎉

---

**Happy Contributing!**

If you have any questions, please don't hesitate to reach out.
