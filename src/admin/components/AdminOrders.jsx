import React, { useState, useEffect } from "react";
import adminService from "../../services/adminService"; // Ensure the path to adminService is correct

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [status, setStatus] = useState("");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await adminService.getOrders(); // Fetch orders from your API
        setOrders(data);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError("Failed to fetch orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const openModal = (order) => {
    setSelectedOrder(order);
    setStatus(order.status);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
    setStatus("");
  };

  const updateOrderStatus = async () => {
    if (!selectedOrder) return;

    try {
      await adminService.updateOrder(selectedOrder.id, { status });
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === selectedOrder.id ? { ...order, status } : order
        )
      );
      closeModal();
      alert("Order status updated successfully!");
    } catch (err) {
      console.error("Error updating order status:", err);
      alert("Failed to update order status.");
    }
  };

  // Filter orders based on the search query
  const filteredOrders = orders.filter((order) =>
    order.user?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.shippingAddress.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination calculations
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentOrders = filteredOrders.slice(startIndex, startIndex + itemsPerPage);

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="flex flex-col font-poppins min-h-screen">
      <div className="bg-slate-100 flex items-center p-3 shadow-sm sticky top-0 z-30">
        <p className="font-bold text-2xl">Orders Data</p>
      </div>

      <div className="flex-1 bg-slate-100 overflow-auto">
        <main className="p-3 space-y-3">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search by Customer Name, Status, or Shipping Address"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1); // Reset to the first page when searching
            }}
            className="border p-2 rounded-sm w-full"
          />

          <div className="overflow-auto">
            <table className="bg-white border-collapse overflow-hidden rounded-sm shadow-sm w-full">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold">ID</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Customer</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Product</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Quantity</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Total Price</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Payment Proof</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Shipping Address</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Customer Phone</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Shipping Method</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentOrders.map((order) => (
                  <tr key={order.id} className="border-t text-sm">
                    <td className="px-4 py-3">{order.id}</td>
                    <td className="px-4 py-3">{order.user?.name || "Unknown User"}</td>
                    <td className="px-4 py-3">{order.orderedProduct?.name || "Unknown Product"}</td>
                    <td className="px-4 py-3">{order.quantity}</td>
                    <td className="px-4 py-3">{`Rp.${parseFloat(
                      order.totalPrice
                    ).toLocaleString("id-ID", { minimumFractionDigits: 2 })}`}</td>
                    <td className="px-4 py-3">{order.status}</td>
                    <td className="px-4 py-3">
                      {order.paymentProof ? (
                        <a
                          href={order.paymentProof}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 underline"
                        >
                          View
                        </a>
                      ) : (
                        "None"
                      )}
                    </td>
                    <td className="px-4 py-3">{order.shippingAddress}</td>
                    <td className="px-4 py-3">{order.customerPhoneNumber}</td>
                    <td className="px-4 py-3">{order.shippingMethod}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => openModal(order)}
                        className="bg-yellow-500 px-3 py-1.5 text-white rounded hover:bg-yellow-600"
                      >
                        Edit Status
                      </button>
                    </td>
                  </tr>
                ))}
                {currentOrders.length === 0 && (
                  <tr>
                    <td colSpan="11" className="px-4 py-3 text-center text-gray-500">
                      No orders found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="flex items-center justify-between">
            <button
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
              className="bg-orange-500 duration-300 px-3 py-1.5 rounded-md transition text-sm text-white disabled:opacity-50 hover:bg-orange-700"
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className="bg-orange-500 duration-300 px-3 py-1.5 rounded-md transition text-sm text-white disabled:opacity-50 hover:bg-orange-700"
            >
              Next
            </button>
          </div>
        </main>

        {isModalOpen && selectedOrder && (
          <div className="bg-slate-500 bg-opacity-50 fixed inset-0 flex items-center justify-center px-3 z-50">
            <div className="bg-white p-3 rounded-sm space-y-3 w-full md:w-1/3">
              <p className="text-xl font-semibold">Edit Order Status</p>
              <div>
                <label className="block mb-2 text-sm font-medium">Order ID: {selectedOrder.id}</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full p-2 border rounded"
                >
                  <option value="Pending">Pending</option>
                  <option value="Paid">Paid</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
              <div className="flex justify-end gap-3">
                <button
                  onClick={closeModal}
                  className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-500"
                >
                  Cancel
                </button>
                <button
                  onClick={updateOrderStatus}
                  className="bg-orange-500 px-4 py-2 text-white rounded hover:bg-orange-700"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOrders;
