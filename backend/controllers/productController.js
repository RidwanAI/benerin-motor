// Import the Product model
import Product from "../models/productModel.js";

// Create a controller object to hold our CRUD operations
const ProductController = {
  // Create a new product
  createProduct: async (req, res) => {
    try {
      const { name, image, price, specs, label, stock, sold, rating } =
        req.body;

      // Ensure price is a number
      if (isNaN(price)) {
        return res.status(400).send({ message: "Price must be a number" });
      }

      const newProduct = await Product.create({
        name,
        image,
        price: parseFloat(price), // Convert price to a float
        specs,
        label,
        stock,
        sold,
        rating,
      });
      res.status(201).send(newProduct);
    } catch (error) {
      res
        .status(500)
        .send({ message: "Error creating the product", error: error.message });
    }
  },

  // Retrieve all products
  getAllProducts: async (req, res) => {
    try {
      const products = await Product.findAll();
      res.send(products);
    } catch (error) {
      res
        .status(500)
        .send({ message: "Error retrieving products", error: error.message });
    }
  },

  // Retrieve a single product by id
  getProductById: async (req, res) => {
    try {
      const product = await Product.findByPk(req.params.id);
      if (product) {
        res.send(product);
      } else {
        res.status(404).send({ message: "Product not found" });
      }
    } catch (error) {
      res.status(500).send({
        message: "Error retrieving the product",
        error: error.message,
      });
    }
  },

  // Update a product
  updateProduct: async (req, res) => {
    try {
      const { name, image, price, specs, label, stock, sold, rating } =
        req.body;

      // Ensure price is a number
      if (isNaN(price)) {
        return res.status(400).send({ message: "Price must be a number" });
      }

      const update = await Product.update(
        {
          name,
          image,
          price: parseFloat(price), // Convert price to a float
          specs,
          label,
          stock,
          sold,
          rating,
        },
        {
          where: { id: req.params.id },
        }
      );

      if (update[0] > 0) {
        res.send({ message: "Product updated successfully" });
      } else {
        res.status(404).send({ message: "Product not found" });
      }
    } catch (error) {
      res
        .status(500)
        .send({ message: "Error updating the product", error: error.message });
    }
  },

  updateProductStock: async (req, res) => {
    try {
      const { id } = req.params;
      const {
        quantity,
        increaseSold = false,
        isRestore = false,
        updateStockOnCheckout = true,
      } = req.body;

      const product = await Product.findByPk(id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      let updates = {};

      // Only update sold count if requested during checkout
      if (increaseSold) {
        updates.sold = product.sold + quantity;
      }

      // Only update stock if not in checkout process
      if (updateStockOnCheckout) {
        if (isRestore) {
          updates.stock = product.stock + quantity;
        } else {
          if (product.stock < quantity) {
            return res.status(400).json({ message: "Insufficient stock" });
          }
          updates.stock = product.stock - quantity;
        }
      }

      if (Object.keys(updates).length > 0) {
        await Product.update(updates, {
          where: { id },
        });
      }

      res.status(200).json({ message: "Product updated successfully" });
    } catch (error) {
      res.status(500).json({
        message: "Error updating product",
        error: error.message,
      });
    }
  },

  // Delete a product
  deleteProduct: async (req, res) => {
    try {
      const { id } = req.params;

      // Cari produk
      const product = await Product.findByPk(id);
      if (!product) {
        return res.status(404).send({ message: "Product not found" });
      }

      // Hapus produk (cart items akan terhapus otomatis karena CASCADE)
      await product.destroy();

      res.status(200).send({ message: "Product deleted successfully" });
    } catch (error) {
      console.error("Error deleting product:", error);
      res.status(500).send({
        message: "Error deleting the product",
        error: error.message,
      });
    }
  },

  //   Get all new product
  // Fetch new products
  getAllNewProducts: async (req, res) => {
    try {
      const newProducts = await Product.findAll({
        where: { label: "New" },
      });
      if (newProducts.length > 0) {
        res.send(newProducts);
      } else {
        res.status(404).send({ message: "No new products found" });
      }
    } catch (error) {
      console.error("Error fetching new products: ", error);
      res.status(500).send({
        message: "Error retrieving new products",
        error: error.message,
      });
    }
  },

  getAllRecProducts: async (req, res) => {
    try {
      const recProducts = await Product.findAll({
        where: { label: "Rec" },
      });
      if (recProducts.length > 0) {
        res.send(recProducts);
      } else {
        res.status(404).send({ message: "No recommended products found" });
      }
    } catch (error) {
      console.error("Error fetching recommended products: ", error);
      res.status(500).send({
        message: "Error retrieving recommended products",
        error: error.message,
      });
    }
  },

  getAllSecondProducts: async (req, res) => {
    try {
      const secondProducts = await Product.findAll({
        where: { label: "second" },
      });
      if (secondProducts.length > 0) {
        res.send(secondProducts);
      } else {
        res.status(404).send({ message: "No second products found" });
      }
    } catch (error) {
      console.error("Error fetching second products: ", error);
      res.status(500).send({
        message: "Error retrieving second products",
        error: error.message,
      });
    }
  },
};

export default ProductController;
