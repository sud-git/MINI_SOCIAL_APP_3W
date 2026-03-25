const express = require('express');
const { createPost, getAllPosts, likePost, addComment } = require('../controllers/postController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/create', protect, createPost);
router.get('/', getAllPosts);
router.put('/like/:id', protect, likePost);
router.post('/comment/:id', protect, addComment);

module.exports = router;
