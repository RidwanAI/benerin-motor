import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProductList = ({ searchTerm, category }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination
  const productsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:5000/products/${category}`);
        setProducts(response.data);
        setError(null);
      } catch (err) {
        setError("Error fetching products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  // Filter products by search term
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  const [quantity, setQuantity] = useState(1);
  const [showAlert, setShowAlert] = useState(false);

  const handleAddToCart = async (product, quantity) => {
    try {
      // Ambil informasi pengguna dari endpoint /me
      const userResponse = await axios.get("http://localhost:5000/me", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
  
      const userId = userResponse.data.id;
  
      // Kirim permintaan ke backend untuk menambahkan produk ke keranjang
      const response = await axios.post(
        "http://localhost:5000/carts",
        {
          productId: product.id,
          userId,
          quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
  
      // Tambahkan produk ke state cart lokal untuk memperbarui UI
      setCart((prevCart) => [...prevCart, response.data]);
  
      // Tampilkan notifikasi
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to add to cart:", err);
      setError("Failed to add product to cart. Please try again.");
    }
  };
  

  const navigate = useNavigate();
  const handleViewCart = () => {
    navigate("/cart", { state: { cart } });
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
        <p>{category === "new" ? "New Products" : "Second Products"}</p>
        <button onClick={handleViewCart} className="flex duration-300 gap-2 items-center hover:-translate-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart3" viewBox="0 0 16 16">
            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l.84 4.479 9.144-.459L13.89 4zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
          </svg>
          {cart.length}
        </button>
      </div>

      {/* Product Grid */}
      <div className="gap-6 grid grid-cols-1 w-auto md:grid-cols-3">
        {currentProducts.map((product) => (
          <div key={product.id} className="bg-white p-4 rounded-md shadow-sm space-y-3">
            <img src={product.image} alt={product.name} className="h-48 object-cover rounded-md w-full" />
            <p className="text-md md:text-xl font-semibold">{product.name}</p>
            <div className="flex items-center justify-between">
              <p>{product.specs}</p>
              <p className="bg-orange-500 px-3 py-1 text-white">{product.price}</p>
            </div>
            <button onClick={() => handleAddToCart(product, quantity)} className="bg-slate-900 px-3 py-1.5 text-sm text-white hover:bg-slate-700 rounded-md">
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center py-4 space-x-2">
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="bg-gray-200 px-3 py-1 rounded-md hover:bg-gray-300 md:px-5 md:py-1.5 disabled:opacity-50">
          Previous
        </button>
        {getPaginationButtons().map((page, index) => (
          <button
            key={index}
            onClick={() => typeof page === "number" && handlePageChange(page)}
            className={`px-3 py-1 rounded-md md:px-5 md:py-1.5 ${currentPage === page ? "bg-orange-500 text-white" : "bg-orange-200 hover:bg-gray-300"}`}
            disabled={page === "..."}
          >
            {page}
          </button>
        ))}
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="bg-gray-200 px-3 py-1 rounded-md hover:bg-gray-300 md:px-5 md:py-1.5 disabled:opacity-50">
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductList;
