
import React from "react";

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-6">Welcome to Story Shaper - Adventures Unleashed!</h1>
        <p className="text-lg mb-4">
          This is the home page of the application. Navigate to the landing page or other sections using the menu.
        </p>
        <a
          href="#/landing"
          className="inline-block mt-4 px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Go to Landing Page
        </a>
      </div>
    </div>
  );
};

export default Index;
