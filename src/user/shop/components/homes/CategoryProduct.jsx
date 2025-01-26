/* Category Product => Done */

import React, { useState } from "react";

const CategoryProduct = () => {
  const [categoryPage, setCategoryPage] = useState(0);
  const categories = [
    { name: "Honda", bgImage: "./shop/homes/category-product/honda.svg" },
    { name: "Yamaha", bgImage: "./shop/homes/category-product/yamaha.svg" },
    { name: "Kawasaki", bgImage: "./shop/homes/category-product/kawasaki.svg" },
    { name: "Suzuki", bgImage: "./shop/homes/category-product/suzuki.svg" },
    { name: "Vespa", bgImage: "./shop/homes/category-product/vespa.svg" },
    { name: "BMW", bgImage: "./shop/homes/category-product/bmw.svg" },
    {
      name: "Harley Davidson",
      bgImage: "./shop/homes/category-product/harleydavidson.svg",
    },
  ];

  const itemsPerPage = 6;
  const totalPages = Math.ceil(categories.length / itemsPerPage);
  const currentCategories = categories.slice(
    categoryPage * itemsPerPage,
    categoryPage * itemsPerPage + itemsPerPage
  );

  return (
    <section className="bg-orange-100 font-poppins p-3 space-y-3">
      {/* Header */}
      <p className="font-bold text-md md:text-xl text-orange-900">CATEGORY</p>

      {/* List Category */}
      <div className="relative">
        {/* Item Category */}
        <div className="gap-3 grid grid-cols-3 md:grid-cols-6">
          {currentCategories.map((category, index) => (
            <div
              key={index}
              className="bg-gradient-to-tr from-orange-200 to-orange-400 cursor-pointer duration-300 flex flex-col gap-3 group items-center justify-center p-3 relative rounded-md shadow-md text-center text-sm transform hover:-translate-y-1"
            >
              {/* Decoration */}
              <div className="absolute bg-white duration-300 h-16 left-0 opacity-20 rounded-full top-0 transition w-16 group-hover:opacity-40 transform group-hover:scale-125"></div>
              <div className="absolute bg-white bottom-0 duration-300 h-12 opacity-10 right-0 rounded-full transition w-12 group-hover:opacity-30 transform group-hover:scale-110"></div>

              {/* Image */}
              <div className="h-16 bg-white flex items-center justify-center overflow-hidden relative rounded-full shadow-sm w-16">
                <img
                  src={category.bgImage}
                  alt={category.bgImage}
                  className="w-20 h-20 transform group-hover:scale-110 transition duration-300"
                />
              </div>

              {/* Nama Kategori */}
              <p className="italic font-serif text-orange-900 group-hover:text-orange-700">
                {category.name}
              </p>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div>
          {categoryPage > 0 && (
            <button
              onClick={() => setCategoryPage((prev) => prev - 1)}
              className="absolute duration-300 left-0 rounded-full text-orange-500 top-1/2 transform -translate-y-1/2 hover:text-orange-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="currentColor"
                className="bi bi-arrow-left-circle-fill"
                viewBox="0 0 16 16"
              >
                <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z" />
              </svg>
            </button>
          )}
          {categoryPage < totalPages - 1 && (
            <button
              onClick={() => setCategoryPage((prev) => prev + 1)}
              className="absolute duration-300 right-0 rounded-full text-orange-500 top-1/2 transform -translate-y-1/2 hover:text-orange-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="currentColor"
                className="bi bi-arrow-right-circle-fill"
                viewBox="0 0 16 16"
              >
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
