import Admin from "../models/adminModel.js";
import User from "../models/userModel.js";
import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import multer from "multer";

import { BASE_URL } from "./../config/config.js";

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Directory to store uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

const adminController = {
  getAdmins: async (req, res) => {
    try {
      const admins = await Admin.findAll({
        attributes: ["id", "name", "email"],
      });
      res.json(admins);
    } catch (error) {
      console.log(error);
    }
  },

  adminLogin: async (req, res) => {
    try {
      const admin = await Admin.findAll({
        where: {
          email: req.body.email,
        },
      });
      const match = await bcrypt.compare(req.body.password, admin[0].password);
      if (!match) return res.status(400).json({ msg: "Password Salah" });
      const adminId = admin[0].id;
      const name = admin[0].name;
      const email = admin[0].email;
      const accessToken = jwt.sign(
        { adminId, name, email },
        process.env.ADMIN_ACCESS_TOKEN_SECRET,
        {
          expiresIn: "1d",
        }
      );
      const refreshToken = jwt.sign(
        { adminId, name, email },
        process.env.ADMIN_REFRESH_TOKEN_SECRET,
        {
          expiresIn: "1d",
        }
      );
      await Admin.update(
        { refresh_token: refreshToken },
        {
          where: {
            id: adminId,
          },
        }
      );
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.json({ accessToken });
    } catch (error) {
      res.status(404).json({ msg: "Email Tidak Ditemukan" });
    }
  },
  adminLogout: async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(204);
    const admin = await Admin.findAll({
      where: {
        refresh_token: refreshToken,
      },
    });

    if (!admin[0]) return res.sendStatus(204);
    const adminId = admin[0].id;
    await Admin.update(
      { refresh_token: null },
      {
        where: {
          id: adminId,
        },
      }
    );
    res.clearCookie("refreshToken");
    return res.sendStatus(200);
  },

  // CRUD User
  getUsers: async (req, res) => {
    try {
      const users = await User.findAll({ attributes: ["id", "name", "email"] });
      res.json(users);
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Failed to fetch users." });
    }
  },

  createUser: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await User.create({ name, email, password: hashedPassword });
      res.status(201).json(user);
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Failed to create user." });
    }
  },

  updateUser: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, email, password } = req.body;

      const user = await User.findByPk(id);
      if (!user) return res.status(404).json({ msg: "User not found." });

      const hashedPassword = password
        ? await bcrypt.hash(password, 10)
        : user.password;
      await user.update({ name, email, password: hashedPassword });

      res.json({ msg: "User updated successfully." });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Failed to update user." });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await User.destroy({ where: { id } });

      if (!deleted) return res.status(404).json({ msg: "User not found." });

      res.json({ msg: "User deleted successfully." });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Failed to delete user." });
    }
  },

  // CRUD Product
  // Create a new product
  createProduct: async (req, res) => {
    try {
      const { name, price, stock, specs, label, sold, rating } = req.body;
      const image = req.file
        ? `${BASE_URL}/uploads/${req.file.filename}`
        : null;

      const newProduct = await Product.create({
        name,
        price,
        stock,
        specs,
        label,
        sold,
        rating,
        image,
      });

      res.status(201).json(newProduct);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error creating product", error: error.message });
    }
  },

  // Retrieve all products
  getAllProducts: async (req, res) => {
    try {
      const products = await Product.findAll();
      res.send(products);
    } catch (error) {
      res
        .status(500)
        .send({ message: "Error retrieving products", error: error.message });
    }
  },

  // Retrieve a single product by id
  getProductById: async (req, res) => {
    try {
      const product = await Product.findByPk(req.params.id);
      if (product) {
        res.send(product);
      } else {
        res.status(404).send({ message: "Product not found" });
      }
    } catch (error) {
      res
        .status(500)
        .send({
          message: "Error retrieving the product",
          error: error.message,
        });
    }
  },

  // Update a product
  // Update a product
  updateProduct: async (req, res) => {
    try {
      const { name, price, specs, label, stock, sold, rating } = req.body;
  
      const product = await Product.findByPk(req.params.id);
      if (!product) {
        return res.status(404).send({ message: "Product not found" });
      }
  
      const image = req.file
        ? `${BASE_URL}/uploads/${req.file.filename}`
        : product.image;
  
      await product.update({
        name: name || product.name,
        price: price ? parseFloat(price) : product.price,
        specs: specs || product.specs,
        label: label || product.label,
        stock: stock || product.stock,
        sold: sold || product.sold,
        rating: rating || product.rating,
        image,
      });
  
      res.send(product); // Send the updated product object
    } catch (error) {
      console.error("Error updating the product:", error);
      res.status(500).send({
        message: "Error updating the product",
        error: error.message,
      });
    }
  },
  

  // Delete a product
  deleteProduct: async (req, res) => {
    try {
      const count = await Product.destroy({
        where: { id: req.params.id },
      });
      if (count > 0) {
        res.send({ message: "Product deleted successfully" });
      } else {
        res.status(404).send({ message: "Product not found" });
      }
    } catch (error) {
      res
        .status(500)
        .send({ message: "Error deleting the product", error: error.message });
    }
  },

  //   Get all new product
  // Fetch new products
  getAllNewProducts: async (req, res) => {
    try {
      const newProducts = await Product.findAll({
        where: { label: "New" },
      });
      if (newProducts.length > 0) {
        res.send(newProducts);
      } else {
        res.status(404).send({ message: "No new products found" });
      }
    } catch (error) {
      console.error("Error fetching new products: ", error);
      res
        .status(500)
        .send({
          message: "Error retrieving new products",
          error: error.message,
        });
    }
  },

  getAllRecProducts: async (req, res) => {
    try {
      const recProducts = await Product.findAll({
        where: { label: "Rec" },
      });
      if (recProducts.length > 0) {
        res.send(recProducts);
      } else {
        res.status(404).send({ message: "No recommended products found" });
      }
    } catch (error) {
      console.error("Error fetching recommended products: ", error);
      res
        .status(500)
        .send({
          message: "Error retrieving recommended products",
          error: error.message,
        });
    }
  },

  getAllSecondProducts: async (req, res) => {
    try {
      const secondProducts = await Product.findAll({
        where: { label: "second" },
      });
      if (secondProducts.length > 0) {
        res.send(secondProducts);
      } else {
        res.status(404).send({ message: "No second products found" });
      }
    } catch (error) {
      console.error("Error fetching second products: ", error);
      res
        .status(500)
        .send({
          message: "Error retrieving second products",
          error: error.message,
        });
    }
  },
  createOrder: async (req, res) => {
    try {
      const { userId, productId, quantity } = req.body;

      if (!userId || !productId || !quantity) {
        return res
          .status(400)
          .json({ message: "User ID, Product ID, and Quantity are required" });
      }

      const product = await Product.findByPk(productId);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      const totalPrice = parseFloat(product.price) * quantity;

      const order = await Order.create({
        userId,
        productId,
        quantity,
        totalPrice,
        status: "Pending",
      });

      res.status(201).json(order);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error creating order", error: error.message });
    }
  },

  // Get all orders
  getAllOrders: async (req, res) => {
    try {
      const orders = await Order.findAll({
        include: [
          {
            model: Product,
            as: "orderedProduct", // Match alias defined in Order.belongsTo(Product)
            attributes: ["name", "price", "image"],
          },
          {
            model: User,
            as: "user", // Match alias defined in Order.belongsTo(User)
            attributes: ["name", "email"],
          },
        ],
      });
      res.status(200).json(orders);
    } catch (error) {
      console.error("Error retrieving orders:", error.message);
      res.status(500).json({
        message: "Error retrieving orders",
        error: error.message,
      });
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
      const { status, quantity } = req.body;

      const order = await Order.findByPk(id);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      if (quantity) {
        const product = await Product.findByPk(order.productId);
        const totalPrice = parseFloat(product.price) * quantity;

        await order.update({ quantity, totalPrice });
      }

      if (status) {
        await order.update({ status });
      }

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
};

export default adminController;
