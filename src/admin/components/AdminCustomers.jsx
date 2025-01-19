import React, { useState, useEffect } from "react";
import adminService from "../../services/adminService"; // Ensure the correct path to adminService

const AdminCustomers = () => {
  // State for customers data
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function -> Fetch customers from API
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        setIsLoading(true);
        const data = await adminService.getUsers(); // Call API to fetch users
        setCustomers(data); // Update state with fetched data
      } catch (err) {
        setError(err.message || "Failed to load customers data.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  // State -> Searching
  const [searchTerm, setSearchTerm] = useState("");
  const filteredCustomers = customers.filter((customer) => {
    const term = searchTerm.toLowerCase();
    return customer.name.toLowerCase().includes(term) || customer.phone.toLowerCase().includes(term);
  });

  // State -> Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentCustomers = filteredCustomers.slice(startIndex, startIndex + itemsPerPage);

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
          {/* Fitur -> Searching */}
          <input
            type="text"
            placeholder="Search by Name or Phone"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="p-2 border border-gray-300 rounded-sm w-full"
          />

          {/* Fitur -> Table Customers */}
          <div className="overflow-auto">
            {isLoading ? (
              <p className="text-center text-gray-500">Loading...</p>
            ) : error ? (
              <p className="text-center text-red-500">{error}</p>
            ) : (
              <table className="bg-white border-collapse overflow-hidden rounded-sm shadow-sm w-full">
                <thead className="bg-gray-800 text-white">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold">ID</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Name</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Email</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Phone</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentCustomers.map((customer) => (
                    <tr key={customer.id} className="border-t transition duration-200 text-sm">
                      <td className="px-4 py-3">{customer.id}</td>
                      <td className="px-4 py-3">{customer.name}</td>
                      <td className="px-4 py-3">{customer.email}</td>
                      <td className="px-4 py-3">{customer.phone}</td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2 items-center justify-center">
                          <button className="flex items-center bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1.5 rounded transition duration-300">
                            Edit
                          </button>
                          <button className="flex items-center bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded transition duration-300">
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {currentCustomers.length === 0 && (
                    <tr>
                      <td colSpan="5" className="px-4 py-3 text-center text-gray-500">
                        No customers found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>

          {/* Fitur -> Pagination */}
          <div className="flex items-center justify-between">
            <button onClick={goToPreviousPage} disabled={currentPage === 1} className="bg-orange-500 duration-300 px-3 py-1.5 rounded-md transition text-sm text-white disabled:opacity-50 hover:bg-orange-700">
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button onClick={goToNextPage} disabled={currentPage === totalPages} className="bg-orange-500 duration-300 px-3 py-1.5 rounded-md transition text-sm text-white disabled:opacity-50 hover:bg-orange-700">
              Next
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminCustomers;
