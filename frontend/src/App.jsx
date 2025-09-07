// src/App.jsx
import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout.jsx";

// A simple loading spinner component for suspense fallback
const PageLoader = () => (
  <div className="min-h-screen bg-ink flex justify-center items-center">
    <div className="w-12 h-12 rounded-full border-4 border-t-primary border-lavender/30 animate-spin"></div>
  </div>
);

// --- Lazy-loaded Pages ---

// Core Pages
const Home = React.lazy(() => import("./pages/Home.jsx"));
const Browse = React.lazy(() => import("./pages/Browse.jsx"));
const ItemDetails = React.lazy(() => import("./pages/ItemDetails.jsx"));

// Auth Pages
const Login = React.lazy(() => import("./pages/Login.jsx"));
const Signup = React.lazy(() => import("./pages/Signup.jsx"));

// Account Hub Pages
const AccountPage = React.lazy(() => import("./pages/AccountPage.jsx"));
const Profile = React.lazy(() => import("./pages/Profile.jsx"));
const Dashboard = React.lazy(() => import("./pages/Dashboard.jsx"));

// Static & Info Pages
const About = React.lazy(() => import("./pages/About.jsx"));
const Contact = React.lazy(() => import("./components/sections/Contact.jsx"));
const FAQ = React.lazy(() => import("./components/sections/FAQ.jsx"));
const Careers = React.lazy(() => import("./pages/Careers.jsx"));
const Privacy = React.lazy(() => import("./pages/Privacy.jsx"));
const Refund = React.lazy(() => import("./pages/Refund.jsx"));
const Help = React.lazy(() => import("./pages/Help.jsx"));
const Terms = React.lazy(() => import("./pages/Terms.jsx"));

// Utility Pages
const NotFound = React.lazy(() => import("./pages/NotFound.jsx"));
const Cart = React.lazy(() => import("./pages/Cart.jsx"));
const Checkout = React.lazy(() => import("./pages/Checkout.jsx"));

export default function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* --- All pages that use the Main Navbar and Footer --- */}
        <Route element={<MainLayout />}>
          {/* Core Public Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/item/:id" element={<ItemDetails />} />

          {/* Auth Pages */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* User Cart & Checkout */}
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />

          {/* Account Hub with Sidebar */}
          <Route path="/account" element={<AccountPage />}>
            <Route index element={<Profile />} />
            <Route path="profile" element={<Profile />} />
            <Route path="dashboard" element={<Dashboard />} />
          </Route>

          {/* Static Informational Pages */}
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/returns" element={<Refund />} />
          <Route path="/help" element={<Help />} />
          <Route path="/terms" element={<Terms />} />

          {/* Catch-all 404 Page */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}