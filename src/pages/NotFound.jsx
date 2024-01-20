import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa'; // Import the desired icon

const NotFound = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center">
        <FaExclamationTriangle className="text-6xl content-center text-dark-secondary-500 mb-4" />
        <h1 className="text-3xl font-bold mb-2 ">Page Not Found or Access Denied</h1>
        <p className="text-gray-600">Sorry, the page you are looking for does not exist.</p>
      </div>
    </div>
  );
};

export default NotFound;
