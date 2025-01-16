import Admin from "../models/adminModel.js";
import User from "../models/userModel.js";
import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getAdmins = async (req, res) => {
  try {
    const admins = await Admin.findAll({
      attributes: ["id", "name", "email"],
    });
    res.json(admins);
  } catch (error) {
    console.log(error);
  }
};

export const adminLogin = async (req, res) => {
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
};

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [
        {
          model: User,
          as: "user",
          attributes: ["name", "email"],
        },
        {
          model: Product,
          as: "orderedProduct",
          attributes: ["name", "price"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
    console.log(error);
  }
};

export const updateOrderStatus = async (req, res) => {
  const { id, status } = req.body;
  try {
    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).json({ msg: "Order tidak ditemukan" });
    }

    await order.update({ status: status });
    res.json({ msg: "Status pesanan berhasil diupdate" });
  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
    console.log(error);
  }
};

export const adminLogout = async (req, res) => {
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
};
