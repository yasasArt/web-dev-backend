import express from "express";
import {
  createReview,
  getAllReviews,
  getReviewsByProduct,
  updateReviewStatus,
  deleteReview,
} from "../controllers/reviewController.js";

const router = express.Router();

// create review
router.post("/", createReview);

// get all reviews (admin)
router.get("/", getAllReviews);

// get reviews by product ID (user)
router.get("/product/:productID", getReviewsByProduct);

// update review status (admin)
router.put("/:id/status", updateReviewStatus);

// delete review (admin)
router.delete("/:id", deleteReview);

export default router;
