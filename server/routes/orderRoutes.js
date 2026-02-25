// server/routes/orderRoutes.js
import express from 'express';
import { 
  createOrder, 
  getOrders, 
  getOrder, 
  updateOrderStatus,
  cancelOrder,
  getMyOrders 
} from '../controllers/orderController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.post('/', protect, createOrder);
router.get('/my-orders', protect, getMyOrders);
router.get('/', protect, getOrders);
router.get('/:id', protect, getOrder);
router.put('/:id/status', protect, authorize('admin', 'farmer'), updateOrderStatus);
router.put('/:id/cancel', protect, cancelOrder);

export default router;