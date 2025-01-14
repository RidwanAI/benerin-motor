import React from "react";
import Sidebar from "../components/sidebar";
import Header from "../components/header";

const Payments = () => {
  // Dummy data for payments
  const payments = [
    { id: 1, customer: "John Doe", amount: "$100", date: "2023-09-01" },
    { id: 2, customer: "Jane Smith", amount: "$200", date: "2023-09-05" },
    { id: 3, customer: "Bob Johnson", amount: "$150", date: "2023-09-10" },
  ];

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 bg-gray-100">
        <Header />
        <main className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Data Pembayaran</h2>
            <button className="bg-blue-500 text-white px-4 py-2 rounded">Add Payment</button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow rounded-lg">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">ID</th>
                  <th className="py-2 px-4 border-b">Customer</th>
                  <th className="py-2 px-4 border-b">Amount</th>
                  <th className="py-2 px-4 border-b">Date</th>
                  <th className="py-2 px-4 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr key={payment.id}>
                    <td className="py-2 px-4 border-b text-center">{payment.id}</td>
                    <td className="py-2 px-4 border-b">{payment.customer}</td>
                    <td className="py-2 px-4 border-b text-center">{payment.amount}</td>
                    <td className="py-2 px-4 border-b text-center">{payment.date}</td>
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

export default Payments;
