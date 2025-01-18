import React, { useState, useEffect } from "react";
import adminService from "../../services/adminService"; // Adjust import path if needed

const AdminProducts = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    stock: "",
    specs: "",
    label: "",
    sold: "",
    rating: "",
  });
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await adminService.getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const displayedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const addProduct = async () => {
    if (
      !newProduct.name ||
      !newProduct.price ||
      !newProduct.stock ||
      !newProduct.specs ||
      !newProduct.label ||
      !newProduct.sold ||
      !newProduct.rating ||
      !newProduct.image
    ) {
      alert("Please fill out all fields before saving.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", newProduct.name);
      formData.append("price", newProduct.price);
      formData.append("stock", newProduct.stock);
      formData.append("specs", newProduct.specs);
      formData.append("label", newProduct.label);
      formData.append("sold", newProduct.sold);
      formData.append("rating", newProduct.rating);
      formData.append("image", newProduct.image);

      const createdProduct = await adminService.createProduct(formData);
      setProducts([...products, createdProduct]);
      setNewProduct({
        name: "",
        price: "",
        stock: "",
        specs: "",
        label: "",
        sold: "",
        rating: "",
        image: null,
      });

      // Show success alert
      alert("Product created successfully!");
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to create the product. Please try again.");
    }
  };

  const editProduct = (id) => {
    const product = products.find((p) => p.id === id);
    setEditingProduct(product);
  };

  const updateProduct = async () => {
    try {
      const updatedProduct = await adminService.updateProduct(
        editingProduct.id,
        editingProduct
      );
      setProducts(
        products.map((product) =>
          product.id === editingProduct.id ? updatedProduct : product
        )
      );
      setEditingProduct(null);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const deleteProduct = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirmDelete) return;

    try {
      await adminService.deleteProduct(id);
      setProducts(products.filter((product) => product.id !== id));

      // Show success alert
      alert("Product deleted successfully!");
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete the product. Please try again.");
    }
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
            {/* Search */}
            <input
              type="text"
              placeholder="Search by Product Name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border p-2 rounded-sm w-full"
            />

            {/* Table */}
            <div className="overflow-auto">
              <table className="bg-white border-collapse overflow-hidden rounded-sm shadow-sm w-full">
                <thead className="bg-gray-800 text-white">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold">
                      ID
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">
                      Image
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">
                      Name
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">
                      Price
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">
                      Specs
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">
                      Label
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">
                      Stock
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">
                      Sold
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">
                      Rating
                    </th>
                    <th className="px-4 py-3 text-center text-sm font-semibold">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {displayedProducts.map((product) => (
                    <tr key={product.id} className="text-sm">
                      <td className="px-4 py-3">{product.id}</td>
                      <td className="px-4 py-3">
                        <a
                          href={product.image}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-16 h-16 object-cover rounded"
                          />
                        </a>
                      </td>
                      <td className="px-4 py-3">{product.name}</td>
                      <td className="px-4 py-3">{`Rp.${parseFloat(
                        product.price
                      ).toLocaleString("id-ID", {
                        minimumFractionDigits: 2,
                      })}`}</td>
                      <td className="px-4 py-3">{product.specs}</td>
                      <td className="px-4 py-3">{product.label}</td>
                      <td className="px-4 py-3">{product.stock}</td>
                      <td className="px-4 py-3">{product.sold}</td>
                      <td className="px-4 py-3">{product.rating}</td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2 items-center justify-center">
                          <button
                            onClick={() => editProduct(product.id)}
                            className="flex items-center bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1.5 rounded transition duration-300"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => deleteProduct(product.id)}
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
            </div>

            {/* Pagination */}
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

            {/* Add Product */}
            <div className="bg-white p-3 rounded-sm shadow-sm space-y-3 w-full">
              <p className="font-semibold text-slate-700 text-xl">
                Add New Product
              </p>
              <div className="flex flex-wrap gap-3">
                <input
                  type="text"
                  placeholder="Name"
                  value={newProduct.name}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, name: e.target.value })
                  }
                  className="border px-2 py-1 rounded-sm w-full sm:w-1/3"
                />
                <input
                  type="text"
                  placeholder="Price"
                  value={newProduct.price}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, price: e.target.value })
                  }
                  className="border px-2 py-1 rounded-sm w-full sm:w-1/3"
                />
                <input
                  type="number"
                  placeholder="Stock"
                  value={newProduct.stock}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, stock: e.target.value })
                  }
                  className="border px-2 py-1 rounded-sm w-full sm:w-1/3"
                />
                <input
                  type="text"
                  placeholder="Specs"
                  value={newProduct.specs}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, specs: e.target.value })
                  }
                  className="border px-2 py-1 rounded-sm w-full sm:w-1/3"
                />
                <input
                  type="text"
                  placeholder="Label"
                  value={newProduct.label}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, label: e.target.value })
                  }
                  className="border px-2 py-1 rounded-sm w-full sm:w-1/3"
                />
                <input
                  type="number"
                  placeholder="Sold"
                  value={newProduct.sold}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, sold: e.target.value })
                  }
                  className="border px-2 py-1 rounded-sm w-full sm:w-1/3"
                />
                <input
                  type="number"
                  step="0.1"
                  placeholder="Rating"
                  value={newProduct.rating}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, rating: e.target.value })
                  }
                  className="border px-2 py-1 rounded-sm w-full sm:w-1/3"
                />
              </div>
              <div className="flex flex-wrap gap-3">
                {/* Other input fields */}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, image: e.target.files[0] })
                  }
                  className="border px-2 py-1 rounded-sm w-full sm:w-1/3"
                />
              </div>
              <div className="w-full">
                <button
                  onClick={addProduct}
                  className="bg-orange-500 duration-300 px-3 py-1.5 rounded-md transition text-sm text-white w-full hover:bg-orange-600 md:px-5 md:py-1.5"
                >
                  Save
                </button>
              </div>
            </div>
            
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;
