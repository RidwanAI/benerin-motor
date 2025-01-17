import React, { useState } from "react";

const AdminOrders = () => {
  // Function -> Data Dummy Orders
  const [orders, setOrders] = useState([
    {
      id: 1,
      customer: "Achmad Rizky",
      product: "Kampas Ganda Aerox/Nmax",
      unit: "2",
      category: "New",
      amount: "270000",
      date: "2025-01-01",
      proofofpayment: "None",
      status: "Pending",
      progress: "Pending",
      message: "Barang ada kecacatan dan rusak!",
      proofofvideo: "View Video",
    },
    {
      id: 2,
      customer: "Fadilano Abraham",
      product: "Shock Depan Aerox/Nmax",
      unit: "1",
      category: "New",
      amount: "500000",
      date: "2025-01-02",
      proofofpayment: "View Payment",
      status: "Paid",
      progress: "In Process",
      message: "Barang bagus",
      proofofvideo: "None",
    },
    {
      id: 3,
      customer: "Muhammad Ridwan",
      product: "Shockbreaker Aerox/Nmax",
      unit: "2",
      category: "Second",
      amount: "800000",
      date: "2025-01-03",
      proofofpayment: "None",
      status: "Pending",
      progress: "Pending",
      message: "Barang telah sampai bagus dan tidak ada cacat.",
      proofofvideo: "None",
    },
    {
      id: 4,
      customer: "Rendi Irgi Ardiansyah",
      product: "Soket Spull CVT Aerox/Nmax",
      unit: "2",
      category: "Second",
      amount: "800000",
      date: "2025-01-03",
      proofofpayment: "None",
      status: "Pending",
      progress: "Pending",
      message: "Barang telah sampai bagus dan tidak ada cacat.",
      proofofvideo: "None",
    },
    {
      id: 5,
      customer: "Muhammad Rayhan Pasyaputra",
      product: "Roller 12g Aerox/Nmax",
      unit: "2",
      category: "New",
      amount: "800000",
      date: "2025-01-03",
      proofofpayment: "None",
      status: "Pending",
      progress: "Pending",
      message: "Barang telah sampai bagus dan tidak ada cacat.",
      proofofvideo: "None",
    },
    {
      id: 6,
      customer: "Raihan Darrel Aryanto",
      product: "Lampu Sein Aerox/Nmax",
      unit: "2",
      category: "Second",
      amount: "800000",
      date: "2025-01-03",
      proofofpayment: "None",
      status: "Pending",
      progress: "Pending",
      message: "Barang telah sampai bagus dan tidak ada cacat.",
      proofofvideo: "None",
    },
    {
      id: 7,
      customer: "Muhammad Ilham Nugroho",
      product: "Ban TDR Aerox/Nmax",
      unit: "2",
      category: "Second",
      amount: "800000",
      date: "2025-01-03",
      proofofpayment: "None",
      status: "Pending",
      progress: "Pending",
      message: "Barang telah sampai bagus dan tidak ada cacat.",
      proofofvideo: "None",
    },
    {
      id: 8,
      customer: "Fadhil Triono",
      product: "Cover Air Radiator Aerox/Nmax",
      unit: "2",
      category: "Second",
      amount: "800000",
      date: "2025-01-03",
      proofofpayment: "None",
      status: "Pending",
      progress: "Pending",
      message: "Barang telah sampai bagus dan tidak ada cacat.",
      proofofvideo: "None",
    },
    {
      id: 9,
      customer: "Rafly Ramadan",
      product: "Kampas Depan Aerox/Nmax",
      unit: "2",
      category: "Second",
      amount: "800000",
      date: "2025-01-03",
      proofofpayment: "None",
      status: "Pending",
      progress: "Pending",
      message: "Barang telah sampai bagus dan tidak ada cacat.",
      proofofvideo: "None",
    },
    {
      id: 10,
      customer: "Muhammad Alfin Farhansyah",
      product: "Piringan Rem Aerox/Nmax",
      unit: "2",
      category: "New",
      amount: "800000",
      date: "2025-01-03",
      proofofpayment: "None",
      status: "Pending",
      progress: "Pending",
      message: "Barang telah sampai bagus dan tidak ada cacat.",
      proofofvideo: "None",
    },
    {
      id: 11,
      customer: "Tengku Revino Buana Putra",
      product: "Busi TTR Aerox/Nmax",
      unit: "2",
      category: "Second",
      amount: "800000",
      date: "2025-01-03",
      proofofpayment: "None",
      status: "Pending",
      progress: "Pending",
      message: "Barang telah sampai bagus dan tidak ada cacat.",
      proofofvideo: "None",
    },
  ]);

  // Function -> Handle Status & Progress Change
  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    if (newStatus === "Pending") {
      setProgress("Pending");
    } else if (newStatus === "Paid" || newStatus === "Shipped") {
      setProgress("In Process");
    } else if (newStatus === "Completed") {
      setProgress("Completed");
    } else if (newStatus === "Cancelled") {
      setProgress("Problem");
    }
  };

  // Function -> Pop Up Modal Action Edit
  const [status, setStatus] = useState("");
  const [progress, setProgress] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const openModal = (order) => {
    setSelectedOrder(order);
    setStatus(order.status);
    setProgress(order.progress);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
    setStatus("");
    setProgress("");
  };

  const updateStatus = () => {
    if (selectedOrder) {
      const updatedOrders = orders.map((order) => (order.id === selectedOrder.id ? { ...order, status: status, progress: progress } : order));
      setOrders(updatedOrders);
      closeModal();
    }
  };

  // Function -> Search Term
  const [searchTerm, setSearchTerm] = useState("");
  const filteredOrders = orders
    .filter((order) => {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      return order.status.toLowerCase().includes(lowerCaseSearchTerm) || order.progress.toLowerCase().includes(lowerCaseSearchTerm);
    })
    .sort((a, b) => {
      // Function -> Sorting by Status
      const statusPriority = {
        pending: 1,
        cancelled: 2,
        paid: 3,
        shipped: 4,
        completed: 5,
      };

      const aStatusPriority = statusPriority[a.status.toLowerCase()] || 0;
      const bStatusPriority = statusPriority[b.status.toLowerCase()] || 0;

      if (aStatusPriority < bStatusPriority) return -1;
      if (aStatusPriority > bStatusPriority) return 1;

      return 0;
    });

  // Function -> Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const paginateOrders = filteredOrders.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  return (
    <div className="flex flex-col font-poppins min-h-screen">
      {/* Header */}
      <div className="bg-slate-100 flex items-center p-3 shadow-sm sticky top-0 z-30">
        <p className="font-bold text-2xl">Orders Data</p>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-slate-100 overflow-auto">
        <main className="p-3 space-y-3">
          {/* Fitur -> Searching */}
          <input type="text" placeholder="Search by Status or Progress" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="p-2 border border-gray-300 rounded-sm w-full" />

          {/* Fitur -> Table Orders */}
          <div className="overflow-auto">
            <table className="bg-white border-collapse overflow-hidden rounded-sm shadow-sm w-full">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold">ID</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Customer</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Product</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Unit</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Category</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Amount</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Date</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Proof Of Payment</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Progress</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Message</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Proof Of Video</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginateOrders.map((order) => (
                  <tr
                    key={order.id}
                    className={`border-t transition duration-200 text-sm 
                  ${
                    order.status === "Cancelled" && order.progress === "Problem"
                      ? "bg-red-700 text-white"
                      : order.status === "Paid"
                      ? "bg-blue-700 text-white"
                      : order.status === "Shipped"
                      ? "bg-yellow-700 text-white"
                      : order.status === "Completed"
                      ? "bg-green-700 text-white"
                      : ""
                  }`}
                  >
                    <td className="px-4 py-3">{order.id}</td>
                    <td className="px-4 py-3">{order.customer}</td>
                    <td className="px-4 py-3">{order.product}</td>
                    <td className="px-4 py-3">{order.unit}</td>
                    <td className="px-4 py-3">{order.category}</td>
                    <td className="px-4 py-3">{order.amount}</td>
                    <td className="px-4 py-3">{order.date}</td>
                    <td className="px-4 py-3">{order.proofofpayment}</td>
                    <td className="px-4 py-3">{order.status}</td>
                    <td className="px-4 py-3">{order.progress}</td>
                    <td className="px-4 py-3">{order.message}</td>
                    <td className="px-4 py-3">{order.proofofvideo}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2 items-center justify-center">
                        <button className="flex items-center bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1.5 rounded transition duration-300" onClick={() => openModal(order)}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                          </svg>
                        </button>
                        <button className="flex items-center bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded transition duration-300">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Fitur -> Pagination */}
          <div className="flex items-center justify-between">
            <button
              className="bg-orange-500 duration-300 px-3 py-1.5 rounded-md transition text-sm text-white disabled:opacity-50 hover:bg-orange-700 md:px-5 md:py-1.5"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="bg-orange-500 duration-300 px-3 py-1.5 rounded-md transition text-sm text-white disabled:opacity-50 hover:bg-orange-700 md:px-5 md:py-1.5"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </main>

        {/* Fitur -> Pop Up Editing Status & Progress Product */}
        {isModalOpen && selectedOrder && (
          <div className="bg-slate-500 bg-opacity-50 fixed flex inset-0 items-center justify-center px-3 z-50">
            <div className="bg-white p-3 rounded-sm space-y-3 w-full md:w-1/3">
              <p className="text-xl font-semibold">Edit Order Status</p>
              <div className="space-y-3">
                <label className="block text-sm">Order ID : {selectedOrder.id}</label>
                <select value={status} onChange={handleStatusChange} className="border p-2 rounded-sm w-full">
                  <option value="Pending">Pending</option>
                  <option value="Paid">Paid</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
                <label className="block text-sm">Progress</label>
                <input type="text" value={progress} readOnly className="border p-2 rounded-sm w-full" />
              </div>
              <div className="flex justify-end gap-2">
                <button className="bg-slate-300 duration-300 px-3 py-1.5 rounded-md hover:bg-slate-500 md:px-5 md:py-1.5" onClick={closeModal}>
                  Cancel
                </button>
                <button className="bg-orange-500 duration-300 px-3 py-1.5 rounded-md text-white hover:bg-orange-700 md:px-5 md:py-1.5" onClick={updateStatus}>
                  Save Changes
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
