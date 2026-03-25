import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { postsAPI } from '../services/api';
import { useSnackbar } from 'notistack';
import {
  Paper,
  TextField,
  Button,
  Box,
  Typography,
  Avatar,
  CircularProgress,
  IconButton,
  Tooltip,
} from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import SendIcon from '@mui/icons-material/Send';
import ClearIcon from '@mui/icons-material/Clear';
import { motion } from 'framer-motion';

const EnhancedCreatePost = ({ onPostCreated }) => {
  const [text, setText] = useState('');
  const [image, setImage] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [loading, setLoading] = useState(false);
  const { token, user } = useAuth();
  const { enqueueSnackbar } = useSnackbar();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImage('');
    setImagePreview('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!text.trim() && !image) {
      enqueueSnackbar('Please add text or an image', { variant: 'warning' });
      return;
    }

    setLoading(true);

    try {
      const response = await postsAPI.createPost(text, image, token);

      if (response.success) {
        setText('');
        setImage('');
        setImagePreview('');
        enqueueSnackbar('Post created successfully! 🎉', { variant: 'success' });
        onPostCreated();
      } else {
        enqueueSnackbar(response.message || 'Error creating post', { variant: 'error' });
      }
    } catch (err) {
      enqueueSnackbar('An error occurred', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const MotionPaper = motion(Paper);
  const charCount = text.length;
  const maxChars = 500;

  return (
    <MotionPaper
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      elevation={3}
      sx={{
        p: 3,
        mb: 3,
        borderRadius: '16px',
        background: 'linear-gradient(135deg, #ffffff 0%, #f5f7fa 100%)',
        border: '1px solid rgba(0,0,0,0.08)',
        backdropFilter: 'blur(10px)',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        <Avatar sx={{ width: 40, height: 40, background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)' }}>
          {user?.username?.charAt(0).toUpperCase()}
        </Avatar>
        <Typography variant="h6" sx={{ fontWeight: 600, color: '#1565c0' }}>
          Create a Post
        </Typography>
      </Box>

      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          multiline
          rows={4}
          placeholder="What's on your mind? Share your thoughts... ✨"
          value={text}
          onChange={(e) => setText(e.target.value.slice(0, maxChars))}
          variant="outlined"
          disabled={loading}
          sx={{
            mb: 2,
            '& .MuiOutlinedInput-root': {
              borderRadius: '12px',
              fontSize: '0.95rem',
              '&:hover fieldset': {
                borderColor: '#1976d2',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#1565c0',
                borderWidth: 2,
              },
            },
          }}
        />

        {/* Character Count */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
          <Typography variant="caption" sx={{ color: charCount > maxChars * 0.8 ? '#d32f2f' : '#999' }}>
            {charCount}/{maxChars}
          </Typography>
        </Box>

        {/* Image Preview */}
        {imagePreview && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
            <Box
              sx={{
                position: 'relative',
                mb: 2,
                borderRadius: '12px',
                overflow: 'hidden',
                backgroundColor: '#f0f0f0',
              }}
            >
              <img
                src={imagePreview}
                alt="Preview"
                style={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '300px',
                  objectFit: 'cover',
                }}
              />
              <Tooltip title="Remove image">
                <IconButton
                  onClick={handleRemoveImage}
                  disabled={loading}
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    backgroundColor: 'rgba(255,255,255,0.9)',
                    '&:hover': {
                      backgroundColor: '#ffebee',
                    },
                  }}
                >
                  <ClearIcon sx={{ color: '#d32f2f' }} />
                </IconButton>
              </Tooltip>
            </Box>
          </motion.div>
        )}

        {/* File Upload & Submit */}
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Tooltip title="Attach image">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                component="label"
                variant="outlined"
                startIcon={<ImageIcon />}
                disabled={loading}
                sx={{
                  borderRadius: '12px',
                  textTransform: 'none',
                  fontSize: '0.9rem',
                  borderColor: '#1976d2',
                  color: '#1976d2',
                  '&:hover': {
                    borderColor: '#1565c0',
                    backgroundColor: 'rgba(25, 118, 210, 0.05)',
                  },
                }}
              >
                Add Image
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleImageChange}
                  disabled={loading}
                />
              </Button>
            </motion.div>
          </Tooltip>

          <Box sx={{ flex: 1 }} />

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="contained"
              endIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
              onClick={handleSubmit}
              disabled={loading || (!text.trim() && !image)}
              sx={{
                borderRadius: '12px',
                textTransform: 'none',
                fontSize: '0.95rem',
                background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
                boxShadow: '0 4px 15px rgba(25, 118, 210, 0.3)',
                '&:hover': {
                  boxShadow: '0 6px 20px rgba(25, 118, 210, 0.5)',
                },
                '&:disabled': {
                  background: '#ccc',
                },
              }}
            >
              {loading ? 'Posting...' : 'Post'}
            </Button>
          </motion.div>
        </Box>
      </Box>
    </MotionPaper>
  );
};

export default EnhancedCreatePost;
