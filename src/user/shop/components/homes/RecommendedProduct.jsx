import React, { useState } from "react";
import { Link } from "react-router-dom";

const RecommendedProduct = () => {
  // List => Recommended Product
  const listRecommendedProduct = [
    {
      id: 1,
      name: "Shockbreaker DBS Aerox Old",
      image: "./product/new/shockdbs-aerox.png",
      price: "Rp.1.100.000",
      specs: "Enhanced durability for smoother rides",
    },
    {
      id: 2,
      name: "Kampas Ganda Aerox",
      image: "./product/new/kampasganda-aerox.png",
      price: "Rp.250.000",
      specs: "Efficient and long-lasting clutch pads",
    },
    {
      id: 3,
      name: "Kampas Ganda Aerox",
      image: "./product/new/kampasganda-aerox.png",
      price: "Rp.250.000",
      specs: "Efficient and long-lasting clutch pads",
    },
    {
      id: 4,
      name: "Kampas Ganda Aerox",
      image: "./product/new/kampasganda-aerox.png",
      price: "Rp.250.000",
      specs: "Efficient and long-lasting clutch pads",
    },
    {
      id: 5,
      name: "Kampas Ganda Aerox",
      image: "./product/new/kampasganda-aerox.png",
      price: "Rp.250.000",
      specs: "Efficient and long-lasting clutch pads",
    },
    {
      id: 6,
      name: "Kampas Ganda Aerox",
      image: "./product/new/kampasganda-aerox.png",
      price: "Rp.250.000",
      specs: "Efficient and long-lasting clutch pads",
    },
  ];

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(listRecommendedProduct.length / itemsPerPage);
  const currentItems = listRecommendedProduct.slice(currentPage * itemsPerPage, currentPage * itemsPerPage + itemsPerPage);

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  return (
    <section className="font-poppins p-3 space-y-3">
      <h2 className="font-semibold text-xl md:text-2xl">Recommended Products</h2>
      <div className="relative">
        {/* Content */}
        <div className="gap-3 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
          {currentItems.map((product) => (
            <div key={product.id} className="bg-white shadow-sm rounded-md overflow-hidden flex flex-col justify-between">
              <Link className="duration-300 hover:p-3">
                <img src={product.image} alt={product.name} className="w-full h-32 object-cover" />
                <div className="p-3 flex-grow">
                  <p className="font-semibold text-sm">{product.name}</p>
                  <p className="text-slate-500 text-xs">{product.specs}</p>
                </div>
                <div className="p-3">
                  <p className="font-semibold text-orange-500">{product.price}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Button => Paggination */}
        {currentPage > 0 && (
          <button onClick={handlePrev} className="absolute duration-300 left-0 rounded-full text-slate-900 top-1/2 transform -translate-y-1/2 hover:text-slate-700">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16">
              <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z" />
            </svg>
          </button>
        )}
        {currentPage < totalPages - 1 && (
          <button onClick={handleNext} className="absolute duration-300 right-0 rounded-full text-slate-900 top-1/2 transform -translate-y-1/2 hover:text-slate-700">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-arrow-right-circle-fill" viewBox="0 0 16 16">
              <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z" />
            </svg>
          </button>
        )}
      </div>
    </section>
  );
};

export default RecommendedProduct;
