// controllers/reviewController.js
import Review from "../models/reviewModel.js";

const ReviewController = {
  createReview: async (req, res) => {
    try {
      const { orderId, userId, productId, rating, feedback } = req.body;

      const existingReview = await Review.findOne({
        where: { orderId },
      });

      if (existingReview) {
        return res
          .status(400)
          .json({ message: "Review already exists for this order" });
      }

      const review = await Review.create({
        orderId,
        userId,
        productId,
        rating,
        feedback,
      });

      res.status(201).json({
        message: "Review submitted successfully",
        review,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error creating review",
        error: error.message,
      });
    }
  },
};

export default ReviewController;
