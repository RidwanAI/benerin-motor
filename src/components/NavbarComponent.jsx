import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const NavbarComponent = () => {
  // State untuk melacak link aktif
  const [activeLink, setActiveLink] = useState("");
  const location = useLocation();

  // Update link aktif berdasarkan path saat ini
  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  // Hamburger Menu
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="fixed font-poppins text-white top-0 w-full z-50">
      <div className="bg-slate-900 px-3 lg:px-7">
        <div className="flex justify-between items-center py-4">
          <p className="font-semibold text-xl md:text-2xl">
            Benerin <span className="text-orange-500">Motor</span>
          </p>

          {/* Menu Item Links */}
          <div className="hidden md:flex space-x-4 items-center">
            <Link to="/" className={`duration-300 hover:text-orange-500 ${activeLink === "/" ? "border-b-2 border-orange-500" : ""}`}>
              Home
            </Link>
            <Link to="/products" className={`duration-300 hover:text-orange-500 ${activeLink === "/products" ? "border-b-2 border-orange-500" : ""}`}>
              Product
            </Link>
            <Link to="/bookingList" className={`duration-300 hover:text-orange-500 ${activeLink === "/bookingList" ? "border-b-2 border-orange-500" : ""}`}>
              Booking List
            </Link>
            <Link to="/contact" className={`duration-300 hover:text-orange-500 ${activeLink === "/contact" ? "border-b-2 border-orange-500" : ""}`}>
              Contact
            </Link>
          </div>

          {/* Login & Register */}
          <div className="hidden md:flex space-x-4 items-center">
            <Link to="/register#register" className="border border-orange-500 duration-300 px-5 py-1.5 rounded-md hover:bg-orange-700">
              Register
            </Link>
            <Link to="/login#login" className="border border-orange-500 bg-orange-500 duration-300 px-5 py-1.5 rounded-md hover:bg-orange-700">
              Login
            </Link>
          </div>

          {/* Hamburger Icon */}
          <div className="md:hidden">
            <div onClick={toggleMenu} className="cursor-pointer focus:outline-none focus:text-blue-300 hover:text-blue-200">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
              </svg>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 text-sm">
            <div className="bg-black bg-opacity-75 py-2 rounded-md">
              {/* Menu Item Links */}
              <Link to="/" className={`block py-2 px-3 duration-300 hover:text-orange-500 ${activeLink === "/" ? "border-b-2 border-orange-500" : ""}`} onClick={toggleMenu}>
                Home
              </Link>
              <Link to="/products" className={`block py-2 px-3 duration-300 hover:text-orange-500 ${activeLink === "/products" ? "border-b-2 border-orange-500" : ""}`} onClick={toggleMenu}>
                Product
              </Link>
              <Link to="/bookingList" className={`block py-2 px-3 duration-300 hover:text-orange-500 ${activeLink === "/bookingList" ? "border-b-2 border-orange-500" : ""}`} onClick={toggleMenu}>
                Booking List
              </Link>
              <Link to="/contact" className={`block py-2 px-3 duration-300 hover:text-orange-500 ${activeLink === "/contact" ? "border-b-2 border-orange-500" : ""}`} onClick={toggleMenu}>
                Contact
              </Link>

              {/* Login & Register */}
              <div className="flex items-center justify-center gap-2 py-2 px-3">
                <Link to="/register#register" className="border border-orange-500 duration-300 px-3 py-1 rounded-md text-center w-full hover:bg-orange-700">
                  Register
                </Link>
                <Link to="/login#login" className="border border-orange-500 bg-orange-500 duration-300 px-3 py-1 rounded-md text-center w-full hover:bg-orange-700">
                  Login
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavbarComponent;
