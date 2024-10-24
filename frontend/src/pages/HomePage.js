import React from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  TextField,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { styled } from '@mui/system';
import { Phone, Email, Facebook, Twitter, Instagram } from '@mui/icons-material';
import ScheduleIcon from '@mui/icons-material/Schedule';
import CleanHandsIcon from '@mui/icons-material/CleaningServices';
import SmileIcon from '@mui/icons-material/SentimentSatisfied';
import RootIcon from '@mui/icons-material/Healing';

const Header = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(10, 2),
  backgroundImage: 'url(https://source.unsplash.com/featured/?dentist)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  color: '#fff',
  position: 'relative',
  marginBottom: theme.spacing(8),
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(25, 118, 210, 0.6)', // Overlay color
    zIndex: 1,
  },
  '& > *': {
    position: 'relative',
    zIndex: 2,
  },
}));

const ServiceSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(8, 2),
  backgroundColor: '#f5f5f5',
}));

const TestimonialsSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(8, 2),
  backgroundColor: '#ffffff',
}));

const ContactSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(8, 2),
  backgroundColor: '#f5f5f5',
}));

const Footer = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(4, 2),
  backgroundColor: '#1976d2',
  color: '#ffffff',
}));

const NavLink = styled(Link)(({ theme }) => ({
  color: '#ffffff',
  textDecoration: 'none',
  marginRight: theme.spacing(2),
  '&:hover': {
    textDecoration: 'underline',
  },
}));

const HomePage = () => {
  return (
    <Box>
      {/* Navigation Bar */}
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Dental Clinic
          </Typography>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/services">Services</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Header>
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to Our Dental Clinic
        </Typography>
        <Typography variant="h5" paragraph>
          Your smile is our priority. We provide a wide range of dental services to keep your teeth healthy and looking great.
        </Typography>
        <Link to="/booking" style={{ textDecoration: 'none' }}>
          <Button variant="contained" color="secondary" size="large" startIcon={<ScheduleIcon />}>
            Book an Appointment
          </Button>
        </Link>
      </Header>

      {/* Services Section */}
      <ServiceSection>
        <Container maxWidth="lg">
          <Typography variant="h4" component="h2" align="center" gutterBottom>
            Our Services
          </Typography>
          <Grid container spacing={4}>
            {[
              { title: 'Teeth Cleaning', icon: <CleanHandsIcon fontSize="large" color="primary" /> },
              { title: 'Orthodontics', icon: <SmileIcon fontSize="large" color="primary" /> },
              { title: 'Cosmetic Dentistry', icon: <SmileIcon fontSize="large" color="primary" /> },
              { title: 'Root Canals', icon: <RootIcon fontSize="large" color="primary" /> },
            ].map((service, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card elevation={3} sx={{ height: '100%', textAlign: 'center', padding: 2 }}>
                  <CardContent>
                    <Box mb={2}>{service.icon}</Box>
                    <Typography variant="h6" component="h3">
                      {service.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </ServiceSection>

      {/* Testimonials Section */}
      <TestimonialsSection>
        <Container maxWidth="md">
          <Typography variant="h4" component="h2" align="center" gutterBottom>
            What Our Patients Say
          </Typography>
          <Grid container spacing={4}>
            {[
              {
                name: 'John Doe',
                feedback: 'Excellent service and friendly staff. Highly recommend!',
              },
              {
                name: 'Jane Smith',
                feedback: 'Professional and caring dentists. My teeth have never looked better!',
              },
              {
                name: 'Emily Johnson',
                feedback: 'A wonderful experience from start to finish.',
              },
            ].map((testimonial, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Card elevation={2} sx={{ padding: 2, height: '100%' }}>
                  <CardContent>
                    <Typography variant="body1" gutterBottom>
                      "{testimonial.feedback}"
                    </Typography>
                    <Typography variant="subtitle1" color="primary">
                      - {testimonial.name}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </TestimonialsSection>

      {/* Contact Section */}
      <ContactSection>
        <Container maxWidth="sm">
          <Typography variant="h4" component="h2" align="center" gutterBottom>
            Get in Touch
          </Typography>
          <Box component="form" noValidate autoComplete="off">
            <TextField
              fullWidth
              label="Name"
              variant="outlined"
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              margin="normal"
              required
              type="email"
            />
            <TextField
              fullWidth
              label="Message"
              variant="outlined"
              margin="normal"
              required
              multiline
              rows={4}
            />
            <Button variant="contained" color="primary" size="large" fullWidth sx={{ mt: 2 }}>
              Send Message
            </Button>
          </Box>
        </Container>
      </ContactSection>

      {/* Footer */}
      <Footer>
        <Container maxWidth="lg">
          <Grid container spacing={2} justifyContent="center" alignItems="center">
            <Grid item>
              <IconButton href="#" color="inherit">
                <Facebook />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton href="#" color="inherit">
                <Twitter />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton href="#" color="inherit">
                <Instagram />
              </IconButton>
            </Grid>
          </Grid>
          <Typography variant="body1" sx={{ mt: 2 }}>
            &copy; 2024 Dental Clinic - All Rights Reserved
          </Typography>
          <Typography variant="body2">
            Contact us at (123) 456-7890 | 123 Dental St, Toothville
          </Typography>
        </Container>
      </Footer>
    </Box>
  );
};

export default HomePage;
