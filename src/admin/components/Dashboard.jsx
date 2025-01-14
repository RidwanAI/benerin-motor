import React from "react";
import Sidebar from "./sidebar";
import Header from "./header";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  // Placeholder data counts; these would be fetched from an API or database in a real app
  const productCount = 120;
  const customerCount = 250;
  const paymentCount = 75;

  const navigate = useNavigate();

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 bg-gray-100">
        <Header />
        <main className="p-4">
          <h2 className="text-2xl font-bold mb-4">Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Product Data Card */}
            <div className="bg-white p-6 shadow rounded-lg flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-2">Data Produk</h3>
                <p className="text-4xl font-bold mb-4">{productCount}</p>
              </div>
              <button
                onClick={() => navigate("/products")}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                View All
              </button>
            </div>

            {/* Customer Data Card */}
            <div className="bg-white p-6 shadow rounded-lg flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-2">Data Customer</h3>
                <p className="text-4xl font-bold mb-4">{customerCount}</p>
              </div>
              <button
                onClick={() => navigate("/customers")}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                View All
              </button>
            </div>

            {/* Payment Data Card */}
            <div className="bg-white p-6 shadow rounded-lg flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-2">Data Pembayaran</h3>
                <p className="text-4xl font-bold mb-4">{paymentCount}</p>
              </div>
              <button
                onClick={() => navigate("/payments")}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                View All
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
