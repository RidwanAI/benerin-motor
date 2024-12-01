import React, { useState } from "react";
import { Link } from "react-router-dom";
import DateTime from "./DateTime";
import Modal from "./Modal";

const Sidebar = ({ onLinkClick, activePage, children }) => {
  // List => Link Sidebar
  const linkSidebar = [
    { name: "home", label: "Home" },
    { name: "products", label: "Products" },
    { name: "carts", label: "Carts" },
    { name: "orders", label: "Orders" },
    { name: "settings", label: "Settings" },
  ];

  // Function => Open & Close Sidebar
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Function => Render Page (Content)
  const handleLinkClick = (page) => {
    setIsOpen(false);
    onLinkClick(page);
  };

  // Function => Pop Up Edit Profile & Logout
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState(null);
  const [profileData, setProfileData] = useState({
    name: "Achmad Rizky",
    email: "achmadrizky@gmail.com",
  });

  const handleEditProfile = () => {
    setIsModalOpen(true);
    setModalAction("editProfile");
  };

  const handleInputChange = (field, value) => {
    setProfileData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleLogout = () => {
    setIsModalOpen(true);
    setModalAction("logout");
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalAction(null);
  };

  const confirmAction = () => {
    if (modalAction === "logout") {
      console.log("Logging out...");
    } else if (modalAction === "editProfile") {
      console.log("Profile updated:", profileData);
    }
    closeModal();
  };

  return (
    <div className="font-poppins flex">
      {/* Part => Sidebar */}
      <div className={`fixed top-0 left-0 h-screen bg-slate-900 text-white transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"} w-60 md:w-72 z-50 flex flex-col`}>
        <div>
          {/* Item => Header */}
          <p className="font-bold p-3 text-xl md:text-2xl">
            Benerin <span className="text-orange-500">Motor</span>
          </p>

          {/* Item => Author */}
          <div className="bg-slate-800 flex flex-col items-start p-3 space-y-3 text-xs">
            <div className="flex items-start justify-between w-full">
              <div className="flex gap-2 items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-fill-check" viewBox="0 0 16 16">
                  <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m1.679-4.493-1.335 2.226a.75.75 0 0 1-1.174.144l-.774-.773a.5.5 0 0 1 .708-.708l.547.548 1.17-1.951a.5.5 0 1 1 .858.514M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                  <path d="M2 13c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4" />
                </svg>
                <p>Achmad Rizky</p>
              </div>
              <Link onClick={handleEditProfile} className="duration-300 hover:text-orange-700">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                  <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                </svg>
              </Link>
            </div>
            <hr className="border-2 w-full" />
            <DateTime />
          </div>

          {/* Item => Links */}
          <ul className="p-3 space-y-3 text-md">
            {linkSidebar.map((item) => (
              <button
                key={item.name}
                onClick={() => handleLinkClick(item.name)}
                className={`duration-300 flex gap-2 items-center text-left w-full ${activePage === item.name ? "font-semibold text-orange-500 translate-x-1 underline" : "hover:text-orange-700 hover:translate-x-1"}`}
              >
                {item.icon}
                {activePage === item.name && <span className="absolute inset-y-0 left-0 w-1 "></span>}
                {item.label}
              </button>
            ))}
          </ul>
        </div>

        {/* Item => Button Logout */}
        <div className="mt-auto p-3">
          <button onClick={handleLogout} className="bg-red-500 duration-300 flex gap-2 items-center justify-center px-3 py-1.5 rounded-md w-full hover:bg-red-700 md:px-5 md:py-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-right" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M10.828 8l-3.182 3.182a.5.5 0 0 1-.708-.708L9.293 8.5H1.5a.5.5 0 0 1 0-1h7.793L6.938 5.526a.5.5 0 0 1 .707-.708L10.828 8zm3.643-.5a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1 0-1h7a.5.5 0 0 1 .5.5z" />
              <path fillRule="evenodd" d="M15 1.5a.5.5 0 0 1-.5.5H9.707l-1.1 1.1a.5.5 0 0 1-.707-.707l1.5-1.5A.5.5 0 0 1 10.5 1h4A1.5 1.5 0 0 1 16 2.5v11A1.5 1.5 0 0 1 14.5 15h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-11a.5.5 0 0 0-.5-.5z" />
            </svg>
            Logout
          </button>
        </div>
      </div>

      {/* Part => Button Open & Close Sidebar */}
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

      {/* Part => Content */}
      <div className={`transition-all duration-300 ${isOpen ? "ml-64 md:ml-72" : "ml-0"} flex-1`}>
        {/* Body of Content */}
        {children}

        {/* Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          onConfirm={confirmAction}
          title={modalAction === "logout" ? "Logout" : "Edit Profile"}
          message={modalAction === "logout" ? "Are you sure you want to log out?" : "Are you sure you want to edit your profile?"}
          isEditProfile={modalAction === "editProfile"}
          initialData={profileData}
          onInputChange={handleInputChange}
        />
      </div>
    </div>
  );
};

export default Sidebar;
