// client/src/pages/Contact.jsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { 
  Container, Typography, Box, Grid, TextField, 
  Button, Card, IconButton, Paper
} from '@mui/material';
import { 
  LocationOn, Phone, Email, Send, Facebook, 
  Twitter, Instagram, YouTube, WhatsApp 
} from '@mui/icons-material';

const Contact = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    alert('Thank you for your message! We will get back to you soon.');
  };

  const contactInfo = [
    {
      icon: <LocationOn />,
      title: 'Our Address',
      content: '123 Agriculture Road, Mumbai, India - 400001',
      subtitle: 'Visit our office'
    },
    {
      icon: <Phone />,
      title: 'Phone Number',
      content: '+91 98765 43210',
      subtitle: 'Mon-Sat: 9AM - 7PM'
    },
    {
      icon: <Email />,
      title: 'Email Address',
      content: 'support@agrishop.com',
      subtitle: 'We reply within 24 hours'
    },
    {
      icon: <WhatsApp />,
      title: 'WhatsApp',
      content: '+91 98765 43210',
      subtitle: 'Quick chat support'
    }
  ];

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
        <Container maxWidth="md" sx={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
            Contact Us
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 400 }}>
            Have questions or feedback? We'd love to hear from you.
            <br />
            Our team is here to help you 24/7.
          </Typography>
        </Container>
        
        {/* Decorative circles */}
        <Box
          sx={{
            position: 'absolute',
            top: -100,
            right: -100,
            width: 300,
            height: 300,
            borderRadius: '50%',
            bgcolor: 'primary.100',
            opacity: 0.5
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: -150,
            left: -150,
            width: 400,
            height: 400,
            borderRadius: '50%',
            bgcolor: 'secondary.100',
            opacity: 0.3
          }}
        />
      </Box>

      {/* Contact Info Cards */}
      <Container maxWidth="lg" sx={{ mt: -5, position: 'relative', zIndex: 2 }}>
        <Grid container spacing={3}>
          {contactInfo.map((item, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  p: 3,
                  height: '100%',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}
              >
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: '50%',
                    bgcolor: 'primary.50',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 2,
                    color: 'primary.main'
                  }}
                >
                  {item.icon}
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                  {item.title}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {item.content}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {item.subtitle}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Contact Form & Map */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={6}>
          {/* Contact Form */}
          <Grid item xs={12} md={6}>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
              Send us a Message
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 4 }}>
              Fill out the form below and we'll get back to you as soon as possible.
            </Typography>
            
            <Card sx={{ p: 4 }}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Your Name"
                      variant="outlined"
                      {...register('name', { 
                        required: 'Name is required',
                        minLength: {
                          value: 2,
                          message: 'Name must be at least 2 characters'
                        }
                      })}
                      error={!!errors.name}
                      helperText={errors.name?.message}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email Address"
                      variant="outlined"
                      type="email"
                      {...register('email', { 
                        required: 'Email is required',
                        pattern: {
                          value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                          message: 'Please enter a valid email'
                        }
                      })}
                      error={!!errors.email}
                      helperText={errors.email?.message}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Phone Number"
                      variant="outlined"
                      {...register('phone', {
                        pattern: {
                          value: /^[0-9]{10}$/,
                          message: 'Please enter a valid 10-digit phone number'
                        }
                      })}
                      error={!!errors.phone}
                      helperText={errors.phone?.message}
                      placeholder="9876543210"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Subject"
                      variant="outlined"
                      {...register('subject', { required: 'Subject is required' })}
                      error={!!errors.subject}
                      helperText={errors.subject?.message}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Your Message"
                      variant="outlined"
                      multiline
                      rows={5}
                      {...register('message', { 
                        required: 'Message is required',
                        minLength: {
                          value: 10,
                          message: 'Message must be at least 10 characters'
                        }
                      })}
                      error={!!errors.message}
                      helperText={errors.message?.message}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button 
                      type="submit" 
                      variant="contained" 
                      size="large"
                      fullWidth
                      endIcon={<Send />}
                      sx={{ 
                        py: 1.5,
                        bgcolor: 'primary.main', 
                        '&:hover': { bgcolor: 'primary.dark' },
                        fontWeight: 600
                      }}
                    >
                      Send Message
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Card>
          </Grid>

          {/* Map & Additional Info */}
          <Grid item xs={12} md={6}>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
              Find Us on Map
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 4 }}>
              Visit our office or warehouse. We'd love to show you around!
            </Typography>
            
            {/* Map Placeholder */}
            <Paper
              sx={{
                height: 300,
                bgcolor: 'grey.100',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 4,
                borderRadius: 2,
                overflow: 'hidden'
              }}
            >
              <Box
                component="img"
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=600"
                alt="Map"
                sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </Paper>

            {/* Business Hours */}
            <Card sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Business Hours
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography color="text.secondary">Monday - Friday</Typography>
                  <Typography fontWeight={500}>9:00 AM - 7:00 PM</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography color="text.secondary">Saturday</Typography>
                  <Typography fontWeight={500}>9:00 AM - 6:00 PM</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography color="text.secondary">Sunday</Typography>
                  <Typography fontWeight={500}>Closed</Typography>
                </Box>
              </Box>
            </Card>

            {/* Social Media */}
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Follow Us on Social Media
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <IconButton 
                  sx={{ 
                    bgcolor: 'grey.100',
                    '&:hover': { bgcolor: 'primary.main', color: 'white' }
                  }}
                >
                  <Facebook />
                </IconButton>
                <IconButton 
                  sx={{ 
                    bgcolor: 'grey.100',
                    '&:hover': { bgcolor: 'primary.main', color: 'white' }
                  }}
                >
                  <Twitter />
                </IconButton>
                <IconButton 
                  sx={{ 
                    bgcolor: 'grey.100',
                    '&:hover': { bgcolor: 'primary.main', color: 'white' }
                  }}
                >
                  <Instagram />
                </IconButton>
                <IconButton 
                  sx={{ 
                    bgcolor: 'grey.100',
                    '&:hover': { bgcolor: 'primary.main', color: 'white' }
                  }}
                >
                  <YouTube />
                </IconButton>
                <IconButton 
                  sx={{ 
                    bgcolor: 'grey.100',
                    '&:hover': { bgcolor: 'primary.main', color: 'white' }
                  }}
                >
                  <WhatsApp />
                </IconButton>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* FAQ Section */}
      <Box sx={{ bgcolor: 'grey.50', py: 8 }}>
        <Container maxWidth="md">
          <Typography variant="h4" sx={{ fontWeight: 700, textAlign: 'center', mb: 1 }}>
            Frequently Asked Questions
          </Typography>
          <Typography color="text.secondary" sx={{ textAlign: 'center', mb: 4 }}>
            Quick answers to common questions
          </Typography>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {[
              {
                q: 'How do I track my order?',
                a: 'You can track your order by logging into your account and visiting the "My Orders" section. You will also receive SMS and email updates.'
              },
              {
                q: 'What is your return policy?',
                a: 'We offer a 7-day return policy for fresh produce. If you are not satisfied with the quality, please contact us within 7 days of delivery.'
              },
              {
                q: 'Do you deliver to my area?',
                a: 'We currently deliver to all major cities in India. Enter your PIN code at checkout to confirm delivery availability.'
              },
              {
                q: 'How can I sell my products?',
                a: 'Register as a farmer or wholesaler on our platform. Our team will verify your documents and activate your account within 24-48 hours.'
              }
            ].map((faq, index) => (
              <Card key={index} sx={{ p: 3 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                  {faq.q}
                </Typography>
                <Typography color="text.secondary">
                  {faq.a}
                </Typography>
              </Card>
            ))}
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Contact;