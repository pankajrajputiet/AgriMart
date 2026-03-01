// client/src/pages/OrderSuccess.jsx
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { 
  Container, Typography, Box, Button, Card, Grid 
} from '@mui/material';
import { CheckCircle, LocalShipping } from '@mui/icons-material';

const OrderSuccess = () => {
  const { id } = useParams();
  const { currentOrder } = useSelector((state) => state.orders);

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <CheckCircle sx={{ fontSize: 80, color: 'success.main', mb: 2 }} />
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
          Order Placed Successfully!
        </Typography>
        <Typography color="text.secondary">
          Thank you for your order. We've received your order and will begin processing it right away.
        </Typography>
      </Box>

      <Card sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Order Details
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">Order Number</Typography>
            <Typography sx={{ fontWeight: 600 }}>
              {currentOrder?.data?.orderNumber || id}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">Estimated Delivery</Typography>
            <Typography sx={{ fontWeight: 600 }}>
              3-5 business days
            </Typography>
          </Grid>
        </Grid>
      </Card>

      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
        <Button
          variant="contained"
          component={Link}
          to="/orders"
          startIcon={<LocalShipping />}
          sx={{ bgcolor: 'primary.main', '&:hover': { bgcolor: 'primary.dark' } }}
        >
          Track Your Order
        </Button>
        <Button
          variant="outlined"
          component={Link}
          to="/shop"
          sx={{ borderColor: 'primary.main', color: 'primary.main' }}
        >
          Continue Shopping
        </Button>
      </Box>
    </Container>
  );
};

export default OrderSuccess;