// client/src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Box, Container, Grid, Typography, IconButton, Divider,
  Button, TextField
} from '@mui/material';
import { 
  Agriculture, Facebook, Twitter, Instagram, YouTube,
  LocationOn, Phone, Email
} from '@mui/icons-material';

const Footer = () => {
  return (
    <Box component="footer" sx={{ bgcolor: '#1a1a1a', color: 'white', mt: 8 }}>
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={4}>
          {/* Brand */}
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <Agriculture sx={{ fontSize: 32, color: '#22c55e' }} />
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                AgriShop
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: 'grey.400', mb: 3 }}>
              Fresh agricultural products directly from farmers to your doorstep.
              Quality guaranteed, organic options available.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton 
                sx={{ bgcolor: 'grey.800', '&:hover': { bgcolor: 'primary.main' } }}
              >
                <Facebook />
              </IconButton>
              <IconButton 
                sx={{ bgcolor: 'grey.800', '&:hover': { bgcolor: 'primary.main' } }}
              >
                <Twitter />
              </IconButton>
              <IconButton 
                sx={{ bgcolor: 'grey.800', '&:hover': { bgcolor: 'primary.main' } }}
              >
                <Instagram />
              </IconButton>
              <IconButton 
                sx={{ bgcolor: 'grey.800', '&:hover': { bgcolor: 'primary.main' } }}
              >
                <YouTube />
              </IconButton>
            </Box>
          </Grid>
          
          {/* Quick Links */}
          <Grid item xs={6} md={2}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link to="/" style={{ color: 'grey.400', textDecoration: 'none' }}>Home</Link>
              <Link to="/shop" style={{ color: 'grey.400', textDecoration: 'none' }}>Shop</Link>
              <Link to="/about" style={{ color: 'grey.400', textDecoration: 'none' }}>About Us</Link>
              <Link to="/contact" style={{ color: 'grey.400', textDecoration: 'none' }}>Contact</Link>
            </Box>
          </Grid>
          
          {/* Categories */}
          <Grid item xs={6} md={2}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Categories
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link to="/category/vegetables" style={{ color: 'grey.400', textDecoration: 'none' }}>Vegetables</Link>
              <Link to="/category/fruits" style={{ color: 'grey.400', textDecoration: 'none' }}>Fruits</Link>
              <Link to="/category/grains" style={{ color: 'grey.400', textDecoration: 'none' }}>Grains</Link>
              <Link to="/category/organic" style={{ color: 'grey.400', textDecoration: 'none' }}>Organic</Link>
            </Box>
          </Grid>
          
          {/* Newsletter */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Newsletter
            </Typography>
            <Typography variant="body2" sx={{ color: 'grey.400', mb: 2 }}>
              Subscribe to get fresh updates and exclusive offers.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <TextField
                placeholder="Your email"
                size="small"
                sx={{
                  flex: 1,
                  bgcolor: 'grey.800',
                  '& .MuiOutlinedInput-root': {
                    color: 'white',
                    '& fieldset': { borderColor: 'grey.700' },
                    '&:hover fieldset': { borderColor: 'grey.600' },
                    '&.Mui-focused fieldset': { borderColor: 'primary.main' }
                  }
                }}
              />
              <Button 
                variant="contained" 
                sx={{ bgcolor: 'primary.main', '&:hover': { bgcolor: 'primary.dark' } }}
              >
                Subscribe
              </Button>
            </Box>
          </Grid>
        </Grid>
        
        <Divider sx={{ borderColor: 'grey.800', my: 4 }} />
        
        {/* Contact Info */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <LocationOn sx={{ color: 'primary.main' }} />
              <Typography variant="body2" sx={{ color: 'grey.400' }}>
                123 Agriculture Road, Mumbai, India - 400001
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Phone sx={{ color: 'primary.main' }} />
              <Typography variant="body2" sx={{ color: 'grey.400' }}>
                +91 98765 43210
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Email sx={{ color: 'primary.main' }} />
              <Typography variant="body2" sx={{ color: 'grey.400' }}>
                support@agrishop.com
              </Typography>
            </Box>
          </Grid>
        </Grid>
        
        {/* Bottom Bar */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 2,
          pt: 3,
          borderTop: '1px solid grey.800'
        }}>
          <Typography variant="body2" sx={{ color: 'grey.500' }}>
            © 2024 AgriShop. All rights reserved.
          </Typography>
          <Box sx={{ display: 'flex', gap: 3 }}>
            <Link to="/privacy" style={{ color: 'grey.500', textDecoration: 'none', fontSize: 14 }}>
              Privacy Policy
            </Link>
            <Link to="/terms" style={{ color: 'grey.500', textDecoration: 'none', fontSize: 14 }}>
              Terms of Service
            </Link>
            <Link to="/refund" style={{ color: 'grey.500', textDecoration: 'none', fontSize: 14 }}>
              Refund Policy
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;