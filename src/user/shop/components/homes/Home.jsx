import React, { useState } from "react";
import Carousel from "./Carousel";
import Cart from "../carts/Cart";
import CategoryProduct from "./CategoryProduct";
import NewProduct from "./NewProduct";
import RecommendedProduct from "./RecommendedProduct";
import Notification from "./Notification";
import Footer from "../generals/Footer";

const Home = () => {
  const [activePage, setActivePage] = useState("home");

  const handleCartClick = () => {
    setActivePage("cart");
  };

  const renderPageContent = () => {
    if (activePage === "home") {
      return (
        <div className="bg-white">
          {/* Header */}
          <header className="bg-orange-500 flex gap-2 items-center justify-center p-3 shadow-sm sticky top-0 z-10">
            <input type="text" placeholder="Search products" className="border rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-orange-500" />
            <button onClick={handleCartClick}>
              {/* Cart Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-cart3 text-white" viewBox="0 0 16 16">
                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l.84 4.479 9.144-.459L13.89 4zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
              </svg>
            </button>
          </header>

          {/* Carousel */}
          <Carousel />

          {/* Categories */}
          <CategoryProduct />

          {/* New Product */}
          <NewProduct />

          {/* Recommended Product */}
          <RecommendedProduct />

          {/* Notification */}
          <Notification />

          {/* Footer */}
          <Footer />
        </div>
      );
    } else if (activePage === "cart") {
      return <Cart />;
    }
  };

  return <div className="font-poppins">{renderPageContent()}</div>;
};

export default Home;
