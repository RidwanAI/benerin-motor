import React from "react";
import Sidebar from "../components/sidebar";
import Header from "../components/header";

const Settings = () => (
  <div className="flex h-screen">
    <Sidebar />
    <div className="flex-1 bg-gray-100">
      <Header />
      <main className="p-4">
        <h2 className="text-2xl font-bold">Settings</h2>
        <p className="mt-4">Settings page content goes here.</p>
      </main>
    </div>
  </div>
);

export default Settings;
