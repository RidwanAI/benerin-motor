import React, { useState, useEffect } from "react";
import {
  getUser,
  getOrdersByUserId,
  uploadPaymentProof,
} from "../../../../services/orderService";

const Orders = () => {
  const [orderItems, setOrderItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Pending");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showArrivalMessage, setShowArrivalMessage] = useState(false);
  const [showReviewPopup, setShowReviewPopup] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [reviewText, setReviewText] = useState("");

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const user = await getUser();
      const orders = await getOrdersByUserId(user.id);
      setOrderItems(orders || []);
      setError(null);
    } catch (err) {
      // Check if it's a 403 error and handle it differently
      if (err.response && err.response.status === 403) {
        setOrderItems([]);
        setError(null);
      } else {
        setError(
          err.message || "Failed to fetch orders. Please try again later."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleArrival = () => {
    setShowArrivalMessage(true);
    setTimeout(() => {
      setShowArrivalMessage(false);
    }, 3000);
  };

  const handleOpenReviewPopup = (id) => {
    setSelectedItemId(id);
    setShowReviewPopup(true);
  };

  const handleCloseReviewPopup = () => {
    setShowReviewPopup(false);
    setReviewText("");
  };

  const handleSubmitReview = (id) => {
    console.log(`Review for item ${id}: ${reviewText}`);
    setShowReviewPopup(false);
    setReviewText("");
  };

  const handleFileUpload = async (event, orderId) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const response = await uploadPaymentProof(orderId, file);
      alert(response.message);
      fetchOrders();
    } catch (error) {
      console.error("Error uploading payment proof:", error);
      alert("Failed to upload payment proof. Please try again.");
    }
  };

  return (
    <div className="flex flex-col font-poppins">
      <div className="flex-1">
        {/* Part => Header */}
        <div className="bg-white p-3 shadow-sm sticky top-0 z-10">
          <p className="font-semibold text-xl md:text-2xl">Order</p>
        </div>

        {/* Part => Category Orders */}
        <div className="bg-white flex gap-2 overflow-x-auto p-3 sticky top-0 whitespace-nowrap z-10">
          {["Pending", "Paid", "Shipped", "Completed"].map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1.5 rounded-md md:px-5 md:py-1.5 ${
                selectedCategory === category
                  ? "bg-orange-500 text-white underline"
                  : "bg-slate-100"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Part => Order Items */}
        <div className="p-3 space-y-3">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-center text-gray-500">Your order is empty</p>
          ) : orderItems.length === 0 ? (
            <p className="text-center text-gray-500">Your order is empty</p>
          ) : (
            orderItems
              .filter((item) => item.status === selectedCategory)
              .map((item) => (
                <div
                  key={item.id}
                  className="bg-white flex flex-col items-start gap-2 p-3"
                >
                  <div className="flex gap-2 w-full">
                    <img
                      src={
                        item.orderedProduct?.image || "/placeholder-image.png"
                      }
                      alt={item.orderedProduct?.name || "Unknown Product"}
                      className="h-24 w-24 object-cover rounded-md"
                    />
                    <div>
                      <p className="font-semibold text-md truncate">
                        {item.orderedProduct?.name || "Unknown Product"}
                      </p>
                      <p className="font-semibold text-sm">
                        Total Price: Rp.
                        {parseFloat(item.totalPrice || 0).toLocaleString(
                          "id-ID",
                          {
                            minimumFractionDigits: 2,
                          }
                        )}
                      </p>
                      <p className="text-sm">
                        Quantity: {item.quantity || "N/A"}
                      </p>
                      <p className="font-semibold text-sm text-orange-500">
                        BCA: 51421057
                      </p>
                    </div>
                  </div>

                  {/* Extra Buttons */}
                  {selectedCategory === "Pending" && (
                    <div className="bg-slate-100 flex flex-col p-3 w-full">
                      <label
                        htmlFor={`upload-proof-${item.id}`}
                        className="bg-orange-500 cursor-pointer duration-300 flex gap-2 items-center justify-center px-3 py-1.5 rounded-md text-white hover:bg-orange-700"
                      >
                        Upload Payment Proof
                      </label>
                      <input
                        type="file"
                        id={`upload-proof-${item.id}`}
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileUpload(e, item.id)}
                      />
                    </div>
                  )}

                  {selectedCategory === "Shipped" && (
                    <button
                      onClick={handleArrival}
                      className="bg-orange-500 duration-300 flex gap-2 items-center justify-center mt-2 px-3 py-1.5 rounded-md text-white hover:bg-orange-700 md:px-5 md:py-1.5"
                    >
                      Item Delivered
                    </button>
                  )}

                  {selectedCategory === "Completed" && (
                    <button
                      onClick={() => handleOpenReviewPopup(item.id)}
                      className="bg-orange-500 duration-300 flex gap-2 items-center justify-center mt-2 px-3 py-1.5 rounded-md text-white hover:bg-orange-700 md:px-5 md:py-1.5"
                    >
                      Feedback
                    </button>
                  )}
                </div>
              ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;
