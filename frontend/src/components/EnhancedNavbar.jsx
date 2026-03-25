import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Avatar,
  Tooltip,
  Menu,
  MenuItem,
  Chip,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import { motion } from 'framer-motion';

const EnhancedNavbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
    navigate('/login');
  };

  const MotionBox = motion(Box);

  return (
    <AppBar
      position="sticky"
      sx={{
        background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        backdropFilter: 'blur(10px)',
      }}
    >
      <Toolbar sx={{ py: 1.5 }}>
        {/* Logo */}
        <MotionBox
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          sx={{ flexGrow: 1, cursor: 'pointer' }}
          onClick={() => navigate('/feed')}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 'bold',
                  background: 'linear-gradient(135deg, #fff 0%, #e3f2fd 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                📱 SocialPost
              </Typography>
            </motion.div>
          </Box>
        </MotionBox>

        {/* Right Section */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Tooltip title="Go to Feed">
              <Button
                color="inherit"
                startIcon={<HomeIcon />}
                onClick={() => navigate('/feed')}
                sx={{
                  textTransform: 'none',
                  fontSize: '0.95rem',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.1)',
                  },
                }}
              >
                Feed
              </Button>
            </Tooltip>
          </motion.div>

          {user && (
            <motion.div whileHover={{ scale: 1.05 }}>
              <Tooltip title={user.username}>
                <Chip
                  avatar={<Avatar>{user.username.charAt(0).toUpperCase()}</Avatar>}
                  label={user.username}
                  onClick={handleMenuOpen}
                  sx={{
                    backgroundColor: 'rgba(255,255,255,0.15)',
                    color: 'white',
                    cursor: 'pointer',
                    '& .MuiChip-label': {
                      fontWeight: 500,
                    },
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,0.25)',
                    },
                  }}
                  icon={<PersonIcon sx={{ color: 'white !important' }} />}
                />
              </Tooltip>
            </motion.div>
          )}

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            PaperProps={{
              sx: {
                mt: 1,
                borderRadius: '12px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem disabled>
              <Typography variant="caption" sx={{ fontWeight: 600, color: '#666' }}>
                Signed as {user?.username}
              </Typography>
            </MenuItem>
            <MenuItem
              onClick={handleLogout}
              sx={{
                '&:hover': {
                  backgroundColor: '#ffebee',
                },
              }}
            >
              <LogoutIcon sx={{ mr: 1.5, color: '#d32f2f' }} />
              <Typography sx={{ color: '#d32f2f', fontWeight: 500 }}>Logout</Typography>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default EnhancedNavbar;
