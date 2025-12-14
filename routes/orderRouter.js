import express from "express";
import { createOrder, getorders, updateOrderStatus } from "../controllers/orderController.js";

const orderRouter = express.Router();

orderRouter.post("/", createOrder);
orderRouter.get("/", getorders)
orderRouter.put("/:orderId", updateOrderStatus)

export default orderRouter;