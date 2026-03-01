// client/src/components/Loading.jsx
import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

const Loading = ({ message = 'Loading...' }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '50vh',
        gap: 2
      }}
    >
      <CircularProgress size={48} sx={{ color: '#22c55e' }} />
      <Typography color="text.secondary">{message}</Typography>
    </Box>
  );
};

export default Loading;