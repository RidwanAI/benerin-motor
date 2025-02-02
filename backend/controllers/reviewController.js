// reviewController.js
import Review from "../models/reviewModel.js";
import Product from "../models/productModel.js";

const ReviewController = {
  createReview: async (req, res) => {
    try {
      const { orderId, userId, productId, rating, feedback } = req.body;

      // Check if review already exists for this order
      const existingReview = await Review.findOne({
        where: { orderId },
      });

      if (existingReview) {
        return res
          .status(400)
          .json({ message: "Review already exists for this order" });
      }

      // Create the review
      const review = await Review.create({
        orderId,
        userId,
        productId,
        rating,
        feedback,
      });

      // Calculate new average rating for the product
      const productReviews = await Review.findAll({
        where: { productId },
        attributes: ["rating"],
      });

      const totalRating = productReviews.reduce(
        (sum, review) => sum + review.rating,
        0
      );
      const averageRating = totalRating / productReviews.length;

      // Update product's rating
      await Product.update(
        { rating: parseFloat(averageRating.toFixed(1)) },
        { where: { id: productId } }
      );

      res.status(201).json({
        message: "Review submitted successfully",
        review,
      });
    } catch (error) {
      console.error("Error in createReview:", error);
      res.status(500).json({
        message: "Error creating review",
        error: error.message,
      });
    }
  },

  // Add method to get product rating
  getProductRating: async (req, res) => {
    try {
      const { productId } = req.params;

      const reviews = await Review.findAll({
        where: { productId },
        attributes: ["rating"],
      });

      if (reviews.length === 0) {
        return res.json({
          averageRating: 0,
          totalReviews: 0,
        });
      }

      const totalRating = reviews.reduce(
        (sum, review) => sum + review.rating,
        0
      );
      const averageRating = totalRating / reviews.length;

      res.json({
        averageRating: parseFloat(averageRating.toFixed(1)),
        totalReviews: reviews.length,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error getting product rating",
        error: error.message,
      });
    }
  },
};

export default ReviewController;
