import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import AdminOverview from "../components/AdminOverview";
import AdminProducts from "../components/AdminProducts";
import AdminCustomers from "../components/AdminCustomers";
import AdminOrders from "../components/AdminOrders";
import AdminSettings from "../components/AdminSettings";

const AdminDashboard = () => {
  // Function -> Link Sidebar
  const [activePage, setActivePage] = useState("adminOverview");
  const renderPageContent = () => {
    switch (activePage) {
      case "adminOverview":
        return <AdminOverview />;
      case "adminProducts":
        return <AdminProducts />;
      case "adminCustomers":
        return <AdminCustomers />;
      case "adminOrders":
        return <AdminOrders />;
      case "adminSettings":
        return <AdminSettings />;
    }
  };

  return (
    <div className="bg-slate-100 flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="relative z-40">
        <Sidebar onLinkClick={setActivePage} activePage={activePage} />
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-slate-100">
        <main>{renderPageContent()}</main>
      </div>
    </div>
  );
};

export default AdminDashboard;
