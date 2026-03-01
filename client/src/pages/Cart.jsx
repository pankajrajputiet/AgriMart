// client/src/pages/Cart.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { 
  Container, Typography, Box, Button, Grid, Card,
  Divider, List, ListItem
} from '@mui/material';
import { ShoppingCart, ArrowForward, Delete } from '@mui/icons-material';
import { clearCart } from '../redux/slices/cartSlice';
import CartItem from '../components/CartItem';

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items, subtotal } = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.auth);

  const tax = Math.round(subtotal * 0.05);
  const shipping = subtotal > 500 ? 0 : 50;
  const total = subtotal + tax + shipping;

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate('/login?redirect=/checkout');
    } else {
      navigate('/checkout');
    }
  };

  if (items.length === 0) {
    return (
      <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
        <ShoppingCart sx={{ fontSize: 80, color: 'grey.300', mb: 2 }} />
        <Typography variant="h5" sx={{ mb: 2 }}>
          Your cart is empty
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 4 }}>
          Looks like you haven't added any products to your cart yet.
        </Typography>
        <Button
          variant="contained"
          component={Link}
          to="/shop"
          sx={{ bgcolor: 'primary.main', '&:hover': { bgcolor: 'primary.dark' } }}
        >
          Start Shopping
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 4 }}>
        Shopping Cart ({items.length} items)
      </Typography>

      <Grid container spacing={4}>
        {/* Cart Items */}
        <Grid item xs={12} md={8}>
          {items.map((item) => (
            <CartItem key={item.productId} item={item} />
          ))}
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Button component={Link} to="/shop" startIcon={<ArrowForward />}>
              Continue Shopping
            </Button>
            <Button color="error" onClick={() => dispatch(clearCart())}>
              Clear Cart
            </Button>
          </Box>
        </Grid>

        {/* Order Summary */}
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3, position: 'sticky', top: 80 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Order Summary
            </Typography>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography color="text.secondary">Subtotal</Typography>
              <Typography>₹{subtotal.toFixed(2)}</Typography>
            </Box>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography color="text.secondary">Tax (5%)</Typography>
              <Typography>₹{tax.toFixed(2)}</Typography>
            </Box>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography color="text.secondary">Shipping</Typography>
              <Typography color={shipping === 0 ? 'success.main' : 'text.secondary'}>
                {shipping === 0 ? 'FREE' : `₹${shipping}`}
              </Typography>
            </Box>
            
            {subtotal < 500 && (
              <Typography variant="caption" color="success.main" sx={{ display: 'block', mb: 1 }}>
                Add ₹{(500 - subtotal).toFixed(2)} more for free shipping!
              </Typography>
            )}
            
            <Divider sx={{ my: 2 }} />
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>Total</Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>
                ₹{total.toFixed(2)}
              </Typography>
            </Box>
            
            <Button
              variant="contained"
              fullWidth
              size="large"
              onClick={handleCheckout}
              sx={{ 
                bgcolor: 'primary.main',
                '&:hover': { bgcolor: 'primary.dark' }
              }}
            >
              Proceed to Checkout
            </Button>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Cart;