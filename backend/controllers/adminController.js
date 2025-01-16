import Admin from "../models/adminModel.js";
import User from "../models/userModel.js";
import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
  getProducts: async (req, res) => {
    try {
      const products = await Product.findAll();
      res.json(products);
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Failed to fetch products." });
    }
  },

  createProduct: async (req, res) => {
    try {
      const { name, price, stock } = req.body;

      const product = await Product.create({ name, price, stock });
      res.status(201).json(product);
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Failed to create product." });
    }
  },

  updateProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, price, stock } = req.body;

      const product = await Product.findByPk(id);
      if (!product) return res.status(404).json({ msg: "Product not found." });

      await product.update({ name, price, stock });
      res.json({ msg: "Product updated successfully." });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Failed to update product." });
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await Product.destroy({ where: { id } });

      if (!deleted) return res.status(404).json({ msg: "Product not found." });

      res.json({ msg: "Product deleted successfully." });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Failed to delete product." });
    }
  },
  getOrders: async (req, res) => {
    try {
      const orders = await Order.findAll({
        include: [
          { model: User, as: "user", attributes: ["name", "email"] },
          { model: Product, as: "orderedProduct", attributes: ["name", "price"] },
        ],
        order: [["createdAt", "DESC"]],
      });
      res.json(orders);
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Failed to fetch orders." });
    }
  },
  
  createOrder: async (req, res) => {
    try {
      const { userId, productId, quantity } = req.body;
  
      const product = await Product.findByPk(productId);
      if (!product) return res.status(404).json({ msg: "Product not found." });
  
      const totalPrice = product.price * quantity;
  
      const order = await Order.create({
        userId,
        productId,
        quantity,
        totalPrice,
        status: "Pending",
      });
  
      res.status(201).json(order);
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Failed to create order." });
    }
  },
  
  updateOrder: async (req, res) => {
    try {
      const { id } = req.params;
      const { status, quantity } = req.body;
  
      const order = await Order.findByPk(id);
      if (!order) return res.status(404).json({ msg: "Order not found." });
  
      if (quantity) {
        const product = await Product.findByPk(order.productId);
        order.totalPrice = product.price * quantity;
        order.quantity = quantity;
      }
  
      if (status) order.status = status;
  
      await order.save();
      res.json({ msg: "Order updated successfully." });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Failed to update order." });
    }
  },
  
  deleteOrder: async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await Order.destroy({ where: { id } });
  
      if (!deleted) return res.status(404).json({ msg: "Order not found." });
  
      res.json({ msg: "Order deleted successfully." });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Failed to delete order." });
    }
  },
};

export default adminController;
