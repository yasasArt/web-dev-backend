import express from "express";
import {
  createReview,
  getAllReviews,
  getReviewsByProduct,
  updateReviewStatus,
  deleteReview,
} from "../controllers/reviewController.js";

const router = express.Router();

// CREATE review
router.post("/", createReview);

// GET all reviews (admin)
router.get("/", getAllReviews);

// GET reviews by product
router.get("/product/:productID", getReviewsByProduct);

// UPDATE review status
router.put("/:id/status", updateReviewStatus);

// DELETE review
router.delete("/:id", deleteReview);

export default router;
