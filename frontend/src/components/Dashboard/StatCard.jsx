import React from 'react';
import { Box, Paper, Typography, Icon } from '@mui/material';

const StatCard = ({ title, value, icon, color = 'primary' }) => {
  return (
    <Paper
      sx={{
        p: 3,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        borderTop: 4,
        borderColor: `${color}.main`,
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6" color="text.secondary">
          {title}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: 1,
            borderRadius: '50%',
            backgroundColor: `${color}.light`,
            color: `${color}.dark`,
            width: 48,
            height: 48,
          }}
        >
          <Icon>{icon}</Icon>
        </Box>
      </Box>
      <Typography variant="h3" component="div" fontWeight="bold">
        {value}
      </Typography>
    </Paper>
  );
};

export default StatCard; 