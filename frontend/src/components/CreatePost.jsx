import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { postsAPI } from '../services/api';
import {
  Paper,
  TextField,
  Button,
  Box,
  Typography,
  Alert,
  CircularProgress,
} from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';

const CreatePost = ({ onPostCreated }) => {
  const [text, setText] = useState('');
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { token } = useAuth();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // base64 string
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!text.trim() && !image) {
      setError('Please add text or an image');
      return;
    }

    setLoading(true);

    try {
      const response = await postsAPI.createPost(text, image, token);

      if (response.success) {
        setText('');
        setImage('');
        onPostCreated();
      } else {
        setError(response.message || 'Error creating post');
      }
    } catch (err) {
      setError('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Create a Post
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          multiline
          rows={3}
          placeholder="What's on your mind?"
          value={text}
          onChange={(e) => setText(e.target.value)}
          variant="outlined"
          sx={{ mb: 2 }}
        />

        {image && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Image Preview:
            </Typography>
            <img
              src={image}
              alt="preview"
              style={{
                maxWidth: '100%',
                maxHeight: 300,
                borderRadius: 8,
              }}
            />
          </Box>
        )}

        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <Button
            variant="outlined"
            component="label"
            startIcon={<ImageIcon />}
          >
            Upload Image
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleImageChange}
            />
          </Button>

          {image && (
            <Button
              variant="text"
              onClick={() => setImage('')}
              color="error"
            >
              Remove Image
            </Button>
          )}
        </Box>

        <Button
          fullWidth
          variant="contained"
          color="primary"
          type="submit"
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : 'Post'}
        </Button>
      </Box>
    </Paper>
  );
};

export default CreatePost;
