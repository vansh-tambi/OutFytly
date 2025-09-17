# OutFytly - Full-Stack Fashion Rental Marketplace

OutFytly is a modern, peer-to-peer fashion rental and resale marketplace built with the MERN stack. It provides a seamless, interactive experience for users to rent premium outfits, and for sellers to list their own wardrobe items and earn money.



## Table of Contents

* [About The Project](#about-the-project)
* [Key Features](#key-features)
* [Tech Stack](#tech-stack)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [API Endpoints](#api-endpoints)
* [Contact](#contact)

## About The Project

OutFytly was built to address the need for a sustainable and affordable way to access high-end fashion. Instead of buying expensive outfits for a single occasion, users can rent from a vast collection of items listed by a community of sellers. The platform is designed with a mobile-first, highly interactive user interface featuring smooth animations and a professional user experience from browsing to checkout.

## Key Features

* **Full User Authentication**: Secure JWT-based authentication with signup, login, logout, and password reset functionality.
* **Dynamic Product Browsing**: A comprehensive browse page with real-time search, filtering by category, and sorting by price or date.
* **Seller Dashboard**: A dedicated dashboard for users to list new products, manage their existing listings (delete), and view key stats.
* **Smart Product Forms**: The "List Item" form dynamically changes to show relevant size options (clothing vs. shoe sizes) based on the selected category.
* **Cloudinary Image Uploads**: Seamless, multi-image uploads for product listings are handled through a dedicated backend route and hosted on Cloudinary.
* **Persistent Shopping Cart**: A fully functional cart that is synced with the user's account in the database, persisting across devices.
* **Secure Payment Integration**: Checkout flow with online payments powered by the Razorpay API.
* **User Profile Management**: Users can update their name, bio, and upload a new profile picture.
* **Fully Responsive & Animated UI**: Built with Tailwind CSS and Framer Motion for a beautiful, modern, and fluid user experience on any device.

## Tech Stack

Here's a list of the major frameworks and libraries used:

| Frontend | Backend |
| :--- | :--- |
| React.js | Node.js |
| Vite | Express.js |
| React Router | MongoDB & Mongoose |
| Tailwind CSS | JWT (JSON Web Token) |
| Framer Motion | bcrypt.js |
| Axios | Multer & Cloudinary |
| React Hook Form | Razorpay SDK |
| Swiper.js | `nodemailer` |
| `react-hot-toast`| `dotenv` |

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
    git clone [https://github.com/your_username/outfytly.git](https://github.com/your_username/outfytly.git)
    cd outfytly
    ```

2.  **Backend Setup**
    * Navigate to the backend directory: `cd backend`
    * Install NPM packages: `npm install`
    * Create a `.env` file in the `backend` root and add the following variables:
        ```env
        PORT=5000
        MONGO_URI=your_mongodb_connection_string
        JWT_SECRET=your_jwt_secret
        FRONTEND_URL=http://localhost:5173

        # Cloudinary Credentials
        CLOUDINARY_CLOUD_NAME=your_cloud_name
        CLOUDINARY_API_KEY=your_api_key
        CLOUDINARY_API_SECRET=your_api_secret

        # Razorpay Credentials
        RAZORPAY_KEY_ID=your_key_id
        RAZORPAY_KEY_SECRET=your_key_secret

        # Email (e.g., using Mailtrap)
        EMAIL_HOST=...
        EMAIL_PORT=...
        EMAIL_USER=...
        EMAIL_PASS=...
        ```
    * Start the backend server: `npm run dev`

3.  **Frontend Setup**
    * Open a new terminal and navigate to the frontend directory: `cd frontend`
    * Install NPM packages: `npm install`
    * Create a `.env` file in the `frontend` root and add the following variable:
        ```env
        VITE_API_URL=http://localhost:5000
        ```
    * Start the frontend server: `npm run dev`

Your application should now be running, with the frontend at `http://localhost:5173` and the backend at `http://localhost:5000`.

## API Endpoints

* `POST /api/auth/register` - Register a new user
* `POST /api/auth/login` - Login a user
* `GET /api/auth/profile` - Get user profile
* `PUT /api/users/profile` - Update user profile
* `GET /api/products` - Get all products (with filters)
* `GET /api/products/:id` - Get a single product
* `POST /api/products` - Create a new product
* `DELETE /api/products/:id` - Delete a product
* `GET /api/cart` - Get the user's cart
* `POST /api/cart` - Add an item to the cart
* `PUT /api/cart/:itemId` - Update an item's quantity
* `DELETE /api/cart/:itemId` - Remove an item from the cart

## Contact

Vansh Tambi - vanshtambi@gmail.com

Project Link: [https://outfytly.vercel.app](https://github.com/your_username/outfytly)