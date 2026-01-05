# OutFytly - Full-Stack Fashion Rental Marketplace

OutFytly is a modern, peer-to-peer fashion rental and resale marketplace built with the MERN stack. It provides a seamless, interactive experience for users to rent premium outfits, and for sellers to list their own wardrobe items and earn money.

## Table of Contents

* [About The Project](#about-the-project)
* [Key Features](#key-features)
* [Tech Stack](#tech-stack)
* [Project Structure](#project-structure)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [API Endpoints](#api-endpoints)
* [Environment Variables](#environment-variables)
* [Contact](#contact)

## About The Project

OutFytly was built to address the need for a sustainable and affordable way to access high-end fashion. Instead of buying expensive outfits for a single occasion, users can rent from a vast collection of items listed by a community of sellers. The platform is designed with a mobile-first, highly interactive user interface featuring smooth animations and a professional user experience from browsing to checkout.

## Key Features

### 🔐 Authentication & User Management
* **Full User Authentication**: Secure JWT-based authentication with signup, login, logout, and password reset functionality
* **User Profile Management**: Users can update their name, email, bio, phone number, and upload a profile picture
* **Multiple User Roles**: Support for regular users and admin accounts with role-based access control

### 🛍️ Shopping Experience
* **Dynamic Product Browsing**: Comprehensive browse page with real-time search, filtering by category, brand, and price range
* **Advanced Product Details**: Detailed product pages with multiple images, size options, reviews, and availability
* **Wishlist Functionality**: Save favorite items for later with a persistent wishlist synced across devices
* **Shopping Cart**: Fully functional cart synced with the user's account in the database, persisting across devices
* **Review System**: Users can rate and review products they've rented
* **Smart Product Cards**: Interactive product cards with quick-add to cart and wishlist features

### 💰 Seller Features
* **Seller Dashboard**: Dedicated dashboard for users to list new products, manage existing listings, and view key statistics
* **Smart Product Forms**: Dynamic "List Item" form that shows relevant size options (clothing vs. shoe sizes) based on selected category
* **Item Management**: Create, update, and delete product listings
* **Cloudinary Image Uploads**: Seamless multi-image uploads for product listings hosted on Cloudinary

### 💳 Checkout & Payments
* **Multi-Address Management**: Users can save and manage multiple shipping addresses
* **Secure Payment Integration**: Complete checkout flow with online payments powered by Razorpay API
* **Order Management**: Track orders with detailed order history and status updates
* **Coupon System**: Apply discount coupons at checkout for special offers
* **Shipping Calculator**: Real-time shipping cost calculation based on delivery address

### 🔔 Notifications & Analytics
* **Notification System**: Real-time notifications for order updates, new listings, and important events
* **Admin Analytics**: Comprehensive dashboard with sales statistics, revenue charts, and user metrics
* **Order Tracking**: Users can track their orders from placement to delivery

### 🎨 UI/UX Features
* **Fully Responsive Design**: Mobile-first design that works seamlessly on all devices
* **Smooth Animations**: Built with Framer Motion for beautiful, fluid animations and transitions
* **Modern UI Components**: Interactive carousels, modals, tooltips, and more
* **Tailwind CSS Styling**: Utility-first CSS framework for consistent, maintainable styles
* **Performance Optimized**: Image optimization, lazy loading, and compression for fast load times

## Tech Stack

Here's a list of the major frameworks and libraries used:

### Frontend
* **React 19** - Modern UI library with latest features
* **Vite** - Lightning-fast build tool and dev server
* **React Router DOM v7** - Client-side routing
* **Tailwind CSS v4** - Utility-first CSS framework
* **Framer Motion** - Animation library for smooth transitions
* **Axios** - HTTP client for API requests
* **React Hook Form** - Form validation and management
* **Swiper.js** - Touch slider for image carousels
* **React Hot Toast** - Beautiful toast notifications
* **Lucide React** - Icon library
* **React Icons** - Additional icon sets
* **React Day Picker** - Date picker component
* **date-fns** - Modern date utility library

### Backend
* **Node.js** - JavaScript runtime
* **Express.js v5** - Web application framework
* **MongoDB** - NoSQL database
* **Mongoose** - MongoDB object modeling
* **JWT (jsonwebtoken)** - Secure authentication tokens
* **bcrypt.js** - Password hashing
* **Multer** - File upload middleware
* **Cloudinary** - Cloud-based image management and hosting
* **Razorpay SDK** - Payment gateway integration
* **Nodemailer** - Email sending functionality
* **Compression** - Response compression middleware
* **CORS** - Cross-origin resource sharing
* **dotenv** - Environment variable management
* **Express List Endpoints** - API endpoint documentation

## Project Structure

```
OutFytly/
├── backend/
│   ├── config/              # Configuration files
│   │   ├── cloudinary.js    # Cloudinary setup
│   │   ├── db.js           # MongoDB connection
│   │   └── razorpay.js     # Razorpay configuration
│   ├── controllers/         # Business logic
│   │   ├── authController.js
│   │   ├── productController.js
│   │   ├── cartController.js
│   │   ├── orderController.js
│   │   ├── userController.js
│   │   ├── wishlistController.js
│   │   ├── reviewController.js
│   │   ├── couponController.js
│   │   ├── addressController.js
│   │   ├── paymentController.js
│   │   ├── shippingController.js
│   │   ├── notificationController.js
│   │   ├── analyticsController.js
│   │   └── adminController.js
│   ├── middleware/          # Custom middleware
│   │   ├── authMiddleware.js
│   │   ├── adminMiddleware.js
│   │   ├── errorMiddleware.js
│   │   ├── cacheMiddleware.js
│   │   └── uploadMiddleware.js
│   ├── models/             # Database schemas
│   │   ├── User.js
│   │   ├── Product.js
│   │   ├── Item.js
│   │   ├── Cart.js
│   │   ├── Order.js
│   │   ├── Wishlist.js
│   │   ├── Review.js
│   │   ├── Coupon.js
│   │   ├── Address.js
│   │   └── Notification.js
│   ├── routes/             # API routes
│   │   ├── authRoutes.js
│   │   ├── productRoutes.js
│   │   ├── cartRoutes.js
│   │   ├── orderRoutes.js
│   │   ├── userRoutes.js
│   │   ├── wishlistRoutes.js
│   │   ├── reviewRoutes.js
│   │   ├── couponRoutes.js
│   │   ├── addressRoutes.js
│   │   ├── paymentRoutes.js
│   │   ├── checkoutRoutes.js
│   │   ├── shippingRoutes.js
│   │   ├── notificationRoutes.js
│   │   ├── analyticsRoutes.js
│   │   ├── adminRoutes.js
│   │   ├── uploadRoutes.js
│   │   └── itemRoutes.js
│   ├── utils/              # Helper functions
│   │   ├── generateToken.js
│   │   └── sendEmail.js
│   ├── package.json
│   └── server.js           # Entry point
│
├── frontend/
│   ├── src/
│   │   ├── api/           # API service functions
│   │   │   ├── axiosConfig.js
│   │   │   ├── userService.js
│   │   │   ├── productService.js
│   │   │   ├── cartService.js
│   │   │   ├── orderService.js
│   │   │   ├── paymentService.js
│   │   │   ├── wishlistService.js
│   │   │   └── adminService.js
│   │   ├── components/    # Reusable components
│   │   │   ├── admin/    # Admin components
│   │   │   ├── sections/ # Home page sections
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── ItemCard.jsx
│   │   │   ├── CategoryCard.jsx
│   │   │   ├── WishlistView.jsx
│   │   │   ├── OrderHistory.jsx
│   │   │   ├── ProfileSettings.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   ├── AdminRoute.jsx
│   │   │   └── ...
│   │   ├── context/      # React Context providers
│   │   ├── data/         # Static data
│   │   ├── hooks/        # Custom React hooks
│   │   ├── layouts/      # Layout components
│   │   ├── pages/        # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── Browse.jsx
│   │   │   ├── ItemDetails.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── Checkout.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── AccountPage.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── ForgotPassword.jsx
│   │   │   ├── ResetPassword.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── FAQ.jsx
│   │   │   ├── Help.jsx
│   │   │   ├── Careers.jsx
│   │   │   ├── Terms.jsx
│   │   │   ├── Privacy.jsx
│   │   │   ├── Refund.jsx
│   │   │   └── NotFound.jsx
│   │   ├── utils/        # Utility functions
│   │   ├── App.jsx       # Root component
│   │   ├── main.jsx      # Entry point
│   │   └── index.css     # Global styles
│   ├── public/           # Static assets
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── eslint.config.js
│
└── README.md
```

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

* Node.js and npm installed
* MongoDB installed and running (or a MongoDB Atlas account)
* A Cloudinary account
* A Razorpay account

### Installation

1.  **Clone the repo**
    ```sh
    git clone https://github.com/vansh-tambi/OutFytly.git
    cd OutFytly
    ```

2.  **Backend Setup**
    ```sh
    # Navigate to backend directory
    cd backend
    
    # Install dependencies
    npm install
    
    # Create .env file and add environment variables (see Environment Variables section)
    
    # Start the backend server
    npm run dev
    ```

3.  **Frontend Setup**
    ```sh
    # Open new terminal and navigate to frontend directory
    cd frontend
    
    # Install dependencies
    npm install
    
    # Create .env file and add environment variables (see Environment Variables section)
    
    # Start the frontend development server
    npm run dev
    ```

Your application should now be running:
- **Frontend**: `http://localhost:5173`
- **Backend**: `http://localhost:5000`

## Environment Variables

### Backend (.env)

Create a `.env` file in the `backend` directory with the following variables:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGO_URI=your_mongodb_connection_string

# JWT Secret
JWT_SECRET=your_jwt_secret_key

# Frontend URL
FRONTEND_URL=http://localhost:5173

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Razorpay Configuration
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

# Email Configuration (for password reset)
EMAIL_HOST=smtp.mailtrap.io
EMAIL_PORT=2525
EMAIL_USER=your_mailtrap_username
EMAIL_PASS=your_mailtrap_password
EMAIL_FROM=noreply@outfytly.com
```

### Frontend (.env)

Create a `.env` file in the `frontend` directory with the following variable:

```env
VITE_API_URL=http://localhost:5000
```

## API Endpoints

### Authentication Routes
* `POST /api/auth/register` - Register a new user
* `POST /api/auth/login` - Login a user
* `POST /api/auth/logout` - Logout user
* `POST /api/auth/forgot-password` - Request password reset
* `POST /api/auth/reset-password/:token` - Reset password with token
* `GET /api/auth/profile` - Get current user profile (protected)

### User Routes
* `GET /api/users/profile` - Get user profile details (protected)
* `PUT /api/users/profile` - Update user profile (protected)
* `POST /api/users/profile/picture` - Upload profile picture (protected)

### Product Routes
* `GET /api/products` - Get all products (with filters, search, pagination)
* `GET /api/products/:id` - Get single product details
* `POST /api/products` - Create new product (protected)
* `PUT /api/products/:id` - Update product (protected)
* `DELETE /api/products/:id` - Delete product (protected)
* `GET /api/products/user/:userId` - Get products by specific user

### Item Routes
* `GET /api/items` - Get all items with filters
* `POST /api/items` - Create new item listing (protected)
* `GET /api/items/my-items` - Get logged-in user's items (protected)
* `PUT /api/items/:id` - Update item (protected)
* `DELETE /api/items/:id` - Delete item (protected)

### Cart Routes
* `GET /api/cart` - Get user's cart (protected)
* `POST /api/cart` - Add item to cart (protected)
* `PUT /api/cart/:itemId` - Update cart item quantity (protected)
* `DELETE /api/cart/:itemId` - Remove item from cart (protected)
* `DELETE /api/cart` - Clear entire cart (protected)

### Wishlist Routes
* `GET /api/wishlist` - Get user's wishlist (protected)
* `POST /api/wishlist/:productId` - Add product to wishlist (protected)
* `DELETE /api/wishlist/:productId` - Remove product from wishlist (protected)

### Order Routes
* `GET /api/orders` - Get user's orders (protected)
* `GET /api/orders/:id` - Get single order details (protected)
* `POST /api/orders` - Create new order (protected)
* `PUT /api/orders/:id/status` - Update order status (protected, admin)
* `DELETE /api/orders/:id` - Cancel order (protected)

### Address Routes
* `GET /api/addresses` - Get user's saved addresses (protected)
* `POST /api/addresses` - Add new address (protected)
* `PUT /api/addresses/:id` - Update address (protected)
* `DELETE /api/addresses/:id` - Delete address (protected)
* `PUT /api/addresses/:id/default` - Set default address (protected)

### Payment Routes
* `POST /api/payment/create-order` - Create Razorpay order (protected)
* `POST /api/payment/verify` - Verify payment signature (protected)
* `POST /api/payment/capture` - Capture payment (protected)

### Coupon Routes
* `GET /api/coupons` - Get all coupons (admin)
* `POST /api/coupons` - Create new coupon (admin)
* `POST /api/coupons/apply` - Apply coupon code (protected)
* `DELETE /api/coupons/:id` - Delete coupon (admin)

### Review Routes
* `GET /api/reviews/:productId` - Get all reviews for a product
* `POST /api/reviews/:productId` - Add review to product (protected)
* `DELETE /api/reviews/:id` - Delete review (protected)

### Checkout Routes
* `POST /api/checkout/calculate` - Calculate checkout totals (protected)
* `POST /api/checkout/process` - Process checkout (protected)

### Shipping Routes
* `POST /api/shipping/calculate` - Calculate shipping cost
* `GET /api/shipping/methods` - Get available shipping methods

### Notification Routes
* `GET /api/notifications/my` - Get user's notifications (protected)
* `PUT /api/notifications/:id/read` - Mark notification as read (protected)
* `POST /api/notifications` - Create system notification (admin)

### Analytics Routes (Admin)
* `GET /api/analytics/stats` - Get dashboard statistics (admin)
* `GET /api/analytics/sales` - Get sales by month (admin)

### Admin Routes
* `GET /api/admin/users` - Get all users (admin)
* `GET /api/admin/orders` - Get all orders (admin)
* `PUT /api/admin/users/:id` - Update user role (admin)
* `DELETE /api/admin/users/:id` - Delete user (admin)

### Upload Routes
* `POST /api/upload` - Upload images to Cloudinary (protected)

## Features in Detail

### User Authentication Flow
- Users can register with email and password
- Passwords are hashed using bcrypt before storing
- JWT tokens are generated on login and stored in cookies
- Protected routes verify JWT tokens via middleware
- Password reset via email with temporary tokens

### Product Management
- Sellers can list items with multiple images
- Dynamic form fields based on category selection
- Image uploads to Cloudinary with optimization
- Product filtering by category, brand, size, price range
- Search functionality across product names and descriptions

### Shopping Cart & Checkout
- Add/remove items with quantity management
- Persistent cart saved to database
- Address management for multiple shipping locations
- Coupon code application for discounts
- Integration with Razorpay for secure payments
- Order confirmation with email notifications

### Admin Dashboard
- View sales analytics and revenue charts
- Manage all users and their roles
- View and update order statuses
- Create and manage discount coupons
- Monitor platform statistics

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Contact

**Vansh Tambi**
- Email: vanshtambi@gmail.com
- Project Link: [https://outfytly.vercel.app](https://outfytly.vercel.app)
- GitHub: [@vansh-tambi](https://github.com/vansh-tambi)

## Acknowledgments

* [React Documentation](https://react.dev/)
* [Express.js Documentation](https://expressjs.com/)
* [MongoDB Documentation](https://docs.mongodb.com/)
* [Tailwind CSS](https://tailwindcss.com/)
* [Framer Motion](https://www.framer.com/motion/)
* [Cloudinary](https://cloudinary.com/)
* [Razorpay](https://razorpay.com/)

---

Made with ❤️ by Vansh Tambi