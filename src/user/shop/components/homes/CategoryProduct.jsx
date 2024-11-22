import React, { useState } from "react";

const CategoryProduct = () => {
  const [categoryPage, setCategoryPage] = useState(0);

  // List => Logo Latar Belakang Div
  const categories = [
    { name: "SP Honda", bgImage: "./shop/homes/category-product/honda.svg" },
    { name: "SP Yamaha", bgImage: "./shop/homes/category-product/yamaha.svg" },
    { name: "SP Kawasaki", bgImage: "./shop/homes/category-product/kawasaki.svg" },
    { name: "SP Suzuki", bgImage: "./shop/homes/category-product/suzuki.svg" },
    { name: "SP Vespa", bgImage: "./shop/homes/category-product/vespa.svg" },
    { name: "SP BMW", bgImage: "./shop/homes/category-product/bmw.svg" },
    { name: "SP Harley Davidson", bgImage: "./shop/homes/category-product/harleydavidson.svg" },
  ];
  const itemsPerPage = 4;
  const totalPages = Math.ceil(categories.length / itemsPerPage);
  const currentCategories = categories.slice(categoryPage * itemsPerPage, categoryPage * itemsPerPage + itemsPerPage);

  return (
    <section className="font-poppins p-3 space-y-3">
      <p className="font-semibold text-xl md:text-2xl">Category Product</p>
      <div className="relative space-y-3">
        {/* Items Category */}
        <div className="gap-3 grid grid-cols-2">
          {currentCategories.map((category, index) => (
            <div
              key={index}
              className="cursor-pointer duration-300 rounded-md shadow-md p-4 text-center text-white hover:bg-orange-700 md:p-6 flex flex-col items-center justify-center"
              style={{
                backgroundImage: `url(${category.bgImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                color: "white",
              }}
            >
              <div className="bg-black bg-opacity-50 p-2 rounded-md">
                <p className="font-semibold">{category.name}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-3">
          {categoryPage > 0 && (
            <button onClick={() => setCategoryPage((prev) => prev - 1)} className="absolute duration-300 left-0 rounded-full text-slate-900 top-1/2 transform -translate-y-1/2 hover:text-slate-700">
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16">
                <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z" />
              </svg>
            </button>
          )}
          {categoryPage < totalPages - 1 && (
            <button onClick={() => setCategoryPage((prev) => prev + 1)} className="absolute duration-300 right-0 rounded-full text-slate-900 top-1/2 transform -translate-y-1/2 hover:text-slate-700">
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-arrow-right-circle-fill" viewBox="0 0 16 16">
                <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default CategoryProduct;
