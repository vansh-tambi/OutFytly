// src/pages/Profile.jsx
import React from "react";

const Profile = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-2">Vansh Tambi</h2>
        <p className="text-gray-600 mb-4">Email: vansh@example.com</p>
        <h3 className="font-semibold mb-2">My Rentals</h3>
        <ul className="list-disc ml-6 text-gray-600">
          <li>Luxury Suit - Rented on Jan 2025</li>
          <li>Classic Watch - Purchased on Dec 2024</li>
        </ul>
      </div>
    </div>
  );
};

export default Profile;
