import Admin from "../models/adminModel.js";
import Order from "../models/orderModel.js";
import User from "../models/userModel.js";
import Product from "../models/productModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const adminLogin = async (req, res) => {
  try {
    const admin = await Admin.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (!admin) return res.status(404).json({ msg: "Email tidak ditemukan" });

    const match = await bcrypt.compare(req.body.password, admin.password);
    if (!match) return res.status(400).json({ msg: "Password Salah" });

    const adminId = admin.id;
    const name = admin.name;
    const email = admin.email;

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

    res.cookie("adminRefreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({ accessToken });
  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
    console.log(error);
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
  const refreshToken = req.cookies.adminRefreshToken;
  if (!refreshToken) return res.sendStatus(204);

  const admin = await Admin.findOne({
    where: {
      refresh_token: refreshToken,
    },
  });

  if (!admin) return res.sendStatus(204);

  await Admin.update(
    { refresh_token: null },
    {
      where: {
        id: admin.id,
      },
    }
  );

  res.clearCookie("adminRefreshToken");
  return res.sendStatus(200);
};
