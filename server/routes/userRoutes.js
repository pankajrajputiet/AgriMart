// server/routes/userRoutes.js
import express from 'express';
import { 
  getWishlist, 
  addToWishlist, 
  removeFromWishlist,
  updateAddress,
  getAddress
} from '../controllers/userController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/wishlist', protect, getWishlist);
router.post('/wishlist/:productId', protect, addToWishlist);
router.delete('/wishlist/:productId', protect, removeFromWishlist);
router.put('/address', protect, updateAddress);
router.get('/address', protect, getAddress);

export default router;