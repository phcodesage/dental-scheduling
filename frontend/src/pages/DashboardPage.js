import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, List, ListItem, ListItemText, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';

axios.defaults.baseURL = 'http://localhost:5000';

const DashboardPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [user, setUser] = useState(null); // State to hold user details
  const [openRescheduleDialog, setOpenRescheduleDialog] = useState(false);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [selectedAppointmentId, setSelectedAppointmentId] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login'); // Redirect to login if not authenticated
      return;
    }

    const fetchUserData = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const userResponse = await axios.get('/api/auth/me', config);
        setUser(userResponse.data);

        const appointmentResponse = await axios.get('/api/appointments', config);
        setAppointments(appointmentResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        if (error.response && error.response.status === 401) {
          // If the token is invalid, redirect to login
          localStorage.removeItem('token');
          navigate('/login');
        }
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleCancel = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.delete(`/api/appointments/${id}`, config);
      setAppointments(appointments.filter((appt) => appt._id !== id));
    } catch (error) {
      console.error('Error cancelling appointment:', error);
    }
  };

  const handleOpenRescheduleDialog = async (appointment) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`/api/dentists/${appointment.dentist._id}/slots`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAvailableSlots(response.data);
      setSelectedAppointmentId(appointment._id);
      setOpenRescheduleDialog(true);
    } catch (error) {
      console.error('Error fetching slots:', error);
    }
  };

  const handleReschedule = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.put(
        `/api/appointments/${selectedAppointmentId}`,
        { time: selectedSlot },  // Send the selected time slot
        config
      );

      setAppointments(appointments.map((appt) =>
        appt._id === selectedAppointmentId ? { ...appt, time: selectedSlot } : appt
      ));

      alert(`Appointment rescheduled to ${selectedSlot}`);
      handleCloseRescheduleDialog(); // Close the dialog after rescheduling
    } catch (error) {
      console.error('Error rescheduling appointment:', error);
      if (error.response && error.response.data) {
        alert(`Error: ${error.response.data.message}`);
      } else {
        alert('An error occurred while rescheduling the appointment. Please try again.');
      }
    }
  };

  const handleCloseRescheduleDialog = () => {
    setOpenRescheduleDialog(false);
    setSelectedSlot('');
  };

  return (
    <Box sx={{ display: 'flex', p: 3 }}>
      {/* Sidebar */}
      <Box
        sx={{
          width: '25%',
          p: 3,
          bgcolor: 'background.paper',
          boxShadow: 1,
          borderRadius: 2,
          mr: 3,
        }}
      >
        {user ? (
          <>
            <Typography variant="h6" gutterBottom>
              {user.name}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Email: {user.email}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Joined: {new Date(user.createdAt).toLocaleDateString()}
            </Typography>
          </>
        ) : (
          <Typography>Loading user details...</Typography>
        )}
      </Box>

      {/* Main Content */}
      <Box sx={{ flex: 1 }}>
        <Typography variant="h4" gutterBottom>
          Your Appointments
        </Typography>
        <List>
          {appointments.length === 0 ? (
            <Typography>No appointments found.</Typography>
          ) : (
            appointments.map((appt) => (
              <ListItem
                key={appt._id}
                sx={{
                  borderBottom: 1,
                  borderColor: 'divider',
                  py: 2,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <ListItemText
                  primary={`Appointment with ${appt.dentist.name}`}
                  secondary={`${appt.date} at ${appt.time}`}
                />
                <Box>
                  <Button
                    color="primary"
                    onClick={() => handleOpenRescheduleDialog(appt)}
                    sx={{ mr: 2 }}
                  >
                    Reschedule
                  </Button>
                  <Button
                    color="secondary"
                    onClick={() => handleCancel(appt._id)}
                  >
                    Cancel
                  </Button>
                </Box>
              </ListItem>
            ))
          )}
        </List>

        {/* Reschedule Dialog */}
        <Dialog open={openRescheduleDialog} onClose={handleCloseRescheduleDialog}>
          <DialogTitle>Reschedule Appointment</DialogTitle>
          <DialogContent>
            <DialogContentText>Select a new time slot for your appointment.</DialogContentText>
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel>Select Time Slot</InputLabel>
              <Select
                value={selectedSlot}
                onChange={(e) => setSelectedSlot(e.target.value)}
              >
                {availableSlots.map((slot, index) => (
                  <MenuItem key={index} value={slot}>
                    {slot}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseRescheduleDialog} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleReschedule} color="primary" disabled={!selectedSlot}>
              Reschedule
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default DashboardPage;
