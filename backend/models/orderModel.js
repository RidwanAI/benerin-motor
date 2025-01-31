import { DataTypes } from "sequelize";
import db from "../config/database.js";

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
      type: DataTypes.STRING,
      allowNull: true,
    },
    shippingAddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    customerPhoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    shippingMethod: {
      type: DataTypes.ENUM("JNE", "JNT", "Shopee Express", "Gojek"),
      allowNull: false,
    },
  },
  {
    timestamps: true,
    hooks: {
      beforeDestroy: async (order) => {},
    },
  }
);

export default Order;
