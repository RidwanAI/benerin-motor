import React, { useState } from "react";
import EditProfile from "./EditProfile";
import StatusAccount from "./StatusAccount";
import FAQ from "./FAQ";
import Default from "./Default";
import Language from "./Language";

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

        {/* Button => Dropdown */}
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="duration-300 transition-all hover:text-orange-700 focus:outline-none text-xl font-semibold">
          {isMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrows-angle-expand" viewBox="0 0 16 16">
              <path
                fill-rule="evenodd"
                d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707m4.344-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707"
              />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrows-angle-contract" viewBox="0 0 16 16">
              <path
                fill-rule="evenodd"
                d="M.172 15.828a.5.5 0 0 0 .707 0l4.096-4.096V14.5a.5.5 0 1 0 1 0v-3.975a.5.5 0 0 0-.5-.5H1.5a.5.5 0 0 0 0 1h2.768L.172 15.121a.5.5 0 0 0 0 .707M15.828.172a.5.5 0 0 0-.707 0l-4.096 4.096V1.5a.5.5 0 1 0-1 0v3.975a.5.5 0 0 0 .5.5H14.5a.5.5 0 0 0 0-1h-2.768L15.828.879a.5.5 0 0 0 0-.707"
              />
            </svg>
          )}
        </button>
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
                className={`flex gap-2 items-center ${activeTab === "editProfile" ? "font-semibold text-orange-500 underline" : "duration-300 hover:text-orange-700"}`}
              >
                Edit Profile
              </button>

              {/* Language */}
              <button
                onClick={() => {
                  setActiveTab("language");
                  setIsMenuOpen(false);
                }}
                className={`flex gap-2 items-center ${activeTab === "language" ? "font-semibold text-orange-500 underline" : "duration-300 hover:text-orange-700"}`}
              >
                Language
              </button>

              {/* Status Account */}
              <button
                onClick={() => {
                  setActiveTab("statusAccount");
                  setIsMenuOpen(false);
                }}
                className={`flex gap-2 items-center ${activeTab === "statusAccount" ? "font-semibold text-orange-500 underline" : "duration-300 hover:text-orange-700"}`}
              >
                Status Account
              </button>

              {/* FAQ */}
              <button
                onClick={() => {
                  setActiveTab("FAQ");
                  setIsMenuOpen(false);
                }}
                className={`flex gap-2 items-center ${activeTab === "FAQ" ? "font-semibold text-orange-500 underline" : "duration-300 hover:text-orange-700"}`}
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
