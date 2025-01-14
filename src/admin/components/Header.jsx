import React from "react";

const Header = () => {
  return (
    <header className="bg-white flex justify-between items-center p-4 shadow-md">
      <h1 className="text-xl font-semibold">Dashboard</h1>
      <div className="flex items-center space-x-4">
        <span>Welcome, Admin</span>
        <button className="bg-blue-500 text-white px-3 py-1 rounded">Log Out</button>
      </div>
    </header>
  );
};

export default Header;
