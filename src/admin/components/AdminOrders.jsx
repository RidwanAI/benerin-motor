import React, { useState, useEffect } from "react";
import { Eye } from "lucide-react";
import adminService from "../../services/adminService";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [status, setStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await adminService.getOrders();
        setOrders(data);
      } catch (err) {
        setError("Failed to fetch orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Status priority map for sorting
  const statusPriority = {
    Pending: 1,
    Paid: 2,
    Shipped: 3,
    Completed: 4,
  };

  const deleteOrder = async (orderId) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
        await adminService.deleteOrder(orderId);
        setOrders(orders.filter((order) => order.id !== orderId));
        alert("Order deleted successfully!");
      } catch (err) {
        alert("Failed to delete order.");
      }
    }
  };

  const openImageInNewTab = (imageUrl) => {
    window.open(imageUrl, "_blank");
  };

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

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

  // Enhanced search, filter, and sort function
  const filteredOrders = orders
    .filter((order) => {
      const searchLower = searchQuery.toLowerCase();
      return (
        order.user?.name?.toLowerCase().includes(searchLower) ||
        order.status.toLowerCase().includes(searchLower) ||
        order.shippingAddress.toLowerCase().includes(searchLower) ||
        order.id.toString().toLowerCase().includes(searchLower) ||
        order.orderedProduct?.name?.toLowerCase().includes(searchLower) ||
        order.customerPhoneNumber?.toLowerCase().includes(searchLower)
      );
    })
    .sort((a, b) => statusPriority[a.status] - statusPriority[b.status]);

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentOrders = filteredOrders.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const getRowBackgroundColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-200";
      case "Shipped":
        return "bg-yellow-200";
      case "Paid":
        return "bg-blue-200";
      case "Pending":
        return "bg-red-200";
      default:
        return "bg-white";
    }
  };

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  return (
    <div className="flex flex-col font-poppins min-h-screen">
      <div className="bg-slate-100 flex items-center p-3 shadow-sm sticky top-0 z-30">
        <p className="font-bold text-2xl">Orders Data</p>
      </div>

      <div className="flex-1 bg-slate-100 overflow-auto">
        <main className="p-3 space-y-3">
          <input
            type="text"
            placeholder="Search by Cust Name, ID, Status, Product, Phone, or Shipping Add"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="border p-2 rounded-sm w-full"
          />

          <div className="overflow-auto">
            <table className="bg-white border-collapse overflow-hidden rounded-sm shadow-sm w-full">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    No
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Customer
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Product
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Quantity
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Total Price
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Payment Proof
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Shipping Address
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Customer Phone
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Shipping Method
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentOrders.map((order, index) => {
                  // Hitung nomor urut berdasarkan halaman saat ini dan indeks
                  const rowNumber =
                    (currentPage - 1) * itemsPerPage + index + 1;

                  return (
                    <tr
                      key={order.id}
                      className={`border-t text-sm ${getRowBackgroundColor(
                        order.status
                      )} transition-colors duration-200`}
                    >
                      <td className="px-4 py-3">{rowNumber}</td>{" "}
                      {/* Ganti order.id dengan rowNumber */}
                      <td className="px-4 py-3">
                        {order.user?.name || "Unknown User"}
                      </td>
                      <td className="px-4 py-3">
                        {order.orderedProduct?.name || "Unknown Product"}
                      </td>
                      <td className="px-4 py-3">{order.quantity}</td>
                      <td className="px-4 py-3">{`Rp${parseFloat(
                        order.totalPrice
                      ).toLocaleString("id-ID", {
                        minimumFractionDigits: 2,
                      })}`}</td>
                      <td className="px-4 py-3">{order.status}</td>
                      <td className="px-4 py-3">
                        {order.paymentProof ? (
                          <button
                            onClick={() =>
                              openImageInNewTab(order.paymentProof)
                            }
                            className="text-blue-500 hover:text-blue-700"
                          >
                            <Eye size={20} />
                          </button>
                        ) : (
                          "None"
                        )}
                      </td>
                      <td className="px-4 py-3">{order.shippingAddress}</td>
                      <td className="px-4 py-3">{order.customerPhoneNumber}</td>
                      <td className="px-4 py-3">{order.shippingMethod}</td>
                      <td className="px-4 py-3 space-x-2">
                        <button
                          onClick={() => openModal(order)}
                          className="bg-yellow-500 px-3 py-1.5 text-white rounded hover:bg-yellow-600"
                        >
                          Edit Status
                        </button>
                        <button
                          onClick={() => deleteOrder(order.id)}
                          className="bg-red-500 px-3 py-1.5 text-white rounded hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
                {currentOrders.length === 0 && (
                  <tr>
                    <td
                      colSpan="11"
                      className="px-4 py-3 text-center text-gray-500"
                    >
                      No orders found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

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
                <label className="block mb-2 text-sm font-medium">
                  Order ID: {selectedOrder.id}
                </label>
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
