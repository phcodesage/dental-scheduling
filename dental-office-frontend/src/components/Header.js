import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location
  const token = localStorage.getItem('token'); // Check if the user is logged in

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear the token from localStorage
    navigate('/login'); // Redirect to login page
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Dental Office
        </Typography>
        <Box>
          {location.pathname !== '/dashboard' && location.pathname !== '/booking' && (
            <Button color="inherit" component={Link} to="/" sx={{ mr: 2 }}>
              Home
            </Button>
          )}
          <Button color="inherit" component={Link} to="/booking" sx={{ mr: 2 }}>
            Book an Appointment
          </Button>
          {token ? (
            <>
              <Button color="inherit" component={Link} to="/dashboard" sx={{ mr: 2 }}>
                Dashboard
              </Button>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              {/* Conditionally render Login or Sign Up button based on the current route */}
              {location.pathname === '/login' ? (
                <Button color="inherit" component={Link} to="/signup">
                  Sign Up
                </Button>
              ) : (
                <Button color="inherit" component={Link} to="/login">
                  Login
                </Button>
              )}
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
