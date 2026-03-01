// client/src/redux/slices/productSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const getProducts = createAsyncThunk(
  'products/getProducts',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await api.get('/products', { params });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch products');
    }
  }
);

export const getProduct = createAsyncThunk(
  'products/getProduct',
  async (slug, { rejectWithValue }) => {
    try {
      const response = await api.get(`/products/${slug}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch product');
    }
  }
);

export const getFeaturedProducts = createAsyncThunk(
  'products/getFeatured',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/products/featured');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch products');
    }
  }
);

export const searchProducts = createAsyncThunk(
  'products/search',
  async (query, { rejectWithValue }) => {
    try {
      const response = await api.get(`/products/search?q=${query}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Search failed');
    }
  }
);

export const addReview = createAsyncThunk(
  'products/addReview',
  async ({ productId, rating, comment }, { rejectWithValue }) => {
    try {
      const response = await api.post(`/products/${productId}/reviews`, { rating, comment });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to add review');
    }
  }
);

const initialState = {
  products: [],
  featuredProducts: [],
  product: null,
  searchResults: [],
  pagination: {
    page: 1,
    limit: 12,
    total: 0,
    pages: 0,
  },
  loading: false,
  error: null,
  filters: {
    category: '',
    minPrice: '',
    maxPrice: '',
    organic: false,
    sort: '',
  },
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
    },
    clearProduct: (state) => {
      state.product = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload.data;
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getFeaturedProducts.fulfilled, (state, action) => {
        state.featuredProducts = action.payload.data;
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.searchResults = action.payload.data;
      });
  },
});

export const { setFilters, clearFilters, clearProduct } = productSlice.actions;
export default productSlice.reducer;