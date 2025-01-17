import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { authService } from "../../../services/authService";

const Navbar = () => {
  const [activeLink, setActiveLink] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileUserMenuOpen, setIsMobileUserMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const userData = await authService.getCurrentUser();
        setUser(userData);
      } catch (error) {
        setUser(null);
      }
    };
    checkAuth();
  }, []);

  useEffect(() => {
    const closeMenu = (e) => {
      if (isUserMenuOpen && !e.target.closest(".user-menu")) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("click", closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, [isUserMenuOpen]);

  const handleLogout = async () => {
    try {
      await authService.logout();
      setUser(null);
      setIsUserMenuOpen(false);
      setIsMobileUserMenuOpen(false);
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleUserMenu = (e) => {
    e.stopPropagation();
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const toggleMobileUserMenu = () => {
    setIsMobileUserMenuOpen(!isMobileUserMenuOpen);
  };

  const AuthButtons = () => (
    <>
      <Link to="/register#register" className="border border-orange-500 duration-300 px-5 py-1.5 rounded-md hover:bg-orange-700">
        Register
      </Link>
      <Link to="/login#login" className="border border-orange-500 bg-orange-500 duration-300 px-5 py-1.5 rounded-md hover:bg-orange-700">
        Login
      </Link>
    </>
  );

  const UserMenu = () => (
    <div className="relative user-menu">
      <button onClick={toggleUserMenu} className="flex items-center space-x-2 text-orange-500 hover:text-orange-400">
        <span>Hello, {user?.name || "User"}</span>
        <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 transition-transform duration-200 ${isUserMenuOpen ? "rotate-90" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
      {isUserMenuOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-slate-800 rounded-md shadow-lg py-1">
          <Link to="/profile" className="block px-4 py-2 text-sm hover:bg-slate-700" onClick={() => setIsUserMenuOpen(false)}>
            Profile
          </Link>
          <Link onClick={handleLogout} className="block px-4 py-2 text-sm hover:bg-slate-700">
            Logout
          </Link>
        </div>
      )}
    </div>
  );

  return (
    <nav className="fixed font-poppins text-white top-0 w-full z-50">
      <div className="bg-slate-900 px-3 lg:px-7">
        <div className="flex justify-between items-center py-4">
          <p className="font-semibold text-xl md:text-2xl">
            Benerin <span className="text-orange-500">Motor</span>
          </p>

          <div className="hidden md:flex space-x-4 items-center">
            <Link to="/" className={`duration-300 hover:text-orange-500 ${activeLink === "/" ? "border-b-2 border-orange-500" : ""}`}>
              Home
            </Link>
            <Link to="/shop" className={`duration-300 hover:text-orange-500 ${activeLink === "/products" ? "border-b-2 border-orange-500" : ""}`}>
              Shop & Service Motor
            </Link>
            <Link to="/contact" className={`duration-300 hover:text-orange-500 ${activeLink === "/contact" ? "border-b-2 border-orange-500" : ""}`}>
              Contact
            </Link>
          </div>

          <div className="hidden md:flex space-x-4 items-center">{user ? <UserMenu /> : <AuthButtons />}</div>

          <div className="md:hidden">
            <div onClick={toggleMenu} className="cursor-pointer focus:outline-none focus:text-blue-300 hover:text-blue-200">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
              </svg>
            </div>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4 text-sm">
            <div className="bg-black bg-opacity-75 py-2 rounded-md">
              <Link to="/" className={`block py-2 px-3 duration-300 hover:text-orange-500 ${activeLink === "/" ? "" : ""}`} onClick={toggleMenu}>
                Home
              </Link>
              <Link to="/shop" className={`block py-2 px-3 duration-300 hover:text-orange-500 ${activeLink === "/products" ? "border-b-2 border-orange-500" : ""}`} onClick={toggleMenu}>
                Shop & Service Motor
              </Link>
              <Link to="/contact" className={`block py-2 px-3 duration-300 hover:text-orange-500 ${activeLink === "/contact" ? "border-b-2 border-orange-500" : ""}`} onClick={toggleMenu}>
                Contact
              </Link>
              {user ? (
                <div className="px-3 py-2">
                  <div className="flex items-center justify-between" onClick={toggleMobileUserMenu}>
                    <Link className="block py-1 hover:text-orange-500">Hello, {user.name || "User"}</Link>
                    <Link>
                      <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 text-orange-500 transition-transform duration-200 ${isMobileUserMenuOpen ? "rotate-90" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                  <div className={`mt-2 space-y-1 ${isMobileUserMenuOpen ? "block" : "hidden"}`}>
                    <Link
                      to="/profile"
                      className="block py-1 hover:text-orange-500"
                      onClick={() => {
                        setIsMobileUserMenuOpen(false);
                        setIsOpen(false);
                      }}
                    >
                      Profile
                    </Link>
                    <Link onClick={handleLogout} className="block py-1 hover:text-orange-500">
                      Logout
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2 py-2 px-3">
                  <Link to="/register#register" className="border border-orange-500 duration-300 px-3 py-1 rounded-md text-center w-full hover:bg-orange-700">
                    Register
                  </Link>
                  <Link to="/login#login" className="border border-orange-500 bg-orange-500 duration-300 px-3 py-1 rounded-md text-center w-full hover:bg-orange-700">
                    Login
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
