import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';

const BookingPage = () => {
  const [dentists, setDentists] = useState([]);
  const [selectedDentist, setSelectedDentist] = useState('');
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState('');

  // Fetch the list of dentists on component mount
  useEffect(() => {
    const fetchDentists = async () => {
      try {
        const response = await axios.get('/api/dentists');
        setDentists(response.data);
      } catch (error) {
        console.error('Error fetching dentists:', error);
      }
    };
    fetchDentists();
  }, []);

  // Fetch available slots when a dentist is selected
  useEffect(() => {
    if (selectedDentist) {
      const fetchSlots = async () => {
        try {
          const response = await axios.get(`/api/dentists/${selectedDentist}/slots`);
          setAvailableSlots(response.data);
        } catch (error) {
          console.error('Error fetching slots:', error);
        }
      };
      fetchSlots();
    }
  }, [selectedDentist]);

  // Handle booking an appointment
  const handleBooking = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post(
        '/api/appointments',
        {
          dentistId: selectedDentist,
          time: selectedSlot,  // Send only the time string
        },
        config
      );

      const appointment = response.data.appointment;
      const dentistName = appointment?.dentist?.name;  // Safely access dentist name

      if (dentistName) {
        alert(`Appointment booked with ${dentistName} at ${appointment.time}`);
      } else {
        alert('Appointment booked, but dentist details are missing.');
      }
    } catch (error) {
      console.error('Error booking appointment:', error);

      if (error.response && error.response.data) {
        // Display a specific error message from the server
        alert(`Error: ${error.response.data.message}`);
      } else {
        // General error message
        alert('An error occurred while booking the appointment. Please try again.');
      }
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Book an Appointment
      </Typography>
      <FormControl fullWidth sx={{ mt: 2 }}>
        <InputLabel>Select Dentist</InputLabel>
        <Select
          value={selectedDentist}
          onChange={(e) => setSelectedDentist(e.target.value)}
        >
          {dentists.map((dentist) => (
            <MenuItem key={dentist._id} value={dentist._id}>
              {dentist.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth sx={{ mt: 2 }} disabled={!selectedDentist}>
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
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 4 }}
        onClick={handleBooking}
        disabled={!selectedSlot}
      >
        Book Appointment
      </Button>
    </Box>
  );
};

export default BookingPage;
