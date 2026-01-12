import Review from "../models/Review.js";

/**
 * CREATE REVIEW
 * POST /api/reviews
 */
export const createReview = async (req, res) => {
  try {
    const { name, productID, rating, comment } = req.body;

    // check existing review for same product
    const existingReview = await Review.findOne({ productID });

    if (existingReview) {
      return res.status(400).json({
        message: "Review already exists for this product",
      });
    }

    const review = new Review({
      name,
      productID,
      rating,
      comment,
    });

    await review.save();

    res.status(201).json({
      message: "Review submitted successfully",
      review,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create review",
      error: error.message,
    });
  }
};

/**
 * GET ALL REVIEWS (Admin)
 * GET /api/reviews
 */
export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch reviews",
      error: error.message,
    });
  }
};

/**
 * GET REVIEWS BY PRODUCT ID (Approved only)
 * GET /api/reviews/product/:productID
 */
export const getReviewsByProduct = async (req, res) => {
  try {
    const { productID } = req.params;

    const reviews = await Review.find({
      productID,
      status: "approved",
    }).sort({ createdAt: -1 });

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch product reviews",
      error: error.message,
    });
  }
};

/**
 * UPDATE REVIEW STATUS (Admin)
 * PUT /api/reviews/:id/status
 */
export const updateReviewStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const review = await Review.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!review) {
      return res.status(404).json({
        message: "Review not found",
      });
    }

    res.status(200).json({
      message: "Review status updated",
      review,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update review status",
      error: error.message,
    });
  }
};

/**
 * DELETE REVIEW (Admin)
 * DELETE /api/reviews/:id
 */
export const deleteReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);

    if (!review) {
      return res.status(404).json({
        message: "Review not found",
      });
    }

    res.status(200).json({
      message: "Review deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete review",
      error: error.message,
    });
  }
};
