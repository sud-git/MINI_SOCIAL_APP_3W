const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Auth API calls
export const authAPI = {
  signup: (username, email, password) =>
    fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
    }).then((res) => res.json()),

  login: (email, password) =>
    fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    }).then((res) => res.json()),
};

// Posts API calls
export const postsAPI = {
  createPost: (text, image, token) =>
    fetch(`${API_BASE_URL}/posts/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ text, image }),
    }).then((res) => res.json()),

  getAllPosts: () =>
    fetch(`${API_BASE_URL}/posts`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json()),

  likePost: (postId, token) =>
    fetch(`${API_BASE_URL}/posts/like/${postId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json()),

  addComment: (postId, text, token) =>
    fetch(`${API_BASE_URL}/posts/comment/${postId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ text }),
    }).then((res) => res.json()),
};
