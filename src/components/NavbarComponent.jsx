import React, { useState } from "react";
import { Link } from "react-router-dom";

const NavbarComponent = () => {
  // Set Active -> Link (Id)
  const [activeId, setActiveId] = useState("home");
  const handleSetActive = (id) => {
    setActiveId(id);
  };

  // Hamburger Menu
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="fixed font-raleway text-white top-0 tracking-wide w-full z-50">
      <div className="bg-black bg-opacity-15 max-w-7xl mx-auto px-3 lg:px-7">
        <div className="flex justify-between items-center py-4">
          <p className="font-bold text-2xl">
            Benerin <span className="text-orange-500">Motor</span>
          </p>

          {/* Menu Items */}
          <div className="hidden md:flex space-x-4">
            <Link to={"#home"} smooth={true} duration={100} className={`${activeId === "home" ? "border-b-2 border-orange-500 translate-y-0.5" : "duration-300 hover:text-orange-500"}`} onClick={() => handleSetActive("home")}>
              Home
            </Link>
            <Link to={"#service"} smooth={true} duration={100} className={`${activeId === "service" ? "border-b-2 border-orange-500 translate-y-0.5" : "duration-300 hover:text-orange-500"}`} onClick={() => handleSetActive("service")}>
              Service
            </Link>
            <Link to={"#contact"} smooth={true} duration={100} className={`${activeId === "contact" ? "border-b-2 border-orange-500 translate-y-0.5" : "duration-300 hover:text-orange-500"}`} onClick={() => handleSetActive("contact")}>
              Contact
            </Link>
            <Link to={"/portfolio"} smooth={true} duration={100} className={`${activeId === "project" ? "border-b-2 border-orange-500 translate-y-0.5" : "duration-300 hover:text-orange-500"}`} onClick={() => handleSetActive("project")}>
              My Portfolio
            </Link>
          </div>

          {/* Hamburger Icon */}
          <div className="md:hidden">
            <Link onClick={toggleMenu} className="focus:outline-none focus:text-blue-300 hover:text-blue-200">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
              </svg>
            </Link>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden text-sm">
            <div className="bg-black bg-opacity-75 rounded-md">
              <Link to={"#home"} smooth={true} duration={100} className={`block py-2 px-3 ${activeId === "home" ? "border-b-2 border-orange-500 px-5" : "duration-300 hover:text-orange-500"}`} onClick={() => handleSetActive("home")}>
                Home
              </Link>
              <Link
                to={"#service"}
                smooth={true}
                duration={100}
                className={`block py-2 px-3 ${activeId === "service" ? "border-b-2 border-orange-500 px-5" : "duration-300 hover:text-orange-500"}`}
                onClick={() => handleSetActive("service")}
              >
                Service
              </Link>
              <Link
                to={"#contact"}
                smooth={true}
                duration={100}
                className={`block py-2 px-3 ${activeId === "contact" ? "border-b-2 border-orange-500 px-5" : "duration-300 hover:text-orange-500"}`}
                onClick={() => handleSetActive("contact")}
              >
                Contact
              </Link>
              <Link
                to={"/portfolio"}
                smooth={true}
                duration={100}
                className={`block py-2 px-3 ${activeId === "project" ? "border-b-2 border-orange-500 px-5" : "duration-300 hover:text-orange-500"}`}
                onClick={() => handleSetActive("project")}
              >
                My Portfolio
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavbarComponent;
