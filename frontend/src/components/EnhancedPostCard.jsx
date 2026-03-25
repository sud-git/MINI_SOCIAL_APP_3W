import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { postsAPI } from '../services/api';
import { useSnackbar } from 'notistack';
import CommentForm from './CommentForm';
import {
  Paper,
  Box,
  Typography,
  Avatar,
  Divider,
  Tooltip,
  Chip,
  Collapse,
  Stack,
  Button,
} from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import { formatDistanceToNow } from 'date-fns';
import { motion } from 'framer-motion';

const EnhancedPostCard = ({ post, onLiked, onCommentAdded }) => {
  const [showComments, setShowComments] = useState(false);
  const { user, token } = useAuth();
  const { enqueueSnackbar } = useSnackbar();

  const isLiked = user && post.likes.includes(user.username);

  const handleLike = async () => {
    try {
      const response = await postsAPI.likePost(post._id, token);
      if (response.success) {
        enqueueSnackbar(isLiked ? 'Post unliked' : 'Post liked! 👍', {
          variant: 'success',
          autoHideDuration: 1500,
        });
        onLiked();
      }
    } catch (error) {
      enqueueSnackbar('Error liking post', { variant: 'error' });
    }
  };

  const MotionPaper = motion(Paper);
  const MotionBox = motion(Box);

  return (
    <MotionPaper
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ boxShadow: '0 12px 24px rgba(0,0,0,0.15)' }}
      elevation={2}
      sx={{
        mb: 3,
        overflow: 'hidden',
        borderRadius: '16px',
        backgroundColor: '#fff',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      {/* Post Header */}
      <MotionBox
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        sx={{
          p: 2.5,
          background: 'linear-gradient(135deg, #f5f7fa 0%, #ffffff 100%)',
          borderBottom: '1px solid rgba(0,0,0,0.06)',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <motion.div whileHover={{ scale: 1.1 }}>
            <Avatar
              sx={{
                width: 44,
                height: 44,
                background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
                fontWeight: 600,
              }}
            >
              {post.username.charAt(0).toUpperCase()}
            </Avatar>
          </motion.div>
          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1565c0' }}>
              {post.username}
            </Typography>
            <Tooltip title={new Date(post.createdAt).toLocaleString()}>
              <Typography
                variant="caption"
                sx={{
                  color: '#999',
                  cursor: 'help',
                  fontWeight: 500,
                }}
              >
                {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
              </Typography>
            </Tooltip>
          </Box>
        </Box>
      </MotionBox>

      {/* Post Content */}
      <MotionBox
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        sx={{ p: 2.5 }}
      >
        {post.text && (
          <Typography
            variant="body1"
            sx={{
              mb: post.image ? 2 : 0,
              lineHeight: 1.6,
              color: '#333',
              wordBreak: 'break-word',
            }}
          >
            {post.text}
          </Typography>
        )}

        {post.image && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Box
              sx={{
                borderRadius: '12px',
                overflow: 'hidden',
                marginTop: 2,
                backgroundColor: '#f0f0f0',
                '&:hover img': {
                  transform: 'scale(1.02)',
                },
              }}
            >
              <img
                src={post.image}
                alt="Post"
                style={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '400px',
                  objectFit: 'cover',
                  display: 'block',
                  transition: 'transform 0.3s ease',
                }}
              />
            </Box>
          </motion.div>
        )}
      </MotionBox>

      {/* Post Stats */}
      <MotionBox
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        sx={{
          px: 2.5,
          py: 1.5,
          backgroundColor: '#fafbfc',
          borderBottom: '1px solid rgba(0,0,0,0.06)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Stack direction="row" spacing={2}>
          {post.likes.length > 0 && (
            <motion.div whileHover={{ scale: 1.05 }}>
              <Chip
                icon={<FavoriteIcon sx={{ color: '#e91e63 !important' }} />}
                label={`${post.likes.length} ${post.likes.length === 1 ? 'like' : 'likes'}`}
                size="small"
                variant="outlined"
                sx={{
                  borderColor: '#f0f0f0',
                  backgroundColor: '#fff5f7',
                  fontWeight: 600,
                  color: '#e91e63',
                }}
              />
            </motion.div>
          )}
          {post.comments.length > 0 && (
            <motion.div whileHover={{ scale: 1.05 }}>
              <Chip
                icon={<CommentIcon sx={{ color: '#1976d2 !important' }} />}
                label={`${post.comments.length} ${post.comments.length === 1 ? 'comment' : 'comments'}`}
                size="small"
                variant="outlined"
                sx={{
                  borderColor: '#f0f0f0',
                  backgroundColor: '#e3f2fd',
                  fontWeight: 600,
                  color: '#1976d2',
                }}
              />
            </motion.div>
          )}
        </Stack>
      </MotionBox>

      {/* Actions */}
      <Box sx={{ px: 2.5, py: 1, display: 'flex', gap: 1 }}>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} style={{ flex: 1 }}>
          <Tooltip title={isLiked ? 'Unlike' : 'Like'}>
            <Button
              fullWidth
              startIcon={isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              onClick={handleLike}
              sx={{
                textTransform: 'none',
                color: isLiked ? '#e91e63' : '#666',
                backgroundColor: isLiked ? 'rgba(233, 30, 99, 0.08)' : 'transparent',
                '&:hover': {
                  backgroundColor: isLiked ? 'rgba(233, 30, 99, 0.12)' : 'rgba(0,0,0,0.04)',
                },
              }}
            >
              Like
            </Button>
          </Tooltip>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} style={{ flex: 1 }}>
          <Tooltip title={showComments ? 'Hide comments' : 'Show comments'}>
            <Button
              fullWidth
              startIcon={<CommentIcon />}
              onClick={() => setShowComments(!showComments)}
              sx={{
                textTransform: 'none',
                color: showComments ? '#1976d2' : '#666',
                backgroundColor: showComments ? 'rgba(25, 118, 210, 0.08)' : 'transparent',
                '&:hover': {
                  backgroundColor: showComments ? 'rgba(25, 118, 210, 0.12)' : 'rgba(0,0,0,0.04)',
                },
              }}
            >
              Comment
            </Button>
          </Tooltip>
        </motion.div>
      </Box>

      {/* Comments Section */}
      <Collapse in={showComments} timeout="auto" unmountOnExit>
        <Divider />
        <MotionBox
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          sx={{ p: 2.5, backgroundColor: '#fafbfc' }}
        >
          {/* Existing Comments */}
          {post.comments.length > 0 && (
            <Box sx={{ mb: 2.5 }}>
              {post.comments.map((comment, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <Box sx={{ mb: 1.5, display: 'flex', gap: 1.5 }}>
                    <Avatar sx={{ width: 32, height: 32, background: 'linear-gradient(135deg, #8e24aa 0%, #6a1b9a 100%)' }}>
                      {comment.username.charAt(0).toUpperCase()}
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Box
                        sx={{
                          backgroundColor: '#ffffff',
                          p: 1.5,
                          borderRadius: '12px',
                          border: '1px solid rgba(0,0,0,0.06)',
                        }}
                      >
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#333' }}>
                          {comment.username}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#666', mt: 0.5 }}>
                          {comment.text}
                        </Typography>
                      </Box>
                      <Typography
                        variant="caption"
                        sx={{
                          display: 'block',
                          mt: 0.5,
                          color: '#999',
                          px: 1.5,
                        }}
                      >
                        {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                      </Typography>
                    </Box>
                  </Box>
                </motion.div>
              ))}
              <Divider sx={{ my: 2 }} />
            </Box>
          )}

          {/* Add Comment Form */}
          <CommentForm postId={post._id} onCommentAdded={onCommentAdded} />
        </MotionBox>
      </Collapse>
    </MotionPaper>
  );
};

export default EnhancedPostCard;
