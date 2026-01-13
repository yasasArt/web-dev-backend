import express from "express";
import {
  createReview,
  getAllReviews,
  getReviewsByProduct,
  updateReviewStatus,
  deleteReview,
} from "../controllers/reviewController.js";

const router = express.Router();

// POST /api/reviews
router.post("/", createReview);

// GET /api/reviews (admin)
router.get("/", getAllReviews);

// GET /api/reviews/product/:productID
router.get("/product/:productID", getReviewsByProduct);

// PUT /api/reviews/:id/status
router.put("/:id/status", updateReviewStatus);

// DELETE /api/reviews/:id
router.delete("/:id", deleteReview);

export default router;
