// client/src/pages/Shop.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Container, Grid, Typography, Pagination, Skeleton } from '@mui/material';
import { getProducts, setFilters } from '../redux/slices/productSlice';
import ProductCard from '../components/ProductCard';
import ProductFilters from '../components/ProductFilters';
import Loading from '../components/Loading';

const Shop = () => {
  const dispatch = useDispatch();
  const { products, pagination, loading, filters } = useSelector((state) => state.products);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const params = {
      page,
      limit: 12,
      ...filters
    };
    dispatch(getProducts(params));
  }, [dispatch, page, filters]);

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
        Shop Fresh Produce
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 4 }}>
        Discover the best agricultural products from verified farmers
      </Typography>
      
      <Grid container spacing={3}>
        {/* Filters Sidebar */}
        <Grid item xs={12} md={3}>
          <Box sx={{ position: 'sticky', top: 80 }}>
            <ProductFilters />
          </Box>
        </Grid>
        
        {/* Products Grid */}
        <Grid item xs={12} md={9}>
          {loading ? (
            <Grid container spacing={3}>
              {[...Array(8)].map((_, index) => (
                <Grid item xs={6} sm={4} lg={3} key={index}>
                  <Skeleton variant="rectangular" height={350} sx={{ borderRadius: 2 }} />
                </Grid>
              ))}
            </Grid>
          ) : products.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant="h6" color="text.secondary">
                No products found
              </Typography>
              <Typography color="text.secondary">
                Try adjusting your filters
              </Typography>
            </Box>
          ) : (
            <>
              <Grid container spacing={3}>
                {products.map((product) => (
                  <Grid item xs={6} sm={4} lg={3} key={product._id}>
                    <ProductCard product={product} />
                  </Grid>
                ))}
              </Grid>
              
              {pagination.pages > 1 && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                  <Pagination
                    count={pagination.pages}
                    page={page}
                    onChange={handlePageChange}
                    color="primary"
                    size="large"
                  />
                </Box>
              )}
            </>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Shop;