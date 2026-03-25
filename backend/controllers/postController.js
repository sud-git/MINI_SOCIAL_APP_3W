const Post = require('../models/Post');
const User = require('../models/User');

// @route   POST /api/posts/create
// @desc    Create a new post
// @access  Private
exports.createPost = async (req, res) => {
  try {
    const { text, image } = req.body;
    const userId = req.user.id;

    // Validation: at least one field required
    if (!text && !image) {
      return res.status(400).json({ message: 'Please provide text or image' });
    }

    // Get user details
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create post
    const post = await Post.create({
      userId,
      username: user.username,
      text: text || '',
      image: image || '',
      likes: [],
      comments: [],
    });

    res.status(201).json({
      success: true,
      post,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route   GET /api/posts
// @desc    Get all posts
// @access  Public
exports.getAllPosts = async (req, res) => {
  try {
    // Get all posts, sorted by newest first
    const posts = await Post.find().sort({ createdAt: -1 }).populate('userId', 'username email');

    res.status(200).json({
      success: true,
      count: posts.length,
      posts,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route   PUT /api/posts/like/:id
// @desc    Like or unlike a post
// @access  Private
exports.likePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const username = req.user.username;

    // Get user details
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find post
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if already liked
    const alreadyLiked = post.likes.includes(user.username);

    if (alreadyLiked) {
      // Unlike
      post.likes = post.likes.filter((like) => like !== user.username);
    } else {
      // Like
      post.likes.push(user.username);
    }

    await post.save();

    res.status(200).json({
      success: true,
      post,
      liked: !alreadyLiked,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route   POST /api/posts/comment/:id
// @desc    Add a comment to a post
// @access  Private
exports.addComment = async (req, res) => {
  try {
    const postId = req.params.id;
    const { text } = req.body;

    // Validation
    if (!text) {
      return res.status(400).json({ message: 'Please provide comment text' });
    }

    // Get user details
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find post
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Add comment
    const comment = {
      username: user.username,
      text,
      createdAt: new Date(),
    };

    post.comments.push(comment);
    await post.save();

    res.status(201).json({
      success: true,
      post,
      comment,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
