import express from "express";
import {
  getUsers,
  Login,
  Logout,
  Register,
  getMe,
} from "../controllers/userController.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { refreshToken } from "../controllers/refreshToken.js";
import ProductController from "../controllers/productController.js"; // Import the ProductController
import CartController from "../controllers/cartController.js"; // Import the CartCOntroller
import OrderController from "../controllers/orderController.js";
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

// Product routes
router.get('/products/new', ProductController.getAllNewProducts);
router.get('/products/second', ProductController.getAllSecondProducts);
router.get('/products/rec', ProductController.getAllRecProducts);
router.post("/products", verifyToken, ProductController.createProduct); // Create product
router.get("/products", ProductController.getAllProducts); // Get all products
router.get("/products/:id", ProductController.getProductById); // Get single product by id
router.put("/products/:id", verifyToken, ProductController.updateProduct); // Update product
router.delete("/products/:id", verifyToken, ProductController.deleteProduct); // Delete product

// Cart routes
router.post("/carts", verifyToken, CartController.createCartItem); // Add item to cart
router.get("/carts", verifyToken, CartController.getAllCartItems); // Get all cart items
router.get("/carts/user/:userId", verifyToken, CartController.getCartItemsByUserId); // Get cart items by userId
router.put("/carts/:id", verifyToken, CartController.updateCartItem); // Update cart item
router.delete("/carts/:id", verifyToken, CartController.deleteCartItem); // Delete cart item


router.post("/orders", verifyToken, OrderController.createOrder);

// Get all orders (admin view)
router.get("/orders", verifyToken, OrderController.getAllOrders);

// Get a single order by ID
router.get("/orders/:id", verifyToken, OrderController.getOrderById);

router.get("/orders/user/:userId", verifyToken, OrderController.getOrdersByUserId);




// Update an order (status or quantity)
router.put("/orders/:id", verifyToken, OrderController.updateOrder);

router.post("/checkout", verifyToken, OrderController.checkout);

// Delete an order
router.delete("/orders/:id", verifyToken, OrderController.deleteOrder);

router.post("/orders/:id/upload", verifyToken, upload.single("paymentProof"), OrderController.uploadPaymentProof);







export default router;
