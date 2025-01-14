import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import db from "./config/database.js";
import router from "./routes/index.js";
import Cart from "./models/cartModel.js"; // Import model Cart

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

// Sync models
const syncModels = async () => {
  try {
    await Cart.sync({ alter: true }); // Sinkronisasi tabel cart
    console.log("Cart table synced.");
  } catch (error) {
    console.error("Error syncing Cart table:", error);
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

// Starting the server
app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running at port ${process.env.PORT || 5000}`);
});
