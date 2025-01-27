import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { productService } from "../../../../services/productService.js";
import { authService } from "../../../../services/authService.js";
import { createOrderforUser } from "../../../../services/orderService.js";
import { cartService } from "../../../../services/cartService.js";

const SHIPPING_COST = 15000; // Fixed shipping cost in Rupiah

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isModalVisible, setModalVisible] = useState(false);
  const [shippingAddress, setShippingAddress] = useState("");
  const [customerPhoneNumber, setCustomerPhoneNumber] = useState("");
  const [selectedShippingMethod, setSelectedShippingMethod] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const user = await authService.getCurrentUser();
        setIsAuthenticated(!!user);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    checkAuthStatus();
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const fetchProdId = await productService.fetchProductById(id);
        setProduct(fetchProdId);
        setError(null);
      } catch (err) {
        setError("Product not found");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    } else {
      setError("Invalid product ID");
      setLoading(false);
    }
  }, [id]);

  const calculateSubtotal = () => {
    if (!product) return 0;
    return parseFloat(product.price) * quantity;
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    return subtotal + SHIPPING_COST;
  };

  const handleCreateOrder = async () => {
    if (!shippingAddress || !customerPhoneNumber || !selectedShippingMethod) {
      alert("Please fill in all the required fields.");
      return;
    }

    try {
      const currentUser = await authService.getCurrentUser();
      if (!currentUser || !currentUser.id) {
        alert("You must be logged in to make a purchase.");
        return;
      }

      // Check if quantity is valid
      if (quantity > product.stock) {
        alert("Selected quantity exceeds available stock!");
        return;
      }

      const subtotal = calculateSubtotal();
      const total = calculateTotal();

      const orderPayload = {
        userId: currentUser.id,
        productId: product.id,
        quantity: parseInt(quantity),
        shippingAddress,
        customerPhoneNumber,
        shippingMethod: selectedShippingMethod,
        shippingCost: parseFloat(SHIPPING_COST),
        subtotal: parseFloat(subtotal),
        totalAmount: parseFloat(total),
      };

      await createOrderforUser(orderPayload);

      // Update local product state
      setProduct((prev) => ({
        ...prev,
        stock: prev.stock - quantity,
        sold: prev.sold + quantity,
      }));

      alert("Order created successfully!");
      setModalVisible(false);
      navigate(`/shop`);
    } catch (error) {
      if (
        error.response?.status === 400 &&
        error.response?.data?.message === "Insufficient stock"
      ) {
        alert("Sorry, the selected quantity is no longer available.");
      } else {
        console.error("Error creating order:", error);
        alert("Failed to create order. Please try again.");
      }
    }
  };

  const renderActionButtons = () => {
    if (!isAuthenticated) {
      return (
        <button
          onClick={() => navigate("/login")}
          className="bg-blue-500 duration-300 px-3 py-1.5 rounded-md text-white hover:bg-blue-700 md:px-5 md:py-1.5 w-full"
        >
          Login to Buy
        </button>
      );
    }

    return (
      <div className="flex gap-2">
        <button
          onClick={addToCart}
          className="bg-orange-500 duration-300 px-3 py-1.5 rounded-md text-white hover:bg-orange-700 md:px-5 md:py-1.5"
        >
          Add to Cart
        </button>
        <button
          onClick={() => setModalVisible(true)}
          className="bg-green-500 duration-300 px-3 py-1.5 rounded-md text-white hover:bg-green-700 md:px-5 md:py-1.5"
        >
          Buy Now
        </button>
      </div>
    );
  };

  const addToCart = async () => {
    try {
      const currentUser = await authService.getCurrentUser();

      if (!currentUser || !currentUser.id) {
        alert("Please log in to add items to the cart.");
        return;
      }

      // Check if quantity is valid
      if (quantity > product.stock) {
        alert("Selected quantity exceeds available stock!");
        return;
      }

      const payload = {
        productId: product.id,
        userId: currentUser.id,
        quantity,
      };

      await cartService.addToCart(payload);

      // Update local product state
      setProduct((prev) => ({
        ...prev,
        stock: prev.stock - quantity,
      }));

      alert(`${product.name} has been successfully added to the cart!`);
    } catch (error) {
      if (
        error.response?.status === 400 &&
        error.response?.data?.message === "Insufficient stock"
      ) {
        alert("Sorry, the selected quantity is no longer available.");
      } else {
        console.error("Error adding to cart:", error);
        alert("Failed to add to the cart. Please try again.");
      }
    }
  };

  if (loading) {
    return <p className="text-center text-xl">Loading...</p>;
  }

  if (error) {
    return (
      <div className="bg-orange-200 flex flex-col font-poppins gap-2 h-screen items-center justify-center p-3 text-center">
        <p className="font-bold text-red-500 text-xl md:text-2xl">{error}</p>
        <Link to="/shop" className="text-orange-500 hover:underline">
          Go Back
        </Link>
      </div>
    );
  }

  return (
    <section className="flex font-poppins h-screen items-center justify-center p-3">
      {/* Product Card */}
      <div className="bg-white max-w-3xl mx-auto rounded-md shadow-md overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image */}
          <div className="relative">
            <img
              src={product.image}
              alt={product.name}
              className="h-full object-cover w-full"
            />
          </div>

          {/* Details */}
          <div className="p-3 space-y-3">
            <h2 className="font-semibold text-xl md:text-2xl">
              {product.name}
            </h2>
            <p className="text-slate-500">{product.specs}</p>
            <p className="font-semibold text-orange-500 text-xl">{`Rp.${parseFloat(
              product.price
            ).toLocaleString("id-ID", {
              minimumFractionDigits: 2,
            })}`}</p>

            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-600">Stock Available:</span>
              <span
                className={`font-medium ${
                  product.stock < 5
                    ? "text-red-500"
                    : product.stock < 10
                    ? "text-yellow-500"
                    : "text-green-600"
                }`}
              >
                {product.stock} units
              </span>
            </div>

            <div className="flex items-center justify-between">
              <label htmlFor="quantity" className="text-sm">
                Quantity:
              </label>
              <input
                type="number"
                id="quantity"
                min="1"
                max={product.stock}
                value={quantity}
                onChange={(e) =>
                  setQuantity(Math.min(e.target.value, product.stock))
                }
                className="border text-center w-16"
              />
            </div>
            {renderActionButtons()}

            <Link
              to="/shop"
              className="absolute duration-300 left-3 rounded-full text-orange-500 top-1/2 transform -translate-y-1/2 hover:text-orange-700"
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
            </Link>
          </div>
        </div>
      </div>

      {/* Modal => Buy Now */}
      {isModalVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-1/3 shadow-lg">
            <h2 className="text-lg font-bold mb-4">Complete Your Order</h2>

            <div className="mb-4">
              <label
                className="block font-medium mb-2"
                htmlFor="shippingAddress"
              >
                Shipping Address
              </label>
              <input
                type="text"
                id="shippingAddress"
                value={shippingAddress}
                onChange={(e) => setShippingAddress(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded-md"
                placeholder="Enter your shipping address"
              />
            </div>

            <div className="mb-4">
              <label
                className="block font-medium mb-2"
                htmlFor="customerPhoneNumber"
              >
                Phone Number
              </label>
              <input
                type="text"
                id="customerPhoneNumber"
                value={customerPhoneNumber}
                onChange={(e) => setCustomerPhoneNumber(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded-md"
                placeholder="Enter your phone number"
              />
            </div>

            <div className="mb-4">
              <label className="block font-medium mb-2">Shipping Method</label>
              <select
                value={selectedShippingMethod}
                onChange={(e) => setSelectedShippingMethod(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded-md"
              >
                <option value="" disabled>
                  Select shipping method
                </option>
                <option value="JNE">JNE</option>
                <option value="JNT">JNT</option>
                <option value="Shopee Express">Shopee Express</option>
                <option value="Gojek">Gojek</option>
              </select>
            </div>

            {selectedShippingMethod && (
              <div className="mb-4">
                <div className="flex justify-between text-sm">
                  <span>Subtotal:</span>
                  <span>{`Rp.${calculateSubtotal().toLocaleString("id-ID", {
                    minimumFractionDigits: 2,
                  })}`}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping Cost:</span>
                  <span>{`Rp.${SHIPPING_COST.toLocaleString("id-ID", {
                    minimumFractionDigits: 2,
                  })}`}</span>
                </div>
                <div className="flex justify-between font-bold mt-2">
                  <span>Total:</span>
                  <span>{`Rp.${calculateTotal().toLocaleString("id-ID", {
                    minimumFractionDigits: 2,
                  })}`}</span>
                </div>
              </div>
            )}

            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setModalVisible(false)}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateOrder}
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700"
              >
                Confirm Order
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductDetail;
