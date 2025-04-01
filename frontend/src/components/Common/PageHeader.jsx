import React from 'react';
import { Box, Typography, Breadcrumbs, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { Home as HomeIcon, NavigateNext as NavigateNextIcon } from '@mui/icons-material';

const PageHeader = ({ title, breadcrumbs = [] }) => {
  return (
    <Box mb={4}>
      <Typography variant="h4" component="h1" gutterBottom>
        {title}
      </Typography>

      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        <Link
          component={RouterLink}
          to="/"
          sx={{ display: 'flex', alignItems: 'center' }}
          color="inherit"
        >
          <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Home
        </Link>
        
        {breadcrumbs.map((breadcrumb, index) => {
          const isLast = index === breadcrumbs.length - 1;
          return isLast ? (
            <Typography key={breadcrumb.label} color="text.primary">
              {breadcrumb.label}
            </Typography>
          ) : (
            <Link
              key={breadcrumb.label}
              component={RouterLink}
              to={breadcrumb.path}
              color="inherit"
            >
              {breadcrumb.label}
            </Link>
          );
        })}
      </Breadcrumbs>
    </Box>
  );
};

export default PageHeader; 