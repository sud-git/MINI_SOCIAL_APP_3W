import React, { useState, useRef, memo } from 'react';
import { useAuth } from '../context/AuthContext';
import { postsAPI } from '../services/api';
import { useSnackbar } from 'notistack';
import {
  Box,
  Avatar,
  TextField,
  Button,
  CircularProgress,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const CommentForm = memo(({ postId, onCommentAdded }) => {
  const [commentText, setCommentText] = useState('');
  const [loading, setLoading] = useState(false);
  const commentFieldRef = useRef(null);
  const { user, token } = useAuth();
  const { enqueueSnackbar } = useSnackbar();

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    setLoading(true);
    try {
      const response = await postsAPI.addComment(postId, commentText, token);
      if (response.success) {
        setCommentText('');
        enqueueSnackbar('Comment added! 💬', { variant: 'success', autoHideDuration: 1500 });
        // Focus back on the comment field
        setTimeout(() => {
          if (commentFieldRef.current) {
            commentFieldRef.current.focus();
          }
        }, 0);
        onCommentAdded();
      }
    } catch (error) {
      enqueueSnackbar('Error adding comment', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleCommentSubmit} sx={{ display: 'flex', gap: 1 }}>
      <Avatar sx={{ width: 36, height: 36, background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)' }}>
        {user?.username?.charAt(0).toUpperCase()}
      </Avatar>
      <Box sx={{ flex: 1, display: 'flex', gap: 1 }}>
        <TextField
          ref={commentFieldRef}
          size="small"
          fullWidth
          multiline
          maxRows={4}
          placeholder="Add a comment..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
              e.preventDefault();
              handleCommentSubmit(e);
            }
          }}
          disabled={loading}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '12px',
              backgroundColor: '#ffffff',
              '&:hover fieldset': {
                borderColor: '#1976d2',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#1565c0',
              },
            },
          }}
        />
        <Button
          type="submit"
          variant="contained"
          size="small"
          disabled={!commentText.trim() || loading}
          sx={{
            borderRadius: '12px',
            minWidth: 'auto',
            background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
          }}
        >
          {loading ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
        </Button>
      </Box>
    </Box>
  );
});

CommentForm.displayName = 'CommentForm';

export default CommentForm;
