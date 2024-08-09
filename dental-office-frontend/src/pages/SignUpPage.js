import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Box, Typography, TextField, Button, useMediaQuery, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Transition } from '@headlessui/react';

const SignUpPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  const onSubmit = async (data) => {
    try {
      await axios.post('/api/auth/register', data);
      setSuccess('Registration successful! Please log in.');
      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      setError(error.response?.data?.message || 'Error signing up');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: isDesktop ? 'row' : 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: 'calc(100vh - 64px)',
        px: 3,
        py: 6,
        bgcolor: 'background.default',
      }}
    >
      {isDesktop && (
        <Box
          component="img"
          src="/images/dental-signup.jpeg"
          alt="Dental Clinic"
          sx={{
            width: '50%',
            maxHeight: 'calc(80vh - 64px)',
            objectFit: 'cover',
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
          Sign Up
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
          label="Name"
          variant="outlined"
          fullWidth
          margin="normal"
          {...register('name', { 
            required: 'Name is required', 
            minLength: { value: 3, message: 'Name must be at least 3 characters long' } 
          })}
          error={!!errors.name}
          helperText={errors.name ? errors.name.message : ''}
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          {...register('email', { 
            required: 'Email is required', 
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: 'Enter a valid email address',
            }
          })}
          error={!!errors.email}
          helperText={errors.email ? errors.email.message : ''}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          {...register('password', { 
            required: 'Password is required', 
            minLength: { value: 8, message: 'Password must be at least 8 characters long' },
            validate: {
              hasNumber: value => /[0-9]/.test(value) || 'Password must contain at least one number',
              hasUpperCase: value => /[A-Z]/.test(value) || 'Password must contain at least one uppercase letter',
              hasLowerCase: value => /[a-z]/.test(value) || 'Password must contain at least one lowercase letter',
              hasSpecialChar: value => /[!@#$%^&*(),.?":{}|<>]/.test(value) || 'Password must contain at least one special character',
            }
          })}
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
          Sign Up
        </Button>
      </form>

        <Button
          color="secondary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={() => navigate('/login')}
        >
          Already have an account? Log in
        </Button>
      </Box>
    </Box>
  );
};

export default SignUpPage;
