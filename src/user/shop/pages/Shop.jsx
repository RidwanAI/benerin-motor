import React, { useState } from "react";

import Sidebar from "../components/generals/Sidebar";
import Home from "../components/homes/Home";
import Products from "../components/products/Products";
import Carts from "../components/carts/Carts";
import Settings from "../components/settings/Settings";
import Orders from "../components/orders/Orders";

const Shop = () => {
  // State Active => Link Sidebar
  const [activePage, setActivePage] = useState("home");
  const renderPageContent = () => {
    switch (activePage) {
      case "home":
        return <Home />;
      case "products":
        return <Products />;
      case "carts":
        return <Carts />;
      case "orders":
        return <Orders />;
      case "settings":
        return <Settings />;
    }
  };

  return (
    <div className="bg-slate-900 flex flex-col md:flex-row">
      <div className="relative z-40">
        <Sidebar onLinkClick={setActivePage} activePage={activePage} />
      </div>

      {/* Content */}
      <div className="flex-1 bg-gray-100">
        <main>{renderPageContent()}</main>
      </div>
    </div>
  );
};

export default Shop;
