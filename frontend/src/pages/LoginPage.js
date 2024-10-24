import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Box, Typography, TextField, Button, useMediaQuery, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Transition } from '@headlessui/react';

const LoginPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('/api/auth/login', data);
      localStorage.setItem('token', response.data.token);
      setSuccess('Login successful! Redirecting...');
      setTimeout(() => navigate('/dashboard'), 2000); // Navigate after 2 seconds
    } catch (error) {
      setError(error.response?.data?.message || 'Error logging in');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: isDesktop ? 'row' : 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: 'calc(100vh - 64px)', // Assuming the header is 64px high
        px: 3,
        py: 6,
        bgcolor: 'background.default',
      }}
    >
      {isDesktop && (
        <Box
        component="img"
        src="/images/dental-login.jpeg"
        alt="Dental Clinic"
        sx={{
          width: '50%',
          maxHeight: 'calc(80vh - 64px)', // Ensure the image does not exceed the viewport height
          objectFit: 'cover', // Maintain the image aspect ratio
          borderRadius: 2,
          boxShadow: 3,
          transition: 'transform 0.5s ease-in-out',
          '&:hover': {
            transform: 'scale(1.05)',
          },
        }}
      />
      
      )}
      <Box
        sx={{
          maxWidth: 400,
          mx: 'auto',
          p: 3,
          bgcolor: 'background.paper',
          boxShadow: 3,
          borderRadius: 2,
          mt: isDesktop ? 0 : 4,
        }}
      >
        <Typography variant="h4" gutterBottom>
          Log In
        </Typography>
        <Transition
          show={!!error}
          enter="transition-opacity duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Box className="bg-red-100 p-3 rounded-md mt-4">
            <Typography variant="body2" color="error">
              {error}
            </Typography>
          </Box>
        </Transition>
        <Transition
          show={!!success}
          enter="transition-opacity duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Box className="flex items-center bg-green-100 p-3 rounded-md mt-4">
            <Typography variant="body2" color="primary">
              {success}
            </Typography>
          </Box>
        </Transition>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            {...register('email', { required: 'Email is required' })}
            error={!!errors.email}
            helperText={errors.email ? errors.email.message : ''}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            {...register('password', { required: 'Password is required' })}
            error={!!errors.password}
            helperText={errors.password ? errors.password.message : ''}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Log In
          </Button>
        </form>
        <Button
          color="secondary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={() => navigate('/signup')}
        >
          Don't have an account? Sign Up
        </Button>
      </Box>
    </Box>
  );
};

export default LoginPage;
