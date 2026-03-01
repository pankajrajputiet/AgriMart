// client/src/pages/Profile.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { 
  Container, Typography, Box, Card, Grid, TextField,
  Button, Avatar, Divider, Alert
} from '@mui/material';
import { Edit, Save, Cancel } from '@mui/icons-material';
import { getProfile, updateProfile } from '../redux/slices/authSlice';

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);
  
  const [isEditing, setIsEditing] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const { register, handleSubmit, formState: { errors } } = useForm();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  const onSubmit = async (data) => {
    await dispatch(updateProfile(data));
    setSuccess(true);
    setIsEditing(false);
    setTimeout(() => setSuccess(false), 3000);
  };

  if (!user) {
    return null;
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 4 }}>
        My Profile
      </Typography>

      {success && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Profile updated successfully!
        </Alert>
      )}

      <Card sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <Avatar sx={{ width: 80, height: 80, bgcolor: 'primary.main', fontSize: 32, mr: 3 }}>
            {user.name?.charAt(0).toUpperCase()}
          </Avatar>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              {user.name}
            </Typography>
            <Typography color="text.secondary">{user.email}</Typography>
            <Chip 
              label={user.role.charAt(0).toUpperCase() + user.role.slice(1)} 
              size="small" 
              color="primary" 
              sx={{ mt: 1 }}
            />
          </Box>
        </Box>

        <Divider sx={{ mb: 3 }} />

        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Full Name"
                defaultValue={user.name}
                {...register('name', { required: true })}
                error={!!errors.name}
                disabled={!isEditing}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                defaultValue={user.email}
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone"
                defaultValue={user.phone}
                {...register('phone')}
                disabled={!isEditing}
              />
            </Grid>
          </Grid>

          <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
            {isEditing ? (
              <>
                <Button
                  type="submit"
                  variant="contained"
                  startIcon={<Save />}
                  sx={{ bgcolor: 'primary.main' }}
                >
                  Save Changes
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<Cancel />}
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </Button>
              </>
            ) : (
              <Button
                variant="contained"
                startIcon={<Edit />}
                onClick={() => setIsEditing(true)}
                sx={{ bgcolor: 'primary.main' }}
              >
                Edit Profile
              </Button>
            )}
          </Box>
        </form>
      </Card>
    </Container>
  );
};

export default Profile;