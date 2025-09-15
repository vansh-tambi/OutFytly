import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { admin } from '../middleware/adminMiddleware.js';
import { 
    getAllUsers, 
    deleteUser,
    getAllOrders,
    updateOrderStatus,
    deleteProduct,
    getStats
} from '../controllers/adminController.js';

const router = express.Router();

// Stats
router.get('/stats', protect, admin, getStats);

// User Management
router.get('/users', protect, admin, getAllUsers);
router.delete('/users/:id', protect, admin, deleteUser);

// Order Management
router.get('/orders', protect, admin, getAllOrders);
router.put('/orders/:id', protect, admin, updateOrderStatus);

// Product Management (Note: This is a simplified delete)
router.delete('/products/:id', protect, admin, deleteProduct);


export default router;