import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, TextField, MenuItem, Button, Typography } from '@mui/material';

const BookingPage = () => {
  const [dentists, setDentists] = useState([]);
  const [selectedDentist, setSelectedDentist] = useState('');
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState('');

  useEffect(() => {
    // Fetch dentists from an API or static data
    axios.get('/api/dentists').then((response) => {
      setDentists(response.data);
    });
  }, []);

  const handleDentistChange = (e) => {
    setSelectedDentist(e.target.value);
    axios.get(`/api/slots?dentist=${e.target.value}`).then((response) => {
      setAvailableSlots(response.data);
    });
  };

  const handleSlotChange = (e) => {
    setSelectedSlot(e.target.value);
  };

  const handleBooking = () => {
    // Handle booking logic
    console.log(`Booked with ${selectedDentist} at ${selectedSlot}`);
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Book an Appointment
      </Typography>
      <TextField
        select
        label="Select Dentist"
        value={selectedDentist}
        onChange={handleDentistChange}
        fullWidth
        margin="normal"
      >
        {dentists.map((dentist) => (
          <MenuItem key={dentist.id} value={dentist.id}>
            {dentist.name}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        select
        label="Select Time Slot"
        value={selectedSlot}
        onChange={handleSlotChange}
        fullWidth
        margin="normal"
        disabled={!availableSlots.length}
      >
        {availableSlots.map((slot) => (
          <MenuItem key={slot} value={slot}>
            {slot}
          </MenuItem>
        ))}
      </TextField>
      <Button
        variant="contained"
        color="primary"
        onClick={handleBooking}
        fullWidth
        sx={{ mt: 3 }}
      >
        Confirm Booking
      </Button>
    </Box>
  );
};

export default BookingPage;
