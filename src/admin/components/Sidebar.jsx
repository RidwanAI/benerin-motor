import React from "react";
import { FiHome, FiBarChart2, FiUsers, FiDollarSign, FiSettings } from "react-icons/fi";
import { Link } from "react-router-dom";

const Sidebar = () => (
  <div className="bg-gray-800 text-white h-full w-60 px-4 py-8">
    <h2 className="text-2xl font-bold mb-8">Benerin Motor</h2>
    <nav>
      <ul>
        <li className="mb-4">
          <Link to="/" className="flex items-center space-x-2 cursor-pointer hover:bg-gray-700 p-2 rounded-md">
            <FiHome />
            <span>Overview</span>
          </Link>
        </li>
        <li className="mb-4">
          <Link to="/products" className="flex items-center space-x-2 cursor-pointer hover:bg-gray-700 p-2 rounded-md">
            <FiBarChart2 />
            <span>Data Produk</span>
          </Link>
        </li>
        <li className="mb-4">
          <Link to="/customers" className="flex items-center space-x-2 cursor-pointer hover:bg-gray-700 p-2 rounded-md">
            <FiUsers />
            <span>Data Customer</span>
          </Link>
        </li>
        <li className="mb-4">
          <Link to="/payments" className="flex items-center space-x-2 cursor-pointer hover:bg-gray-700 p-2 rounded-md">
            <FiDollarSign />
            <span>Data Pembayaran</span>
          </Link>
        </li>
        <li>
          <Link to="/settings" className="flex items-center space-x-2 cursor-pointer hover:bg-gray-700 p-2 rounded-md">
            <FiSettings />
            <span>Settings</span>
          </Link>
        </li>
      </ul>
    </nav>
  </div>
);

export default Sidebar;
