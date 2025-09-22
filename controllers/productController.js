import Product from "../models/Product.js";
import { isAdmin } from "./userController.js";

export function createProduct(req, res){
    
    if(!isAdmin(req)){
        res.status(403).json({
            message : "Forbidden"
        })
        return
    }


    const product = new Product(req.body) 

    product.save().then(
        ()=>{
            res.json({
                message : "Product created successfully"
            })
        }
    ).catch(
        (error)=>{
            res.status(500).json({
                message : "Server error",
                error : error.message
            })
        }
    )
}

export function getAllProducts(req, res){
    if (isAdmin(req)) {
        Product.find()
        .then((products) => {
            res.json(products);
        })
        .catch((error) => {
            res.status(500).json({
                message: "Server error",
                error: error.message
            });
        });
        
    } else {
        Product.find({ isAvailable: true }) 
        .then((products) => {
            res.json(products);
        })
        .catch((error) => {
            res.status(500).json({
                message: "Server error",
                error: error.message
            });        
        });

    }
    
}

export function deleteProduct(req, res){
    
}
