import React from 'react';
import { Box, Skeleton, Paper } from '@mui/material';
import { motion } from 'framer-motion';

const SkeletonLoader = ({ count = 3 }) => {
  return (
    <Box>
      {Array.from({ length: count }).map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.1 }}
        >
          <Paper elevation={1} sx={{ mb: 3, p: 2, overflow: 'hidden' }}>
            {/* Header skeleton */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <Skeleton variant="circular" width={40} height={40} />
              <Box sx={{ flex: 1 }}>
                <Skeleton variant="text" width="30%" height={20} />
                <Skeleton variant="text" width="50%" height={16} />
              </Box>
            </Box>

            {/* Content skeleton */}
            <Skeleton variant="text" width="100%" height={24} sx={{ mb: 1 }} />
            <Skeleton variant="text" width="95%" height={24} sx={{ mb: 2 }} />
            <Skeleton variant="rectangular" width="100%" height={200} sx={{ mb: 2, borderRadius: 1 }} />

            {/* Actions skeleton */}
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Skeleton variant="text" width="15%" height={32} />
              <Skeleton variant="text" width="15%" height={32} />
            </Box>
          </Paper>
        </motion.div>
      ))}
    </Box>
  );
};

export default SkeletonLoader;
