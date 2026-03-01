// client/src/components/ProductFilters.jsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Box, Typography, Slider, FormControl, InputLabel,
  Select, MenuItem, FormControlLabel, Checkbox, Button,
  Accordion, AccordionSummary, AccordionDetails
} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import { setFilters, clearFilters } from '../redux/slices/productSlice';

const categories = [
  { value: '', label: 'All Categories' },
  { value: 'vegetables', label: 'Vegetables' },
  { value: 'fruits', label: 'Fruits' },
  { value: 'grains', label: 'Grains & Cereals' },
  { value: 'pulses', label: 'Pulses & Legumes' },
  { value: 'spices', label: 'Spices' },
  { value: 'herbs', label: 'Herbs' },
  { value: 'seeds', label: 'Seeds' },
  { value: 'organic', label: 'Organic Products' },
  { value: 'dairy', label: 'Dairy' },
];

const sortOptions = [
  { value: '', label: 'Newest' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
  { value: 'name', label: 'Name A-Z' },
];

const ProductFilters = () => {
  const dispatch = useDispatch();
  const { filters } = useSelector((state) => state.products);

  const handleFilterChange = (key, value) => {
    dispatch(setFilters({ [key]: value }));
  };

  const handlePriceChange = (event, newValue) => {
    dispatch(setFilters({ minPrice: newValue[0], maxPrice: newValue[1] }));
  };

  return (
    <Box sx={{ bgcolor: 'white', p: 2, borderRadius: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>Filters</Typography>
        <Button size="small" onClick={() => dispatch(clearFilters())}>
          Clear All
        </Button>
      </Box>
      
      {/* Category Filter */}
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography>Category</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormControl fullWidth size="small">
            <Select
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
            >
              {categories.map((cat) => (
                <MenuItem key={cat.value} value={cat.value}>{cat.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </AccordionDetails>
      </Accordion>
      
      {/* Price Range */}
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography>Price Range</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ px: 1 }}>
            <Slider
              value={[filters.minPrice || 0, filters.maxPrice || 1000]}
              onChange={handlePriceChange}
              valueLabelDisplay="auto"
              min={0}
              max={1000}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
              <Typography variant="caption">₹{filters.minPrice || 0}</Typography>
              <Typography variant="caption">₹{filters.maxPrice || 1000}</Typography>
            </Box>
          </Box>
        </AccordionDetails>
      </Accordion>
      
      {/* Organic Filter */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography>Type</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormControlLabel
            control={
              <Checkbox
                checked={filters.organic || false}
                onChange={(e) => handleFilterChange('organic', e.target.checked)}
                color="primary"
              />
            }
            label="Organic Only"
          />
        </AccordionDetails>
      </Accordion>
      
      {/* Sort By */}
      <Box sx={{ mt: 2 }}>
        <FormControl fullWidth size="small">
          <InputLabel>Sort By</InputLabel>
          <Select
            value={filters.sort}
            label="Sort By"
            onChange={(e) => handleFilterChange('sort', e.target.value)}
          >
            {sortOptions.map((opt) => (
              <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
};

export default ProductFilters;