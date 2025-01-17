// AdminCustomers -> Front-End Web & UI Done
import React, { useState } from "react";

const AdminCustomers = () => {
  // Function -> Data Dummy Customers
  const customers = [
    { id: 1, name: "Achmad Rizky", email: "rizky@example.com", phone: "0895-7652-1192" },
    { id: 2, name: "Fadilano Abraham", email: "fadilano@example.com", phone: "0895-7652-1192" },
    { id: 3, name: "Muhammad Ridwan", email: "ridwan@example.com", phone: "0895-7652-1192" },
    { id: 4, name: "Rayhan Pasyaputra", email: "rayhan@example.com", phone: "0895-7652-1192" },
    { id: 5, name: "Rendi Irgi Ardiansyah", email: "rendi@example.com", phone: "0895-7652-1192" },
    { id: 6, name: "Raihan Darrel Aryanto", email: "raihan@example.com", phone: "0895-7652-1192" },
    { id: 7, name: "Muhammad Ilham N", email: "ilham@example.com", phone: "0895-7652-1192" },
    { id: 8, name: "Muhammad Fadhil T", email: "fadhil@example.com", phone: "0895-7652-1192" },
    { id: 9, name: "Ahmad Rafif", email: "rafif@example.com", phone: "0895-7652-1192" },
    { id: 10, name: "Ahmad Choirul", email: "irul@example.com", phone: "0895-7652-1192" },
    { id: 11, name: "Tengku Revino", email: "vino@example.com", phone: "0895-7652-1192" },
    { id: 12, name: "Maulana Bintang", email: "bintang@example.com", phone: "0895-7652-1192" },
  ];

  // Function -> Searching
  const [searchTerm, setSearchTerm] = useState("");
  const filteredCustomers = customers.filter((customer) => {
    const term = searchTerm.toLowerCase();
    return customer.name.toLowerCase().includes(term) || customer.phone.toLowerCase().includes(term);
  });

  // Function -> Pagination
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
                {currentCustomers.length === 0 && (
                  <tr>
                    <td colSpan="5" className="px-4 py-3 text-center text-gray-500">
                      No customers found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
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
