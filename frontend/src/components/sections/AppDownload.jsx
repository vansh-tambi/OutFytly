// src/components/sections/AppDownload.jsx
import React from "react";

const AppDownload = () => {
  return (
    <section className="py-16 bg-primary text-white text-center relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          📱 Shop Smarter with the OutFytly App
        </h2>
        <p className="text-lg text-lavender mb-8 max-w-2xl mx-auto">
          Get exclusive deals, faster checkout, and outfit recommendations tailored just for you.
        </p>
        <div className="flex justify-center gap-6">
          <a
            href="#"
            className="bg-black px-6 py-3 rounded-xl flex items-center gap-3 shadow-lg hover:scale-105 transition"
          >
            <img src="/google-play.png" alt="Google Play" className="h-6" />
            <span className="text-white font-medium">Google Play</span>
          </a>
          <a
            href="#"
            className="bg-black px-6 py-3 rounded-xl flex items-center gap-3 shadow-lg hover:scale-105 transition"
          >
            <img src="/app-store.png" alt="App Store" className="h-6" />
            <span className="text-white font-medium">App Store</span>
          </a>
        </div>
      </div>
      {/* Decorative background */}
      <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-lavender opacity-20 rounded-full blur-3xl"></div>
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-plum opacity-20 rounded-full blur-3xl"></div>
    </section>
  );
};

export default AppDownload;
