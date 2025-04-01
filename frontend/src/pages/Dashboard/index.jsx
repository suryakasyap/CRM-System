import React, { useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
  Alert,
} from '@mui/material';
import {
  PeopleAlt as PeopleIcon,
  TrendingUp as TrendingUpIcon,
  EventNote as EventNoteIcon,
  AttachMoney as MoneyIcon,
  AdminPanelSettings as AdminIcon,
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';

// Mock data
const stats = [
  {
    title: 'Total Customers',
    value: '124',
    icon: <PeopleIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
    color: 'primary.main',
  },
  {
    title: 'Active Deals',
    value: '42',
    icon: <TrendingUpIcon sx={{ fontSize: 40, color: 'success.main' }} />,
    color: 'success.main',
  },
  {
    title: 'Upcoming Interactions',
    value: '15',
    icon: <EventNoteIcon sx={{ fontSize: 40, color: 'warning.main' }} />,
    color: 'warning.main',
  },
  {
    title: 'Revenue This Month',
    value: '$24,500',
    icon: <MoneyIcon sx={{ fontSize: 40, color: 'info.main' }} />,
    color: 'info.main',
  },
];

const recentCustomers = [
  { id: 1, name: 'John Doe', company: 'Acme Corp', date: '2 days ago' },
  { id: 2, name: 'Jane Smith', company: 'XYZ Inc', date: '3 days ago' },
  { id: 3, name: 'Bob Johnson', company: 'Tech Solutions', date: '5 days ago' },
  { id: 4, name: 'Alice Williams', company: 'Global Services', date: '1 week ago' },
];

const upcomingInteractions = [
  {
    id: 1,
    customer: 'John Doe',
    type: 'Meeting',
    date: 'Today',
    time: '3:00 PM',
  },
  {
    id: 2,
    customer: 'Jane Smith',
    type: 'Call',
    date: 'Tomorrow',
    time: '10:30 AM',
  },
  {
    id: 3,
    customer: 'Bob Johnson',
    type: 'Email',
    date: 'Mar 25',
    time: '9:00 AM',
  },
];

const Dashboard = () => {
  const { currentUser, isAdmin } = useAuth();
  const userIsAdmin = isAdmin();

  useEffect(() => {
    console.log('Dashboard component mounted');
    document.title = 'Dashboard | CRM System';
  }, []);

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" paragraph>
          Welcome back, {currentUser?.username || 'User'}! Here's an overview of your CRM activities.
        </Typography>
        
        {/* Admin Notice */}
        {userIsAdmin && (
          <Alert 
            severity="info" 
            icon={<AdminIcon />}
            sx={{ mb: 3 }}
          >
            You are logged in with administrator privileges.
          </Alert>
        )}
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper
              sx={{
                p: 2,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderTop: 3,
                borderColor: stat.color,
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Box>
                  <Typography variant="h4" component="div">
                    {stat.value}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {stat.title}
                  </Typography>
                </Box>
                {stat.icon}
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Admin Panel Section - Only visible for admins */}
      {userIsAdmin && (
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12}>
            <Paper sx={{ p: 3, borderLeft: 5, borderColor: 'secondary.main' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <AdminIcon color="secondary" sx={{ fontSize: 30, mr: 2 }} />
                <Typography variant="h5" component="div" color="secondary.main">
                  Admin Control Panel
                </Typography>
              </Box>
              <Typography variant="body1" paragraph>
                As an administrator, you have access to system management features.
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <Button 
                    variant="outlined" 
                    color="secondary" 
                    fullWidth
                  >
                    User Management
                  </Button>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Button 
                    variant="outlined" 
                    color="secondary" 
                    fullWidth
                  >
                    System Settings
                  </Button>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Button 
                    variant="outlined" 
                    color="secondary" 
                    fullWidth
                  >
                    Reports
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      )}

      {/* Recent Activities and Upcoming Interactions */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Customers
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <List>
                {recentCustomers.map((customer) => (
                  <React.Fragment key={customer.id}>
                    <ListItem>
                      <ListItemText
                        primary={customer.name}
                        secondary={
                          <>
                            <Typography
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                              {customer.company}
                            </Typography>
                            {` — Added ${customer.date}`}
                          </>
                        }
                      />
                    </ListItem>
                    {customer.id !== recentCustomers.length && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Upcoming Interactions
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <List>
                {upcomingInteractions.map((interaction) => (
                  <React.Fragment key={interaction.id}>
                    <ListItem>
                      <ListItemText
                        primary={
                          <Typography
                            component="span"
                            variant="body1"
                            color="text.primary"
                          >
                            {interaction.type} with {interaction.customer}
                          </Typography>
                        }
                        secondary={`${interaction.date} at ${interaction.time}`}
                      />
                    </ListItem>
                    {interaction.id !== upcomingInteractions.length && (
                      <Divider />
                    )}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard; 