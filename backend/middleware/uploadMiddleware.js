import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.js';

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'outfytly_products', // A folder name in your Cloudinary account
    allowed_formats: ['jpeg', 'jpg', 'png', 'webp'],
    // Optional: transformations to apply to all uploads
    transformation: [{ width: 1000, height: 1000, crop: 'limit' }],
  },
});

export const upload = multer({ 
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 } // 5MB file size limit
});