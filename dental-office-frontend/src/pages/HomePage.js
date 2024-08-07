import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Button, Box, List, ListItem, ListItemText } from '@mui/material';

const HomePage = () => {
  return (
    <Container maxWidth="md">
      <Box 
        component="header" 
        sx={{ 
          textAlign: 'center', 
          py: 5, 
          backgroundColor: 'primary.main', 
          color: 'primary.contrastText',
          borderRadius: 2,
          boxShadow: 3,
          mb: 4,
        }}
      >
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to Our Dental Office
        </Typography>
        <Typography variant="body1" paragraph>
          Your smile is our priority. We provide a wide range of dental services to keep your teeth healthy and looking great.
        </Typography>
        <Link to="/booking" style={{ textDecoration: 'none' }}>
          <Button 
            variant="contained" 
            color="secondary"
            sx={{ mt: 2 }}
          >
            Book an Appointment
          </Button>
        </Link>
      </Box>

      <Box component="section" sx={{ mb: 5 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Our Services
        </Typography>
        <List>
          {['Teeth Cleaning', 'Orthodontics', 'Cosmetic Dentistry', 'Root Canals'].map((service, index) => (
            <ListItem key={index}>
              <ListItemText primary={service} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
};

export default HomePage;
