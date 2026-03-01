// client/src/components/CartItem.jsx
import React from 'react';
import { useDispatch } from 'react-redux';
import { 
  Box, Typography, IconButton, Button, Card, CardMedia 
} from '@mui/material';
import { Add, Remove, Delete } from '@mui/icons-material';
import { updateQuantity, removeFromCart } from '../redux/slices/cartSlice';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleIncrement = () => {
    dispatch(updateQuantity({ productId: item.productId, quantity: item.quantity + 1 }));
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ productId: item.productId, quantity: item.quantity - 1 }));
    }
  };

  const handleRemove = () => {
    dispatch(removeFromCart(item.productId));
  };

  return (
    <Card sx={{ display: 'flex', p: 2, mb: 2 }}>
      <CardMedia
        component="img"
        sx={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 1 }}
        image={item.image || '/placeholder.jpg'}
        alt={item.name}
      />
      
      <Box sx={{ flex: 1, ml: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
          {item.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          ₹{item.price} / {item.unit}
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, gap: 2 }}>
          {/* Quantity Controls */}
          <Box sx={{ display: 'flex', alignItems: 'center', border: 1, borderColor: 'grey.300', borderRadius: 1 }}>
            <IconButton size="small" onClick={handleDecrement} disabled={item.quantity <= 1}>
              <Remove fontSize="small" />
            </IconButton>
            <Typography sx={{ px: 2, fontWeight: 600 }}>{item.quantity}</Typography>
            <IconButton size="small" onClick={handleIncrement}>
              <Add fontSize="small" />
            </IconButton>
          </Box>
          
          <IconButton color="error" onClick={handleRemove}>
            <Delete />
          </IconButton>
        </Box>
      </Box>
      
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'center' }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'primary.main' }}>
          ₹{(item.price * item.quantity).toFixed(2)}
        </Typography>
      </Box>
    </Card>
  );
};

export default CartItem;