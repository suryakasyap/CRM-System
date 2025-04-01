import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  TablePagination,
  TextField,
  InputAdornment,
  Tooltip,
  CircularProgress,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Visibility as ViewIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
} from '@mui/icons-material';
import dayjs from 'dayjs';

// Mock data for interactions
const mockInteractions = [
  {
    id: 1,
    customerId: 1,
    customerName: 'John Doe',
    type: 'Call',
    date: '2023-05-15T10:30:00',
    duration: 45,
    summary: 'Discussed new product features',
  },
  {
    id: 2,
    customerId: 2,
    customerName: 'Jane Smith',
    type: 'Meeting',
    date: '2023-05-14T14:00:00',
    duration: 60,
    summary: 'Quarterly review meeting',
  },
  {
    id: 3,
    customerId: 3,
    customerName: 'Bob Johnson',
    type: 'Email',
    date: '2023-05-13T09:15:00',
    duration: 15,
    summary: 'Sent proposal documents',
  },
  {
    id: 4,
    customerId: 4,
    customerName: 'Alice Williams',
    type: 'Demo',
    date: '2023-05-12T11:00:00',
    duration: 90,
    summary: 'Product demonstration for new features',
  },
  {
    id: 5,
    customerId: 1,
    customerName: 'John Doe',
    type: 'Call',
    date: '2023-05-10T16:30:00',
    duration: 30,
    summary: 'Follow-up call about implementation',
  },
  {
    id: 6,
    customerId: 2,
    customerName: 'Jane Smith',
    type: 'Email',
    date: '2023-05-09T08:45:00',
    duration: 10,
    summary: 'Scheduling next meeting',
  },
];

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

const InteractionList = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [interactions, setInteractions] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [search, setSearch] = useState('');

  useEffect(() => {
    // Simulate API call with timeout
    const fetchData = async () => {
      setLoading(true);
      try {
        // In a real app, this would be an API call
        setTimeout(() => {
          setInteractions(mockInteractions);
          setLoading(false);
        }, 800);
      } catch (error) {
        console.error('Error fetching interactions:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setPage(0);
  };

  const handleViewInteraction = (id) => {
    navigate(`/interactions/${id}`);
  };

  const handleEditInteraction = (id) => {
    navigate(`/interactions/edit/${id}`);
  };

  const handleCreateInteraction = () => {
    navigate('/interactions/create');
  };

  // Filter interactions based on search term
  const filteredInteractions = interactions.filter(
    (interaction) =>
      interaction.customerName.toLowerCase().includes(search.toLowerCase()) ||
      interaction.summary.toLowerCase().includes(search.toLowerCase()) ||
      interaction.type.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination
  const displayedInteractions = filteredInteractions
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4">Customer Interactions</Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleCreateInteraction}
          >
            Log New Interaction
          </Button>
        </Box>

        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <Box sx={{ p: 2, borderBottom: '1px solid rgba(224, 224, 224, 1)' }}>
            <TextField
              fullWidth
              placeholder="Search interactions by customer, summary, or type..."
              value={search}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                endAdornment: search && (
                  <InputAdornment position="end">
                    <IconButton size="small" onClick={() => setSearch('')}>
                      <FilterIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              variant="outlined"
              size="small"
            />
          </Box>

          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
              <CircularProgress />
            </Box>
          ) : (
            <>
              <TableContainer sx={{ maxHeight: 500 }}>
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell>Customer</TableCell>
                      <TableCell>Type</TableCell>
                      <TableCell>Date & Time</TableCell>
                      <TableCell>Duration</TableCell>
                      <TableCell>Summary</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {displayedInteractions.length > 0 ? (
                      displayedInteractions.map((interaction) => (
                        <TableRow hover key={interaction.id}>
                          <TableCell>{interaction.customerName}</TableCell>
                          <TableCell>
                            <Chip 
                              label={interaction.type} 
                              size="small"
                              color={getTypeColor(interaction.type)}
                            />
                          </TableCell>
                          <TableCell>
                            {dayjs(interaction.date).format('MMM D, YYYY h:mm A')}
                          </TableCell>
                          <TableCell>{interaction.duration} min</TableCell>
                          <TableCell sx={{ maxWidth: 250 }}>
                            <Typography noWrap>{interaction.summary}</Typography>
                          </TableCell>
                          <TableCell align="right">
                            <Tooltip title="View Details">
                              <IconButton 
                                size="small"
                                onClick={() => handleViewInteraction(interaction.id)}
                              >
                                <ViewIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Edit">
                              <IconButton 
                                size="small"
                                onClick={() => handleEditInteraction(interaction.id)}
                              >
                                <EditIcon />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} align="center">
                          <Typography sx={{ py: 2 }}>
                            {search ? 'No interactions match your search' : 'No interactions found'}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={filteredInteractions.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </>
          )}
        </Paper>
      </Box>
    </Container>
  );
};

export default InteractionList; 