import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white shadow-md rounded-md p-4">
      <img src={product.image} alt={product.name} className="h-28 w-full object-cover rounded-md" />
      <h3 className="text-lg font-bold mt-2">{product.name}</h3>
      <p className="text-gray-600">${product.price}</p>
      <button className="mt-2 w-full bg-blue-500 text-white py-1 rounded-md hover:bg-blue-600">Add to Cart</button>
    </div>
  );
};

export default ProductCard;
