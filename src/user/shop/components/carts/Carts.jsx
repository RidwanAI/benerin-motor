import React, { useState, useEffect } from "react";
import { cartService } from "../../../../services/cartService";

const Carts = () => {
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [shippingAddress, setShippingAddress] = useState("");
  const [customerPhoneNumber, setCustomerPhoneNumber] = useState("");
  const [selectedShippingMethod, setSelectedShippingMethod] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        setLoading(true);
        const currentUser = await cartService.getCurrentUser();
        const userId = currentUser.id;

        const data = await cartService.fetchCartItems(userId);
        setCartItems(data);
        setError(null); // Reset error if data is fetched successfully
      } catch (err) {
        if (err.response?.status === 404) {
          // Handle 404 (Not Found) - no items in the cart
          setCartItems([]); // Set cartItems to an empty array
          setError(null); // No need to show an error
        } else {
          console.error(err);
          setError(
            err.response?.data?.message ||
              "Failed to fetch cart items. Please try again later."
          );
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const handleSelectItem = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      if (selectedItems.includes(item.id)) {
        const price = parseFloat(item.product.price.replace(/[^\d.]/g, ""));
        return total + price * item.quantity;
      }
      return total;
    }, 0);
  };

  const handleCheckoutClick = () => {
    if (!selectedItems.length) {
      alert("Please select items to checkout.");
      return;
    }
    setModalVisible(true);
  };

  const handleCheckout = async () => {
    if (!shippingAddress || !customerPhoneNumber || !selectedShippingMethod) {
      alert("Please fill in all the required fields.");
      return;
    }

    try {
      const currentUser = await cartService.getCurrentUser();
      const userId = currentUser.id;

      const shippingDetails = {
        shippingAddress,
        customerPhoneNumber,
        shippingMethod: selectedShippingMethod,
      };

      await cartService.checkout(userId, selectedItems, shippingDetails);

      alert("Checkout successful!");
      setCartItems((prev) =>
        prev.filter((item) => !selectedItems.includes(item.id))
      );
      setSelectedItems([]);
      setModalVisible(false);
    } catch (error) {
      console.error("Error during checkout", error);
      alert("Checkout failed, please try again.");
    }
  };

  const adjustQuantity = async (id, delta) => {
    try {
      const item = cartItems.find((item) => item.id === id);
      const newQuantity = item.quantity + delta;

      if (newQuantity < 1) return;

      const data = await cartService.adjustQuantity(id, newQuantity);
      setCartItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, quantity: data.quantity } : item))
      );
    } catch (err) {
      console.error("Failed to update quantity.", err);
      setError("Failed to update quantity. Please try again later.");
    }
  };

  const removeItem = async (id) => {
    try {
      await cartService.removeItem(id);
      setCartItems((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Failed to remove item from cart.", err);
      setError("Failed to remove item. Please try again later.");
    }
  };

  if (loading) return <p>Loading cart items...</p>;

  return (
    <div className="flex flex-col font-poppins">
      <div className="flex-1">
        <div className="bg-white flex items-center justify-between p-3 sticky top-0 z-10">
          <p className="font-semibold text-xl md:text-2xl">Cart</p>
        </div>
        <div className="p-3 space-y-3">
          {cartItems.length === 0 && (
            <p className="text-center text-gray-500">Your cart is empty.</p>
          )}

          {cartItems.map((item) => (
            <div key={item.id} className="bg-white flex flex-col gap-2 p-3">
              <div className="flex items-center space-x-2">
                <div className="flex gap-2 items-center">
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item.id)}
                    onChange={() => handleSelectItem(item.id)}
                    className="ml-4"
                  />
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="cursor-pointer h-24 object-cover rounded-sm w-24"
                  />
                </div>
                <div className="flex flex-col space-y-3 w-1/2">
                  <div className="flex flex-col truncate w-auto">
                    <p className="font-semibold text-md">{item.product.name}</p>
                    <p className="text-xs md:text-sm text-slate-500">{`Rp.${parseFloat(
                      item.product.price
                    ).toLocaleString("id-ID", {
                      minimumFractionDigits: 2,
                    })}`}</p>
                  </div>
                  <div className="flex gap-2 items-center">
                    <button
                      onClick={() => adjustQuantity(item.id, -1)}
                      className="flex gap-2 items-center"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => adjustQuantity(item.id, 1)}
                      className="flex gap-2 items-center"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              <button
                onClick={() => removeItem(item.id)}
                className="duration-300 flex items-center justify-center text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          ))}
          {cartItems.length > 0 && (
            <div className="bg-white flex items-center justify-between p-3 rounded-sm">
              <p className="font-semibold text-md md:text-xl">
                Total: Rp.{calculateTotal().toLocaleString()}
              </p>
              <button
                onClick={handleCheckoutClick}
                className="bg-orange-500 duration-300 px-3 py-1.5 rounded-md text-white hover:bg-orange-700 md:px-5 md:py-1.5"
              >
                Checkout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modal => Checkout */}
      {isModalVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-1/3 shadow-lg">
            <h2 className="text-lg font-bold mb-4">Complete Your Checkout</h2>

            <div className="mb-4">
              <label className="block font-medium mb-2" htmlFor="shippingAddress">
                Shipping Address
              </label>
              <input
                type="text"
                id="shippingAddress"
                value={shippingAddress}
                onChange={(e) => setShippingAddress(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded-md"
                placeholder="Enter your shipping address"
              />
            </div>

            <div className="mb-4">
              <label className="block font-medium mb-2" htmlFor="customerPhoneNumber">
                Phone Number
              </label>
              <input
                type="text"
                id="customerPhoneNumber"
                value={customerPhoneNumber}
                onChange={(e) => setCustomerPhoneNumber(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded-md"
                placeholder="Enter your phone number"
              />
            </div>

            <div className="mb-4">
              <label className="block font-medium mb-2">Shipping Method</label>
              <select
                value={selectedShippingMethod}
                onChange={(e) => setSelectedShippingMethod(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded-md"
              >
                <option value="" disabled>
                  Select shipping method
                </option>
                <option value="JNE">JNE</option>
                <option value="JNT">JNT</option>
                <option value="Shopee Express">Shopee Express</option>
                <option value="Gojek">Gojek</option>
              </select>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setModalVisible(false)}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700"
              >
                Cancel
              </button>
              <button
                onClick={handleCheckout}
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700"
              >
                Confirm Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Carts;
