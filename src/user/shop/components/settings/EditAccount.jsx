import React, { useState } from "react";
import { Link } from "react-router-dom";

const EditAccountPopup = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Toggle popup visibility
  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <div>
      {/* Edit Button */}
      <Link
        to="#"
        onClick={(e) => {
          e.preventDefault();
          togglePopup();
        }}
        className="text-blue-500 hover:underline"
      >
        Edit
      </Link>

      {/* Popup Modal */}
      {isPopupOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6 relative">
            {/* Close Button */}
            <button onClick={togglePopup} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
              ✕
            </button>

            {/* Popup Content */}
            <h2 className="text-lg font-bold mb-4 text-center">Edit Account</h2>
            <form className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <input type="text" id="username" placeholder="Enter username" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input type="email" id="email" placeholder="Enter email" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input type="password" id="password" placeholder="Enter password" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="flex justify-end space-x-2">
                <button type="button" onClick={togglePopup} className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditAccountPopup;
