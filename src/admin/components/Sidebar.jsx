import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DateTime from "../../user/shop/components/generals/DateTime";

const Sidebar = ({ onLinkClick, activePage, children }) => {
  // Function -> Navigate URL
  const navigate = useNavigate();

  // Function -> Fetch User
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        try {
          const userData = await authService.getCurrentUser();
          setUser(userData);
        } catch (error) {
          console.error("Error fetching user:", error);
          localStorage.removeItem("accessToken");
          setUser(null);
        }
      }
      setIsLoading(false);
    };

    fetchUserData();
  }, []);

  // Function -> Sidebar
  const linkSidebar = [
    { name: "adminOverview", label: "Overview" },
    {
      name: "shop",
      label: "Shop",
      children: [
        { name: "adminProducts", label: "Products Data" },
        { name: "adminCustomers", label: "Customers Data" },
        { name: "adminOrders", label: "Orders Data" },
      ],
    },
    {
      name: "serviceMotor",
      label: "Service Motor",
      children: [
        { name: "serviceCustomers", label: "Customer Data" },
        { name: "bookingList", label: "Booking List Data" },
      ],
    },
    { name: "adminSettings", label: "Settings" },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Function -> Render Page (Content)
  const handleLinkClick = (page) => {
    setIsOpen(false);
    onLinkClick(page);
  };

  // Function -> Dropdown
  const [openDropdowns, setOpenDropdowns] = useState({});
  const toggleDropdown = (name) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  // Function -> Logout
  const handleAuthAction = async () => {
    if (user) {
      setIsModalOpen(true);
      setModalAction("logout");
    } else {
      navigate("/admin");
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="font-poppins flex">
      {/* Part -> Sidebar */}
      <div className={`fixed top-0 left-0 h-screen bg-slate-900 text-white transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"} w-60 md:w-72 z-50 flex flex-col`}>
        <div>
          {/* Header */}
          <p className="font-bold p-3 text-xl md:text-2xl">
            Benerin <span className="text-orange-500">Motor</span>
          </p>

          {/* Author */}
          <div className="bg-slate-800 flex flex-col items-start p-3 space-y-3 text-xs">
            <div className="flex items-start justify-between w-full">
              <div className="flex gap-2 items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-fill-check" viewBox="0 0 16 16">
                  <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m1.679-4.493-1.335 2.226a.75.75 0 0 1-1.174.144l-.774-.773a.5.5 0 0 1 .708-.708l.547.548 1.17-1.951a.5.5 0 1 1 .858.514M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                  <path d="M2 13c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4" />
                </svg>
                <p>{user ? user.name : "Guest Account"}</p>
              </div>
            </div>
            <hr className="border-2 w-full" />
            <DateTime />
          </div>

          {/* Fitur -> Links */}
          <ul className="p-3 space-y-3 text-md">
            {linkSidebar.map((item) => (
              <li key={item.name} className="relative">
                <button
                  onClick={() => (item.children ? toggleDropdown(item.name) : handleLinkClick(item.name))}
                  className={`duration-300 flex gap-2 items-center text-left w-full ${activePage === item.name ? "font-semibold text-orange-500 translate-x-1 underline" : "hover:text-orange-700 hover:translate-x-1"}`}
                >
                  {item.label}
                </button>
                {item.children && openDropdowns[item.name] && (
                  <ul className="ml-4 mt-2 space-y-2">
                    {item.children.map((child) => (
                      <li key={child.name}>
                        <button
                          onClick={() => handleLinkClick(child.name)}
                          className={`duration-300 flex gap-2 items-center text-left w-full ${activePage === child.name ? "font-semibold text-orange-500 translate-x-1 underline" : "hover:text-orange-700 hover:translate-x-1"}`}
                        >
                          {child.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Button -> Logout */}
        <div className="mt-auto p-3">
          <button onClick={handleAuthAction} className="bg-red-500 duration-300 flex gap-2 items-center justify-center px-3 py-1.5 rounded-md w-full hover:bg-red-700 md:px-5 md:py-1.5">
            <>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-left" viewBox="0 0 16 16">
                <path
                  fill-rule="evenodd"
                  d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0z"
                />
                <path fill-rule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708z" />
              </svg>
              Logout
            </>
          </button>
        </div>
      </div>

      {/* Button -> Open & Close Sidebar */}
      <button onClick={toggleSidebar} className={`fixed top-1/2 transform -translate-y-1/2 z-20 text-orange-500 text-opacity-50 transition-all duration-300 hover:text-orange-700 ${isOpen ? "left-60 md:left-72" : "left-3"}`}>
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-arrow-left-square-fill" viewBox="0 0 16 16">
            <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm8.096-10.803L6 9.293V6.525a.5.5 0 0 0-1 0V10.5a.5.5 0 0 0 .5.5h3.975a.5.5 0 0 0 0-1H6.707l4.096-4.096a.5.5 0 1 0-.707-.707" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-arrow-right-square-fill" viewBox="0 0 16 16">
            <path d="M14 16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2zM5.904 5.197 10 9.293V6.525a.5.5 0 0 1 1 0V10.5a.5.5 0 0 1-.5.5H6.525a.5.5 0 0 1 0-1h2.768L5.197 5.904a.5.5 0 0 1 .707-.707" />
          </svg>
        )}
      </button>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${isOpen ? "ml-64 md:ml-72" : "ml-0"} flex-1`}>{children}</div>
    </div>
  );
};

export default Sidebar;
