import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import db from "./config/database.js";
import router from "./routes/index.js";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Cart from "./models/cartModel.js";
import Order from "./models/orderModel.js";
import Review from "./models/reviewModel.js";
import path from "path";
import { fileURLToPath } from "url";

// Recreate __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();

// Asynchronously connect to the database
const connectDatabase = async () => {
  try {
    await db.authenticate();
    console.log("Database Connected...");
  } catch (error) {
    console.error("Database connection failed:", error);
  }
};
// Relasi antar model
const defineModelRelations = () => {
  Product.hasMany(Order, { foreignKey: "productId", as: "orders" });
  Order.belongsTo(Product, { foreignKey: "productId", as: "orderedProduct" });

  User.hasMany(Order, { foreignKey: "userId", as: "orders" });
  Order.belongsTo(User, { foreignKey: "userId", as: "user" });

  // Relasi antara Cart dan Product
  Cart.belongsTo(Product, { 
    foreignKey: "productId", 
    as: "cartProduct",
    onDelete: 'CASCADE' // Tambahkan ini
  });
  Product.hasMany(Cart, { 
    foreignKey: "productId", 
    as: "carts",
    onDelete: 'CASCADE' // Tambahkan ini
  });

  Order.hasOne(Review, {
    foreignKey: "orderId",
    constraints: false,
  });
  Review.belongsTo(Order, {
    foreignKey: "orderId",
    constraints: false,
  });

  User.hasMany(Review, { foreignKey: "userId" });
  Review.belongsTo(User, { foreignKey: "userId" });

  Product.hasMany(Review, { foreignKey: "productId", onDelete: "CASCADE" });
  Review.belongsTo(Product, { foreignKey: "productId" });
};

// Sync models and relationships
const syncModels = async () => {
  try {
    defineModelRelations();
    await db.sync({ alter: true });
    console.log("All models synced successfully.");
  } catch (error) {
    console.error("Error syncing models:", error);
  }
};

// Ensure database connection and model sync before starting the server
(async () => {
  await connectDatabase();
  await syncModels();
})();

// Middleware setup
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(cookieParser());
app.use(express.json());
app.use(router);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Starting the server
app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running at port ${process.env.PORT || 5000}`);
});
