import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.js';

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'outfytly_products',
    allowed_formats: ['jpeg', 'jpg', 'png', 'webp'],

    // --- ✅ THE OPTIMIZATION IS HERE ---
    // This tells Cloudinary to automatically optimize every uploaded image
    transformation: [
        {
            // Resize the image to a maximum width and height
            // without distorting the aspect ratio.
            width: 1000, 
            height: 1000, 
            crop: 'limit' 
        },
        {
            // Automatically select the best quality level
            quality: 'auto'
        },
        {
            // Automatically select the most efficient file format
            // (e.g., it will serve a .webp image to modern browsers)
            fetch_format: 'auto'
        }
    ],
  },
});

export const upload = multer({ 
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 } // 5MB limit
});