import React, { useState } from "react";
import ProductList from "./ProductList";

const Product = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("new");
  const [buttonLabel, setButtonLabel] = useState("New Product");

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleCategoryChange = (category, label) => {
    setActiveCategory(category);
    setButtonLabel(label);
    setIsDropdownOpen(false);
  };

  const handleDropdownClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="flex flex-col font-poppins h-screen overflow-y-auto md:flex-row">
      <div className="bg-slate-100 flex-1">
        <div className="flex items-center p-3 bg-slate-100 shadow-md sticky top-0">
          <p className="text-2xl font-bold">Product</p>
        </div>

        <div className="bg-slate-100 p-3 flex flex-col items-center shadow-sm space-y-4 sticky top-0 md:flex-row md:space-y-0 md:space-x-4">
          {/* Button New Product & Second Product */}
          <div className="relative w-full md:w-auto">
            <button onClick={toggleDropdown} className="flex items-center space-x-2 text-white bg-orange-500 hover:bg-orange-700 px-4 py-2 rounded-md focus:outline-none w-full md:w-auto">
              <span className="font-medium text-white">{buttonLabel}</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isDropdownOpen && (
              <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg" onClick={handleDropdownClick}>
                <ul className="py-2 z-20">
                  <li onClick={() => handleCategoryChange("new", "New Product")} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    New Product
                  </li>
                  <li onClick={() => handleCategoryChange("second", "Second Product")} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    Second Product
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Fitur Searching */}
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-1.5 flex-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-auto"
          />
        </div>

        <ProductList searchTerm={searchTerm} category={activeCategory} />
      </div>
    </div>
  );
};

export default Product;
