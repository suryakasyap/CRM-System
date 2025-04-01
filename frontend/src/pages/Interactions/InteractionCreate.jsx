import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  Paper,
  MenuItem,
  Snackbar,
  Alert,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { useFormik } from 'formik';
import * as Yup from 'yup';

// Mock data for customers
const mockCustomers = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Smith' },
  { id: 3, name: 'Bob Johnson' },
  { id: 4, name: 'Alice Williams' },
];

const InteractionCreate = () => {
  const navigate = useNavigate();
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const validationSchema = Yup.object({
    customerId: Yup.number().required('Customer is required'),
    type: Yup.string().required('Type is required'),
    dateTime: Yup.date().required('Date and time are required'),
    duration: Yup.number().min(5, 'Minimum 5 minutes').required('Duration is required'),
    summary: Yup.string().required('Summary is required'),
  });

  const formik = useFormik({
    initialValues: {
      customerId: '',
      type: '',
      dateTime: dayjs(),
      duration: 30,
      summary: '',
      notes: '',
      outcome: '',
    },
    validationSchema,
    onSubmit: (values) => {
      // In a real app, this would be an API call
      console.log('Interaction data:', values);
      
      // Show success message
      setSnackbar({
        open: true,
        message: 'Interaction created successfully',
        severity: 'success',
      });
      
      // Navigate back to interaction list after a short delay
      setTimeout(() => {
        navigate('/interactions');
      }, 1500);
    },
  });

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container maxWidth="lg">
        <Box sx={{ mt: 4, mb: 4 }}>
          <Typography variant="h4" gutterBottom>
            Log New Interaction
          </Typography>
        </Box>

        <Paper sx={{ p: 4 }}>
          <Box component="form" onSubmit={formik.handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth error={formik.touched.customerId && Boolean(formik.errors.customerId)}>
                  <InputLabel id="customer-label">Customer</InputLabel>
                  <Select
                    labelId="customer-label"
                    id="customerId"
                    name="customerId"
                    value={formik.values.customerId}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    label="Customer"
                  >
                    {mockCustomers.map((customer) => (
                      <MenuItem key={customer.id} value={customer.id}>
                        {customer.name}
                      </MenuItem>
                    ))}
                  </Select>
                  {formik.touched.customerId && formik.errors.customerId && (
                    <Typography variant="caption" color="error">
                      {formik.errors.customerId}
                    </Typography>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth error={formik.touched.type && Boolean(formik.errors.type)}>
                  <InputLabel id="type-label">Interaction Type</InputLabel>
                  <Select
                    labelId="type-label"
                    id="type"
                    name="type"
                    value={formik.values.type}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    label="Interaction Type"
                  >
                    <MenuItem value="Call">Call</MenuItem>
                    <MenuItem value="Meeting">Meeting</MenuItem>
                    <MenuItem value="Email">Email</MenuItem>
                    <MenuItem value="Demo">Demo</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </Select>
                  {formik.touched.type && formik.errors.type && (
                    <Typography variant="caption" color="error">
                      {formik.errors.type}
                    </Typography>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <DateTimePicker
                  label="Date & Time"
                  value={formik.values.dateTime}
                  onChange={(newValue) => formik.setFieldValue('dateTime', newValue)}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      variant: 'outlined',
                      error: formik.touched.dateTime && Boolean(formik.errors.dateTime),
                      helperText: formik.touched.dateTime && formik.errors.dateTime,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  id="duration"
                  name="duration"
                  label="Duration (minutes)"
                  type="number"
                  InputProps={{ inputProps: { min: 5 } }}
                  variant="outlined"
                  value={formik.values.duration}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.duration && Boolean(formik.errors.duration)}
                  helperText={formik.touched.duration && formik.errors.duration}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="summary"
                  name="summary"
                  label="Summary"
                  variant="outlined"
                  value={formik.values.summary}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.summary && Boolean(formik.errors.summary)}
                  helperText={formik.touched.summary && formik.errors.summary}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="notes"
                  name="notes"
                  label="Notes"
                  multiline
                  rows={3}
                  variant="outlined"
                  value={formik.values.notes}
                  onChange={formik.handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="outcome"
                  name="outcome"
                  label="Outcome / Next Steps"
                  multiline
                  rows={2}
                  variant="outlined"
                  value={formik.values.outcome}
                  onChange={formik.handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                  <Button
                    sx={{ mr: 2 }}
                    variant="outlined"
                    onClick={() => navigate('/interactions')}
                  >
                    Cancel
                  </Button>
                  <Button variant="contained" color="primary" type="submit">
                    Log Interaction
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Paper>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbar.severity}
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </LocalizationProvider>
  );
};

export default InteractionCreate; 