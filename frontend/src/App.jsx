import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout.jsx";

// Core Pages
import Home from "./pages/Home.jsx";
import Browse from "./pages/Browse.jsx";
import ItemDetails from "./pages/ItemDetails.jsx";
import About from "./pages/About.jsx";
import Contact from "./components/sections/Contact.jsx";
import FAQ from "./components/sections/FAQ.jsx";

// Auth
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";

// User
import Profile from "./pages/Profile.jsx";
import Cart from "./pages/Cart.jsx";
import Checkout from "./pages/Checkout.jsx";

// Seller
import Dashboard from "./pages/Dashboard.jsx";

// Static / Info Pages
import Terms from "./pages/Terms.jsx";
import Privacy from "./pages/Privacy.jsx";
import Help from "./pages/Help.jsx";
import Refund from "./pages/Refund.jsx";
import Careers from "./pages/Careers.jsx";

// Utility
import NotFound from "./pages/NotFound.jsx";

import "./App.css";
import "./index.css";

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        {/* Public Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/item/:id" element={<ItemDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<FAQ />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* User */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />

        {/* Seller */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Static / Info */}
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/help" element={<Help />} />
        <Route path="/returns" element={<Refund />} />
        <Route path="/careers" element={<Careers />} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
