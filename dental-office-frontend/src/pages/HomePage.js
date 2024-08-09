import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Button, Box, Grid } from '@mui/material';
import styled from '@emotion/styled';

const Header = styled(Box)`
  text-align: center;
  padding: 50px 20px;
  background-color: #e3f2fd;
  margin-bottom: 40px;
`;

const ServiceSection = styled(Box)`
  padding: 40px 20px;
  background-color: #ffffff;
`;

const Footer = styled(Box)`
  text-align: center;
  padding: 20px;
  background-color: #1976d2;
  color: #ffffff;
  margin-top: 40px;
`;

const HomePage = () => {
  return (
    <Container maxWidth="lg">
      <Header>
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to Our Dental Office
        </Typography>
        <Typography variant="body1" paragraph>
          Your smile is our priority. We provide a wide range of dental services to keep your teeth healthy and looking great.
        </Typography>
        <Link to="/booking" style={{ textDecoration: 'none' }}>
          <Button variant="contained" color="primary" size="large">
            Book an Appointment
          </Button>
        </Link>
      </Header>

      <ServiceSection>
        <Typography variant="h4" component="h2" gutterBottom>
          Our Services
        </Typography>
        <Grid container spacing={4}>
          {['Teeth Cleaning', 'Orthodontics', 'Cosmetic Dentistry', 'Root Canals'].map((service, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Box textAlign="center" p={2} border={1} borderColor="grey.300" borderRadius={4}>
                <Typography variant="h6" component="h3">
                  {service}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </ServiceSection>

      <Footer>
        <Typography variant="body1">
          &copy; 2024 Dental Office - All Rights Reserved
        </Typography>
        <Typography variant="body2">
          Contact us at (123) 456-7890 | 123 Dental St, Toothville
        </Typography>
      </Footer>
    </Container>
  );
};

export default HomePage;
