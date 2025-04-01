import React, { useState, memo, useCallback } from 'react';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Container,
  Avatar,
  Button,
  Tooltip,
  Divider,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Event as EventIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';

const pages = [
  { name: 'Dashboard', path: '/dashboard', icon: <DashboardIcon fontSize="small" /> },
  { name: 'Customers', path: '/customers', icon: <PeopleIcon fontSize="small" /> },
  { name: 'Interactions', path: '/interactions', icon: <EventIcon fontSize="small" /> },
];

const Navbar = memo(() => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = useCallback((event) => {
    setAnchorElNav(event.currentTarget);
  }, []);
  
  const handleOpenUserMenu = useCallback((event) => {
    setAnchorElUser(event.currentTarget);
  }, []);

  const handleCloseNavMenu = useCallback(() => {
    setAnchorElNav(null);
  }, []);

  const handleCloseUserMenu = useCallback(() => {
    setAnchorElUser(null);
  }, []);

  const handleLogout = useCallback(() => {
    logout();
    handleCloseUserMenu();
  }, [logout, handleCloseUserMenu]);

  const handleNavigation = useCallback((path) => {
    navigate(path);
    handleCloseNavMenu();
  }, [navigate, handleCloseNavMenu]);

  // Check if a menu item is active
  const isActive = useCallback((path) => {
    return location.pathname === path || 
           (path !== '/dashboard' && location.pathname.startsWith(path));
  }, [location.pathname]);

  return (
    <AppBar 
      position="sticky" 
      elevation={1}
      sx={{
        backgroundColor: theme.palette.primary.main,
        transition: 'all 0.3s ease'
      }}
    >
      <Container maxWidth={isMobile ? 'xl' : 'lg'}>
        <Toolbar disableGutters>
          {/* Logo and Title - Desktop */}
          <Typography
            variant="h6"
            noWrap
            component={RouterLink}
            to={currentUser ? "/dashboard" : "/"}
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            CRM System
          </Typography>

          {/* Mobile menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem 
                  key={page.name} 
                  onClick={() => handleNavigation(page.path)}
                  selected={isActive(page.path)}
                >
                  <Box display="flex" alignItems="center">
                    {page.icon}
                    <Typography ml={1}>{page.name}</Typography>
                  </Box>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Logo and Title - Mobile */}
          <Typography
            variant="h6"
            noWrap
            component={RouterLink}
            to={currentUser ? "/dashboard" : "/"}
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            CRM System
          </Typography>

          {/* Desktop menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                component={RouterLink}
                to={page.path}
                onClick={handleCloseNavMenu}
                sx={{ 
                  my: 2, 
                  color: 'white', 
                  display: 'flex', 
                  alignItems: 'center',
                  backgroundColor: isActive(page.path) ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  },
                  mx: 0.5,
                  px: 2,
                  borderRadius: 1
                }}
                startIcon={page.icon}
              >
                {page.name}
              </Button>
            ))}
          </Box>

          {/* User menu */}
          {currentUser ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton 
                  onClick={handleOpenUserMenu} 
                  sx={{ 
                    p: 0,
                    '&:hover': {
                      transform: 'scale(1.05)'
                    },
                    transition: 'all 0.2s ease'
                  }}
                >
                  <Avatar 
                    alt={currentUser.username} 
                    src="/static/images/avatar/2.jpg"
                    sx={{ 
                      width: { xs: 32, sm: 40 }, 
                      height: { xs: 32, sm: 40 },
                      border: '2px solid white'
                    }} 
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem disabled>
                  <Typography textAlign="center" fontWeight="bold">{currentUser.username}</Typography>
                </MenuItem>
                <Divider />
                <MenuItem onClick={() => {
                  navigate('/profile');
                  handleCloseUserMenu();
                }}>
                  <Box display="flex" alignItems="center">
                    <SettingsIcon fontSize="small" />
                    <Typography ml={1}>Profile</Typography>
                  </Box>
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <Box display="flex" alignItems="center" color="error.main">
                    <LogoutIcon fontSize="small" color="error" />
                    <Typography ml={1}>Logout</Typography>
                  </Box>
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <Box sx={{ flexGrow: 0, display: 'flex', gap: 1 }}>
              <Button 
                color="inherit" 
                component={RouterLink} 
                to="/login"
                variant="outlined"
                sx={{
                  borderColor: 'rgba(255, 255, 255, 0.5)',
                  '&:hover': {
                    borderColor: 'white',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  }
                }}
              >
                Login
              </Button>
              <Button 
                color="inherit" 
                component={RouterLink} 
                to="/register"
                variant="contained"
                sx={{
                  backgroundColor: 'white',
                  color: theme.palette.primary.main,
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  }
                }}
              >
                Register
              </Button>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
});

Navbar.displayName = 'Navbar';

export default Navbar; 