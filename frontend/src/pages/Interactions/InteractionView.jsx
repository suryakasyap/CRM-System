import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Typography,
  Paper,
  Grid,
  Divider,
  Chip,
  CircularProgress,
  IconButton,
  Breadcrumbs,
  Link,
} from '@mui/material';
import {
  Event as EventIcon,
  AccessTime as AccessTimeIcon,
  Person as PersonIcon,
  Edit as EditIcon,
  ArrowBack as ArrowBackIcon,
} from '@mui/icons-material';
import dayjs from 'dayjs';

// Mock data for a interaction
const mockInteraction = {
  id: 1,
  customerId: 1,
  customerName: 'John Doe',
  type: 'Call',
  date: '2023-05-15T10:30:00',
  duration: 45,
  summary: 'Discussed new product features',
  notes: 'Customer was very interested in the new analytics dashboard. They requested a follow-up demo with their technical team next week. They also mentioned some concerns about the pricing structure for the enterprise tier.',
  outcome: 'Schedule technical demo for next Tuesday. Send revised pricing proposal by Friday.',
  createdBy: 'Alex Smith',
  createdAt: '2023-05-15T11:20:00',
};

const getTypeColor = (type) => {
  switch (type) {
    case 'Call':
      return 'primary';
    case 'Meeting':
      return 'success';
    case 'Email':
      return 'info';
    case 'Demo':
      return 'warning';
    default:
      return 'default';
  }
};

const InteractionView = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [interaction, setInteraction] = useState(null);

  useEffect(() => {
    // Simulate API call with timeout
    const fetchData = async () => {
      setLoading(true);
      try {
        // In a real app, this would be an API call using the id parameter
        setTimeout(() => {
          setInteraction(mockInteraction);
          setLoading(false);
        }, 800);
      } catch (error) {
        console.error('Error fetching interaction:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleEditInteraction = () => {
    navigate(`/interactions/edit/${id}`);
  };

  const handleBackToList = () => {
    navigate('/interactions');
  };

  const handleViewCustomer = (customerId) => {
    navigate(`/customers/${customerId}`);
  };

  if (loading) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (!interaction) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ mt: 4, mb: 4 }}>
          <Typography variant="h5">Interaction not found</Typography>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={handleBackToList}
            sx={{ mt: 2 }}
          >
            Back to Interactions
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <IconButton onClick={handleBackToList} sx={{ mr: 1 }}>
            <ArrowBackIcon />
          </IconButton>
          <Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" onClick={handleBackToList} sx={{ cursor: 'pointer' }}>
              Interactions
            </Link>
            <Typography color="text.primary">Interaction Details</Typography>
          </Breadcrumbs>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4">Interaction Details</Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<EditIcon />}
            onClick={handleEditInteraction}
          >
            Edit Interaction
          </Button>
        </Box>

        <Paper sx={{ p: 4, mb: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Chip 
                  label={interaction.type}
                  color={getTypeColor(interaction.type)}
                  sx={{ mr: 2 }}
                />
                <Typography variant="h5">{interaction.summary}</Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', my: 2 }}>
                <PersonIcon color="action" sx={{ mr: 1 }} />
                <Typography 
                  variant="body1" 
                  sx={{ 
                    cursor: 'pointer', 
                    '&:hover': { color: 'primary.main' } 
                  }}
                  onClick={() => handleViewCustomer(interaction.customerId)}
                >
                  Customer: <strong>{interaction.customerName}</strong>
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', my: 2 }}>
                <EventIcon color="action" sx={{ mr: 1 }} />
                <Typography variant="body1">
                  {dayjs(interaction.date).format('MMMM D, YYYY h:mm A')}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', my: 2 }}>
                <AccessTimeIcon color="action" sx={{ mr: 1 }} />
                <Typography variant="body1">
                  Duration: <strong>{interaction.duration} minutes</strong>
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box sx={{ bgcolor: 'grey.100', p: 2, borderRadius: 1 }}>
                <Typography variant="caption" color="text.secondary">
                  Created by {interaction.createdBy} on {dayjs(interaction.createdAt).format('MMM D, YYYY h:mm A')}
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" gutterBottom>
                Notes
              </Typography>
              <Typography variant="body1" paragraph sx={{ whiteSpace: 'pre-line' }}>
                {interaction.notes || 'No notes provided'}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Outcome / Next Steps
              </Typography>
              <Paper variant="outlined" sx={{ p: 2, bgcolor: 'background.default' }}>
                <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
                  {interaction.outcome || 'No outcome specified'}
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Container>
  );
};

export default InteractionView; 