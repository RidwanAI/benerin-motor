import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { productService } from "../../../../services/productService.js";
import { authService } from "../../../../services/authService.js";
import { createOrderforUser } from "../../../../services/orderService.js";
import { cartService } from "../../../../services/cartService.js";
import { getProductRating } from "../../../../services/reviewService.js";

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
  const [productRating, setProductRating] = useState(null);
  const [totalReviews, setTotalReviews] = useState(0);

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

  useEffect(() => {
    const fetchRating = async () => {
      if (product) {
        try {
          const ratingData = await getProductRating(product.id);
          setProductRating(ratingData.averageRating);
          setTotalReviews(ratingData.totalReviews);
        } catch (error) {
          console.error("Error fetching product rating:", error);
        }
      }
    };

    fetchRating();
  }, [product]);

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

            {/* Rating and Reviews */}
            <div className="flex items-center gap-3">
              <div className="flex items-center">
                {[...Array(5)].map((_, index) => (
                  <svg
                    key={index}
                    className={`w-5 h-5 ${
                      index < Math.round(productRating)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <div className="text-sm text-gray-600">
                <span className="font-medium">
                  {productRating?.toFixed(1) || "0.0"}
                </span>
                <span className="mx-1">•</span>
                <span>
                  {totalReviews} {totalReviews === 1 ? "review" : "reviews"}
                </span>
              </div>
            </div>

            <p className="font-semibold text-orange-500 text-xl">{`Rp${parseFloat(
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
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-lg shadow-xl overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-semibold">Complete Your Order</h2>
              <button
                onClick={() => setModalVisible(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="p-4 space-y-4">
              {/* Shipping Address */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Shipping Address
                </label>
                <textarea
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                  rows="3"
                  placeholder="Enter your shipping address"
                />
              </div>

              {/* Phone Number */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  type="number"
                  value={customerPhoneNumber}
                  onChange={(e) => setCustomerPhoneNumber(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Enter your phone number"
                />
              </div>

              {/* Shipping Method */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Shipping Method
                </label>
                <select
                  value={selectedShippingMethod}
                  onChange={(e) => setSelectedShippingMethod(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
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

              {/* Price Summary */}
              {selectedShippingMethod && (
                <div className="space-y-2 pt-4 border-t">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal:</span>
                    <span>
                      {`Rp${calculateSubtotal().toLocaleString("id-ID", {
                        minimumFractionDigits: 2,
                      })}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping Cost:</span>
                    <span>
                      {`Rp${SHIPPING_COST.toLocaleString("id-ID", {
                        minimumFractionDigits: 2,
                      })}`}
                    </span>
                  </div>
                  <div className="flex justify-between font-bold pt-2 border-t">
                    <span>Total:</span>
                    <span>
                      {`Rp${calculateTotal().toLocaleString("id-ID", {
                        minimumFractionDigits: 2,
                      })}`}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="p-4 border-t flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setModalVisible(false)}
                className="w-full sm:w-1/2 px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateOrder}
                className="w-full sm:w-1/2 px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
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
