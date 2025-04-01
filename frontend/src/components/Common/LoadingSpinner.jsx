import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

const LoadingSpinner = ({ message = 'Loading...' }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100%"
      py={5}
    >
      <CircularProgress size={60} />
      <Typography variant="h6" mt={2}>
        {message}
      </Typography>
    </Box>
  );
};

export default LoadingSpinner; 