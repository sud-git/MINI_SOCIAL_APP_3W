import React, { useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { postsAPI } from '../services/api';
import CommentForm from './CommentForm';
import {
  Paper,
  Box,
  Typography,
  Avatar,
  IconButton,
  TextField,
  Button,
  Divider,
  CircularProgress,
} from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import { formatDistanceToNow } from 'date-fns';

const PostCard = ({ post, onLiked, onCommentAdded }) => {
  const [showComments, setShowComments] = useState(false);
  const { user, token } = useAuth();

  const isLiked = user && post.likes.includes(user.username);

  const handleLike = async () => {
    try {
      const response = await postsAPI.likePost(post._id, token);
      if (response.success) {
        onLiked();
      }
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  return (
    <Paper elevation={1} sx={{ mb: 3, overflow: 'hidden' }}>
      {/* Post Header */}
      <Box sx={{ p: 2, backgroundColor: '#f9f9f9', borderBottom: '1px solid #eee' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Avatar sx={{ width: 40, height: 40 }}>
            {post.username.charAt(0).toUpperCase()}
          </Avatar>
          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
              {post.username}
            </Typography>
            <Typography variant="caption" sx={{ color: '#666' }}>
              {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Post Content */}
      <Box sx={{ p: 2 }}>
        {post.text && (
          <Typography variant="body1" sx={{ mb: post.image ? 2 : 0 }}>
            {post.text}
          </Typography>
        )}

        {post.image && (
          <Box
            component="img"
            src={post.image}
            alt="post"
            sx={{
              width: '100%',
              maxHeight: 400,
              borderRadius: 1,
              objectFit: 'cover',
              mb: 2,
            }}
          />
        )}
      </Box>

      {/* Post Stats */}
      <Box
        sx={{
          px: 2,
          py: 1,
          backgroundColor: '#fafafa',
          borderTop: '1px solid #eee',
          borderBottom: '1px solid #eee',
        }}
      >
        <Typography variant="caption" sx={{ color: '#666' }}>
          {post.likes.length} {post.likes.length === 1 ? 'like' : 'likes'} •{' '}
          {post.comments.length} {post.comments.length === 1 ? 'comment' : 'comments'}
        </Typography>
      </Box>

      {/* Post Actions */}
      <Box sx={{ px: 2, py: 1, display: 'flex', gap: 1, borderBottom: '1px solid #eee' }}>
        <IconButton
          size="small"
          onClick={handleLike}
          disabled={!user}
          sx={{ flex: 1, justifyContent: 'center' }}
        >
          {isLiked ? (
            <FavoriteIcon sx={{ color: '#f44336', mr: 1 }} />
          ) : (
            <FavoriteBorderIcon sx={{ mr: 1 }} />
          )}
          <Typography variant="caption">Like</Typography>
        </IconButton>

        <IconButton
          size="small"
          onClick={() => setShowComments(!showComments)}
          sx={{ flex: 1, justifyContent: 'center' }}
        >
          <CommentIcon sx={{ mr: 1 }} />
          <Typography variant="caption">Comment</Typography>
        </IconButton>
      </Box>

      {/* Comments Section */}
      {showComments && (
        <Box sx={{ p: 2, backgroundColor: '#f9f9f9' }}>
          {/* Display Comments */}
          {post.comments.length > 0 && (
            <Box sx={{ mb: 2, maxHeight: 300, overflowY: 'auto' }}>
              {post.comments.map((comment, index) => (
                <Box key={index} sx={{ mb: 1.5 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 'bold', fontSize: '0.9rem' }}>
                    {comment.username}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#333', ml: 2 }}>
                    {comment.text}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#999', ml: 2 }}>
                    {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                  </Typography>
                </Box>
              ))}
            </Box>
          )}

          {/* Add Comment Form */}
          {user ? (
            <Box sx={{ mt: 2 }}>
              <CommentForm postId={post._id} onCommentAdded={onCommentAdded} />
            </Box>
          ) : (
            <Typography variant="caption" sx={{ color: '#999' }}>
              Login to comment
            </Typography>
          )}
        </Box>
      )}
    </Paper>
  );
};

export default PostCard;
