// src/App.jsx
import React, { Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import MainLayout from "./layouts/MainLayout.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

// --- Statically Imported Pages ---
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Careers from "./pages/Careers.jsx";
import Privacy from "./pages/Privacy.jsx";
import Refund from "./pages/Refund.jsx";
import Help from "./pages/Help.jsx";
import Terms from "./pages/Terms.jsx";
import NotFound from "./pages/NotFound.jsx";
import FAQ from "./pages/FAQ.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";

// --- Lazy-loaded Pages ---
const PageLoader = () => (
  <div className="min-h-screen bg-ink flex justify-center items-center">
    <div className="w-12 h-12 rounded-full border-4 border-t-primary border-lavender/30 animate-spin"></div>
  </div>
);

const Browse = React.lazy(() => import("./pages/Browse.jsx"));
const ItemDetails = React.lazy(() => import("./pages/ItemDetails.jsx"));
const Login = React.lazy(() => import("./pages/Login.jsx"));
const Signup = React.lazy(() => import("./pages/Signup.jsx"));
const AccountPage = React.lazy(() => import("./pages/AccountPage.jsx"));
const ProfileSettings = React.lazy(() => import("./components/ProfileSettings.jsx"));
const WishlistView = React.lazy(() => import("./components/WishlistView.jsx"));
const OrderHistory = React.lazy(() => import("./components/OrderHistory.jsx")); // Assuming you'll create this
const Dashboard = React.lazy(() => import("./pages/Dashboard.jsx"));
const Cart = React.lazy(() => import("./pages/Cart.jsx"));
const Checkout = React.lazy(() => import("./pages/Checkout.jsx"));

export default function App() {
  const location = useLocation();

  return (
    <Suspense fallback={<PageLoader />}>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route element={<MainLayout />}>
            {/* --- Public & Static Pages --- */}
            <Route path="/" element={<Home />} />
            <Route path="/browse" element={<Browse />} />
            <Route path="/item/:id" element={<ItemDetails />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/returns" element={<Refund />} />
            <Route path="/help" element={<Help />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />

            {/* --- Protected Routes --- */}
            <Route element={<ProtectedRoute />}>
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              
              <Route path="/account" element={<AccountPage />}>
                <Route index element={<ProfileSettings />} />
                <Route path="profile" element={<ProfileSettings />} />
                <Route path="wishlist" element={<WishlistView />} />
                <Route path="orders" element={<OrderHistory />} />
                <Route path="dashboard" element={<Dashboard />} />
              </Route>
            </Route>

            {/* --- Fallback --- */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </Suspense>
  );
}