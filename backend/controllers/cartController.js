import Cart from '../models/cartModel.js';
import Product from '../models/productModel.js';

const CartController = {
  // Create a new cart item
  createCartItem: async (req, res) => {
    try {
      const { productId, userId, quantity } = req.body;

      if (!productId || !userId || !quantity) {
        return res.status(400).json({ message: 'All fields are required: productId, userId, quantity' });
      }

      // Fetch product to get price
      const product = await Product.findByPk(productId);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }

      // Calculate total price
      const totalPrice = parseFloat(product.price.replace(/[^\d.]/g, '')) * quantity;

      // Create the cart item
      const newCartItem = await Cart.create({
        productId,
        userId,
        quantity,
        totalPrice,
      });

      res.status(201).json(newCartItem);
    } catch (error) {
      res.status(500).json({ message: 'Error creating cart item', error: error.message });
    }
  },

  // Get all cart items
  getAllCartItems: async (req, res) => {
    try {
      const cartItems = await Cart.findAll({
        include: [{ model: Product, as: 'product', attributes: ['name', 'price', 'image'] }],
      });
      res.status(200).json(cartItems);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving cart items', error: error.message });
    }
  },

  // Get cart items by userId
  getCartItemsByUserId: async (req, res) => {
    try {
      const { userId } = req.params; // Ambil userId dari params
      const { productId } = req.query; // Jika ada filter tambahan berdasarkan productId
      
      if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
      }
  
      const whereCondition = { userId };
      if (productId) {
        whereCondition.productId = productId;
      }
  
      const cartItems = await Cart.findAll({
        where: whereCondition,
        include: [{ model: Product, as: 'product', attributes: ['name', 'price', 'image'] }],
      });
  
      if (!cartItems.length) {
        return res.status(404).json({ message: 'No cart items found for this user' });
      }
  
      res.status(200).json(cartItems);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving cart items', error: error.message });
    }
  },
  
  

  // Update a cart item
  updateCartItem: async (req, res) => {
    try {
      const { id } = req.params;
      const { quantity } = req.body;

      if (!quantity) {
        return res.status(400).json({ message: 'Quantity is required' });
      }

      // Find the cart item
      const cartItem = await Cart.findByPk(id);
      if (!cartItem) {
        return res.status(404).json({ message: 'Cart item not found' });
      }

      // Fetch the product to recalculate total price
      const product = await Product.findByPk(cartItem.productId);
      const totalPrice = parseFloat(product.price.replace(/[^\d.]/g, '')) * quantity;

      // Update the cart item
      const [updated] = await Cart.update({ quantity, totalPrice }, { where: { id } });

      if (!updated) {
        return res.status(404).json({ message: 'Failed to update cart item' });
      }

      const updatedCartItem = await Cart.findByPk(id);
      res.status(200).json(updatedCartItem);
    } catch (error) {
      res.status(500).json({ message: 'Error updating cart item', error: error.message });
    }
  },

  // Delete a cart item
  deleteCartItem: async (req, res) => {
    try {
      const { id } = req.params;

      const deleted = await Cart.destroy({ where: { id } });

      if (!deleted) {
        return res.status(404).json({ message: 'Cart item not found' });
      }

      res.status(200).json({ message: 'Cart item deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting cart item', error: error.message });
    }
  },
};

export default CartController;
