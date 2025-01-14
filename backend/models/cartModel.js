import { Sequelize } from 'sequelize';
import db from '../config/database.js';
import Product from './productModel.js'; // Import product model

const { DataTypes } = Sequelize;

const Cart = db.define(
  'carts',
  {
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Product, // Mengacu pada model Product
        key: 'id',
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      validate: {
        min: {
          args: [1],
          msg: 'Quantity must be at least 1',
        },
      },
    },
    userId: {
      type: DataTypes.INTEGER, // Jika ada integrasi dengan tabel pengguna
      allowNull: false,
    },
    totalPrice: {
      type: DataTypes.DECIMAL(10, 2), // Untuk menyimpan total harga item
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false, // Menonaktifkan timestamp otomatis Sequelize
    hooks: {
      beforeCreate: async (cart, options) => {
        const product = await Product.findByPk(cart.productId);
        if (!product) {
          throw new Error('Product not found');
        }
        cart.totalPrice = product.price * cart.quantity;
      },
      beforeUpdate: async (cart, options) => {
        const product = await Product.findByPk(cart.productId);
        if (!product) {
          throw new Error('Product not found');
        }
        cart.totalPrice = product.price * cart.quantity;
      },
    },
  }
);

// Relasi ke Product
Cart.belongsTo(Product, { foreignKey: 'productId', as: 'product' });

export default Cart;
