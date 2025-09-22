import express from "express"
import { createProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from "../controllers/productController.js"

const productRouter = express.Router()

productRouter.get("/", getAllProducts)

productRouter.get("/:productID", getProductById)

productRouter.post("/", createProduct)

productRouter.delete("/:productID", deleteProduct)

productRouter.put("/:productID", updateProduct)

export default productRouter