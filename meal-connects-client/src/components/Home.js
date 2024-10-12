import React from 'react';
import {Link} from 'react-router-dom';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="w-full max-w-2xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="px-6 py-4">
          <h1 className="text-3xl font-bold mb-2">Welcome to Food-Shelter Connect</h1>
          <p className="text-gray-600 mb-4">Connecting shelters and restaurants for social good</p>
          <p className="mb-4">
            Our platform helps connect shelters with restaurants to reduce food waste and provide meals to those in need.
            Register your organization to get started.
          </p>
          <Link to="details">
            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
              Go to Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
