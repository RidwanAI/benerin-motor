import React, { useState } from "react";

const AdminProducts = () => {
  // Function -> Data Dummy Products
  const initialProducts = [
    { id: 1, name: "Product A", price: "$10", stock: 100, description: "Kampas Ganda adalah..." },
    { id: 2, name: "Product B", price: "$20", stock: 100, description: "Kampas Ganda adalah..." },
    { id: 3, name: "Product C", price: "$30", stock: 100, description: "Kampas Ganda adalah..." },
    { id: 4, name: "Product A", price: "$10", stock: 100, description: "Kampas Ganda adalah..." },
    { id: 5, name: "Product B", price: "$20", stock: 100, description: "Kampas Ganda adalah..." },
    { id: 6, name: "Product C", price: "$30", stock: 100, description: "Kampas Ganda adalah..." },
    { id: 7, name: "Product D", price: "$40", stock: 80, description: "Kampas Ganda adalah..." },
    { id: 8, name: "Product E", price: "$50", stock: 60, description: "Kampas Ganda adalah..." },
    { id: 9, name: "Product F", price: "$60", stock: 50, description: "Kampas Ganda adalah..." },
    { id: 10, name: "Product A", price: "$10", stock: 100, description: "Kampas Ganda adalah..." },
    { id: 11, name: "Product B", price: "$20", stock: 100, description: "Kampas Ganda adalah..." },
    { id: 12, name: "Product C", price: "$30", stock: 100, description: "Kampas Ganda adalah..." },
    { id: 13, name: "Product D", price: "$40", stock: 80, description: "Kampas Ganda adalah..." },
    { id: 14, name: "Product E", price: "$50", stock: 60, description: "Kampas Ganda adalah..." },
    { id: 15, name: "Product F", price: "$60", stock: 50, description: "Kampas Ganda adalah..." },
  ];

  // Function -> Searching & Pagination
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [products, setProducts] = useState(initialProducts);
  const filteredProducts = products.filter((product) => product.name.toLowerCase().includes(searchQuery.toLowerCase()));
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const displayedProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Function -> Operation Crud Product
  const [newProduct, setNewProduct] = useState({ name: "", price: "", stock: "", description: "" });
  const [editingProduct, setEditingProduct] = useState(null);

  // Function -> Operation CRUD Products
  const addProduct = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.stock || !newProduct.description) return;
    const id = products.length + 1;
    setProducts([...products, { id, ...newProduct }]);
    setNewProduct({ name: "", price: "", stock: "", description: "" });
  };

  const editProduct = (id) => {
    const product = products.find((p) => p.id === id);
    setEditingProduct(product);
  };

  const updateProduct = () => {
    setProducts(products.map((product) => (product.id === editingProduct.id ? editingProduct : product)));
    setEditingProduct(null);
  };

  const deleteProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="flex flex-col font-poppins min-h-screen">
      <div className="flex-1">
        {/* Header */}
        <div className="bg-slate-100 flex items-center p-3 shadow-sm sticky top-0 z-30">
          <p className="text-2xl font-bold">Product Data</p>
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-slate-100 overflow-auto">
          <main className="p-3 space-y-3">
            {/* Fitur -> Add Product */}
            <div className="bg-white p-3 rounded-sm shadow-sm space-y-3 w-full">
              <p className="font-semibold text-slate-700 text-xl">Add New Product</p>
              <div className="flex gap-3 w-full">
                <input type="text" placeholder="Name" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} className="border px-2 py-1 rounded-sm w-full sm:w-1/2 md:w-1/3" />
                <input type="text" placeholder="Price" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} className="border px-2 py-1 rounded-sm w-full sm:w-1/2 md:w-1/3" />
                <input type="number" placeholder="Stock" value={newProduct.stock} onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })} className="border px-2 py-1 rounded-sm w-full sm:w-1/2 md:w-1/3" />
                <input type="text" placeholder="Description" value={newProduct.description} onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} className="border px-2 py-1 rounded-sm w-full sm:w-1/2 md:w-1/3" />
              </div>
              <div className="w-full">
                <button onClick={addProduct} className="bg-orange-500 duration-300 px-3 py-1.5 rounded-md transition text-sm text-white w-full hover:bg-orange-600 md:px-5 md:py-1.5">
                  Save
                </button>
              </div>
            </div>

            {/* Fitur -> Searching */}
            <input type="text" placeholder="Search by Product Name" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="border p-2 rounded-sm w-full" />

            {/* Fitur -> Table Product */}
            <div className="overflow-auto">
              <table className="bg-white border-collapse overflow-hidden rounded-sm shadow-sm w-full">
                <thead className="bg-gray-800 text-white">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold">ID</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Name</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Price</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Stock</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Description</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {displayedProducts.map((product) => (
                    <tr key={product.id} className="text-sm">
                      <td className="px-4 py-3">{product.id}</td>
                      <td className="px-4 py-3">{product.name}</td>
                      <td className="px-4 py-3">{product.price}</td>
                      <td className="px-4 py-3">{product.stock}</td>
                      <td className="px-4 py-3">{product.description}</td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2 items-center justify-center">
                          <button onClick={() => editProduct(product.id)} className="flex items-center bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1.5 rounded transition duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                              <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                            </svg>
                          </button>
                          <button onClick={() => deleteProduct(product.id)} className="flex items-center bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded transition duration-300">
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
            <div className="flex justify-between items-center">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                className="bg-orange-500 duration-300 px-3 py-1.5 rounded-md transition text-sm text-white disabled:opacity-50 hover:bg-orange-700 md:px-5 md:py-1.5"
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                className="bg-orange-500 duration-300 px-3 py-1.5 rounded-md transition text-sm text-white disabled:opacity-50 hover:bg-orange-700 md:px-5 md:py-1.5"
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>

            {/* Fitur -> Pop Up Edit Product */}
            {editingProduct && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-6 rounded-lg w-96">
                  <h3 className="text-xl font-semibold mb-4">Edit Product</h3>
                  <div className="flex flex-col space-y-2">
                    <input type="text" placeholder="Name" value={editingProduct.name} onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })} className="border px-2 py-1 rounded" />
                    <input type="text" placeholder="Price" value={editingProduct.price} onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })} className="border px-2 py-1 rounded" />
                    <input type="number" placeholder="Stock" value={editingProduct.stock} onChange={(e) => setEditingProduct({ ...editingProduct, stock: e.target.value })} className="border px-2 py-1 rounded" />
                    <input type="text" placeholder="Description" value={editingProduct.description} onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })} className="border px-2 py-1 rounded" />
                    <div className="flex justify-end space-x-2 mt-4">
                      <button onClick={() => setEditingProduct(null)} className="bg-slate-300 duration-300 px-3 py-1.5 rounded-md  hover:bg-slate-500 md:px-5 md:py-1.5">
                        Cancel
                      </button>
                      <button onClick={updateProduct} className="bg-orange-500 duration-300 px-3 py-1.5 rounded-md text-white hover:bg-orange-700 md:px-5 md:py-1.5">
                        Update
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;
