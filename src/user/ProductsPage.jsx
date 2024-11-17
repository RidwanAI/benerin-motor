import React, { useState } from "react";
import Products from "./usercomponents/products/Products";
import Sidebar from "./usercomponents/generals/Sidebar";
import SettingAccount from "./usercomponents/settings/SettingAccount";
import Order from "./usercomponents/orders/Order";
import Landing from "./usercomponents/homes/Landing";

const ProductsPage = () => {
  // State untuk melacak halaman aktif
  const [activePage, setActivePage] = useState("home"); // default ke home

  // Fungsi untuk merender komponen berdasarkan state activePage
  const renderPageContent = () => {
    switch (activePage) {
      case "home":
        return <Landing />;
      case "products":
        return <Products />;
      case "orders":
        return <Order />;
      case "settings":
        return <SettingAccount />;
      default:
        return <h1>Page not found</h1>;
    }
  };

  return (
    <div className="bg-slate-900 flex flex-col md:flex-row">
      <div className="relative z-40">
        <Sidebar onLinkClick={setActivePage} />
      </div>

      {/* Main content */}
      <div className="flex-1 bg-gray-100">
        <main>{renderPageContent()}</main>
      </div>
    </div>
  );
};

export default ProductsPage;
