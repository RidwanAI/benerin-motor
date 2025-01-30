import React, { useState, useEffect } from "react";
import {
  getUser,
  getOrdersByUserId,
  uploadPaymentProof,
  updateOrderStatus,
} from "../../../../services/orderService";
import { submitReview } from "../../../../services/reviewService";

// ReviewModal Component
const ReviewModal = ({ isOpen, onClose, onSubmit }) => {
  const [rating, setRating] = useState(5);
  const [feedback, setFeedback] = useState("");

  if (!isOpen) return null;

  const handleSubmit = () => {
    onSubmit({ rating, feedback });
    setRating(5);
    setFeedback("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative bg-white rounded-lg p-6 w-96 max-w-[90%]">
        <h3 className="text-lg font-semibold mb-4">Write Your Review</h3>

        <div className="mb-4">
          <p className="mb-2">Rating:</p>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className={`text-2xl ${
                  star <= rating ? "text-yellow-400" : "text-gray-300"
                }`}
              >
                ★
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <p className="mb-2">Your Feedback:</p>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            rows="4"
            placeholder="Write your feedback here..."
          />
        </div>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="px-4 py-2 text-white bg-orange-500 rounded-md hover:bg-orange-600"
          >
            Submit Review
          </button>
        </div>
      </div>
    </div>
  );
};

const Orders = () => {
  const [orderItems, setOrderItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Pending");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showArrivalMessage, setShowArrivalMessage] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [user, setUser] = useState(null);
  const [reviewedOrders, setReviewedOrders] = useState(new Set());

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const user = await getUser();
      setUser(user);
      const orders = await getOrdersByUserId(user.id);

      // Update orders but preserve the existing reviewedOrders
      setOrderItems(
        orders.map((order) => ({
          ...order,
          hasReview: reviewedOrders.has(order.id) || order.hasReview,
        })) || []
      );

      // Only update reviewedOrders from API if we don't have local state
      if (reviewedOrders.size === 0) {
        const reviewedIds = orders
          .filter((order) => order.hasReview)
          .map((order) => order.id);
        setReviewedOrders(new Set(reviewedIds));
      }

      setError(null);
    } catch (err) {
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

  const handleArrival = async (orderId) => {
    try {
      await updateOrderStatus(orderId, "Completed");
      await fetchOrders();
      setShowArrivalMessage(true);
      setTimeout(() => {
        setShowArrivalMessage(false);
      }, 3000);
    } catch (error) {
      console.error("Error updating order status:", error);
      alert("Failed to update order status. Please try again.");
    }
  };

  const handleOpenReviewModal = (orderId) => {
    setSelectedOrder(orderId);
    setShowReviewModal(true);
  };

  const handleCloseReviewModal = () => {
    setShowReviewModal(false);
    setSelectedOrder(null);
  };

  const handleSubmitReview = async ({ rating, feedback }) => {
    try {
      await submitReview({
        orderId: selectedOrder,
        userId: user.id,
        rating,
        feedback,
      });

      // Update local state first
      const newReviewedOrders = new Set(reviewedOrders);
      newReviewedOrders.add(selectedOrder);
      setReviewedOrders(newReviewedOrders);

      // Update the orderItems to reflect the review status immediately
      const updatedOrderItems = orderItems.map((item) =>
        item.id === selectedOrder ? { ...item, hasReview: true } : item
      );
      setOrderItems(updatedOrderItems);

      handleCloseReviewModal();
      alert("Thank you for your review!");
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Failed to submit review. Please try again.");
    }
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
        {/* Header */}
        <div className="bg-white p-3 shadow-sm sticky top-0 z-10">
          <p className="font-semibold text-xl md:text-2xl">Order</p>
        </div>

        {/* Category Orders */}
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

        {/* Order Items */}
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

                      {/* Status-based messages */}
                      <p className="font-semibold text-sm text-orange-500">
                        {item.status === "Pending" && "BCA: 51421057"}
                        {item.status === "Paid" &&
                          "Seller has confirmed your payment, please wait for the items to be shipped."}
                        {item.status === "Shipped" &&
                          "Please wait for your items to arrive at your destination"}
                        {item.status === "Completed" &&
                          !item.hasReview &&
                          !reviewedOrders.has(item.id) &&
                          "Thank you for orders from our store, give your rate about your order."}
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
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
                      onClick={() => handleArrival(item.id)}
                      className="bg-orange-500 duration-300 flex gap-2 items-center justify-center mt-2 px-3 py-1.5 rounded-md text-white hover:bg-orange-700 md:px-5 md:py-1.5"
                    >
                      Order Received
                    </button>
                  )}

                  {selectedCategory === "Completed" && (
                    <>
                      {item.hasReview || reviewedOrders.has(item.id) ? (
                        <p className="text-green-600 font-medium mt-2">
                          Thank you for rating your order.
                        </p>
                      ) : (
                        <button
                          onClick={() => handleOpenReviewModal(item.id)}
                          className="bg-orange-500 duration-300 flex gap-2 items-center justify-center mt-2 px-3 py-1.5 rounded-md text-white hover:bg-orange-700 md:px-5 md:py-1.5"
                        >
                          Rate
                        </button>
                      )}
                    </>
                  )}
                </div>
              ))
          )}
        </div>
      </div>

      {/* Review Modal */}
      <ReviewModal
        isOpen={showReviewModal}
        onClose={handleCloseReviewModal}
        onSubmit={handleSubmitReview}
      />

      {/* Arrival Message */}
      {showArrivalMessage && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded-md">
          Order status updated successfully!
        </div>
      )}
    </div>
  );
};

export default Orders;
