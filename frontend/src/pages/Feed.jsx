import React, { useState, useEffect } from 'react';
import { Container, Box, Typography } from '@mui/material';
import EnhancedNavbar from '../components/EnhancedNavbar';
import EnhancedCreatePost from '../components/EnhancedCreatePost';
import EnhancedPostCard from '../components/EnhancedPostCard';
import SkeletonLoader from '../components/SkeletonLoader';
import { postsAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  // Fetch all posts
  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await postsAPI.getAllPosts();
      if (response.success) {
        setPosts(response.posts);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handlePostCreated = () => {
    fetchPosts(); // Refresh posts after creating new one
  };

  const handlePostLiked = () => {
    // Refresh posts after like/unlike
    fetchPosts();
  };

  const handleCommentAdded = (postId) => {
    fetchPosts(); // Refresh posts after adding comment
  };

  const MotionBox = motion(Box);
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      }}
    >
      <EnhancedNavbar />
      <Container maxWidth="md" sx={{ py: 4 }}>
        <EnhancedCreatePost onPostCreated={handlePostCreated} />

        <MotionBox
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          sx={{ mt: 4 }}
        >
          {loading ? (
            <SkeletonLoader count={3} />
          ) : posts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Box
                sx={{
                  textAlign: 'center',
                  py: 8,
                  px: 3,
                }}
              >
                <Typography variant="h5" sx={{ color: '#666', fontWeight: 600, mb: 1 }}>
                  📭 No posts yet
                </Typography>
                <Typography variant="body1" sx={{ color: '#999' }}>
                  Be the first to share your thoughts!
                </Typography>
              </Box>
            </motion.div>
          ) : (
            posts.map((post, index) => (
              <motion.div
                key={post._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
              >
                <EnhancedPostCard
                  post={post}
                  onLiked={handlePostLiked}
                  onCommentAdded={() => handleCommentAdded(post._id)}
                />
              </motion.div>
            ))
          )}
        </MotionBox>
      </Container>
    </Box>
  );
};

export default Feed;
