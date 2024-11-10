import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const NavbarComponent = () => {
  // Set Active -> Link (Id)
  // const [activeId, setActiveId] = useState("home");
  // const handleSetActive = (id) => {
  //   setActiveId(id);
  // };

  // Hamburger Menu
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Dinamis Color (Navbar)
  const [navBackground, setNavBackground] = useState("bg-transparent");
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section");
      let scrollPosition = window.scrollY + window.innerHeight / 2;

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute("id");

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          switch (sectionId) {
            case "home":
              setNavBackground("bg-black bg-opacity-75");
              break;
            case "about":
              setNavBackground("bg-slate-900");
              break;
            case "service":
              setNavBackground("bg-slate-900");
              break;
            case "contact":
              setNavBackground("bg-slate-900");
              break;
            default:
              setNavBackground("bg-transparent");
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className="fixed font-poppins text-white top-0 tracking-wider b  w-full z-50">
      <div className={`max-w-7xl mx-auto px-3 lg:px-7 ${navBackground}`}>
        <div className="flex justify-between items-center py-4">
          <p className="font-semibold text-2xl">
            Benerin <span className="text-orange-500">Motor</span>
          </p>

          {/* Menu Item Links */}
          <div className="hidden md:flex space-x-4 items-center">
            <Link to={"#home"} smooth={true} duration={100} className="duration-300 hover:text-orange-500">
              Home
            </Link>
            <Link to={"#about"} smooth={true} duration={100} className="duration-300 hover:text-orange-500">
              About
            </Link>
            <Link to={"#service"} smooth={true} duration={100} className="duration-300 hover:text-orange-500">
              Service
            </Link>
            <Link to={"#contact"} smooth={true} duration={100} className="duration-300 hover:text-orange-500">
              Contact
            </Link>
          </div>

          {/* Login & Register */}
          <div className="hidden md:flex space-x-4 items-center">
            <Link to={"register"} className="border border-orange-500 duration-300 px-4 py-1 rounded-full hover:bg-orange-700">
              Register
            </Link>
            <Link to={"login"} className="border border-orange-500 bg-orange-500 duration-300 px-4 py-1 rounded-full hover:bg-orange-700">
              Login
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
          <div className="md:hidden pb-4 text-sm">
            <div className="bg-black bg-opacity-75 py-2 rounded-md">
              {/* Menu Item Links */}
              <Link to={"#home"} smooth={true} duration={100} className="block py-2 px-3 duration-300 hover:text-orange-500">
                Home
              </Link>
              <Link to={"#about"} smooth={true} duration={100} className="block py-2 px-3 duration-300 hover:text-orange-500">
                About
              </Link>
              <Link to={"#service"} smooth={true} duration={100} className="block py-2 px-3 duration-300 hover:text-orange-500">
                Service
              </Link>
              <Link to={"#contact"} smooth={true} duration={100} className="block py-2 px-3 duration-300 hover:text-orange-500">
                Contact
              </Link>

              {/* Login & Register */}
              <div className="flex items-center justify-center gap-2 py-2 px-3">
                <Link to={"register"} className="border border-orange-500 duration-300 px-4 py-1 rounded-full text-center w-full hover:bg-orange-700">
                  Register
                </Link>
                <Link to={"login"} className="border border-orange-500 bg-orange-500 duration-300 px-4 py-1 rounded-full text-center w-full hover:bg-orange-700">
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
