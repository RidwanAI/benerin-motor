import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProductList = ({ searchTerm, category }) => {
  // Sample List Product
  const products = [
    // New Product
    { id: 1, name: "Shock DBS Aerox", category: "new", description: "New product", image: "./product/new/shockdbs-aerox.png", price: "Rp.1.100.000", specs: "Shock absorber with enhanced durability for smoother rides", stock: 10 },
    { id: 2, name: "Kampas Ganda Aerox", category: "new", description: "New product", image: "./product/new/kampasganda-aerox.png", price: "Rp.250.000", specs: "Efficient and long-lasting clutch pads for optimal performance", stock: 5 },
    { id: 3, name: "Shockbreaker Aerox", category: "new", description: "New product", image: "./product/new/shockbreaker-aerox.png", price: "Rp.1.700.000", specs: "Advanced suspension system for superior comfort", stock: 3 },
    { id: 4, name: "Velg VND Aerox", category: "new", description: "New product", image: "./product/new/velgvnd-aerox.png", price: "Rp.900.000", specs: "Lightweight and durable alloy wheels for improved handling", stock: 2 },
    { id: 5, name: "Filter TDR Aerox", category: "new", description: "New product", image: "./product/new/filtertdr-aerox.png", price: "Rp.145.000", specs: "High-performance air filter for clean and efficient airflow", stock: 20 },
    { id: 6, name: "Handle Rem Aerox", category: "new", description: "New product", image: "./product/new/handlerem-aerox.png", price: "Rp.300.000", specs: "Ergonomic and precision-engineered brake lever for better control", stock: 12 },
    { id: 7, name: "V Belt Aerox", category: "new", description: "New product", image: "./product/new/vbelt-aerox.png", price: "Rp.95.000", specs: "High-tensile drive belt for reliable and smooth power transmission", stock: 50 },
    { id: 8, name: "Gear Set Aerox", category: "new", description: "New product", image: "./product/new/gearseat-aerox.png", price: "Rp.500.000", specs: "Durable gear and chain set for extended performance", stock: 4 },
    { id: 9, name: "Busi Iridium Aerox", category: "new", description: "New product", image: "./product/new/busiiridium-aerox.png", price: "Rp.70.000", specs: "High-efficiency iridium spark plug for improved ignition", stock: 8 },
    { id: 10, name: "Cover CVT Aerox", category: "new", description: "New product", image: "./product/new/covercvt-aerox.png", price: "Rp.150.000", specs: "Heat-resistant CVT cover for enhanced durability", stock: 10 },

    // Second Product
    {
      id: 11,
      name: "Shock Fushimaya Beat FI/Karbu/Street",
      category: "second",
      description: "Second product",
      image: "./product/second/shockfushimaya-beat.png",
      price: "Rp.850.000",
      specs: "Shock absorber with exceptional strength for smoother rides",
      stock: 10,
    },
    {
      id: 12,
      name: "Kampas Ganda Beat FI/Karbu/Street",
      category: "second",
      description: "Second product",
      image: "./product/second/kampasganda-beat.png",
      price: "Rp.180.000",
      specs: "Efficient clutch pads for consistent performance",
      stock: 10,
    },
    {
      id: 13,
      name: "Shockbreaker Beat FI/Karbu/Street",
      category: "second",
      description: "Second product",
      image: "./product/second/shockbreaker-beat.png",
      price: "Rp.1.200.000",
      specs: "Advanced suspension for enhanced riding comfort",
      stock: 10,
    },
    {
      id: 14,
      name: "Velg Beat Street Beat Deluxe",
      category: "second",
      description: "Second product",
      image: "./product/second/velgstreetbeatdeluxe-beat.png",
      price: "Rp.700.000",
      specs: "Lightweight and durable alloy wheels for precise control",
      stock: 10,
    },
    { id: 15, name: "Filter Beat FI", category: "second", description: "Second product", image: "./product/second/filter-beat.png", price: "Rp.100.000", specs: "Effective air filter to maintain optimal engine performance", stock: 10 },
    { id: 16, name: "Handle Rem Variasi Beat", category: "second", description: "Second product", image: "./product/second/handleremvariasi-beat.png", price: "Rp.250.000", specs: "Ergonomic brake lever for reliable handling", stock: 10 },
    { id: 17, name: "V Belt Beat FI", category: "second", description: "Second product", image: "./product/second/vbealt-beat.png", price: "Rp.75.000", specs: "Heat-resistant drive belt for smooth power delivery", stock: 10 },
    { id: 18, name: "Gear Set Beat FI", category: "second", description: "Second product", image: "./product/second/gearseat-beat.png", price: "Rp.450.000", specs: "Durable gear set designed for long-lasting use", stock: 10 },
    {
      id: 19,
      name: "Busi Iridium LX CPR 8EAIX Beat Karbu",
      category: "second",
      description: "Second product",
      image: "./product/second/busiiridium-beatkarbu.png",
      price: "Rp.65.000",
      specs: "Iridium spark plug for efficient fuel combustion",
      stock: 10,
    },
    {
      id: 20,
      name: "Cover CVT Mio Sporty",
      category: "second",
      description: "Second product",
      image: "./product/second/covercvt-miosporty.png",
      price: "Rp.130.000",
      specs: "Sturdy and heat-resistant CVT cover for better protection",
      stock: 10,
    },
  ];

  // Filter Product by Categories => New Product & Second Product
  const filteredProducts = products.filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()) && (category === "new" ? product.category === "new" : product.category === "second"));

  // Pagination
  const productsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const currentProducts = filteredProducts.slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage);

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

  // Cart
  const [quantity, setQuantity] = useState(1);
  const [showAlert, setShowAlert] = useState(false);
  const handleAddToCart = (product, quantity) => {
    const updatedProduct = { ...product, quantity };
    setCart((prevCart) => [...prevCart, updatedProduct]);

    // Alert
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 2000);
  };

  // Redirect Page => Cart
  const navigate = useNavigate();
  const handleViewCart = () => {
    navigate("/cart", { state: { cart } });
  };

  return (
    <div className="font-poppins px-3">
      {/* Header & Button Cart */}
      <div className="flex font-semibold items-center justify-between py-4 text-xl md:text-2xl">
        <p className="">{category === "new" ? "New Products" : "Second Products"}</p>
        <button onClick={handleViewCart} className="flex duration-300 gap-2 items-center hover:-translate-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart3" viewBox="0 0 16 16">
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
              <p>{product.description}</p>
              <p className="bg-orange-500 px-3 py-1 text-white">{product.price}</p>
            </div>
            <hr className="border-2 w-full" />
            <button onClick={() => setSelectedProduct(product)} className="bg-slate-900 duration-300 px-3 py-1 rounded-md text-sm text-white hover:bg-slate-700 md:px-5 md:py-1.5">
              View Details
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

      {/* Product Details Popup */}
      {selectedProduct && (
        <div className="bg-black bg-opacity-75 fixed inset-0 flex items-center justify-center px-3 z-50 overflow-hidden">
          <div className="bg-white p-4 rounded-md space-y-3 w-96 max-w-full max-h-full">
            <img src={selectedProduct.image} alt={selectedProduct.name} className="h-48 object-cover rounded-md w-full" />
            <div className="text-md font-semibold">
              <p>{selectedProduct.name}</p>
              <p className="italic">{selectedProduct.description}</p>
            </div>
            <div className="bg-slate-100 flex flex-col p-2 space-y-1 text-slate-500">
              <p className="font-bold">{selectedProduct.price.toLocaleString()}</p>
              <p className="text-justify text-sm">{selectedProduct.specs}</p>
              <hr className="border-2 w-full" />
              <div className="flex items-center justify-between">
                <p className="text-sm">Stock: {selectedProduct.stock}</p>
                <div className="flex items-center space-x-3">
                  <label htmlFor="quantity" className="text-sm">
                    Quantity
                  </label>
                  <input
                    type="number"
                    id="quantity"
                    min="1"
                    max={selectedProduct.stock}
                    value={quantity}
                    onChange={(e) => setQuantity(Math.min(e.target.value, selectedProduct.stock))}
                    className="border px-3 py-1 rounded-md w-20 text-center"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between space-x-3 text-sm">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    handleAddToCart(selectedProduct, quantity);
                  }}
                  className="bg-yellow-500 duration-300 flex gap-2 items-center px-3 py-1 rounded-md text-white hover:bg-yellow-600 md:px-5 md:py-1.5"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart3" viewBox="0 0 16 16">
                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l.84 4.479 9.144-.459L13.89 4zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                  </svg>
                  Add to Cart
                </button>

                {/* Alert => Add To Cart */}
                {showAlert && <div className="animate-fadeInOut bg-blue-500 fixed p-3 right-5 rounded-sm text-md text-white top-5">{selectedProduct.name} added to cart!</div>}

                <button className="bg-green-500 duration-300 flex gap-2 items-center px-3 py-1 rounded-md text-white hover:bg-green-600 md:px-5 md:py-1.5">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cash-stack" viewBox="0 0 16 16">
                    <path d="M1 3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1zm7 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4" />
                    <path d="M0 5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V7a2 2 0 0 1-2-2z" />
                  </svg>
                  Buy Now
                </button>
              </div>
              <button onClick={() => setSelectedProduct(null)} className="duration-300 rounded-md hover:text-orange-700">
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-x-square" viewBox="0 0 16 16">
                  <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
