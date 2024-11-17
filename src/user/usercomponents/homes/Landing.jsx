import React from "react";

const Landing = () => {
  return (
    <div className="bg-slate-900 flex flex-col font-poppins md:flex-row">
      {/* Main content */}
      <div className="flex-1 bg-gray-100">
        {/* Header section with product title and author settings */}
        <div className="flex justify-between items-center p-4 bg-white shadow-md sticky top-0">
          <p className="text-xl font-bold text-slate-900">Welcome, Achmad Rizky</p>
        </div>
      </div>
    </div>
  );
};

export default Landing;
