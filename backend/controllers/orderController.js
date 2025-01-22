import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";
import User from "../models/userModel.js";
import Cart from "../models/cartModel.js"; // Pastikan model Cart diimpor
import { BASE_URL } from "./../config/config.js";

const OrderController = {
  createOrder: async (req, res) => {
    try {
      const {
        userId,
        productId,
        quantity,
        shippingAddress,
        customerPhoneNumber,
        shippingMethod,
        shippingCost, // Add shipping cost parameter
        totalAmount, // Use total amount that includes shipping
      } = req.body;

      if (
        !userId ||
        !productId ||
        !quantity ||
        !shippingAddress ||
        !customerPhoneNumber ||
        !shippingMethod
      ) {
        return res.status(400).json({
          message: "All fields are required.",
        });
      }

      const product = await Product.findByPk(productId);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      const order = await Order.create({
        userId,
        productId,
        quantity,
        totalPrice: totalAmount, // Use totalAmount instead of calculating
        status: "Pending",
        shippingAddress,
        customerPhoneNumber,
        shippingMethod,
      });

      res.status(201).json(order);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error creating order", error: error.message });
    }
  },

  checkout: async (req, res) => {
    try {
      const {
        userId,
        selectedCartItemIds,
        shippingAddress,
        customerPhoneNumber,
        shippingMethod,
        shippingCost, // Add shipping cost parameter
      } = req.body;

      if (
        !userId ||
        !selectedCartItemIds ||
        !selectedCartItemIds.length ||
        !shippingAddress ||
        !customerPhoneNumber ||
        !shippingMethod
      ) {
        return res.status(400).json({
          message: "All fields are required.",
        });
      }

      const validShippingMethods = ["JNE", "JNT", "Shopee Express", "Gojek"];
      if (!validShippingMethods.includes(shippingMethod)) {
        return res.status(400).json({ message: "Invalid shipping method." });
      }

      const cartItems = await Cart.findAll({
        where: {
          id: selectedCartItemIds,
          userId,
        },
        include: [{ model: Product, as: "product", attributes: ["price"] }],
      });

      if (!cartItems.length) {
        return res
          .status(404)
          .json({ message: "No cart items found for the selected IDs." });
      }

      const orders = await Promise.all(
        cartItems.map(async (item) => {
          const subtotal = parseFloat(item.product.price) * item.quantity;
          const totalWithShipping = subtotal + parseFloat(shippingCost);

          return Order.create({
            userId,
            productId: item.productId,
            quantity: item.quantity,
            totalPrice: totalWithShipping, // Include shipping cost in total
            status: "Pending",
            shippingAddress,
            customerPhoneNumber,
            shippingMethod,
          });
        })
      );

      await Cart.destroy({
        where: {
          id: selectedCartItemIds,
        },
      });

      res.status(201).json({ message: "Checkout successful", orders });
    } catch (error) {
      console.error("Error during checkout:", error);
      res
        .status(500)
        .json({ message: "Error during checkout", error: error.message });
    }
  },

  // Get all orders
  getAllOrders: async (req, res) => {
    try {
      const orders = await Order.findAll({
        include: [
          {
            model: Product,
            as: "product",
            attributes: ["name", "price", "image"],
          },
          { model: User, as: "user", attributes: ["name", "email"] },
        ],
      });

      res.status(200).json(orders);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error retrieving orders", error: error.message });
    }
  },

  // Get order by ID
  getOrderById: async (req, res) => {
    try {
      const { id } = req.params;

      const order = await Order.findByPk(id, {
        include: [
          {
            model: Product,
            as: "product",
            attributes: ["name", "price", "image"],
          },
          { model: User, as: "user", attributes: ["name", "email"] },
        ],
      });

      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      res.status(200).json(order);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error retrieving order", error: error.message });
    }
  },

  // Update an order
  updateOrder: async (req, res) => {
    try {
      const { id } = req.params;
      const {
        status,
        quantity,
        shippingAddress,
        customerPhoneNumber,
        shippingMethod,
      } = req.body;

      const order = await Order.findByPk(id);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      if (quantity) {
        const product = await Product.findByPk(order.productId);
        const totalPrice = parseFloat(product.price) * quantity;
        await order.update({ quantity, totalPrice });
      }

      await order.update({
        status,
        shippingAddress,
        customerPhoneNumber,
        shippingMethod,
      });

      res.status(200).json(order);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error updating order", error: error.message });
    }
  },

  // Delete an order
  deleteOrder: async (req, res) => {
    try {
      const { id } = req.params;

      const deleted = await Order.destroy({ where: { id } });

      if (!deleted) {
        return res.status(404).json({ message: "Order not found" });
      }

      res.status(200).json({ message: "Order deleted successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error deleting order", error: error.message });
    }
  },

  getOrdersByUserId: async (req, res) => {
    const { userId } = req.params;
    try {
      const orders = await Order.findAll({
        where: { userId },
        include: [
          {
            model: Product,
            as: "orderedProduct", // Pastikan alias sesuai
            attributes: ["name", "price", "image"],
          },
          {
            model: User,
            as: "user",
            attributes: ["name", "email"],
          },
        ],
      });

      if (!orders || orders.length === 0) {
        return res
          .status(404)
          .json({ message: "No orders found for this user." });
      }

      res.status(200).json(orders);
    } catch (error) {
      console.error("Error retrieving orders:", error);
      res
        .status(500)
        .json({ message: "Error retrieving orders", error: error.message });
    }
  },

  // Checkout
  checkout: async (req, res) => {
    try {
      const {
        userId,
        selectedCartItemIds,
        shippingAddress,
        customerPhoneNumber,
        shippingMethod,
        shippingCost,
      } = req.body;

      if (
        !userId ||
        !selectedCartItemIds ||
        !selectedCartItemIds.length ||
        !shippingAddress ||
        !customerPhoneNumber ||
        !shippingMethod
      ) {
        return res.status(400).json({ message: "All fields are required." });
      }

      const cartItems = await Cart.findAll({
        where: { id: selectedCartItemIds, userId },
        include: [{ model: Product, as: "product", attributes: ["price"] }],
      });

      if (!cartItems.length) {
        return res
          .status(404)
          .json({ message: "No cart items found for the selected IDs." });
      }

      const orders = await Promise.all(
        cartItems.map(async (item, index) => {
          const subtotal = parseFloat(item.product.price) * item.quantity;
          const totalWithShipping =
            index === 0 ? subtotal + parseFloat(shippingCost) : subtotal;

          return Order.create({
            userId,
            productId: item.productId,
            quantity: item.quantity,
            totalPrice: totalWithShipping,
            status: "Pending",
            shippingAddress,
            customerPhoneNumber,
            shippingMethod,
          });
        })
      );

      await Cart.destroy({
        where: { id: selectedCartItemIds },
      });

      res.status(201).json({ message: "Checkout successful", orders });
    } catch (error) {
      console.error("Error during checkout:", error);
      res
        .status(500)
        .json({ message: "Error during checkout", error: error.message });
    }
  },

  uploadPaymentProof: async (req, res) => {
    try {
      const { id } = req.params; // Order ID
      const file = req.file; // File from multer

      if (!file) {
        return res.status(400).json({ message: "No file uploaded." });
      }

      // Find the order by ID
      const order = await Order.findByPk(id);
      if (!order) {
        return res.status(404).json({ message: "Order not found." });
      }

      // Save the payment proof URL in the database
      const paymentProofUrl = `${BASE_URL}/uploads/${file.filename}`;
      order.paymentProof = paymentProofUrl;
      await order.save();

      res.status(200).json({
        message: "Payment proof uploaded successfully.",
        order,
      });
    } catch (error) {
      console.error("Error uploading payment proof:", error);
      res.status(500).json({
        message: "Error uploading payment proof.",
        error: error.message,
      });
    }
  },
};

export default OrderController;
