import React, { useState } from "react";
import Carousel from "./Carousel";
import NewProduct from "./NewProduct";
import RecommendedProduct from "./RecommendedProduct";
import Notification from "./Notification";
import Footer from "../generals/Footer";

const Home = () => {
  return (
    <div className="bg-white">
      {/* Carousel */}
      <Carousel />

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
};

export default Home;
