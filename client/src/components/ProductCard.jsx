// client/src/components/ProductCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Card, CardMedia, CardContent, CardActions, Typography,
  IconButton, Box, Chip, Rating
} from '@mui/material';
import { 
  Favorite, FavoriteBorder, ShoppingCart, Star 
} from '@mui/icons-material';
import { addToCart } from '../redux/slices/cartSlice';
import { addToWishlist, removeFromWishlist } from '../services/api';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const wishlist = user?.wishlist || [];

  const isInWishlist = wishlist.includes(product._id);

  const handleAddToCart = () => {
    dispatch(addToCart({ product, quantity: 1 }));
  };

  const handleToggleWishlist = async () => {
    if (!isAuthenticated) {
      alert('Please login to add to wishlist');
      return;
    }
    try {
      if (isInWishlist) {
        await removeFromWishlist(product._id);
      } else {
        await addToWishlist(product._id);
      }
      window.location.reload();
    } catch (error) {
      console.error('Wishlist error:', error);
    }
  };

  const discountedPrice = product.discount > 0
    ? Math.round(product.price * (1 - product.discount / 100))
    : product.price;

  return (
    <Card sx={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      position: 'relative',
      transition: 'transform 0.2s, box-shadow 0.2s',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: 3
      }
    }}>
      {/* Discount Badge */}
      {product.discount > 0 && (
        <Chip
          label={`-${product.discount}%`}
          color="error"
          size="small"
          sx={{
            position: 'absolute',
            top: 8,
            left: 8,
            zIndex: 1,
            fontWeight: 600
          }}
        />
      )}
      
      {/* Organic Badge */}
      {product.isOrganic && (
        <Chip
          label="Organic"
          color="success"
          size="small"
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            zIndex: 1,
            fontWeight: 600
          }}
        />
      )}
      
      {/* Wishlist Button */}
      <IconButton
        onClick={handleToggleWishlist}
        sx={{
          position: 'absolute',
          top: 8,
          right: isInWishlist ? 40 : 8,
          zIndex: 1,
          bgcolor: 'white',
          '&:hover': { bgcolor: 'grey.100' }
        }}
      >
        {isInWishlist ? <Favorite sx={{ color: 'error.main' }} /> : <FavoriteBorder />}
      </IconButton>
      
      {/* Product Image */}
      <Link to={`/product/${product.slug}`}>
        <CardMedia
          component="img"
          height="200"
          image={product.images?.[0]?.url || '/placeholder.jpg'}
          alt={product.name}
          sx={{ objectFit: 'cover' }}
        />
      </Link>
      
      <CardContent sx={{ flexGrow: 1, pb: 1 }}>
        <Link to={`/product/${product.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <Typography variant="subtitle1" sx={{ 
            fontWeight: 600,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            mb: 0.5
          }}>
            {product.name}
          </Typography>
        </Link>
        
        {/* Rating */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
          <Rating value={product.rating?.average || 0} precision={0.5} size="small" readOnly />
          <Typography variant="caption" color="text.secondary">
            ({product.rating?.count || 0})
          </Typography>
        </Box>
        
        {/* Price */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="h6" color="primary.main" sx={{ fontWeight: 700 }}>
            ₹{discountedPrice}
          </Typography>
          {product.discount > 0 && (
            <Typography variant="body2" sx={{ textDecoration: 'line-through', color: 'grey.500' }}>
              ₹{product.price}
            </Typography>
          )}
          <Typography variant="caption" color="text.secondary">
            / {product.unit}
          </Typography>
        </Box>
      </CardContent>
      
      <CardActions sx={{ p: 2, pt: 0 }}>
        <Button
          variant="contained"
          fullWidth
          startIcon={<ShoppingCart />}
          onClick={handleAddToCart}
          disabled={product.availability === 'out-of-stock'}
          sx={{
            bgcolor: 'primary.main',
            '&:hover': { bgcolor: 'primary.dark' }
          }}
        >
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;