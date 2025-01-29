import express from "express";
import {
  getUsers,
  Login,
  Logout,
  Register,
  getMe,
  updateMe,
  deleteMe,
} from "../controllers/userController.js";

import { verifyToken } from "../middleware/verifyToken.js";
import { verifyAdminToken } from "../middleware/verifyAdminToken.js";
import { refreshToken } from "../controllers/refreshToken.js";
import { adminRefreshToken } from "../controllers/adminRefreshToken.js";
import ProductController from "../controllers/productController.js"; // Import the ProductController
import CartController from "../controllers/cartController.js"; // Import the CartCOntroller
import OrderController from "../controllers/orderController.js";
import ReviewController from "../controllers/reviewController.js";
import adminController from "../controllers/adminController.js";
import multer from "multer";

// Konfigurasi Multer untuk upload file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Direktori tempat menyimpan file
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Nama file unik
  },
});
const upload = multer({ storage });

const router = express.Router();

// User routes
router.get("/users", verifyToken, getUsers);
router.post("/register", Register);
router.post("/login", Login);
router.get("/token", refreshToken);
router.delete("/logout", Logout);
router.get("/me", verifyToken, getMe);
router.put("/user/me", verifyToken, updateMe);
router.delete("/user/me", verifyToken, deleteMe);

// Product routes
router.get("/products/new", ProductController.getAllNewProducts);
router.get("/products/second", ProductController.getAllSecondProducts);
router.get("/products/rec", ProductController.getAllRecProducts);
router.post("/products", verifyToken, ProductController.createProduct); // Create product
router.get("/products", ProductController.getAllProducts); // Get all products
router.get("/products/:id", ProductController.getProductById); // Get single product by id
router.put("/products/:id", verifyToken, ProductController.updateProduct); // Update product
router.put(
  "/products/:id/stock",
  verifyToken,
  ProductController.updateProductStock
);
router.delete("/products/:id", verifyToken, ProductController.deleteProduct); // Delete product

// Cart routes
router.post("/carts", verifyToken, CartController.createCartItem); // Add item to cart
router.get("/carts", verifyToken, CartController.getAllCartItems); // Get all cart items
router.get(
  "/carts/user/:userId",
  verifyToken,
  CartController.getCartItemsByUserId
); // Get cart items by userId
router.put("/carts/:id", verifyToken, CartController.updateCartItem); // Update cart item
router.delete("/carts/:id", verifyToken, CartController.deleteCartItem); // Delete cart item

// Review Routes
router.post("/reviews", verifyToken, ReviewController.createReview);

// Admin router
router.get("/admin", verifyAdminToken, adminController.getAdmins);
router.post("/admin/login", adminController.adminLogin);
router.get("/admin/me", verifyAdminToken, adminController.getCurrentAdmin);
router.put("/admin/me", verifyAdminToken, adminController.updateAdmin);
router.delete("/admin/me", verifyAdminToken, adminController.deleteAdmin);
router.get("/admin/token", adminRefreshToken);
router.delete("/admin/logout", adminController.adminLogout);

// Order management (CRUD) for admin
router.get("/admin/orders", verifyAdminToken, adminController.getAllOrders);
router.post("/admin/orders", verifyAdminToken, adminController.getAllOrders);
router.put("/admin/orders/:id", verifyAdminToken, adminController.updateOrder);
router.delete(
  "/admin/orders/:id",
  verifyAdminToken,
  adminController.deleteOrder
);

// User management (CRUD) for admin
router.get("/admin/users", verifyAdminToken, adminController.getUsers);
router.post("/admin/users", verifyAdminToken, adminController.createUser);
router.put("/admin/users/:id", verifyAdminToken, adminController.updateUser);
router.delete("/admin/users/:id", verifyAdminToken, adminController.deleteUser);

// Product management (CRUD) for admin
router.get("/admin/products", verifyAdminToken, adminController.getAllProducts);
router.post(
  "/admin/products",
  verifyAdminToken,
  upload.single("image"),
  adminController.createProduct
);
router.put(
  "/admin/products/:id",
  verifyAdminToken,
  upload.single("image"), // Add multer middleware
  adminController.updateProduct
);
router.put(
  "/admin/products/:id",
  verifyAdminToken,
  adminController.updateProduct
);
router.delete(
  "/admin/products/:id",
  verifyAdminToken,
  adminController.deleteProduct
);

router.post("/orders", verifyToken, OrderController.createOrder);
router.get("/orders", verifyToken, OrderController.getAllOrders);
router.get("/orders/:id", verifyToken, OrderController.getOrderById);
router.get(
  "/orders/user/:userId",
  verifyToken,
  OrderController.getOrdersByUserId
);
router.put("/orders/:id", verifyToken, OrderController.updateOrder);
router.post("/checkout", verifyToken, OrderController.checkout);
router.delete("/orders/:id", verifyToken, OrderController.deleteOrder);
router.post(
  "/orders/:id/upload",
  verifyToken,
  upload.single("paymentProof"),
  OrderController.uploadPaymentProof
);

export default router;
