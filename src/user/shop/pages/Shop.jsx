/* ========== Library ========== */
import React, { useState } from "react";

/* ========== [ Shop ] => Components ========== */
import Sidebar from "../components/generals/Sidebar";
import Home from "../components/homes/Home";
import Product from "../components/products/Product";
import Cart from "../components/carts/Cart";
import SettingAccount from "../components/settings/SettingAccount";

const Shop = () => {
  // State Active => Link Sidebar
  const [activePage, setActivePage] = useState("home");
  const renderPageContent = () => {
    switch (activePage) {
      case "home":
        return <Home />;
      case "product":
        return <Product />;
      case "cart":
        return <Cart />;
      case "setting":
        return <SettingAccount />;
    }
  };

  return (
    <div className="bg-slate-900 flex flex-col md:flex-row">
      <div className="relative z-40">
        <Sidebar onLinkClick={setActivePage} />
      </div>

      {/* Content */}
      <div className="flex-1 bg-gray-100">
        <main>{renderPageContent()}</main>
      </div>
    </div>
  );
};

export default Shop;
