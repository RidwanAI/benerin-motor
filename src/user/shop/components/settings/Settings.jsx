import React, { useState } from "react";
import Default from "./Default";

const Setting = () => {
  // Function => Links
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function => Render Page Content
  const [activeTab, setActiveTab] = useState("default");
  const renderContent = () => {
    switch (activeTab) {
      case "editProfile":
        return <EditProfile />;
      case "language":
        return <Language />;
      case "statusAccount":
        return <StatusAccount />;
      case "FAQ":
        return <FAQ />;
      default:
        return <Default />;
    }
  };

  return (
    <div className="flex flex-col font-poppins min-h-screen">
      {/* Part => Header */}
      <header className="bg-slate-100 flex items-center justify-between p-3 shadow-sm sticky top-0 z-10">
        <p className="font-semibold text-xl md:text-2xl">
          <button
            onClick={() => {
              setActiveTab("default");
              setIsMenuOpen(false);
            }}
          >
            Settings
          </button>
        </p>
      </header>

      {/* Part => Navbar */}
      <div className="flex flex-1 flex-col">
        {isMenuOpen && (
          <aside className="bg-slate-100 p-3 rounded-sm shadow-sm sticky top-0 z-10">
            <nav className="bg-slate-900 bg-opacity-75 p-3 rounded-sm space-y-3 text-md text-white">
              {/* Edit Profile */}
              <button
                onClick={() => {
                  setActiveTab("editProfile");
                  setIsMenuOpen(false);
                }}
                className={`flex gap-2 items-center ${
                  activeTab === "editProfile"
                    ? "font-semibold text-orange-500 underline"
                    : "duration-300 hover:text-orange-700"
                }`}
              >
                Edit Profile
              </button>

              {/* Language */}
              <button
                onClick={() => {
                  setActiveTab("language");
                  setIsMenuOpen(false);
                }}
                className={`flex gap-2 items-center ${
                  activeTab === "language"
                    ? "font-semibold text-orange-500 underline"
                    : "duration-300 hover:text-orange-700"
                }`}
              >
                Language
              </button>

              {/* Status Account */}
              <button
                onClick={() => {
                  setActiveTab("statusAccount");
                  setIsMenuOpen(false);
                }}
                className={`flex gap-2 items-center ${
                  activeTab === "statusAccount"
                    ? "font-semibold text-orange-500 underline"
                    : "duration-300 hover:text-orange-700"
                }`}
              >
                Status Account
              </button>

              {/* FAQ */}
              <button
                onClick={() => {
                  setActiveTab("FAQ");
                  setIsMenuOpen(false);
                }}
                className={`flex gap-2 items-center ${
                  activeTab === "FAQ"
                    ? "font-semibold text-orange-500 underline"
                    : "duration-300 hover:text-orange-700"
                }`}
              >
                FAQ
              </button>
            </nav>
          </aside>
        )}

        {/* Part => Rendered Content */}
        <main className="bg-slate-100 flex-1 p-3">{renderContent()}</main>
      </div>
    </div>
  );
};

export default Setting;
