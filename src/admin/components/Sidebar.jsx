import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DateTime from "../../user/shop/components/generals/DateTime";
import adminService from "../../services/adminService";

const Sidebar = ({ onLinkClick, activePage, children }) => {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState({});
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Fetch admin data on component mount
  useEffect(() => {
    const fetchAdminData = async () => {
      const token = localStorage.getItem("adminAccessToken");
      if (token) {
        try {
          const adminData = await adminService.getCurrentAdmin();
          setAdmin(adminData);
        } catch (error) {
          console.error("Error fetching admin:", error);
          localStorage.removeItem("adminAccessToken");
          setAdmin(null);
          navigate("/login");
        }
      }
      setIsLoading(false);
    };

    fetchAdminData();
  }, [navigate]);

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

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = (page) => {
    setIsOpen(false);
    onLinkClick(page);
  };

  const toggleDropdown = (name) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const handleAuthAction = () => {
    if (admin) {
      setShowLogoutModal(true);
    } else {
      navigate("/login");
    }
  };

  const handleLogout = async () => {
    try {
      await adminService.adminLogout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="font-poppins flex">
        <div
          className={`fixed top-0 left-0 h-screen bg-slate-900 text-white transform transition-transform duration-300 ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } w-60 md:w-72 z-50 flex flex-col`}
        >
          <div>
            <p className="font-bold p-3 text-xl md:text-2xl">
              Benerin <span className="text-orange-500">Motor</span>
            </p>

            <div className="bg-slate-800 flex flex-col items-start p-3 space-y-3 text-xs">
              <div className="flex items-start justify-between w-full">
                <div className="flex gap-2 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-person-fill-check"
                    viewBox="0 0 16 16"
                  >
                    <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m1.679-4.493-1.335 2.226a.75.75 0 0 1-1.174.144l-.774-.773a.5.5 0 0 1 .708-.708l.547.548 1.17-1.951a.5.5 0 1 1 .858.514M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                    <path d="M2 13c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4" />
                  </svg>
                  <p>{admin ? admin.name : "Guest Account"}</p>
                </div>
              </div>
              <hr className="border-2 w-full" />
              <DateTime />
            </div>

            <ul className="p-3 space-y-3 text-md">
              {linkSidebar.map((item) => (
                <li key={item.name} className="relative">
                  <button
                    onClick={() =>
                      item.children
                        ? toggleDropdown(item.name)
                        : handleLinkClick(item.name)
                    }
                    className={`duration-300 flex gap-2 items-center text-left w-full ${
                      activePage === item.name
                        ? "font-semibold text-orange-500 translate-x-1 underline"
                        : "hover:text-orange-700 hover:translate-x-1"
                    }`}
                  >
                    {item.label}
                  </button>
                  {item.children && openDropdowns[item.name] && (
                    <ul className="ml-4 mt-2 space-y-2">
                      {item.children.map((child) => (
                        <li key={child.name}>
                          <button
                            onClick={() => handleLinkClick(child.name)}
                            className={`duration-300 flex gap-2 items-center text-left w-full ${
                              activePage === child.name
                                ? "font-semibold text-orange-500 translate-x-1 underline"
                                : "hover:text-orange-700 hover:translate-x-1"
                            }`}
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

          <div className="mt-auto p-3">
            <button
              onClick={handleAuthAction}
              className={`duration-300 flex gap-2 items-center justify-center px-3 py-1.5 rounded-md w-full md:px-5 md:py-1.5 ${
                admin
                  ? "bg-red-500 hover:bg-red-700"
                  : "bg-green-500 hover:bg-green-700"
              }`}
            >
              {admin ? (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-box-arrow-left"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0z"
                    />
                    <path
                      fillRule="evenodd"
                      d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708z"
                    />
                  </svg>
                  Logout
                </>
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-box-arrow-right"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"
                    />
                    <path
                      fillRule="evenodd"
                      d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"
                    />
                  </svg>
                  Login
                </>
              )}
            </button>
          </div>
        </div>

        <button
          onClick={toggleSidebar}
          className={`fixed top-1/2 transform -translate-y-1/2 z-20 text-orange-500 text-opacity-50 transition-all duration-300 hover:text-orange-700 ${
            isOpen ? "left-60 md:left-72" : "left-3"
          }`}
        >
          {isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="35"
              height="35"
              fill="currentColor"
              className="bi bi-arrow-left-square-fill"
              viewBox="0 0 16 16"
            >
              <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm8.096-10.803L6 9.293V6.525a.5.5 0 0 0-1 0V10.5a.5.5 0 0 0 .5.5h3.975a.5.5 0 0 0 0-1H6.707l4.096-4.096a.5.5 0 1 0-.707-.707" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="35"
              height="35"
              fill="currentColor"
              className="bi bi-arrow-right-square-fill"
              viewBox="0 0 16 16"
            >
              <path d="M14 16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2zM5.904 5.197 10 9.293V6.525a.5.5 0 0 1 1 0V10.5a.5.5 0 0 1-.5.5H6.525a.5.5 0 0 1 0-1h2.768L5.197 5.904a.5.5 0 0 1 .707-.707" />
            </svg>
          )}
        </button>

        <div
          className={`transition-all duration-300 ${
            isOpen ? "ml-64 md:ml-72" : "ml-0"
          } flex-1`}
        >
          {children}
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full mx-4">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Confirm Logout
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to logout?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
