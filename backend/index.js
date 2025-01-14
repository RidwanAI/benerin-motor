import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import db from "./config/database.js";
import router from "./routes/index.js";
import User from "./models/userModel.js"; // Import User model
import Product from "./models/productModel.js"; // Import Product model
import Cart from "./models/cartModel.js"; // Import Cart model
import Order from "./models/orderModel.js"; // Import Order model

dotenv.config();
const app = express();


// Relasi antar model
const defineModelRelations = () => {
  // Relasi antara Order dan Product
  // Relasi di index.js atau file relasi lainnya
Product.hasMany(Order, { foreignKey: "productId", as: "orders" });
Order.belongsTo(Product, { foreignKey: "productId", as: "orderedProduct" });

User.hasMany(Order, { foreignKey: "userId", as: "orders" });
Order.belongsTo(User, { foreignKey: "userId", as: "user" });


  // Relasi antara Cart dan Product
  Cart.belongsTo(Product, { foreignKey: "productId", as: "cartProduct" });
  Product.hasMany(Cart, { foreignKey: "productId", as: "carts" });
};



// Asynchronously connect to the database
const connectDatabase = async () => {
  try {
    await db.authenticate();
    console.log("Database Connected...");
  } catch (error) {
    console.error("Database connection failed:", error);
  }
};

// Sync models and relationships
const syncModels = async () => {
  try {
    defineModelRelations();
    await db.sync({ alter: true }); // Sinkronisasi semua model
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
app.use("/uploads", express.static("uploads"));


// Starting the server
app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running at port ${process.env.PORT || 5000}`);
});
