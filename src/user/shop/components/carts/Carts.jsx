import React, { useState, useEffect } from "react";
import { cartService } from "../../../../services/cartService";

const SHIPPING_COST = 15000;

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
        setError(null);
      } catch (err) {
        if (err.response?.status === 404) {
          setCartItems([]);
          setError(null);
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

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      if (selectedItems.includes(item.id)) {
        const price = parseFloat(item.product.price);
        return total + price * item.quantity;
      }
      return total;
    }, 0);
  };

  const calculateTotal = () => {
    return selectedShippingMethod
      ? calculateSubtotal() + SHIPPING_COST
      : calculateSubtotal();
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

      const selectedCartItems = cartItems.filter((item) =>
        selectedItems.includes(item.id)
      );
      const subtotal = calculateSubtotal();
      const totalWithShipping = subtotal + SHIPPING_COST;

      const checkoutData = {
        userId,
        selectedCartItemIds: selectedItems,
        cartItems: selectedCartItems,
        shippingAddress,
        customerPhoneNumber,
        shippingMethod: selectedShippingMethod,
        shippingCost: SHIPPING_COST,
        totalAmount: totalWithShipping,
        subtotal: subtotal,
      };

      await cartService.checkout(checkoutData);

      alert("Checkout successful!");
      setCartItems((prev) =>
        prev.filter((item) => !selectedItems.includes(item.id))
      );
      setSelectedItems([]);
      setModalVisible(false);
    } catch (error) {
      console.error("Error during checkout:", error);
      alert("Checkout failed, please try again.");
    }
  };

  const adjustQuantity = async (id, delta) => {
    try {
      const item = cartItems.find((item) => item.id === id);
      const newQuantity = item.quantity + delta;

      if (newQuantity < 1) return;

      const updatedItem = await cartService.adjustQuantity(
        id,
        newQuantity,
        item.quantity
      );

      setCartItems((prev) =>
        prev.map((cartItem) =>
          cartItem.id === id
            ? { ...cartItem, quantity: updatedItem.quantity }
            : cartItem
        )
      );
    } catch (err) {
      console.error("Failed to update quantity.", err);
      if (err.response?.data?.message === "Insufficient stock") {
        alert("Not enough stock available");
      } else {
        setError("Failed to update quantity. Please try again later.");
      }
    }
  };

  const removeItem = async (id) => {
    try {
      const item = cartItems.find((item) => item.id === id);
      if (!item) return;

      await cartService.removeItem(id, item.quantity, item.productId);

      setCartItems((prev) => prev.filter((cartItem) => cartItem.id !== id));
      setSelectedItems((prev) => prev.filter((itemId) => itemId !== id));
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
            <div
              key={item.id}
              className="bg-white flex flex-col gap-2 p-3 rounded-lg shadow-sm"
            >
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
                    <p className="text-xs md:text-sm text-slate-500">{`Rp${parseFloat(
                      item.product.price
                    ).toLocaleString("id-ID", {
                      minimumFractionDigits: 2,
                    })}`}</p>
                  </div>
                  <div className="flex gap-2 items-center">
                    <button
                      onClick={() => adjustQuantity(item.id, -1)}
                      className="bg-gray-100 hover:bg-gray-200 h-8 w-8 rounded-md flex items-center justify-center"
                    >
                      -
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => adjustQuantity(item.id, 1)}
                      className="bg-gray-100 hover:bg-gray-200 h-8 w-8 rounded-md flex items-center justify-center"
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
            <div className="bg-white flex items-center justify-between p-3 rounded-lg shadow-sm">
              <p className="font-semibold text-md md:text-xl">
                Total: Rp
                {parseFloat(calculateTotal()).toLocaleString("id-ID", {
                  minimumFractionDigits: 2,
                })}
              </p>
              <button
                onClick={handleCheckoutClick}
                className="bg-orange-500 duration-300 px-3 py-1.5 rounded-md text-white hover:bg-orange-600 md:px-5 md:py-1.5"
              >
                Checkout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Checkout Modal */}
      {isModalVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-lg shadow-xl overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-semibold">Complete Your Checkout</h2>
              <button
                onClick={() => setModalVisible(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="p-4 space-y-4">
              {/* Shipping Address */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Shipping Address
                </label>
                <textarea
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                  rows="3"
                  placeholder="Enter your shipping address"
                />
              </div>

              {/* Phone Number */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  type="number"
                  value={customerPhoneNumber}
                  onChange={(e) => setCustomerPhoneNumber(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Enter your phone number"
                />
              </div>

              {/* Shipping Method */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Shipping Method
                </label>
                <select
                  value={selectedShippingMethod}
                  onChange={(e) => setSelectedShippingMethod(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
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

              {/* Price Summary */}
              {selectedShippingMethod && (
                <div className="space-y-2 pt-4 border-t">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal:</span>
                    <span>
                      {`Rp${calculateSubtotal().toLocaleString("id-ID", {
                        minimumFractionDigits: 2,
                      })}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping Cost:</span>
                    <span>
                      {`Rp${SHIPPING_COST.toLocaleString("id-ID", {
                        minimumFractionDigits: 2,
                      })}`}
                    </span>
                  </div>
                  <div className="flex justify-between font-bold pt-2 border-t">
                    <span>Total:</span>
                    <span>
                      {`Rp${calculateTotal().toLocaleString("id-ID", {
                        minimumFractionDigits: 2,
                      })}`}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="p-4 border-t flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setModalVisible(false)}
                className="w-full sm:w-1/2 px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Cancel
              </button>
              <button
                onClick={handleCheckout}
                className="w-full sm:w-1/2 px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
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
