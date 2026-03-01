// client/src/pages/About.jsx
import React from 'react';
import { Container, Typography, Box, Grid, Card } from '@mui/material';
import { Agriculture, LocalShipping, Verified, Support, Group } from '@mui/icons-material';

const features = [
  { icon: <Agriculture />, title: 'Farm Fresh', desc: 'Products directly from farms' },
  { icon: <LocalShipping />, title: 'Fast Delivery', desc: 'Same day delivery available' },
  { icon: <Verified />, title: 'Quality Assured', desc: '100% quality guarantee' },
  // { icon: <Eco />, title: 'Organic Options', desc: 'Certified organic products' },
  { icon: <Group />, title: 'Farmer Support', desc: 'Empowering farmers' },
  { icon: <Support />, title: '24/7 Support', desc: 'Dedicated customer support' },
];

const About = () => {
  return (
    <Box>
      {/* Hero */}
      <Box sx={{ bgcolor: 'primary.50', py: 8 }}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
            About AgriShop
          </Typography>
          <Typography color="text.secondary" sx={{ fontSize: 18 }}>
            Connecting farmers directly with consumers, ensuring fresh, quality agricultural products at fair prices.
          </Typography>
        </Container>
      </Box>

      {/* Mission */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
              Our Mission
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 2 }}>
              At AgriShop, we believe in bridging the gap between farmers and consumers. 
              Our mission is to provide fresh, high-quality agricultural products while 
              ensuring fair prices for farmers and affordable options for customers.
            </Typography>
            <Typography color="text.secondary">
              We work directly with verified farmers across India, ensuring that every 
              product meets our quality standards and is grown using sustainable practices.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=600"
              alt="Farm"
              sx={{ width: '100%', borderRadius: 2 }}
            />
          </Grid>
        </Grid>
      </Container>

      {/* Features */}
      <Box sx={{ bgcolor: 'grey.50', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" sx={{ fontWeight: 700, textAlign: 'center', mb: 4 }}>
            Why Choose AgriShop?
          </Typography>
          <Grid container spacing={3}>
            {features.map((feature, index) => (
              <Grid item xs={6} md={4} key={index}>
                <Card sx={{ p: 3, textAlign: 'center', height: '100%' }}>
                  <Box sx={{ color: 'primary.main', mb: 2 }}>
                    {feature.icon}
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
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
      </Box>
    </Box>
  );
};

export default About;