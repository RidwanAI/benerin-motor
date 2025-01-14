import React from "react";
import Sidebar from "../components/sidebar";
import Header from "../components/header";

const Customers = () => {
  // Dummy data for customers
  const customers = [
    { id: 1, name: "John Doe", email: "john@example.com", phone: "123-456-7890" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", phone: "098-765-4321" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", phone: "555-555-5555" },
  ];

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 bg-gray-100">
        <Header />
        <main className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Data Customer</h2>
            <button className="bg-blue-500 text-white px-4 py-2 rounded">Add Customer</button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow rounded-lg">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">ID</th>
                  <th className="py-2 px-4 border-b">Name</th>
                  <th className="py-2 px-4 border-b">Email</th>
                  <th className="py-2 px-4 border-b">Phone</th>
                  <th className="py-2 px-4 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer) => (
                  <tr key={customer.id}>
                    <td className="py-2 px-4 border-b text-center">{customer.id}</td>
                    <td className="py-2 px-4 border-b">{customer.name}</td>
                    <td className="py-2 px-4 border-b">{customer.email}</td>
                    <td className="py-2 px-4 border-b text-center">{customer.phone}</td>
                    <td className="py-2 px-4 border-b text-center">
                      <button className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">Edit</button>
                      <button className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Customers;
