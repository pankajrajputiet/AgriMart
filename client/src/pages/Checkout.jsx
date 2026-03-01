// client/src/pages/Checkout.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { 
  Container, Typography, Box, Button, Grid, Card,
  TextField, FormControl, InputLabel, Select, MenuItem,
  Radio, RadioGroup, FormControlLabel, Divider, Alert
} from '@mui/material';
import { CreditCard, LocalShipping, AccountBalance } from '@mui/icons-material';
import { createOrder, clearOrderState } from '../redux/slices/orderSlice';
import { clearCart } from '../redux/slices/cartSlice';

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { items, subtotal } = useSelector((state) => state.cart);
  const { loading, error, success, currentOrder } = useSelector((state) => state.orders);
  
  const [paymentMethod, setPaymentMethod] = useState('cod');
  
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();

  useEffect(() => {
    if (!user) {
      navigate('/login?redirect=/checkout');
    }
    if (items.length === 0) {
      navigate('/cart');
    }
  }, [user, items, navigate]);

  useEffect(() => {
    if (user?.addresses?.length > 0) {
      const defaultAddr = user.addresses.find(a => a.isDefault) || user.addresses[0];
      setValue('fullName', defaultAddr.fullName || user.name);
      setValue('phone', defaultAddr.phone || user.phone);
      setValue('addressLine1', defaultAddr.addressLine1);
      setValue('city', defaultAddr.city);
      setValue('state', defaultAddr.state);
      setValue('pincode', defaultAddr.pincode);
    }
  }, [user, setValue]);

  useEffect(() => {
    if (success && currentOrder) {
      dispatch(clearCart());
      navigate(`/order-success/${currentOrder.data._id}`);
    }
    return () => {
      dispatch(clearOrderState());
    };
  }, [success, currentOrder, navigate, dispatch]);

  const tax = Math.round(subtotal * 0.05);
  const shipping = subtotal > 500 ? 0 : 50;
  const total = subtotal + tax + shipping;

  const onSubmit = async (data) => {
    const orderData = {
      orderItems: items.map(item => ({
        product: item.productId,
        quantity: item.quantity
      })),
      shippingAddress: {
        fullName: data.fullName,
        phone: data.phone,
        addressLine1: data.addressLine1,
        addressLine2: data.addressLine2,
        city: data.city,
        state: data.state,
        pincode: data.pincode
      },
      paymentMethod
    };
    
    dispatch(createOrder(orderData));
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 4 }}>
        Checkout
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={4}>
          {/* Shipping Address */}
          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                Shipping Address
              </Typography>
              
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    {...register('fullName', { required: 'Full name is required' })}
                    error={!!errors.fullName}
                    helperText={errors.fullName?.message}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    {...register('phone', { required: 'Phone is required' })}
                    error={!!errors.phone}
                    helperText={errors.phone?.message}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Address Line 1"
                    {...register('addressLine1', { required: 'Address is required' })}
                    error={!!errors.addressLine1}
                    helperText={errors.addressLine1?.message}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Address Line 2 (Optional)"
                    {...register('addressLine2')}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="City"
                    {...register('city', { required: 'City is required' })}
                    error={!!errors.city}
                    helperText={errors.city?.message}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="State"
                    {...register('state', { required: 'State is required' })}
                    error={!!errors.state}
                    helperText={errors.state?.message}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="PIN Code"
                    {...register('pincode', { required: 'PIN code is required' })}
                    error={!!errors.pincode}
                    helperText={errors.pincode?.message}
                  />
                </Grid>
              </Grid>
            </Card>

            {/* Payment Method */}
            <Card sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                Payment Method
              </Typography>
              
              <RadioGroup
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <FormControlLabel 
                  value="cod" 
                  control={<Radio />} 
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <LocalShipping />
                      Cash on Delivery
                    </Box>
                  }
                  sx={{ mb: 1 }}
                />
                <FormControlLabel 
                  value="card" 
                  control={<Radio />} 
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CreditCard />
                      Credit/Debit Card
                    </Box>
                  }
                  sx={{ mb: 1 }}
                />
                <FormControlLabel 
                  value="upi" 
                  control={<Radio />} 
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <AccountBalance />
                      UPI / Bank Transfer
                    </Box>
                  }
                />
              </RadioGroup>
            </Card>
          </Grid>

          {/* Order Summary */}
          <Grid item xs={12} md={4}>
            <Card sx={{ p: 3, position: 'sticky', top: 80 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Order Summary
              </Typography>
              
              {items.map((item) => (
                <Box key={item.productId} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" sx={{ flex: 1 }}>
                    {item.name} x {item.quantity}
                  </Typography>
                  <Typography variant="body2">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </Typography>
                </Box>
              ))}
              
              <Divider sx={{ my: 2 }} />
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography color="text.secondary">Subtotal</Typography>
                <Typography>₹{subtotal.toFixed(2)}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography color="text.secondary">Tax</Typography>
                <Typography>₹{tax.toFixed(2)}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography color="text.secondary">Shipping</Typography>
                <Typography>{shipping === 0 ? 'FREE' : `₹${shipping}`}</Typography>
              </Box>
              
              <Divider sx={{ my: 2 }} />
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>Total</Typography>
                <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>
                  ₹{total.toFixed(2)}
                </Typography>
              </Box>
              
              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                disabled={loading}
                sx={{ 
                  bgcolor: 'primary.main',
                  '&:hover': { bgcolor: 'primary.dark' }
                }}
              >
                {loading ? 'Processing...' : `Place Order - ₹${total.toFixed(2)}`}
              </Button>
            </Card>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default Checkout;