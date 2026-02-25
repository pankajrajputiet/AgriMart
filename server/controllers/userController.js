// server/controllers/userController.js
import User from '../models/User.js';

export const getWishlist = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).populate('wishlist');
    res.status(200).json({ success: true, data: user.wishlist });
  } catch (error) {
    next(error);
  }
};

export const addToWishlist = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (user.wishlist.includes(req.params.productId)) {
      return res.status(400).json({ success: false, message: 'Already in wishlist' });
    }
    
    user.wishlist.push(req.params.productId);
    await user.save();
    
    res.status(200).json({ success: true, data: user.wishlist });
  } catch (error) {
    next(error);
  }
};

export const removeFromWishlist = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    
    user.wishlist = user.wishlist.filter(
      id => id.toString() !== req.params.productId
    );
    
    await user.save();
    
    res.status(200).json({ success: true, data: user.wishlist });
  } catch (error) {
    next(error);
  }
};

export const updateAddress = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    
    const addressIndex = user.addresses.findIndex(
      addr => addr._id.toString() === req.body.addressId
    );
    
    if (addressIndex > -1) {
      user.addresses[addressIndex] = { ...user.addresses[addressIndex].toObject(), ...req.body };
    } else {
      user.addresses.push(req.body);
    }
    
    await user.save();
    
    res.status(200).json({ success: true, data: user.addresses });
  } catch (error) {
    next(error);
  }
};

export const getAddress = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json({ success: true, data: user.addresses });
  } catch (error) {
    next(error);
  }
};