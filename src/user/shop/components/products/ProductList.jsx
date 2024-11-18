import React, { useState } from "react";

const ProductList = ({ searchTerm, category }) => {
  // Sample products data with image URLs
  const products = [
    { id: 1, name: "Shock Aerox", category: "new", description: "New product", image: "./product/new/shock-aerox.png" },
    { id: 2, name: "Kampas Ganda Aerox", category: "new", description: "New product", image: "./product/new/kampasremganda-aerox.png" },
    { id: 3, name: "Shockbreaker Aerox", category: "new", description: "New product", image: "./product/new/shockbreaker-aerox.png" },
    { id: 4, name: "Velg Aerox", category: "new", description: "New product", image: "./product/new/velg-aerox.png" },
    { id: 5, name: "Shock Aerox", category: "new", description: "New product", image: "./product/new/shock-aerox.png" },
    { id: 6, name: "Kampas Ganda Aerox", category: "new", description: "New product", image: "./product/new/kampasremganda-aerox.png" },
    { id: 7, name: "Shockbreaker Aerox", category: "new", description: "New product", image: "./product/new/shockbreaker-aerox.png" },
    { id: 8, name: "Velg Aerox", category: "new", description: "New product", image: "./product/new/velg-aerox.png" },
    { id: 9, name: "Filter Aerox", category: "second", description: "Used product", image: "./product/second/filter-aerox.png" },
    { id: 10, name: "Mangkok Ganda Aerox", category: "second", description: "Used product", image: "./product/second/mangkokganda-aerox.png" },
    { id: 11, name: "Roller Aerox", category: "second", description: "Used product", image: "./product/second/roller-aerox.png" },
    { id: 12, name: "Pulley Aerox", category: "second", description: "Used product", image: "./product/second/pulley-aerox.png" },
    { id: 13, name: "Filter Aerox", category: "second", description: "Used product", image: "./product/second/filter-aerox.png" },
    { id: 14, name: "Mangkok Ganda Aerox", category: "second", description: "Used product", image: "./product/second/mangkokganda-aerox.png" },
    { id: 15, name: "Roller Aerox", category: "second", description: "Used product", image: "./product/second/roller-aerox.png" },
    { id: 16, name: "Pulley Aerox", category: "second", description: "Used product", image: "./product/second/pulley-aerox.png" },
  ];

  // Pagination setup
  const productsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);

  // Filter products based on search term and category
  const filteredProducts = products.filter((product) => {
    return product.name.toLowerCase().includes(searchTerm.toLowerCase()) && (category === "new" ? product.category === "new" : product.category === "second");
  });

  // Calculate the total number of pages
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Get the products to be displayed for the current page
  const currentProducts = filteredProducts.slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage);

  // Handle page change
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="p-4">
      {/* Category Title */}
      <h2 className="text-2xl font-bold text-slate-900 mb-4">{category === "new" ? "New Product" : "Second Product"}</h2>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-auto">
        {currentProducts.map((product) => (
          <div key={product.id} className="bg-white p-4 rounded-md shadow-md">
            <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-md mb-4" />
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p>{product.description}</p>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center space-x-4 mt-4">
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50">
          Previous
        </button>

        {/* Page Numbers */}
        {Array.from({ length: totalPages }, (_, index) => (
          <button key={index} onClick={() => handlePageChange(index + 1)} className={`px-4 py-2 rounded-md ${currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"}`}>
            {index + 1}
          </button>
        ))}

        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50">
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductList;
