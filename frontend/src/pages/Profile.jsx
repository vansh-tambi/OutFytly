import React from "react";

const Profile = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold text-ink">Your Profile</h2>

      <div className="bg-white p-6 rounded-xl shadow-md mt-6">
        <p><span className="font-semibold">Name:</span> Vansh Tambi</p>
        <p><span className="font-semibold">Email:</span> vansh@example.com</p>
        <p><span className="font-semibold">Location:</span> Jaipur</p>
        <button className="mt-4 bg-primary text-white px-6 py-2 rounded-xl hover:bg-ink transition">
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;
