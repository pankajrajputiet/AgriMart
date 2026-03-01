// client/src/pages/ProductDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Box, Container, Grid, Typography, Button, IconButton,
  Chip, Rating, TextField, Card, Divider, Skeleton,
  Breadcrumbs, Link as MuiLink
} from '@mui/material';
import { 
  Add, Remove, FavoriteBorder, Favorite, Share,
  LocalShipping, Verified, ShoppingCart, Star
} from '@mui/icons-material';
import { getProduct, addReview } from '../redux/slices/productSlice';
import { addToCart } from '../redux/slices/cartSlice';
import Loading from '../components/Loading';

const ProductDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { product, loading } = useSelector((state) => state.products);
  const { isAuthenticated } = useSelector((state) => state.auth);
  
  const [quantity, setQuantity] = useState(1);
  const [reviewData, setReviewData] = useState({ rating: 5, comment: '' });
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    dispatch(getProduct(slug));
  }, [dispatch, slug]);

  const handleAddToCart = () => {
    dispatch(addToCart({ product, quantity }));
  };

  const handleBuyNow = () => {
    dispatch(addToCart({ product, quantity }));
    navigate('/checkout');
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    await dispatch(addReview({ 
      productId: product._id, 
      ...reviewData 
    }));
    setReviewData({ rating: 5, comment: '' });
  };

  if (loading || !product) {
    return <Loading message="Loading product..." />;
  }

  const discountedPrice = product.discount > 0
    ? Math.round(product.price * (1 - product.discount / 100))
    : product.price;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Breadcrumbs */}
      <Breadcrumbs sx={{ mb: 3 }}>
        <MuiLink component="a" href="/" sx={{ textDecoration: 'none', color: 'grey.600' }}>Home</MuiLink>
        <MuiLink component="a" href="/shop" sx={{ textDecoration: 'none', color: 'grey.600' }}>Shop</MuiLink>
        <Typography color="text.primary">{product.name}</Typography>
      </Breadcrumbs>

      <Grid container spacing={4}>
        {/* Product Images */}
        <Grid item xs={12} md={6}>
          <Box sx={{ position: 'sticky', top: 80 }}>
            {/* Main Image */}
            <Box
              component="img"
              src={product.images?.[selectedImage]?.url || '/placeholder.jpg'}
              alt={product.name}
              sx={{ 
                width: '100%', 
                height: 400, 
                objectFit: 'cover', 
                borderRadius: 2,
                mb: 2
              }}
            />
            
            {/* Thumbnail Images */}
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {product.images?.map((img, index) => (
                <Box
                  key={index}
                  component="img"
                  src={img.url}
                  alt={`${product.name} ${index + 1}`}
                  onClick={() => setSelectedImage(index)}
                  sx={{
                    width: 80,
                    height: 80,
                    objectFit: 'cover',
                    borderRadius: 1,
                    cursor: 'pointer',
                    border: selectedImage === index ? 2 : 0,
                    borderColor: 'primary.main'
                  }}
                />
              ))}
            </Box>
          </Box>
        </Grid>

        {/* Product Info */}
        <Grid item xs={12} md={6}>
          <Box>
            {/* Badges */}
            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              {product.isOrganic && <Chip label="Organic" color="success" size="small" />}
              {product.discount > 0 && <Chip label={`-${product.discount}%`} color="error" size="small" />}
              {product.quality === 'export-quality' && <Chip label="Export Quality" color="info" size="small" />}
            </Box>

            <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
              {product.name}
            </Typography>

            {/* Rating */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <Rating value={product.rating?.average || 0} precision={0.5} readOnly />
              <Typography variant="body2" color="text.secondary">
                ({product.rating?.count || 0} reviews)
              </Typography>
            </Box>

            {/* Price */}
            <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 2, mb: 3 }}>
              <Typography variant="h4" color="primary.main" sx={{ fontWeight: 700 }}>
                ₹{discountedPrice}
              </Typography>
              {product.discount > 0 && (
                <Typography variant="h6" sx={{ textDecoration: 'line-through', color: 'grey.500' }}>
                  ₹{product.price}
                </Typography>
              )}
              <Typography variant="body1" color="text.secondary">
                / {product.unit}
              </Typography>
            </Box>

            {/* Description */}
            <Typography color="text.secondary" sx={{ mb: 3 }}>
              {product.description}
            </Typography>

            {/* Stock Status */}
            <Box sx={{ mb: 3 }}>
              {product.availability === 'in-stock' ? (
                <Chip 
                  icon={<Verified />} 
                  label="In Stock" 
                  color="success" 
                  variant="outlined" 
                />
              ) : (
                <Chip label="Out of Stock" color="error" variant="outlined" />
              )}
            </Box>

            {/* Quantity Selector */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <Typography>Quantity:</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', border: 1, borderColor: 'grey.300', borderRadius: 1 }}>
                <IconButton onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                  <Remove />
                </IconButton>
                <Typography sx={{ px: 3, fontWeight: 600 }}>{quantity}</Typography>
                <IconButton onClick={() => setQuantity(quantity + 1)}>
                  <Add />
                </IconButton>
              </Box>
              <Typography color="text.secondary">
                {product.stock?.available || 0} available
              </Typography>
            </Box>

            {/* Action Buttons */}
            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
              <Button
                variant="contained"
                size="large"
                startIcon={<ShoppingCart />}
                onClick={handleAddToCart}
                disabled={product.availability === 'out-of-stock'}
                sx={{ flex: 1, bgcolor: 'primary.main' }}
              >
                Add to Cart
              </Button>
              <Button
                variant="contained"
                size="large"
                onClick={handleBuyNow}
                disabled={product.availability === 'out-of-stock'}
                sx={{ flex: 1, bgcolor: 'secondary.main', '&:hover': { bgcolor: 'secondary.dark' } }}
              >
                Buy Now
              </Button>
              <IconButton sx={{ border: 1, borderColor: 'grey.300' }}>
                <FavoriteBorder />
              </IconButton>
            </Box>

            {/* Product Details */}
            <Card variant="outlined" sx={{ p: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                Product Details
              </Typography>
              <Grid container spacing={1}>
                {product.category && (
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">Category</Typography>
                    <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
                      {product.category}
                    </Typography>
                  </Grid>
                )}
                {product.farmingMethod && (
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">Farming Method</Typography>
                    <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
                      {product.farmingMethod}
                    </Typography>
                  </Grid>
                )}
                {product.origin?.state && (
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">Origin</Typography>
                    <Typography variant="body2">
                      {product.origin.state}, {product.origin.country}
                    </Typography>
                  </Grid>
                )}
                {product.shelfLife && (
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">Shelf Life</Typography>
                    <Typography variant="body2">{product.shelfLife}</Typography>
                  </Grid>
                )}
              </Grid>
            </Card>
          </Box>
        </Grid>
      </Grid>

      {/* Reviews Section */}
      <Box sx={{ mt: 6 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
          Customer Reviews
        </Typography>
        
        {/* Review Form */}
        <Card sx={{ p: 3, mb: 4 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
            Write a Review
          </Typography>
          <form onSubmit={handleSubmitReview}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" sx={{ mb: 1 }}>Rating</Typography>
              <Rating
                value={reviewData.rating}
                onChange={(e, newValue) => setReviewData({ ...reviewData, rating: newValue })}
              />
            </Box>
            <TextField
              fullWidth
              multiline
              rows={3}
              placeholder="Share your experience with this product..."
              value={reviewData.comment}
              onChange={(e) => setReviewData({ ...reviewData, comment: e.target.value })}
              sx={{ mb: 2 }}
            />
            <Button type="submit" variant="contained" sx={{ bgcolor: 'primary.main' }}>
              Submit Review
            </Button>
          </form>
        </Card>

        {/* Reviews List */}
        {product.reviews?.length > 0 ? (
          product.reviews.map((review, index) => (
            <Card key={index} sx={{ p: 2, mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography sx={{ fontWeight: 600 }}>
                    {review.user?.name || 'Anonymous'}
                  </Typography>
                  {review.verified && (
                    <Chip label="Verified" size="small" color="success" variant="outlined" />
                  )}
                </Box>
                <Rating value={review.rating} size="small" readOnly />
              </Box>
              <Typography color="text.secondary">{review.comment}</Typography>
              <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                {new Date(review.createdAt).toLocaleDateString()}
              </Typography>
            </Card>
          ))
        ) : (
          <Typography color="text.secondary">No reviews yet. Be the first to review!</Typography>
        )}
      </Box>
    </Container>
  );
};

export default ProductDetail;