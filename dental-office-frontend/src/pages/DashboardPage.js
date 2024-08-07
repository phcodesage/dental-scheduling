import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, List, ListItem, ListItemText, Button } from '@mui/material';

const DashboardPage = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    axios.get('/api/appointments').then((response) => {
      setAppointments(response.data);
    });
  }, []);

  const handleCancel = (id) => {
    axios.delete(`/api/appointments/${id}`).then(() => {
      setAppointments(appointments.filter((appt) => appt.id !== id));
    });
  };

  const handleReschedule = (id) => {
    console.log(`Reschedule appointment with ID: ${id}`);
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Your Appointments
      </Typography>
      <List>
        {appointments.map((appt) => (
          <ListItem
            key={appt.id}
            sx={{ 
              borderBottom: 1, 
              borderColor: 'divider', 
              py: 2, 
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'center' 
            }}
          >
            <ListItemText
              primary={`Appointment with ${appt.dentist}`}
              secondary={appt.date}
            />
            <Box>
              <Button
                color="primary"
                onClick={() => handleReschedule(appt.id)}
                sx={{ mr: 2 }}
              >
                Reschedule
              </Button>
              <Button
                color="secondary"
                onClick={() => handleCancel(appt.id)}
              >
                Cancel
              </Button>
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default DashboardPage;
