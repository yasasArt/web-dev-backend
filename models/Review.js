import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    name : {
      type : String,
      required : true
    },
    productID : {
      type : String,
      required : true,
      unique : true
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Review", reviewSchema);
