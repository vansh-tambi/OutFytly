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
* [Environment Variables](#environment-variables)
* [API Endpoints](#api-endpoints)
* [Features in Detail](#features-in-detail)
* [Performance Optimizations](#performance-optimizations)
* [Animation System](#animation-system)
* [Theme & Styling](#theme--styling)
* [Testing & Performance Monitoring](#testing--performance-monitoring)
* [Troubleshooting](#troubleshooting)
* [Future Enhancements](#future-enhancements)
* [Contributing](#contributing)
* [License](#license)
* [Contact](#contact)
* [Acknowledgments](#acknowledgments)

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

## Performance Optimizations

OutFytly has been optimized for maximum performance with several key enhancements:

### Backend Optimizations

#### Database Indexing
- **Category index**: Fast filtering by category
- **User index**: Fast user-based queries  
- **CreatedAt index**: Fast sorting by newest items
- **RentalPrice index**: Fast price-based sorting
- **Text index on title**: Fast text search capabilities
- **Compound indexes**: Optimized filtering with multiple criteria
- **Impact**: 50-80% faster query execution on large datasets

#### Query Optimization
- `.lean()` to return plain JavaScript objects (30-50% faster)
- `.select()` to fetch only needed fields
- Reduced data transfer by excluding unnecessary fields
- **Impact**: 30-50% reduction in query execution time

#### Response Compression
- Enabled gzip/brotli compression middleware
- Automatic compression for all API responses
- **Impact**: 70-80% reduction in response size over the network

#### HTTP Caching
- Product list cached for 5 minutes (browser) / 10 minutes (CDN)
- Individual product details cached for 10-20 minutes
- **Impact**: Near-instant loading on repeat visits

### Frontend Optimizations

#### Resource Hints
- Preconnect to Cloudinary CDN
- DNS prefetch for Razorpay payment gateway
- Async script loading for non-critical resources
- **Impact**: -200-500ms on initial load

#### Code Splitting & Lazy Loading
- Heavy components lazy-loaded with React.lazy()
- Suspense fallbacks with skeleton loaders
- Route-based code splitting
- **Impact**: -150KB from initial JavaScript bundle (-43%)

#### Image Optimization
- Progressive JPEG loading (`fl_progressive`)
- Lossy compression for smaller files
- Auto format selection (WebP on supported browsers)
- Quality settings: `auto:low` for thumbnails, `auto:good` for detail views
- Proper sizing: 400x400 for cards, 800px for larger images
- **Impact**: 60-80% reduction in image file sizes

#### Progressive Image Loading
- Blur-up technique with tiny 50x50 placeholders (<2KB)
- Smooth fade-in transitions when main image is ready
- `loading="lazy"` and `decoding="async"` attributes
- **Impact**: Images appear to load 2-3x faster

#### Component Optimization
- React.memo() on expensive components
- Optimized Swiper configuration (removed heavy modules)
- Prevents unnecessary re-renders
- **Impact**: Smoother scrolling and interactions

### Performance Metrics

#### Before Optimization
- Initial product list load: 3-5 seconds
- Individual images: 500KB - 2MB each
- Total page load: 5-8 seconds
- Lighthouse Score: ~75

#### After Optimization
- Initial product list load: 0.8-1.5 seconds (-73%)
- Individual images: 50-200KB each (-80%)
- Total page load: 1.5-3 seconds (-60%)
- Cached loads: < 0.5 seconds
- Lighthouse Score: 85-90 (+10-15 points)

## Animation System

OutFytly features a comprehensive animation system built with Framer Motion, providing smooth, professional interactions throughout the application.

### Animation Patterns

#### 1. Entrance Animations
```jsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.2 }}
  transition={{ duration: 0.5 }}
>
  {/* Content */}
</motion.div>
```
- Used for cards, list items, and section content
- Triggers when 20% of element is visible
- Smooth fade + slide up effect

#### 2. Hover Effects
```jsx
<motion.div
  whileHover={{ y: -4 }}
  transition={{ duration: 0.2 }}
>
  {/* Content */}
</motion.div>
```
- Subtle 4px upward movement
- Creates "floating" sensation
- Used on cards, buttons, and interactive elements

#### 3. Tap Feedback
```jsx
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  Click Me
</motion.button>
```
- Scale up on hover, scale down on click
- Provides tactile feedback
- Enhances user confidence

#### 4. Staggered Animations
```jsx
{items.map((item, index) => (
  <motion.div
    key={item.id}
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.05 + index * 0.05 }}
  >
    {item.content}
  </motion.div>
))}
```
- Items appear sequentially with 50ms delay
- Used for grids, lists, and navigation menus

#### 5. Spring Physics
```jsx
<motion.div
  initial={{ scale: 0.8, opacity: 0 }}
  animate={{ scale: 1, opacity: 1 }}
  transition={{ 
    type: "spring",
    stiffness: 300,
    damping: 30
  }}
>
  {/* Modal content */}
</motion.div>
```
- Bouncy, elastic animations
- Natural deceleration
- Used for modals and popups

### Enhanced Components

#### Navigation (Navbar)
- Logo hover animation with rotation and scale
- Gradient text animation with continuous flow
- Mobile menu slide-in animation from right
- Dropdown menu smooth entrance/exit with staggered items
- Navigation link underline animation with layoutId

#### Product Cards (ItemCard)
- Entrance animation (fade + slide from bottom)
- Hover animation (subtle upward movement)
- Category and title text animations with staggered delays
- Wishlist button with scale pulse animation
- Cart button with scale and tap animations
- Image zoom on hover (1.08x scale)

#### Shopping Cart
- Loading spinner with smooth rotation
- Cart items enter with fade and slide animations
- Layout transitions on item removal
- Quantity counter pulses when updated
- Empty cart state with bouncing emoji animation
- Order summary cards animate in sequence

#### Checkout Page
- Form sections slide in from left/right
- Form fields animate with staggered delays
- Input fields have smooth focus border animation
- Payment method options animate on hover
- Product images zoom on hover

#### Browse/Products Page
- Filter sidebar slides in from left
- Filter items animate with hover slide effect
- Product grid with staggered entrance (5ms delay between items)
- Mobile filter panel slides in smoothly

#### Authentication Pages
- Form content slides in from right
- Form fields with staggered entrance delays
- Input focus states with color and shadow effects
- Password visibility toggle with scale animation
- Submit button with hover and tap feedback

#### Footer
- Section animations with scroll trigger
- Link items with smooth slide animations
- Social media icons with hover lift and scale effects
- Back-to-top button with smooth entrance/exit
- Animated arrow icon

### Animation Performance
- All animations use GPU-accelerated properties (transform, opacity)
- 60fps smooth animations on modern browsers
- No layout thrashing or repaints
- Minimal performance impact on mobile devices
- Respects prefers-reduced-motion for accessibility

## Theme & Styling

OutFytly features a modern, dark-themed design with a rich color palette and custom utility classes.

### Color Palette

#### Core Brand Colors
```css
--color-primary: #8A2BE1          /* Main purple */
--color-primary-light: #A855F7    /* Lighter purple */
--color-primary-dark: #6B21A8     /* Darker purple */

--color-ink: #3A2A45              /* Dark purple background */
--color-plum: #201825             /* Darkest background */
--color-lavender: #BEA0D3         /* Text/accent color */
```

#### Accent Colors
```css
--color-accent-pink: #E879F9      /* Vibrant pink */
--color-accent-blue: #60A5FA      /* Sky blue */
--color-accent-teal: #2DD4BF      /* Teal */
--color-accent-gold: #FCD34D      /* Gold */
```

#### Semantic Colors
```css
--color-success: #10B981          /* Green for success */
--color-warning: #F59E0B          /* Amber for warnings */
--color-error: #EF4444            /* Red for errors */
--color-info: #3B82F6             /* Blue for info */
```

### Custom Utility Classes

#### Glass Morphism
```jsx
<div className="glass-card">
  {/* Frosted glass effect with backdrop blur */}
</div>
```

#### Gradient Buttons
```jsx
<button className="btn-gradient">
  Click Me
</button>
```

#### Shimmer Effect
```jsx
<div className="shimmer">
  {/* Animated shimmer/loading effect */}
</div>
```

#### Glow Effects
```jsx
<div className="glow-primary">Static glow</div>
<div className="glow-hover">Glow on hover</div>
```

#### Gradient Text
```jsx
<h1 className="gradient-text">
  Beautiful Gradient Text
</h1>
```

#### Custom Scrollbar
```jsx
<div className="custom-scrollbar overflow-auto">
  {/* Styled gradient scrollbar */}
</div>
```

## Testing & Performance Monitoring

### Running Performance Tests

#### 1. Bundle Size Analysis
```bash
cd frontend
npm run build
# Check dist/ folder size
```

#### 2. Lighthouse Audit
```bash
npm run dev
# Press F12 → Lighthouse → Run Audit
```

**Target Metrics:**
- Performance: 85+
- First Contentful Paint: <1s
- Largest Contentful Paint: <2.5s
- Cumulative Layout Shift: <0.1

#### 3. Network Throttling Test
```bash
# Open DevTools (F12)
# Network tab → Throttle to "Slow 3G"
# Hard refresh and observe load time
```

**Success Criteria:**
- Page interactive within 2-3s on 3G
- Product cards visible without huge waits
- Lazy sections don't cause jank

### Monitoring Recommendations

1. **Web Vitals**: Implement `web-vitals` library for real-time monitoring
2. **Error Tracking**: Use Sentry or similar service
3. **Analytics**: Google Analytics for user behavior tracking
4. **Uptime Monitoring**: Use services like UptimeRobot
5. **Performance Budgets**: Set and monitor bundle size limits

## Troubleshooting

### Common Issues

#### Home Page Won't Load
```bash
# Clear cache and rebuild
rm -rf node_modules dist
npm install
npm run dev
# Hard refresh browser: Ctrl+Shift+R
```

#### Carousel Not Working
```bash
# Check Swiper is installed
npm list swiper
# Should show: swiper@11.2.10 or higher

# If missing, reinstall
npm install swiper@latest
```

#### Images Not Showing
```bash
# Check F12 → Network tab for 404 errors
# Verify Cloudinary preconnect in index.html
# Refresh page: Ctrl+Shift+R
```

#### Build Size Didn't Decrease
```bash
# Verify optimizations are in place
# Check package.json for duplicate dependencies
# Run: npm run build -- --report
# Analyze bundle composition
```

#### Animations Not Smooth
```bash
# Check browser DevTools → Performance
# Ensure GPU acceleration is enabled
# Verify no heavy computations during animations
# Check if prefers-reduced-motion is enabled
```

## Future Enhancements

### Planned Features
- [ ] PWA support with service workers
- [ ] Real-time chat between buyers and sellers
- [ ] Advanced recommendation engine
- [ ] Social media integration
- [ ] Mobile app (React Native)
- [ ] Virtual try-on with AR
- [ ] Subscription boxes
- [ ] Referral program
- [ ] Multi-currency support
- [ ] Multi-language support

### Optimization Opportunities
- [ ] Critical CSS extraction
- [ ] Dynamic imports for admin routes
- [ ] WebP image format for all images
- [ ] HTTP/2 server push
- [ ] Prefetch on hover for faster navigation
- [ ] Implement CDN for static assets
- [ ] Database query result caching with Redis
- [ ] Implement GraphQL for flexible data fetching

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Contribution Guidelines
- Follow the existing code style
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting PR

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
* [Swiper](https://swiperjs.com/)
* [React Hook Form](https://react-hook-form.com/)

---

Made with ❤️ by Vansh Tambi