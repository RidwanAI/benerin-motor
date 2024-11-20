import React, { useState } from "react";

// Component Settings
import EditProfile from "./EditProfile";
import StatusAccount from "./StatusAccount";
import FAQ from "./FAQ";
import DeleteAccount from "./DeleteAccount";
import Default from "./Default";
import Language from "./Language";

const Setting = () => {
  // Dropdown
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Render Page => Content
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
      case "deleteAccount":
        return <DeleteAccount />;
      case "default":
        return <Default />;
    }
  };

  return (
    <div className="flex flex-col font-poppins min-h-screen">
      {/* Header */}
      <header className="bg-slate-100 flex items-center justify-between p-3 shadow-sm sticky top-0">
        <h1 className="font-semibold text-xl md:text-2xl">Settings</h1>
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="duration-300 transition-all hover:text-orange-700 md:hidden focus:outline-none">
          {isMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-arrows-fullscreen" viewBox="0 0 16 16">
              <path
                fill-rule="evenodd"
                d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707m4.344 0a.5.5 0 0 1 .707 0l4.096 4.096V11.5a.5.5 0 1 1 1 0v3.975a.5.5 0 0 1-.5.5H11.5a.5.5 0 0 1 0-1h2.768l-4.096-4.096a.5.5 0 0 1 0-.707m0-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707m-4.344 0a.5.5 0 0 1-.707 0L1.025 1.732V4.5a.5.5 0 0 1-1 0V.525a.5.5 0 0 1 .5-.5H4.5a.5.5 0 0 1 0 1H1.732l4.096 4.096a.5.5 0 0 1 0 .707"
              />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-arrows-move" viewBox="0 0 16 16">
              <path
                fill-rule="evenodd"
                d="M7.646.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 1.707V5.5a.5.5 0 0 1-1 0V1.707L6.354 2.854a.5.5 0 1 1-.708-.708zM8 10a.5.5 0 0 1 .5.5v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 0 1 .708-.708L7.5 14.293V10.5A.5.5 0 0 1 8 10M.146 8.354a.5.5 0 0 1 0-.708l2-2a.5.5 0 1 1 .708.708L1.707 7.5H5.5a.5.5 0 0 1 0 1H1.707l1.147 1.146a.5.5 0 0 1-.708.708zM10 8a.5.5 0 0 1 .5-.5h3.793l-1.147-1.146a.5.5 0 0 1 .708-.708l2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L14.293 8.5H10.5A.5.5 0 0 1 10 8"
              />
            </svg>
          )}
        </button>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 flex-col md:flex-row">
        {/* Links */}
        <aside className={`bg-slate-200 w-auto md:w-52 md:bg-slate-100 md:min-h-full md:block ${isMenuOpen ? "block" : "hidden"}`}>
          <nav className="text-md p-3 space-y-3">
            {/* Edit Profile */}
            <button
              onClick={() => {
                setActiveTab("editProfile");
                setIsMenuOpen(false);
              }}
              className={`flex gap-2 items-center ${activeTab === "editProfile" ? "text-orange-700" : "duration-300 hover:text-orange-700"}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
              </svg>
              Edit Profile
            </button>

            {/* Language */}
            <button
              onClick={() => {
                setActiveTab("language");
                setIsMenuOpen(false);
              }}
              className={`flex gap-2 items-center ${activeTab === "language" ? "text-orange-700" : "duration-300 hover:text-orange-700"}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-translate" viewBox="0 0 16 16">
                <path d="M4.545 6.714 4.11 8H3l1.862-5h1.284L8 8H6.833l-.435-1.286zm1.634-.736L5.5 3.956h-.049l-.679 2.022z" />
                <path d="M0 2a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v3h3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-3H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zm7.138 9.995q.289.451.63.846c-.748.575-1.673 1.001-2.768 1.292.178.217.451.635.555.867 1.125-.359 2.08-.844 2.886-1.494.777.665 1.739 1.165 2.93 1.472.133-.254.414-.673.629-.89-1.125-.253-2.057-.694-2.82-1.284.681-.747 1.222-1.651 1.621-2.757H14V8h-3v1.047h.765c-.318.844-.74 1.546-1.272 2.13a6 6 0 0 1-.415-.492 2 2 0 0 1-.94.31" />
              </svg>
              Language
            </button>

            {/* Status Account */}
            <button
              onClick={() => {
                setActiveTab("statusAccount");
                setIsMenuOpen(false);
              }}
              className={`flex gap-2 items-center ${activeTab === "statusAccount" ? "text-orange-700" : "duration-300 hover:text-orange-700"}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
              </svg>
              Status Account
            </button>

            {/* FAQ */}
            <button
              onClick={() => {
                setActiveTab("FAQ");
                setIsMenuOpen(false);
              }}
              className={`flex gap-2 items-center ${activeTab === "FAQ" ? "text-orange-700" : "duration-300 hover:text-orange-700"}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
              </svg>
              FAQ
            </button>

            {/* Delete Account */}
            <button
              onClick={() => {
                setActiveTab("deleteAccount");
                setIsMenuOpen(false);
              }}
              className={`flex gap-2 items-center ${activeTab === "deleteAccount" ? "text-orange-700" : "duration-300 hover:text-orange-700"}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-x-fill" viewBox="0 0 16 16">
                <path
                  fill-rule="evenodd"
                  d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m6.146-2.854a.5.5 0 0 1 .708 0L14 6.293l1.146-1.147a.5.5 0 0 1 .708.708L14.707 7l1.147 1.146a.5.5 0 0 1-.708.708L14 7.707l-1.146 1.147a.5.5 0 0 1-.708-.708L13.293 7l-1.147-1.146a.5.5 0 0 1 0-.708"
                />
              </svg>
              Delete Account
            </button>
          </nav>
        </aside>

        {/* Content */}
        <main className="bg-slate-100 flex-1 p-3">{renderContent()}</main>
      </div>
    </div>
  );
};

export default Setting;
