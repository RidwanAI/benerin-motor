import React, { useState } from "react";
import ProductList from "./ProductList";

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("new"); // State to track category

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Handle category change
  const handleCategoryChange = (category) => {
    setActiveCategory(category); // Update the active category
    setIsDropdownOpen(false); // Close dropdown after selecting an option
  };

  // Mencegah dropdown menutup ketika klik di dalam dropdown
  const handleDropdownClick = (e) => {
    e.stopPropagation(); // Menjaga dropdown tetap terbuka saat klik di dalamnya
  };

  return (
    <div className="bg-slate-900 flex flex-col font-poppins md:flex-row">
      {/* Main content */}
      <div className="flex-1 bg-gray-100">
        {/* Header section with product title */}
        <div className="flex justify-between items-center p-4 bg-white shadow-md sticky top-0">
          <p className="text-xl font-bold text-slate-900">Products</p>
        </div>

        {/* Search bar and category buttons */}
        <div className="p-4 bg-white shadow-md flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 sticky top-0 z-10">
          {/* Product Button */}
          <div className="relative w-full md:w-auto">
            <button onClick={toggleDropdown} className="flex items-center space-x-2 text-white bg-orange-500 hover:bg-orange-700 px-4 py-2 rounded-md focus:outline-none w-full md:w-auto">
              <span className="font-medium text-white">Product</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div
                className="absolute left-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg"
                onClick={handleDropdownClick} // Mencegah klik menutup dropdown
              >
                <ul className="py-2 z-20">
                  <li onClick={() => handleCategoryChange("new")} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    New Product
                  </li>
                  <li onClick={() => handleCategoryChange("bekas")} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    Second Product
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search products ~ Benerin Motor..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-1.5 flex-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-auto"
          />
        </div>

        {/* Product List */}
        <ProductList
          searchTerm={searchTerm}
          category={activeCategory} // Pass category to filter
        />
      </div>
    </div>
  );
};

export default Products;
