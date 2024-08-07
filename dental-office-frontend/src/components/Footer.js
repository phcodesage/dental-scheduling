import React from 'react';
import { Box, Typography, Container } from '@mui/material';

const Footer = () => {
  return (
    <Box 
      component="footer" 
      sx={{ 
        backgroundColor: 'primary.main', 
        color: 'primary.contrastText', 
        py: 3, 
        mt: 5 
      }}
    >
      <Container maxWidth="md" sx={{ textAlign: 'center' }}>
        <Typography variant="body1">
          &copy; 2024 Dental Office
        </Typography>
        <Typography variant="body2">
          Contact us at (123) 456-7890
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
