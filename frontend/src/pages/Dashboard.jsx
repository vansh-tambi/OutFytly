import React from "react";

const Dashboard = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold text-ink">Welcome Back, User 👋</h2>
      <p className="mt-2 text-plum">Here’s an overview of your account.</p>

      {/* Stats / Orders */}
      <div className="grid md:grid-cols-3 gap-6 mt-8">
        <div className="bg-lavender/20 p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold">Active Rentals</h3>
          <p className="text-2xl font-bold text-primary mt-2">3</p>
        </div>
        <div className="bg-lavender/20 p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold">Past Orders</h3>
          <p className="text-2xl font-bold text-primary mt-2">12</p>
        </div>
        <div className="bg-lavender/20 p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold">Wishlist</h3>
          <p className="text-2xl font-bold text-primary mt-2">5</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
