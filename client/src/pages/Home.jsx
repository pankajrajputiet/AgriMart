// client/src/pages/Home.jsx
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Box, Container, Typography, Button, Grid, Card,
  CardContent, Chip, Rating, Skeleton
} from '@mui/material';
import { 
  Agriculture, LocalShipping, Verified, Support,
  ArrowForward, Grass, LocalFlorist, WaterDrop
} from '@mui/icons-material';
import { getFeaturedProducts } from '../redux/slices/productSlice';
import ProductCard from '../components/ProductCard';
import Loading from '../components/Loading';

const features = [
  { icon: <Agriculture />, title: 'Farm Fresh', desc: 'Direct from farms to your table' },
  { icon: <LocalShipping />, title: 'Fast Delivery', desc: 'Same day delivery available' },
  { icon: <Verified />, title: 'Quality Assured', desc: '100% quality guarantee' },
  { icon: <Support />, title: '24/7 Support', desc: 'Dedicated customer support' },
];

const categories = [
  { name: 'Fresh Vegetables', icon: <Grass />, slug: 'vegetables', color: '#4ade80' },
  { name: 'Fruits', icon: <LocalFlorist />, slug: 'fruits', color: '#f472b6' },
  { name: 'Organic', icon: <WaterDrop />, slug: 'organic', color: '#22c55e' },
  { name: 'Grains', icon: <Agriculture />, slug: 'grains', color: '#f59e0b' },
];

const Home = () => {
  const dispatch = useDispatch();
  const { featuredProducts, loading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getFeaturedProducts());
  }, [dispatch]);

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'primary.50',
          py: { xs: 6, md: 10 },
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Chip label="🌾 Fresh from Indian Farms" color="success" sx={{ mb: 2 }} />
              <Typography variant="h2" sx={{ 
                fontWeight: 700, 
                fontSize: { xs: '2rem', md: '3rem' },
                mb: 2,
                lineHeight: 1.2
              }}>
                Fresh Agricultural Products Delivered
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
                Discover the finest quality vegetables, fruits, grains, and organic products 
                directly from verified farmers across India.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  size="large"
                  component={Link}
                  to="/shop"
                  sx={{ bgcolor: 'primary.main', '&:hover': { bgcolor: 'primary.dark' } }}
                  endIcon={<ArrowForward />}
                >
                  Shop Now
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  component={Link}
                  to="/about"
                  sx={{ borderColor: 'primary.main', color: 'primary.main' }}
                >
                  Learn More
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src="https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=600"
                alt="Fresh vegetables"
                sx={{ width: '100%', borderRadius: 3, boxShadow: 3 }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={3}>
          {features.map((feature, index) => (
            <Grid item xs={6} md={3} key={index}>
              <Card sx={{ height: '100%', textAlign: 'center', py: 3 }}>
                <Box sx={{ color: 'primary.main', mb: 1 }}>
                  {feature.icon}
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {feature.desc}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Categories */}
      <Box sx={{ bgcolor: 'grey.50', py: 6 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 4, textAlign: 'center' }}>
            Shop by Category
          </Typography>
          <Grid container spacing={3}>
            {categories.map((cat) => (
              <Grid item xs={6} sm={3} key={cat.slug}>
                <Card
                  component={Link}
                  to={`/category/${cat.slug}`}
                  sx={{
                    textDecoration: 'none',
                    textAlign: 'center',
                    py: 4,
                    transition: 'transform 0.2s',
                    '&:hover': { transform: 'translateY(-8px)' }
                  }}
                >
                  <Box sx={{ 
                    width: 80, 
                    height: 80, 
                    borderRadius: '50%', 
                    bgcolor: `${cat.color}20`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 2,
                    color: cat.color
                  }}>
                    {cat.icon}
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>
                    {cat.name}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Featured Products */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            Featured Products
          </Typography>
          <Button 
            component={Link} 
            to="/shop" 
            endIcon={<ArrowForward />}
            color="primary"
          >
            View All
          </Button>
        </Box>
        
        {loading ? (
          <Grid container spacing={3}>
            {[...Array(8)].map((_, index) => (
              <Grid item xs={6} sm={3} key={index}>
                <Skeleton variant="rectangular" height={300} sx={{ borderRadius: 2 }} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Grid container spacing={3}>
            {featuredProducts.slice(0, 8).map((product) => (
              <Grid item xs={6} sm={3} key={product._id}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>

      {/* CTA Section */}
      <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 8 }}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
            Are You a Farmer?
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
            Join our platform and sell your fresh produce directly to customers across India.
          </Typography>
          <Button
            variant="contained"
            size="large"
            component={Link}
            to="/register?role=farmer"
            sx={{ 
              bgcolor: 'white', 
              color: 'primary.main',
              '&:hover': { bgcolor: 'grey.100' }
            }}
          >
            Start Selling Today
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;