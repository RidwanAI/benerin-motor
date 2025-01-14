import { DataTypes } from "sequelize";
import db from "../config/database.js"; // Pastikan jalur ini benar

const Order = db.define(
  "Order",
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    totalPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("Pending", "Paid", "Shipped", "Completed"),
      allowNull: false,
      defaultValue: "Pending",
    },
    paymentProof: {
      type: DataTypes.STRING, // Menyimpan URL gambar
      allowNull: true,
    },
  },
  {
    timestamps: true,
  }
);

export default Order;
