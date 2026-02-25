// server/models/Product.js
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide product name'],
    trim: true,
    maxlength: [200, 'Name cannot exceed 200 characters']
  },
  slug: { type: String, unique: true, lowercase: true },
  description: {
    type: String,
    required: [true, 'Please provide description'],
    maxlength: [5000, 'Description cannot exceed 5000 characters']
  },
  price: {
    type: Number,
    required: [true, 'Please provide price'],
    min: [0, 'Price cannot be negative']
  },
  unit: {
    type: String,
    required: true,
    enum: ['kg', 'ton', 'quintal', 'piece', 'box', 'liter', 'packet', 'dozen', 'bundle', 'pack']
  },
  minOrder: { type: Number, default: 1 },
  discount: { type: Number, default: 0 },
  
  category: {
    type: String,
    required: true,
    enum: [
      'vegetables', 'fruits', 'grains', 'pulses', 'spices',
      'herbs', 'seeds', 'fertilizers', 'pesticides', 'equipment',
      'dairy', 'organic', 'processed', 'flowers', 'others'
    ]
  },
  subcategory: String,
  
  farmingMethod: {
    type: String,
    enum: ['organic', 'conventional', 'hydroponic', 'greenhouse', 'traditional'],
    default: 'conventional'
  },
  isOrganic: { type: Boolean, default: false },
  
  origin: {
    country: { type: String, default: 'India' },
    state: String,
    region: String,
    farmName: String
  },
  harvestDate: Date,
  expiryDate: Date,
  shelfLife: String,
  
  quality: {
    type: String,
    enum: ['grade-a', 'grade-b', 'grade-c', 'export-quality', 'premium'],
    default: 'grade-a'
  },
  
  images: [{
    url: String,
    publicId: String,
    isPrimary: { type: Boolean, default: false }
  }],
  
  stock: {
    available: { type: Number, default: 0 },
    reserved: { type: Number, default: 0 }
  },
  availability: {
    type: String,
    enum: ['in-stock', 'out-of-stock', 'pre-order', 'seasonal'],
    default: 'in-stock'
  },
  
  rating: {
    average: { type: Number, default: 0 },
    count: { type: Number, default: 0 }
  },
  reviews: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: String,
    createdAt: { type: Date, default: Date.now }
  }],
  
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  
  isActive: { type: Boolean, default: true },
  isFeatured: { type: Boolean, default: false },
  isBestSeller: { type: Boolean, default: false },
  
  views: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

// Create slug
productSchema.pre('save', function(next) {
  if (this.isModified('name')) {
    this.slug = this.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  }
  next();
});

// Calculate average rating
productSchema.methods.calculateAverageRating = function() {
  if (this.reviews.length === 0) {
    this.rating.average = 0;
    this.rating.count = 0;
    return;
  }
  const total = this.reviews.reduce((acc, r) => acc + r.rating, 0);
  this.rating.average = Math.round((total / this.reviews.length) * 10) / 10;
  this.rating.count = this.reviews.length;
};

// Virtual for discounted price
productSchema.virtual('discountedPrice').get(function() {
  if (this.discount > 0) {
    return Math.round(this.price * (1 - this.discount / 100) * 100) / 100;
  }
  return this.price;
});

productSchema.set('toJSON', { virtuals: true });
productSchema.set('toObject', { virtuals: true });

export default mongoose.model('Product', productSchema);