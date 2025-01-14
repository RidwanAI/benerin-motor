import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { authService } from "../../../../services/authService.js";


const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalPayment, setModalPayment] = useState(false);
  const [messageCart, setMessageCart] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [virtualAccount, setVirtualAccount] = useState(null);
  const [selectedShippingMethod, setSelectedShippingMethod] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:5000/products/${id}`);
        setProduct(response.data);
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

  const addToCart = async () => {
    try {
      // Get the current user
      const currentUser = await authService.getCurrentUser();
  
      if (!currentUser || !currentUser.id) {
        setMessageCart("Please log in to add items to the cart.");
        setTimeout(() => setMessageCart(""), 3000);
        return;
      }
  
      const userId = currentUser.id;
  
      // Fetch all cart items for this user
      const { data: cartItems } = await axios.get(`http://localhost:5000/carts`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
  
      // Log all cart items for debugging
      console.log("All cart items:", cartItems);
  
      // Find the cart item matching userId and productId
      const existingCartItem = cartItems.find(
        (item) => item.userId === userId && item.productId === product.id
      );
  
      console.log("Matched cart item:", existingCartItem);
  
      if (existingCartItem) {
        // Update the quantity of the existing item
        const updatedQuantity = existingCartItem.quantity + quantity;
  
        const response = await axios.put(
          `http://localhost:5000/carts/${existingCartItem.id}`,
          { quantity: updatedQuantity },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
  
        console.log("Updated cart item response:", response.data);
        setMessageCart(`Updated quantity of ${product.name} to ${updatedQuantity}.`);
      } else {
        // Add a new item to the cart
        const payload = {
          productId: product.id,
          userId,
          quantity,
        };
  
        const response = await axios.post("http://localhost:5000/carts", payload, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
  
        console.log("Added new cart item response:", response.data);
        setMessageCart(`${product.name} has been successfully added to the cart!`);
      }
  
      setTimeout(() => setMessageCart(""), 3000);
    } catch (error) {
      console.error("Error adding/updating cart:", error.response?.data || error.message);
      setMessageCart("Failed to update the cart. Please try again.");
      setTimeout(() => setMessageCart(""), 3000);
    }
  };
  
  

  const buyNow = () => {
    setModalVisible(true);
  };

  const openPaymentModal = () => setModalPayment(true);

  const closeModal = () => {
    setModalVisible(false);
    setModalPayment(false);
    setSelectedPaymentMethod("");
    setVirtualAccount(null);
    setSelectedShippingMethod("");
  };

  const handlePaymentMethodChange = (method) => {
    setSelectedPaymentMethod(method);
    if (method === "Bank Transfer") {
      setVirtualAccount(`VA-${Math.floor(1000000000 + Math.random() * 9000000000)}`);
    } else {
      setVirtualAccount(null);
    }
  };

  const confirmPayment = () => {
    if (selectedPaymentMethod && selectedShippingMethod) {
      setPaymentSuccess(true);
      setTimeout(() => {
        setPaymentSuccess(false);
        closeModal();
      }, 3000);
    } else {
      alert("Please select both payment and shipping methods.");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVirtualAccount(file);
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
      {/* Remaining UI Code */}
            {/* Card */}
            <div className="bg-white max-w-3xl mx-auto rounded-md shadow-md overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image */}
          <div className="relative">
            <img src={product.image} alt={product.name} className="h-full object-cover w-full" />
            <span className="absolute bg-orange-500 left-0 px-3 py-1 text-sm text-white top-0">{product.label}</span>
          </div>

          {/* Details */}
          <div className="p-3 space-y-3">
            <h2 className="font-semibold text-xl md:text-2xl ">{product.name}</h2>
            <p className="text-slate-500">{product.specs}</p>
            <p className="font-semibold text-orange-500 text-xl">{product.price}</p>
            <div className="flex items-center justify-between text-slate-500">
              <div className="flex gap-2 items-center ">
                <p>{product.sold} Sold</p>
                <p className="flex gap-2 items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill text-yellow-500" viewBox="0 0 16 16">
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                  </svg>
                  {product.rating}
                </p>

                <p className="flex gap-2 items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-archive" viewBox="0 0 16 16">
                    <path d="M0 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v7.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 12.5V5a1 1 0 0 1-1-1zm2 3v7.5A1.5 1.5 0 0 0 3.5 14h9a1.5 1.5 0 0 0 1.5-1.5V5zm13-3H1v2h14zM5 7.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5" />
                  </svg>
                  {product.stock}{" "}
                </p>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center space-x-3">
                <label htmlFor="quantity" className="text-sm">
                  Pcs
                </label>
                <input type="number" id="quantity" min="1" max={product.stock} value={quantity} onChange={(e) => setQuantity(Math.min(e.target.value, product.stock))} className="border text-center" />
              </div>
            </div>

            {/* Button => Add To Cart & Buy Now */}
            <div className="flex gap-2">
              <button onClick={addToCart} className="bg-orange-500 duration-300 px-3 py-1.5 rounded-md text-white hover:bg-orange-700 md:px-5 md:py-1.5">
                Add to Cart
              </button>
              <button onClick={buyNow} className="bg-green-500 duration-300 px-3 py-1.5 rounded-md text-white hover:bg-green-700 md:px-5 md:py-1.5">
                Buy Now
              </button>
            </div>
          </div>

          {/* Button => Back to Shop */}
          <Link to={"/shop"} className="absolute duration-300 left-3 rounded-full text-orange-500 top-1/2 transform -translate-y-1/2 hover:text-orange-700">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16">
              <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Modal => Buy Now */}
      {isModalVisible && (
        <div className="bg-black bg-opacity-50 fixed inset-0 flex items-center justify-center p-3 z-50">
          <div className="bg-white p-3 rounded-md shadow-sm space-y-3 w-full md:w-1/3">
            <p className="font-semibold text-xl md:text-2xl">Detail Payment</p>
            <hr className="border-2" />

            <div className="border p-3 space-y-2">
              <p className="font-semibold text-xl text-orange-500 truncate">{product.name}</p>
              <p className="text-slate-500">{product.specs}</p>
              <div className="flex font-semibold items-center justify-between">
                <p>{product.price}</p>
                <p>{quantity} Pcs</p>
              </div>
            </div>
            <hr className="border-2" />
            <div className="font-semibold flex items-center justify-between text-xl">
              <p>Total</p>
              <p className="text-orange-500">{`Rp.${(parseInt(product.price.replace(/\D/g, "")) * quantity).toLocaleString("id-ID")}`}</p>
            </div>

            <div className="flex gap-2">
              <button onClick={closeModal} className="bg-red-500 duration-300 px-3 py-1.5 rounded-md text-white hover:bg-red-700 md:px-3 md:py-1.5">
                Cancel
              </button>
              <button onClick={openPaymentModal} className="bg-green-500 duration-300 px-3 py-1.5 rounded-md text-white hover:bg-green-700 md:px-3 md:py-1.5">
                Proceed to Pay
              </button>
            </div>

            {/* Modal => Proceed To Pay */}
            {isModalPayment && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full">
                  <h2 className="text-xl font-bold mb-4 text-center">Select Payment & Shipping</h2>

                  {/* Payment Methods */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">Payment Method:</h3>
                    <div className="flex flex-col space-y-2">
                      <label className="flex items-center">
                        <input type="radio" name="payment" value="Bank Transfer" onChange={() => handlePaymentMethodChange("Bank Transfer")} className="mr-2" />
                        Bank Transfer
                      </label>
                      <label className="flex items-center">
                        <input type="radio" name="payment" value="Cash On Delivery" onChange={() => handlePaymentMethodChange("Cash On Delivery")} className="mr-2" />
                        Cash On Delivery (COD)
                      </label>
                    </div>

                    {virtualAccount && (
                      <p className="mt-2 text-sm text-gray-700">
                        Virtual Account Number: <span className="font-bold text-green-500">{virtualAccount}</span>
                      </p>
                    )}
                  </div>

                  {/* Shipping Methods */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">Shipping Method:</h3>
                    <div className="flex flex-col space-y-2">
                      <label className="flex items-center">
                        <input type="radio" name="shipping" value="JNE" onChange={() => setSelectedShippingMethod("JNE")} className="mr-2" />
                        JNE
                      </label>
                      <label className="flex items-center">
                        <input type="radio" name="shipping" value="JNT" onChange={() => setSelectedShippingMethod("JNT")} className="mr-2" />
                        JNT
                      </label>
                      <label className="flex items-center">
                        <input type="radio" name="shipping" value="Shopee Express" onChange={() => setSelectedShippingMethod("Shopee Express")} className="mr-2" />
                        Shopee Express
                      </label>
                      <label className="flex items-center">
                        <input type="radio" name="shipping" value="Gojek" onChange={() => setSelectedShippingMethod("Gojek")} className="mr-2" />
                        Gojek
                      </label>
                    </div>
                  </div>

                  {/* Payment Proof (Image Upload) */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">Payment Proof:</h3>
                    <input type="file" accept="image/*" onChange={handleFileChange} className="border border-gray-300 p-2 rounded-md w-full" />
                    {paymentProof && (
                      <div className="mt-4">
                        <p className="text-sm text-gray-700">Uploaded Proof:</p>
                        <img src={URL.createObjectURL(paymentProof)} alt="Payment Proof" className="mt-2 max-w-full h-auto rounded-md" />
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-end gap-4">
                    <button onClick={closeModal} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700">
                      Cancel
                    </button>
                    <button onClick={confirmPayment} className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700">
                      Confirm Payment
                    </button>
                  </div>

                  {/* Success Message */}
                  {paymentSuccess && <p className="mt-4 text-center text-green-500 font-semibold">Payment Successful! Thank you for your order.</p>}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modal => Confirm Payment */}
      {messageCart && (
        <div className="fixed flex inset-0 items-center justify-center p-3 z-50">
          <div className="bg-white border border-orange-500 flex flex-col gap-2 items-center justify-center p-3 rounded-md shadow-md text-slate-500 w-full md:max-w-xs ">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-cart-check-fill text-green-700" viewBox="0 0 16 16">
              <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m-1.646-7.646-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L8 8.293l2.646-2.647a.5.5 0 0 1 .708.708" />
            </svg>
            <p className="text-center">{messageCart}</p>
          </div>
        </div>
      )}
      {/* Keep all other elements unchanged */}
    </section>
  );
};

export default ProductDetail;
