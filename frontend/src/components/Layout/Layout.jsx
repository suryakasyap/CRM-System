import React, { memo, useEffect } from 'react';
import { Box, Container, useMediaQuery, useTheme } from '@mui/material';
import Navbar from './Navbar';

const Layout = memo(({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    console.log('Layout component mounted');
    
    // Check if the user is authenticated
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('No token found in Layout - redirecting to login');
      window.location.href = '/login';
    } else {
      console.log('Layout loaded with valid token');
    }
  }, []);

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        minHeight: '100vh',
        backgroundColor: theme.palette.background.default
      }}
    >
      <Navbar />
      <Container 
        component="main" 
        maxWidth={isMobile ? 'xl' : 'lg'}
        disableGutters={isMobile}
        sx={{ 
          flexGrow: 1, 
          py: { xs: 2, sm: 3, md: 4 },
          px: { xs: 1, sm: 2, md: 3 },
          display: 'flex',
          flexDirection: 'column',
          transition: 'all 0.3s ease'
        }}
      >
        {children}
      </Container>
      <Box
        component="footer"
        sx={{
          py: { xs: 2, sm: 3 },
          px: { xs: 2, sm: 2 },
          mt: 'auto',
          backgroundColor: (theme) => theme.palette.grey[100],
          textAlign: 'center',
          borderTop: `1px solid ${theme.palette.divider}`
        }}
      >
        © {new Date().getFullYear()} CRM System
      </Box>
    </Box>
  );
});

Layout.displayName = 'Layout';

export default Layout; 