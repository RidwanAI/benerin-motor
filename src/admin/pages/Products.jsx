import React, { useState } from "react";
import Sidebar from "../components/sidebar";
import Header from "../components/header";

const Products = () => {
  // Initial dummy data
  const initialProducts = [
    { id: 1, name: "Product A", price: "$10", stock: 100 },
    { id: 2, name: "Product B", price: "$20", stock: 50 },
    { id: 3, name: "Product C", price: "$30", stock: 75 },
  ];

  const [products, setProducts] = useState(initialProducts);
  const [newProduct, setNewProduct] = useState({ name: "", price: "", stock: "" });
  const [editingProduct, setEditingProduct] = useState(null);

  // Add Product
  const addProduct = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.stock) return;
    const id = products.length + 1;
    setProducts([...products, { id, ...newProduct }]);
    setNewProduct({ name: "", price: "", stock: "" });
  };

  // Edit Product
  const editProduct = (id) => {
    const product = products.find((p) => p.id === id);
    setEditingProduct(product);
  };

  // Update Product
  const updateProduct = () => {
    setProducts(
      products.map((product) =>
        product.id === editingProduct.id ? editingProduct : product
      )
    );
    setEditingProduct(null);
  };

  // Delete Product
  const deleteProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 bg-gray-100">
        <Header />
        <main className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Data Produk</h2>
            <button
              onClick={addProduct}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Add Product
            </button>
          </div>

          {/* Add Product Form */}
          <div className="mb-4">
            <h3 className="text-xl font-semibold mb-2">Add New Product</h3>
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Name"
                value={newProduct.name}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, name: e.target.value })
                }
                className="border px-2 py-1 rounded"
              />
              <input
                type="text"
                placeholder="Price"
                value={newProduct.price}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, price: e.target.value })
                }
                className="border px-2 py-1 rounded"
              />
              <input
                type="number"
                placeholder="Stock"
                value={newProduct.stock}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, stock: e.target.value })
                }
                className="border px-2 py-1 rounded"
              />
              <button
                onClick={addProduct}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          </div>

          {/* Products Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow rounded-lg">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">ID</th>
                  <th className="py-2 px-4 border-b">Name</th>
                  <th className="py-2 px-4 border-b">Price</th>
                  <th className="py-2 px-4 border-b">Stock</th>
                  <th className="py-2 px-4 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td className="py-2 px-4 border-b text-center">{product.id}</td>
                    <td className="py-2 px-4 border-b">{product.name}</td>
                    <td className="py-2 px-4 border-b text-center">{product.price}</td>
                    <td className="py-2 px-4 border-b text-center">{product.stock}</td>
                    <td className="py-2 px-4 border-b text-center">
                      <button
                        onClick={() => editProduct(product.id)}
                        className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteProduct(product.id)}
                        className="bg-red-500 text-white px-2 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Edit Product Modal */}
          {editingProduct && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded-lg w-96">
                <h3 className="text-xl font-semibold mb-4">Edit Product</h3>
                <div className="flex flex-col space-y-2">
                  <input
                    type="text"
                    placeholder="Name"
                    value={editingProduct.name}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, name: e.target.value })
                    }
                    className="border px-2 py-1 rounded"
                  />
                  <input
                    type="text"
                    placeholder="Price"
                    value={editingProduct.price}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, price: e.target.value })
                    }
                    className="border px-2 py-1 rounded"
                  />
                  <input
                    type="number"
                    placeholder="Stock"
                    value={editingProduct.stock}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, stock: e.target.value })
                    }
                    className="border px-2 py-1 rounded"
                  />
                  <div className="flex justify-end space-x-2 mt-4">
                    <button
                      onClick={updateProduct}
                      className="bg-green-500 text-white px-4 py-2 rounded"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => setEditingProduct(null)}
                      className="bg-gray-500 text-white px-4 py-2 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Products;
