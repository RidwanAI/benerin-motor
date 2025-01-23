import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../../../../services/authService";

const UserSettings = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "Guest Account",
    email: "",
    currentPassword: "",
    newPassword: "",
    deleteConfirmation: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await authService.getCurrentUser();
        if (userData) {
          setFormData((prevState) => ({
            ...prevState,
            name: userData.name,
            email: userData.email,
          }));
          setIsLoggedIn(true);
        }
        setLoading(false);
      } catch (error) {
        setError("You're not login");
        setIsLoggedIn(false);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    try {
      const updateData = {
        name: formData.name,
        email: formData.email,
      };

      if (formData.currentPassword && formData.newPassword) {
        updateData.currentPassword = formData.currentPassword;
        updateData.newPassword = formData.newPassword;
      }

      const response = await authService.updateUser(updateData);
      setSuccessMessage(response.msg || "Profile updated successfully");

      setFormData((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
      }));
    } catch (error) {
      setError(error.msg || "Failed to update profile");
    }
  };

  const handleDeleteAccount = async () => {
    if (formData.deleteConfirmation !== formData.email) {
      setError("Please type your email address exactly to confirm deletion");
      return;
    }

    try {
      await authService.deleteAccount({
        confirmationEmail: formData.deleteConfirmation,
      });
      await authService.logout();
      navigate("/login");
    } catch (error) {
      setError(error.msg || "Failed to delete account");
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      <div className="flex-1">
        <main className="bg-slate-100 p-3 space-y-3">
          {/* Status Account Section */}
          <section className="font-poppins space-y-3">
            <div className="bg-white p-3 rounded-sm shadow-sm space-y-1">
              <p className="font-semibold text-xl">
                Welcome,{" "}
                <span className="text-orange-500">{formData.name}!</span>
              </p>
              <div className="flex gap-2 items-center text-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-bell-fill text-green-500"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2m.995-14.901a1 1 0 1 0-1.99 0A5 5 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901" />
                </svg>
                <p className="text-slate-500">
                  {isLoggedIn
                    ? "Your account is currently active."
                    : "Now you are in guest account mode, login with user account to edit"}
                </p>
              </div>
            </div>
          </section>

          {/* Rest of the component remains the same */}
          {/* Edit Profile Section */}
          <section className="bg-white font-poppins p-3 rounded-sm shadow-sm space-y-3">
            <p className="font-semibold text-xl">Edit Profile</p>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {successMessage && (
              <p className="text-green-500 text-sm">{successMessage}</p>
            )}

            <form onSubmit={handleSaveChanges} className="space-y-3 text-sm">
              {/* Name */}
              <div className="space-y-2">
                <label htmlFor="name" className="block text-md">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="border p-2 rounded-sm w-full"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label htmlFor="email" className="block text-md">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="border p-2 rounded-sm w-full"
                />
              </div>

              <div className="flex flex-col items-center gap-2 md:flex-row">
                {/* Current Password */}
                <div className="space-y-2 w-full">
                  <label htmlFor="currentPassword" className="block text-md">
                    Current Password
                  </label>
                  <input
                    type="password"
                    id="currentPassword"
                    value={formData.currentPassword}
                    onChange={handleInputChange}
                    className="border p-2 rounded-sm w-full"
                  />
                </div>

                {/* New Password */}
                <div className="space-y-2 w-full">
                  <label htmlFor="newPassword" className="block text-md">
                    New Password
                  </label>
                  <input
                    type="password"
                    id="newPassword"
                    value={formData.newPassword}
                    onChange={handleInputChange}
                    className="border p-2 rounded-sm w-full"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end space-x-2 text-center">
                <button
                  type="button"
                  onClick={() => navigate("/dashboard")}
                  className="bg-slate-300 duration-300 px-3 py-1.5 rounded-md hover:bg-slate-500 md:px-5 md:py-1.5"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-orange-500 duration-300 px-3 py-1.5 rounded-md text-white hover:bg-orange-700 md:px-5 md:py-1.5"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </section>

          {/* Delete Account Section */}
          <section className="font-poppins space-y-3">
            <div className="bg-white p-3 rounded-sm shadow-sm space-y-3">
              <div className="flex flex-col items-start space-y-1">
                <p className="font-semibold text-xl">Delete Account</p>
                <p className="text-slate-500 text-sm">
                  Are you sure you want to delete your account? This action
                  cannot be undone. Once deleted, all your data will be
                  permanently removed.
                </p>
              </div>

              <div className="flex flex-col items-start justify-start space-y-3">
                <div className="space-y-2 text-slate-500 text-sm w-full">
                  <label htmlFor="deleteConfirmation" className="block">
                    Please type your email address{" "}
                    <span className="font-semibold italic">
                      "{formData.email}"
                    </span>{" "}
                    to confirm account deletion
                  </label>
                  <input
                    type="text"
                    id="deleteConfirmation"
                    value={formData.deleteConfirmation}
                    onChange={handleInputChange}
                    className="border p-2 rounded-sm w-full"
                    placeholder="Type your email to confirm"
                  />
                </div>

                <div className="flex gap-2 items-center text-sm text-red-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-exclamation-triangle"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 0a8 8 0 1 0 8 8A8 8 0 0 0 8 0Zm0 14a6 6 0 1 1 0-12 6 6 0 0 1 0 12Z" />
                    <path d="M7.002 5.002a.5.5 0 0 1 .996 0l.003 4a.5.5 0 0 1-.993 0L7.002 5.002ZM7 9a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5V9Z" />
                  </svg>
                  <p>This action is permanent and cannot be undone.</p>
                </div>
              </div>

              <div className="flex items-center justify-end space-x-2">
                <button
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, deleteConfirmation: "" }))
                  }
                  className="bg-slate-300 duration-300 px-3 py-1.5 rounded-md hover:bg-slate-500 md:px-5 md:py-1.5"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteAccount}
                  className="bg-red-500 duration-300 px-3 py-1.5 rounded-md text-white hover:bg-red-700 md:px-5 md:py-1.5"
                >
                  Confirm
                </button>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default UserSettings;
