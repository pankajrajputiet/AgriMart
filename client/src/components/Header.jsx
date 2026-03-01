// client/src/components/Header.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { 
  AppBar, Toolbar, Typography, Button, IconButton, Badge,
  Box, Container, Menu, MenuItem, Avatar, Divider,
  InputBase, useMediaQuery, useTheme, Drawer, List,
  ListItem, ListItemIcon, ListItemText
} from '@mui/material';
import { 
  Menu as MenuIcon, Search, ShoppingCart, Person,
  Favorite, LocalFlorist, Grass, Agriculture,
  Storefront, Logout, Login, Home, Dashboard
} from '@mui/icons-material';
import { logout } from '../redux/slices/authSlice';

const categories = [
  { name: 'Vegetables', icon: <Grass />, slug: 'vegetables' },
  { name: 'Fruits', icon: <LocalFlorist />, slug: 'fruits' },
  { name: 'Grains', icon: <Agriculture />, slug: 'grains' },
  { name: 'Spices', icon: <Storefront />, slug: 'spices' },
  { name: 'Organic', icon: <Grass />, slug: 'organic' },
];

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { totalItems } = useSelector((state) => state.cart);
  
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [search, setSearch] = useState('');
  
  const handleMenu = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleLogout = () => {
    dispatch(logout());
    handleClose();
    navigate('/');
  };
  
  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/search?q=${search}`);
      setSearch('');
    }
  };

  return (
    <>
      <AppBar position="sticky" color="default" elevation={1} sx={{ bgcolor: 'white' }}>
        <Container maxWidth="xl">
          <Toolbar sx={{ py: 1, gap: 2 }}>
            {isMobile && (
              <IconButton edge="start" onClick={() => setMobileMenu(true)}>
                <MenuIcon />
              </IconButton>
            )}
            
            <Typography
              variant="h5"
              component={Link}
              to="/"
              sx={{
                textDecoration: 'none',
                color: '#22c55e',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                flexGrow: { xs: 1, md: 0 }
              }}
            >
              <Agriculture sx={{ fontSize: 32 }} />
              AgriShop
            </Typography>
            
            {!isMobile && (
              <Box sx={{ display: 'flex', gap: 1, ml: 4 }}>
                {categories.map((cat) => (
                  <Button
                    key={cat.slug}
                    component={Link}
                    to={`/category/${cat.slug}`}
                    sx={{ 
                      color: 'text.primary',
                      textTransform: 'none',
                      '&:hover': { color: '#22c55e', bgcolor: 'primary.50' }
                    }}
                    startIcon={cat.icon}
                  >
                    {cat.name}
                  </Button>
                ))}
              </Box>
            )}
            
            <Box 
              component="form" 
              onSubmit={handleSearch}
              sx={{
                display: 'flex',
                alignItems: 'center',
                bgcolor: 'grey.100',
                borderRadius: 2,
                px: 2,
                py: 0.5,
                flexGrow: { xs: 1, md: 0.5 },
                maxWidth: 400,
                ml: { md: 4 }
              }}
            >
              <InputBase
                placeholder="Search fresh produce..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                sx={{ flex: 1, fontSize: 14 }}
              />
              <IconButton type="submit" size="small">
                <Search />
              </IconButton>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <IconButton component={Link} to="/wishlist">
                <Favorite sx={{ color: 'grey.600' }} />
              </IconButton>
              
              <IconButton component={Link} to="/cart">
                <Badge badgeContent={totalItems} color="primary">
                  <ShoppingCart sx={{ color: 'grey.600' }} />
                </Badge>
              </IconButton>
              
              {isAuthenticated ? (
                <>
                  <IconButton onClick={handleMenu}>
                    <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
                      {user?.name?.charAt(0).toUpperCase()}
                    </Avatar>
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                  >
                    <MenuItem disabled>
                      <Typography variant="body2" color="text.secondary">
                        {user?.email}
                      </Typography>
                    </MenuItem>
                    <Divider />
                    <MenuItem component={Link} to="/profile" onClick={handleClose}>
                      <ListItemIcon><Person fontSize="small" /></ListItemIcon>
                      My Profile
                    </MenuItem>
                    <MenuItem component={Link} to="/orders" onClick={handleClose}>
                      <ListItemIcon><Storefront fontSize="small" /></ListItemIcon>
                      My Orders
                    </MenuItem>
                    {(user?.role === 'farmer' || user?.role === 'admin') && (
                      <MenuItem component={Link} to="/dashboard" onClick={handleClose}>
                        <ListItemIcon><Dashboard fontSize="small" /></ListItemIcon>
                        Dashboard
                      </MenuItem>
                    )}
                    <Divider />
                    <MenuItem onClick={handleLogout}>
                      <ListItemIcon><Logout fontSize="small" /></ListItemIcon>
                      Logout
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    variant="outlined"
                    component={Link}
                    to="/login"
                    startIcon={<Login />}
                    size="small"
                    sx={{ borderColor: 'grey.300', color: 'text.primary' }}
                  >
                    Login
                  </Button>
                  <Button
                    variant="contained"
                    component={Link}
                    to="/register"
                    size="small"
                    sx={{ bgcolor: 'primary.main', '&:hover': { bgcolor: 'primary.dark' } }}
                  >
                    Sign Up
                  </Button>
                </Box>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      
      {/* Mobile Drawer */}
      <Drawer anchor="left" open={mobileMenu} onClose={() => setMobileMenu(false)}>
        <Box sx={{ width: 280, pt: 2 }}>
          <Typography variant="h6" sx={{ px: 2, pb: 2, color: 'primary.main', fontWeight: 700 }}>
            <Agriculture sx={{ verticalAlign: 'middle', mr: 1 }} />
            AgriShop
          </Typography>
          <Divider />
          <List>
            <ListItem button component={Link} to="/" onClick={() => setMobileMenu(false)}>
              <ListItemIcon><Home /></ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
            {categories.map((cat) => (
              <ListItem
                button
                key={cat.slug}
                component={Link}
                to={`/category/${cat.slug}`}
                onClick={() => setMobileMenu(false)}
              >
                <ListItemIcon>{cat.icon}</ListItemIcon>
                <ListItemText primary={cat.name} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Header;