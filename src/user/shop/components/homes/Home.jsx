import React, { useState } from "react";
import Carousel from "./Carousel";
import NewProduct from "./NewProduct";
import RecommendedProduct from "./RecommendedProduct";
import Cart from "../carts/Cart";

const Home = () => {
  // State untuk mengontrol halaman keranjang
  const [activePage, setActivePage] = useState("home");

  // Handle klik pada tombol cart
  const handleCartClick = () => {
    setActivePage("cart");
  };

  // Render halaman yang sesuai berdasarkan kondisi state
  const renderPageContent = () => {
    if (activePage === "home") {
      return (
        <div>
          <header className="bg-slate-200 p-3 flex gap-2 items-center justify-center shadow-sm sticky top-0">
            <input type="text" placeholder="Search products..." className="border rounded-sm p-2 w-full focus:outline-none focus:ring-2 focus:ring-orange-500" />
            <button onClick={handleCartClick}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart3" viewBox="0 0 16 16">
                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l.84 4.479 9.144-.459L13.89 4zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
              </svg>
            </button>
          </header>

          <Carousel />

          {/* New Products */}
          <NewProduct />

          {/* Recommended Products */}
          <RecommendedProduct />
        </div>
      );
    } else if (activePage === "cart") {
      return <Cart />;
    }
  };

  return <div className="bg-slate-200 font-poppins">{renderPageContent()}</div>;
};

export default Home;
