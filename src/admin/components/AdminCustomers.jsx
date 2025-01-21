import React, { useState, useEffect } from "react";
import adminService from "../../services/adminService";

const AdminCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Fetch customers data
  const fetchCustomers = async () => {
    try {
      setIsLoading(true);
      const data = await adminService.getUsers();
      console.log("Fetched data:", data); // Untuk debugging
      setCustomers(data);
    } catch (err) {
      console.error("Error fetching users:", err); // Untuk debugging
      setError(err.message || "Failed to Load Customers Data!");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  // Handle edit customer
  const handleEdit = (customer) => {
    setEditingCustomer(customer);
    setEditForm({
      name: customer.name,
      email: customer.email,
      password: customer.password || "",
    });
  };

  const handleUpdate = async () => {
    try {
      // Only include password in update if it's been changed
      const updateData = {
        name: editForm.name,
        email: editForm.email,
      };

      if (editForm.password && editForm.password.trim() !== "") {
        updateData.password = editForm.password;
      }

      await adminService.updateUser(editingCustomer.id, updateData);
      setEditingCustomer(null);
      fetchCustomers();
      alert("Customer updated successfully!");
    } catch (error) {
      alert("Failed to update customer: " + (error.msg || "Unknown error"));
    }
  };

  // Handle delete customer
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      try {
        await adminService.deleteUser(id);
        fetchCustomers(); // Refresh the list
        alert("Customer deleted successfully!");
      } catch (error) {
        alert("Failed to delete customer: " + (error.msg || "Unknown error"));
      }
    }
  };

  // Search functionality
  const [searchTerm, setSearchTerm] = useState("");
  const filteredCustomers = customers.filter((customer) => {
    const term = searchTerm.toLowerCase();
    return (
      customer.name?.toLowerCase().includes(term) ||
      customer.email?.toLowerCase().includes(term)
    );
  });

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentCustomers = filteredCustomers.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  return (
    <div className="flex flex-col font-poppins min-h-screen">
      {/* Header */}
      <div className="bg-slate-100 flex items-center p-3 shadow-sm sticky top-0 z-30">
        <p className="font-bold text-2xl">Customers Data</p>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-slate-100 overflow-auto">
        <main className="p-3 space-y-3">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search by Name or Email"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="p-2 border border-gray-300 rounded-sm w-full"
          />

          {/* Edit Modal */}
          {editingCustomer && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg w-96">
                <h2 className="text-xl font-bold mb-4">Edit Customer</h2>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Name"
                    value={editForm.name}
                    onChange={(e) =>
                      setEditForm({ ...editForm, name: e.target.value })
                    }
                    className="p-2 border border-gray-300 rounded w-full"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={editForm.email}
                    onChange={(e) =>
                      setEditForm({ ...editForm, email: e.target.value })
                    }
                    className="p-2 border border-gray-300 rounded w-full"
                  />
                  <input
                    type="text" // Changed to text for visibility
                    placeholder="Password"
                    value={editForm.password}
                    onChange={(e) =>
                      setEditForm({ ...editForm, password: e.target.value })
                    }
                    className="p-2 border border-gray-300 rounded w-full"
                  />
                  <div className="flex justify-end gap-2 mt-4">
                    <button
                      onClick={() => setEditingCustomer(null)}
                      className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleUpdate}
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Customers Table */}
          <div className="overflow-auto">
            {isLoading ? (
              <p className="text-center text-gray-500">Loading...</p>
            ) : error ? (
              <p className="text-center text-red-500">{error}</p>
            ) : (
              <table className="bg-white border-collapse overflow-hidden rounded-sm shadow-sm w-full">
                <thead className="bg-gray-800 text-white">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold">
                      ID
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">
                      Name
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">
                      Email
                    </th>
                    <th className="px-4 py-3 text-center text-sm font-semibold">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentCustomers.map((customer) => (
                    <tr
                      key={customer.id}
                      className="border-t transition duration-200 text-sm"
                    >
                      <td className="px-4 py-3">{customer.id}</td>
                      <td className="px-4 py-3">{customer.name}</td>
                      <td className="px-4 py-3">{customer.email}</td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2 items-center justify-center">
                          <button
                            onClick={() => handleEdit(customer)}
                            className="flex items-center bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1.5 rounded transition duration-300"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(customer.id)}
                            className="flex items-center bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded transition duration-300"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Pagination */}
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
      </div>
    </div>
  );
};

export default AdminCustomers;
