// src/pages/Dashboard.jsx
import React from "react";

const Dashboard = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-6">Seller Dashboard</h1>

      {/* Upload New Item */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Upload New Item</h2>
        <form className="grid gap-4">
          <input type="text" placeholder="Title" className="p-3 border rounded-lg" />
          <textarea placeholder="Description" className="p-3 border rounded-lg" rows="4" />
          <input type="number" placeholder="Price (₹)" className="p-3 border rounded-lg" />
          <input type="file" className="p-3 border rounded-lg" />
          <button className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-ink transition">
            Upload
          </button>
        </form>
      </div>

      {/* Manage Listings */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">My Listings</h2>
        <ul className="space-y-4">
          <li className="flex justify-between items-center border-b pb-2">
            <span>Luxury Suit - ₹1500</span>
            <div className="flex gap-3">
              <button className="text-blue-600 hover:underline">Edit</button>
              <button className="text-red-600 hover:underline">Delete</button>
            </div>
          </li>
          <li className="flex justify-between items-center border-b pb-2">
            <span>Classic Watch - ₹800</span>
            <div className="flex gap-3">
              <button className="text-blue-600 hover:underline">Edit</button>
              <button className="text-red-600 hover:underline">Delete</button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
