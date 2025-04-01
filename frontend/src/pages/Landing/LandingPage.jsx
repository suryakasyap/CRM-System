import React, { useEffect, useRef } from 'react';
import { Box, Typography, Button, Container, Grid, Card, CardContent, useTheme, alpha } from '@mui/material';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import BusinessIcon from '@mui/icons-material/Business';
import PeopleIcon from '@mui/icons-material/People';
import TimelineIcon from '@mui/icons-material/Timeline';
import SecurityIcon from '@mui/icons-material/Security';

// Import the CSS for the animations
import './Landing.css';

const LandingPage = () => {
  const theme = useTheme();
  const heroRef = useRef(null);

  useEffect(() => {
    // Parallax effect for hero section
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (heroRef.current) {
        heroRef.current.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const features = [
    {
      title: "Customer Management",
      description: "Organize and manage your customer data efficiently with powerful filtering and search capabilities.",
      icon: <PeopleIcon sx={{ fontSize: 50, color: theme.palette.primary.main }} />
    },
    {
      title: "Interaction Tracking",
      description: "Log and track all customer interactions to maintain a comprehensive communication history.",
      icon: <TimelineIcon sx={{ fontSize: 50, color: theme.palette.primary.main }} />
    },
    {
      title: "Business Intelligence",
      description: "Gain insights from your customer data with advanced analytics and reporting tools.",
      icon: <BusinessIcon sx={{ fontSize: 50, color: theme.palette.primary.main }} />
    },
    {
      title: "Secure & Reliable",
      description: "Your data is protected with enterprise-grade security and regular backups.",
      icon: <SecurityIcon sx={{ fontSize: 50, color: theme.palette.primary.main }} />
    }
  ];

  return (
    <Box sx={{ overflow: 'hidden' }}>
      {/* Hero Section with Parallax Effect */}
      <Box
        ref={heroRef}
        className="hero-parallax"
        sx={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          backgroundImage: 'url("/images/hero-bg.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: alpha(theme.palette.background.default, 0.7),
            zIndex: 1
          }
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={7}>
              <motion.div
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Typography 
                  variant="h1" 
                  className="gradient-text"
                  sx={{ 
                    fontWeight: 800, 
                    mb: 2,
                    fontSize: { xs: '2.5rem', md: '3.5rem', lg: '4rem' }
                  }}
                >
                  CRM System That Works For You
                </Typography>
                <Typography 
                  variant="h5" 
                  sx={{ 
                    mb: 4, 
                    fontWeight: 400,
                    color: theme.palette.text.secondary
                  }}
                >
                  Streamline customer relationships, boost productivity, and drive growth with our intelligent CRM solution.
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <Button 
                    component={Link} 
                    to="/register" 
                    variant="contained" 
                    size="large"
                    className="pulse-button"
                    sx={{ 
                      py: 1.5, 
                      px: 4, 
                      borderRadius: '30px',
                      fontSize: '1.1rem'
                    }}
                  >
                    Get Started Free
                  </Button>
                  <Button 
                    component={Link} 
                    to="/login" 
                    variant="outlined" 
                    size="large"
                    sx={{ 
                      py: 1.5, 
                      px: 4, 
                      borderRadius: '30px',
                      fontSize: '1.1rem'
                    }}
                  >
                    Log In
                  </Button>
                </Box>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={5}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="floating"
              >
                <Box 
                  component="img"
                  src="/images/dashboard-preview.png"
                  alt="CRM Dashboard Preview"
                  sx={{ 
                    maxWidth: '120%', 
                    height: 'auto',
                    borderRadius: '8px',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
                  }}
                />
              </motion.div>
            </Grid>
          </Grid>
        </Container>
        <Box className="scroll-down">
          <span></span>
          <span></span>
          <span></span>
        </Box>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: 10, backgroundColor: alpha(theme.palette.primary.main, 0.03) }}>
        <Container maxWidth="lg">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Typography 
              variant="h2" 
              align="center" 
              sx={{ 
                mb: 2, 
                fontWeight: 700,
                position: 'relative',
                display: 'inline-block',
                left: '50%',
                transform: 'translateX(-50%)',
                '&::after': {
                  content: '""',
                  display: 'block',
                  width: '80px',
                  height: '4px',
                  backgroundColor: theme.palette.primary.main,
                  margin: '0.5rem auto'
                }
              }}
            >
              Powerful Features
            </Typography>
            <Typography 
              variant="h5" 
              align="center" 
              color="textSecondary"
              sx={{ mb: 8, maxWidth: '800px', mx: 'auto' }}
            >
              Everything you need to manage customer relationships effectively
            </Typography>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Grid container spacing={4}>
              {features.map((feature, index) => (
                <Grid item xs={12} md={6} lg={3} key={index}>
                  <motion.div variants={fadeInUp}>
                    <Card 
                      className="feature-card" 
                      sx={{ 
                        height: '100%',
                        borderRadius: '16px',
                        transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                        '&:hover': {
                          transform: 'translateY(-10px)',
                          boxShadow: '0 10px 30px rgba(0,0,0,0.15)'
                        }
                      }}
                    >
                      <CardContent sx={{ textAlign: 'center', p: 4 }}>
                        <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                        <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 600 }}>
                          {feature.title}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                          {feature.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Container>
      </Box>

      {/* Call to Action */}
      <Box 
        sx={{ 
          py: 10, 
          background: `linear-gradient(120deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
          color: 'white'
        }}
      >
        <Container maxWidth="md">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Typography variant="h3" align="center" sx={{ mb: 3, fontWeight: 700 }}>
              Ready to Transform Your Business?
            </Typography>
            <Typography variant="h6" align="center" sx={{ mb: 4, fontWeight: 400 }}>
              Join thousands of businesses that use our CRM to increase sales and enhance customer satisfaction.
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3 }}>
              <Button 
                component={Link}
                to="/register" 
                variant="contained" 
                color="secondary" 
                size="large"
                sx={{ 
                  py: 1.5, 
                  px: 4, 
                  borderRadius: '30px',
                  fontSize: '1.1rem',
                  backgroundColor: 'white',
                  color: theme.palette.primary.main,
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.background.paper, 0.9)
                  }
                }}
              >
                Start Free Trial
              </Button>
              <Button 
                component="a" 
                href="#demo" 
                variant="outlined" 
                size="large"
                sx={{ 
                  py: 1.5, 
                  px: 4, 
                  borderRadius: '30px',
                  fontSize: '1.1rem',
                  borderColor: 'white',
                  color: 'white',
                  '&:hover': {
                    borderColor: alpha(theme.palette.background.paper, 0.9),
                    backgroundColor: alpha(theme.palette.background.paper, 0.1)
                  }
                }}
              >
                Request Demo
              </Button>
            </Box>
          </motion.div>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Box sx={{ py: 10 }}>
        <Container maxWidth="lg">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Typography 
              variant="h2" 
              align="center" 
              sx={{ 
                mb: 2, 
                fontWeight: 700,
                position: 'relative',
                display: 'inline-block',
                left: '50%',
                transform: 'translateX(-50%)',
                '&::after': {
                  content: '""',
                  display: 'block',
                  width: '80px',
                  height: '4px',
                  backgroundColor: theme.palette.primary.main,
                  margin: '0.5rem auto'
                }
              }}
            >
              What Our Customers Say
            </Typography>
            <Typography 
              variant="h5" 
              align="center" 
              color="textSecondary"
              sx={{ mb: 8, maxWidth: '800px', mx: 'auto' }}
            >
              Join thousands of satisfied customers using our CRM
            </Typography>
          </motion.div>

          <Grid container spacing={4}>
            {/* Testimonial cards would go here */}
            {/* For brevity, I'm just showing the structure */}
            {[1, 2, 3].map((item, index) => (
              <Grid item xs={12} md={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <Card 
                    sx={{ 
                      p: 3, 
                      height: '100%',
                      borderRadius: '16px',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                    }}
                  >
                    <CardContent>
                      <Box sx={{ mb: 2, color: theme.palette.primary.main }}>
                        {/* Star Rating */}
                        {"★".repeat(5)}
                      </Box>
                      <Typography variant="body1" sx={{ mb: 3, fontStyle: 'italic' }}>
                        "This CRM has transformed how we manage customer relationships. The interface is intuitive and the features are exactly what we needed."
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box
                          component="img"
                          src={`/images/avatar-${index + 1}.jpg`}
                          alt="Customer"
                          sx={{ 
                            width: 50, 
                            height: 50, 
                            borderRadius: '50%',
                            mr: 2
                          }}
                        />
                        <Box>
                          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                            {["John Smith", "Sarah Johnson", "David Chen"][index]}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {["CEO, TechCorp", "Marketing Director, Innovate", "Sales Manager, GrowFast"][index]}
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage; 