// client/src/pages/Register.jsx
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { 
  Box, Container, Typography, TextField, Button, 
  Card, Alert, InputAdornment, IconButton, FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
import { Visibility, VisibilityOff, Agriculture } from '@mui/icons-material';
import { register, clearError } from '../redux/slices/authSlice';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isAuthenticated, loading, error } = useSelector((state) => state.auth);
  
  const [showPassword, setShowPassword] = useState(false);
  const defaultRole = searchParams.get('role') || 'customer';
  
  const { register: registerForm, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: { role: defaultRole }
  });
  
  const password = watch('password');

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
    return () => {
      dispatch(clearError());
    };
  }, [isAuthenticated, navigate, dispatch]);

  const onSubmit = (data) => {
    dispatch(register(data));
  };

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Card sx={{ p: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <Agriculture sx={{ fontSize: 48, color: 'primary.main' }} />
          </Box>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            Create Account
          </Typography>
          <Typography color="text.secondary">
            Join AgriShop today
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            fullWidth
            label="Full Name"
            {...registerForm('name', {
              required: 'Name is required',
              minLength: {
                value: 2,
                message: 'Name must be at least 2 characters'
              }
            })}
            error={!!errors.name}
            helperText={errors.name?.message}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Email Address"
            type="email"
            {...registerForm('email', {
              required: 'Email is required',
              pattern: {
                value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                message: 'Please enter a valid email'
              }
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Phone Number"
            {...registerForm('phone', {
              required: 'Phone is required',
              pattern: {
                value: /^[0-9]{10}$/,
                message: 'Please enter a valid 10-digit phone number'
              }
            })}
            error={!!errors.phone}
            helperText={errors.phone?.message}
            sx={{ mb: 2 }}
          />

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Account Type</InputLabel>
            <Select
              {...registerForm('role')}
              label="Account Type"
            >
              <MenuItem value="customer">Customer</MenuItem>
              <MenuItem value="farmer">Farmer</MenuItem>
              <MenuItem value="wholesaler">Wholesaler</MenuItem>
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="Password"
            type={showPassword ? 'text' : 'password'}
            {...registerForm('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters'
              }
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
            sx={{ mb: 2 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />

          <TextField
            fullWidth
            label="Confirm Password"
            type="password"
            {...registerForm('confirmPassword', {
              required: 'Please confirm your password',
              validate: value => value === password || 'Passwords do not match'
            })}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
            sx={{ mb: 3 }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            disabled={loading}
            sx={{ 
              mb: 2,
              bgcolor: 'primary.main',
              '&:hover': { bgcolor: 'primary.dark' }
            }}
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </Button>
        </form>

        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Already have an account?{' '}
            <Link to="/login" style={{ color: '#22c55e', textDecoration: 'none' }}>
              Sign in
            </Link>
          </Typography>
        </Box>
      </Card>
    </Container>
  );
};

export default Register;