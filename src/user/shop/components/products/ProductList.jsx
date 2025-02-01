import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { productService } from "../../../../services/productService";
import { cartService } from "../../../../services/cartService";
import Carts from "../carts/Carts";

const ProductList = ({ searchTerm, category }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [showCart, setShowCart] = useState(false);

  // Pagination
  const productsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const navigate = useNavigate();

  // Fungsi untuk mengambil jumlah barang di cart
  const fetchCartItemCount = async () => {
    try {
      const currentUser = await cartService.getCurrentUser();
      const userId = currentUser.id;
      const cartItems = await cartService.fetchCartItems(userId);
      setCartItemCount(cartItems.length);
    } catch (err) {
      console.error("Failed to fetch cart items:", err);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await productService.fetchProductsByCategory(category);
        setProducts(data);
        setError(null);
      } catch (err) {
        setError("Error fetching products");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
    fetchCartItemCount();
  }, [category]);

  // Fungsi untuk menangani klik pada ikon cart
  const handleViewCart = () => {
    setShowCart(!showCart);
  };

  // Enhanced filter function that searches across multiple fields
  const filteredProducts = products.filter((product) => {
    const searchTermLower = searchTerm.toLowerCase();

    const priceString = parseFloat(product.price)
      .toLocaleString("id-ID", { minimumFractionDigits: 2 })
      .toLowerCase();

    const soldString = product.sold.toString();
    const ratingString = product.rating.toString();

    return (
      product.name.toLowerCase().includes(searchTermLower) ||
      product.specs.toLowerCase().includes(searchTermLower) ||
      priceString.includes(searchTermLower) ||
      soldString.includes(searchTermLower) ||
      ratingString.includes(searchTermLower) ||
      product.label.toLowerCase().includes(searchTermLower)
    );
  });

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getPaginationButtons = () => {
    const range = [];
    const showFirstPage = currentPage;
    const showSecondPage = Math.min(currentPage + 1, totalPages);

    range.push(showFirstPage);
    if (showSecondPage !== showFirstPage) range.push(showSecondPage);

    if (showSecondPage < totalPages) {
      range.push("...");
    }

    return range;
  };

  // Get category title
  const getCategoryTitle = () => {
    switch (category) {
      case "all":
        return "All Products";
      case "new":
        return "New Products";
      case "second":
        return "Second Products";
      case "rec":
        return "Recommended Products";
      default:
        return "Products";
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="font-poppins px-3">
      {/* Header & Button Cart */}
      <div className="flex font-semibold items-center justify-between py-4 text-xl md:text-2xl">
        <p>{getCategoryTitle()}</p>
        <button
          onClick={handleViewCart}
          className="flex duration-300 gap-2 items-center hover:-translate-x-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-cart3"
            viewBox="0 0 16 16"
          >
            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l.84 4.479 9.144-.459L13.89 4zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
          </svg>
          {cartItemCount}
        </button>
      </div>

      {/* Cart Modal */}
      {showCart && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Shopping Cart</h2>
              <button
                onClick={() => setShowCart(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <Carts />
          </div>
        </div>
      )}

      {/* Product Grid */}
      <div className="gap-3 grid grid-cols-2 w-auto md:grid-cols-4">
        {currentProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white duration-300 flex flex-col group justify-between overflow-hidden relative rounded-md shadow-md transform hover:-translate-y-1"
          >
            {/* Image Product */}
            <div className="relative h-40 w-full">
              <img
                src={product.image}
                alt={product.name}
                className="duration-300 h-full object-cover transition-transform w-full group-hover:scale-110"
              />
              <span className="absolute bg-orange-500 bg-opacity-75 p-2 text-white text-xs top-0">
                {product.label}
              </span>
            </div>

            {/* Detail Product */}
            <div className="p-3 space-y-2">
              <p className="font-semibold text-md truncate">{product.name}</p>
              <p className="text-slate-500 text-xs truncate">{product.specs}</p>
              <p className="font-semibold text-orange-500 text-md">{`Rp${parseFloat(
                product.price
              ).toLocaleString("id-ID", {
                minimumFractionDigits: 2,
              })}`}</p>
              <div className="flex items-center justify-between text-xs text-slate-500">
                <p>{product.sold} Sold</p>
                <div className="flex gap-2 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-star-fill text-yellow-500"
                    viewBox="0 0 16 16"
                  >
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                  </svg>
                  <p>{product.rating}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between p-3">
              <Link
                to={`/product/${product.id}`}
                className="bg-orange-500 duration-300 px-3 py-1.5 rounded-md transition text-sm text-white hover:bg-orange-600 md:px-5 md:py-1.5"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center py-4 space-x-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="bg-gray-200 px-3 py-1 rounded-md hover:bg-gray-300 md:px-5 md:py-1.5 disabled:opacity-50"
        >
          Previous
        </button>
        {getPaginationButtons().map((page, index) => (
          <button
            key={index}
            onClick={() => typeof page === "number" && handlePageChange(page)}
            className={`px-3 py-1 rounded-md md:px-5 md:py-1.5 ${
              currentPage === page
                ? "bg-orange-500 text-white"
                : "bg-orange-200 hover:bg-gray-300"
            }`}
            disabled={page === "..."}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="bg-gray-200 px-3 py-1 rounded-md hover:bg-gray-300 md:px-5 md:py-1.5 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductList;
