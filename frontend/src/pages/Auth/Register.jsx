import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Box,
  Button,
  TextField,
  Typography,
  Link,
  Alert,
  Paper,
  Container,
  useTheme,
  alpha,
  IconButton,
  InputAdornment,
  Grid,
  Divider,
} from '@mui/material';
import {
  PersonAddOutlined as PersonAddIcon,
  Visibility,
  VisibilityOff,
  ArrowBack,
  Email as EmailIcon,
  Person as PersonIcon,
  Lock as LockIcon,
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';

const Register = () => {
  const { register } = useAuth();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      fullName: '',
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(3, 'Username must be at least 3 characters')
        .max(20, 'Username must be less than 20 characters')
        .required('Username is required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm password is required'),
      fullName: Yup.string(),
    }),
    onSubmit: async (values) => {
      try {
        setError('');
        setSuccess('');
        setLoading(true);
        
        const { confirmPassword, ...userData } = values;
        await register(userData);
        
        setSuccess('Registration successful! You can now log in.');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } catch (err) {
        console.error('Registration error:', err);
        setError(err.response?.data?.message || 'Failed to register. Please try again.');
      } finally {
        setLoading(false);
      }
    },
  });

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: `linear-gradient(135deg, ${alpha(theme.palette.secondary.light, 0.2)} 0%, ${alpha(theme.palette.secondary.dark, 0.3)} 100%)`,
        backgroundSize: '400% 400%',
        animation: 'gradientBG 15s ease infinite',
      }}
    >
      <Container component="main" maxWidth="sm" sx={{ py: 5 }}>
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <IconButton 
            component={RouterLink} 
            to="/landing"
            sx={{ 
              position: 'absolute', 
              top: theme.spacing(4), 
              left: theme.spacing(4),
              backgroundColor: alpha(theme.palette.background.paper, 0.8),
              '&:hover': {
                backgroundColor: alpha(theme.palette.background.paper, 0.9),
              }
            }}
          >
            <ArrowBack />
          </IconButton>

          <Paper
            elevation={10}
            sx={{
              p: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              borderRadius: '16px',
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '5px',
                background: `linear-gradient(90deg, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
              },
              boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
            }}
          >
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="register-container"
              style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            >
              <motion.div variants={itemVariants}>
                <Box
                  sx={{
                    width: 70,
                    height: 70,
                    borderRadius: '50%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    background: `linear-gradient(135deg, ${theme.palette.secondary.main}, ${theme.palette.secondary.dark})`,
                    mb: 2,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  }}
                >
                  <PersonAddIcon sx={{ color: 'white', fontSize: 35 }} />
                </Box>
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <Typography 
                  component="h1" 
                  variant="h4" 
                  sx={{ 
                    mb: 1,
                    fontWeight: 700,
                    backgroundImage: `linear-gradient(135deg, ${theme.palette.secondary.main}, ${theme.palette.secondary.dark})`,
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    color: 'transparent',
                  }}
                >
                  Join Our CRM System
                </Typography>
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <Typography 
                  variant="body1" 
                  color="textSecondary" 
                  align="center" 
                  sx={{ mb: 3 }}
                >
                  Create an account to start managing your customer relationships
                </Typography>
              </motion.div>
              
              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Alert 
                    severity="error" 
                    sx={{ 
                      width: '100%', 
                      mb: 3,
                      borderRadius: '8px',
                      boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
                    }}
                  >
                    {error}
                  </Alert>
                </motion.div>
              )}
              
              {success && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Alert 
                    severity="success" 
                    sx={{ 
                      width: '100%', 
                      mb: 3,
                      borderRadius: '8px',
                      boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
                    }}
                  >
                    {success}
                  </Alert>
                </motion.div>
              )}

              <Box 
                component="form" 
                onSubmit={formik.handleSubmit} 
                sx={{ width: '100%' }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <motion.div variants={itemVariants}>
                      <TextField
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.username && Boolean(formik.errors.username)}
                        helperText={formik.touched.username && formik.errors.username}
                        InputProps={{
                          sx: {
                            borderRadius: '10px'
                          },
                          startAdornment: (
                            <InputAdornment position="start">
                              <PersonIcon color="action" />
                            </InputAdornment>
                          )
                        }}
                      />
                    </motion.div>
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <motion.div variants={itemVariants}>
                      <TextField
                        fullWidth
                        id="fullName"
                        label="Full Name (Optional)"
                        name="fullName"
                        value={formik.values.fullName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.fullName && Boolean(formik.errors.fullName)}
                        helperText={formik.touched.fullName && formik.errors.fullName}
                        InputProps={{
                          sx: {
                            borderRadius: '10px'
                          }
                        }}
                      />
                    </motion.div>
                  </Grid>
                  
                  <Grid item xs={12}>
                    <motion.div variants={itemVariants}>
                      <TextField
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                        InputProps={{
                          sx: {
                            borderRadius: '10px'
                          },
                          startAdornment: (
                            <InputAdornment position="start">
                              <EmailIcon color="action" />
                            </InputAdornment>
                          )
                        }}
                      />
                    </motion.div>
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <motion.div variants={itemVariants}>
                      <TextField
                        fullWidth
                        name="password"
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        autoComplete="new-password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                        InputProps={{
                          sx: {
                            borderRadius: '10px'
                          },
                          startAdornment: (
                            <InputAdornment position="start">
                              <LockIcon color="action" />
                            </InputAdornment>
                          ),
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleTogglePassword}
                                edge="end"
                              >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          )
                        }}
                      />
                    </motion.div>
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <motion.div variants={itemVariants}>
                      <TextField
                        fullWidth
                        name="confirmPassword"
                        label="Confirm Password"
                        type={showConfirmPassword ? 'text' : 'password'}
                        id="confirmPassword"
                        autoComplete="new-password"
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                        helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                        InputProps={{
                          sx: {
                            borderRadius: '10px'
                          },
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle confirm password visibility"
                                onClick={handleToggleConfirmPassword}
                                edge="end"
                              >
                                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          )
                        }}
                      />
                    </motion.div>
                  </Grid>
                </Grid>
                
                <motion.div variants={itemVariants}>
                  <Divider sx={{ my: 3 }}>
                    <Typography variant="body2" color="text.secondary">
                      Create Your Account
                    </Typography>
                  </Divider>
                </motion.div>
                
                <motion.div variants={itemVariants}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="secondary"
                    sx={{ 
                      py: 1.5,
                      borderRadius: '10px',
                      background: `linear-gradient(90deg, ${theme.palette.secondary.main}, ${theme.palette.secondary.dark})`,
                      boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        boxShadow: '0 6px 20px rgba(0,0,0,0.3)',
                        transform: 'translateY(-2px)'
                      }
                    }}
                    disabled={loading}
                  >
                    {loading ? 'Creating Account...' : 'Create Account'}
                  </Button>
                </motion.div>
                
                <motion.div variants={itemVariants}>
                  <Box sx={{ textAlign: 'center', mt: 2.5 }}>
                    <Link 
                      component={RouterLink} 
                      to="/login" 
                      variant="body2"
                      sx={{
                        textDecoration: 'none',
                        color: theme.palette.secondary.main,
                        fontWeight: 600,
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          color: theme.palette.secondary.dark,
                          textDecoration: 'underline'
                        }
                      }}
                    >
                      Already have an account? Sign in
                    </Link>
                  </Box>
                </motion.div>
              </Box>
            </motion.div>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Register; 