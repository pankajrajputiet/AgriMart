// server/routes/authRoutes.js
import express from 'express';
import { register, login, getMe, logout, updateProfile, addAddress, getAddresses, deleteAddress } from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.get('/logout', protect, logout);
router.put('/profile', protect, updateProfile);
router.post('/address', protect, addAddress);
router.get('/addresses', protect, getAddresses);
router.delete('/address/:id', protect, deleteAddress);

export default router;