// server/controllers/orderController.js
import Order from '../models/Order.js';
import Product from '../models/Product.js';

export const createOrder = async (req, res, next) => {
  try {
    const { orderItems, shippingAddress, paymentMethod } = req.body;
    
    let subtotal = 0;
    const orderItemsWithPrices = [];
    
    for (const item of orderItems) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(404).json({ 
          success: false, 
          message: `Product ${item.product} not found` 
        });
      }
      
      const itemTotal = product.discountedPrice * item.quantity;
      subtotal += itemTotal;
      
      orderItemsWithPrices.push({
        product: product._id,
        name: product.name,
        quantity: item.quantity,
        price: product.discountedPrice,
        unit: product.unit,
        image: product.images[0]?.url,
        total: itemTotal
      });
    }
    
    const taxRate = 5;
    const taxAmount = Math.round(subtotal * taxRate / 100);
    const shippingCharge = subtotal > 500 ? 0 : 50;
    const total = subtotal + taxAmount + shippingCharge;
    
    const order = await Order.create({
      user: req.user.id,
      orderItems: orderItemsWithPrices,
      shippingAddress,
      paymentMethod,
      pricing: {
        subtotal,
        taxAmount,
        taxRate,
        shippingCharge,
        total
      }
    });
    
    // Reduce stock
    for (const item of orderItems) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { 'stock.available': -item.quantity }
      });
    }
    
    res.status(201).json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
};

export const getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .sort({ createdAt: -1 });
    
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    next(error);
  }
};

export const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find()
      .populate('user', 'name email phone')
      .sort({ createdAt: -1 });
    
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    next(error);
  }
};

export const getOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user', 'name email phone')
      .populate('orderItems.product', 'name images');
    
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    
    if (order.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }
    
    res.status(200).json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
};

export const updateOrderStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    
    const order = await Order.findById(req.params.id);
    
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    
    order.status = status;
    
    if (status === 'shipped') {
      order.shippedAt = new Date();
    }
    if (status === 'delivered') {
      order.deliveredAt = new Date();
    }
    if (status === 'cancelled') {
      for (const item of order.orderItems) {
        await Product.findByIdAndUpdate(item.product, {
          $inc: { 'stock.available': item.quantity }
        });
      }
    }
    
    await order.save();
    
    res.status(200).json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
};

export const cancelOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    
    if (order.user.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }
    
    if (!['pending', 'confirmed'].includes(order.status)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Cannot cancel order at this stage' 
      });
    }
    
    order.status = 'cancelled';
    
    // Restore stock
    for (const item of order.orderItems) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { 'stock.available': item.quantity }
      });
    }
    
    await order.save();
    
    res.status(200).json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
};