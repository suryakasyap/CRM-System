import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Chip,
} from '@mui/material';
import {
  Phone as PhoneIcon,
  Email as EmailIcon,
  Business as BusinessIcon,
  LocationOn as LocationIcon,
  Notes as NotesIcon,
  Edit as EditIcon,
} from '@mui/icons-material';

// Mock data for a single customer
const mockCustomer = {
  id: 1,
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '555-123-4567',
  company: 'Acme Corp',
  status: 'Active',
  address: '123 Main St, Anytown, USA',
  notes: 'Key client in the manufacturing sector',
  createdAt: '2023-01-15',
  lastInteraction: '2023-05-20',
};

const CustomerView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would be an API call to fetch the customer by ID
    // Simulating API call delay
    const timer = setTimeout(() => {
      setCustomer(mockCustomer);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [id]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'success';
      case 'Inactive':
        return 'error';
      case 'Prospect':
        return 'warning';
      default:
        return 'default';
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '50vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h4" gutterBottom>
              Customer Details
            </Typography>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              startIcon={<EditIcon />}
              onClick={() => navigate(`/customers/${id}/edit`)}
            >
              Edit Customer
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Paper sx={{ p: 4, mb: 4 }}>
        <Box sx={{ mb: 3 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={8}>
              <Typography variant="h5">{customer.name}</Typography>
              <Typography variant="subtitle1" color="text.secondary">
                {customer.company}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4} sx={{ textAlign: { sm: 'right' } }}>
              <Chip
                label={customer.status}
                color={getStatusColor(customer.status)}
                sx={{ fontWeight: 'bold' }}
              />
            </Grid>
          </Grid>
        </Box>

        <Divider sx={{ mb: 3 }} />

        <List>
          <ListItem>
            <ListItemText
              primary={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <EmailIcon sx={{ mr: 2, color: 'primary.main' }} />
                  <Typography variant="subtitle1" fontWeight="bold">
                    Email
                  </Typography>
                </Box>
              }
              secondary={customer.email}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <PhoneIcon sx={{ mr: 2, color: 'primary.main' }} />
                  <Typography variant="subtitle1" fontWeight="bold">
                    Phone
                  </Typography>
                </Box>
              }
              secondary={customer.phone}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <BusinessIcon sx={{ mr: 2, color: 'primary.main' }} />
                  <Typography variant="subtitle1" fontWeight="bold">
                    Company
                  </Typography>
                </Box>
              }
              secondary={customer.company}
            />
          </ListItem>
          {customer.address && (
            <ListItem>
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <LocationIcon sx={{ mr: 2, color: 'primary.main' }} />
                    <Typography variant="subtitle1" fontWeight="bold">
                      Address
                    </Typography>
                  </Box>
                }
                secondary={customer.address}
              />
            </ListItem>
          )}
        </List>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" gutterBottom>
          Additional Information
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" fontWeight="bold">
              Created on
            </Typography>
            <Typography variant="body1">{customer.createdAt}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" fontWeight="bold">
              Last Interaction
            </Typography>
            <Typography variant="body1">{customer.lastInteraction}</Typography>
          </Grid>
          {customer.notes && (
            <Grid item xs={12} sx={{ mt: 2 }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  mt: 2,
                }}
              >
                <NotesIcon sx={{ mr: 2, color: 'primary.main', mt: 0.5 }} />
                <Box>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Notes
                  </Typography>
                  <Typography variant="body1">{customer.notes}</Typography>
                </Box>
              </Box>
            </Grid>
          )}
        </Grid>
      </Paper>

      <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 4 }}>
        <Button variant="outlined" onClick={() => navigate('/customers')}>
          Back to Customers
        </Button>
      </Box>
    </Container>
  );
};

export default CustomerView; 