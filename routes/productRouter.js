import express from "express"
import { createProduct, deleteProduct, getAllProducts, updateProduct } from "../controllers/productController.js"

const productRouter = express.Router()

productRouter.get("/", getAllProducts)

productRouter.post("/", createProduct)

productRouter.delete("/:productID", deleteProduct)

productRouter.put("/:productID", updateProduct)

export default productRouter