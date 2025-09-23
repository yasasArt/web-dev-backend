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

export async function getAllProducts(req, res){ //async function ekak dnne anith ayta badawak natuwa krnnd.
    try {
        if (isAdmin(req)) {
        // Product.find()
        // .then((products) => {
        //     res.json(products);
        // })
        // .catch((error) => {
        //     res.status(500).json({
        //         message: "Server error",
        //         error: error.message
        //     });
        // });
        
        const products = await Product.find(); // await eka danwnm function eka async krnna one

    } else {
        Product.find({ isAvailable: true }) 
        .then((products) => {
            res.json(products);
        })
        .catch((error) => {
            res.status(500).json({
                message: "Error fetching products",
                error: error.message
            });        
        });

    }
    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
    
    
}

export function deleteProduct(req, res){
    if(!isAdmin(req)){
        res.status(403).json({
            message : "only admin can delete products"
        })
        return
    }
    const productID = req.params.productID

    Product.deleteOne({productID : productID}).then( //productID eka me ewala tiyna productID ekta samana kenwa delete krnn.
        ()=>{
            res.json({
                message : "Product deleted successfully"
            })
        }
        )
}

export function updateProduct(req, res){
    if(!isAdmin(req)){
        res.status(403).json({
            message : "only admin can update products"
        })
        return

    }
    const productID = req.params.productID

    Product.updateOne({productID : productID}, req.body).then( 
        ()=>{
            res.json({
                message : "Product updated successfully"
            })
        }
    )
}

export function getProductById(req, res){
    const productID = req.params.productID

    Product.findOne({productID : productID}).then(
        (product)=>{
            if(product == null){
                return res.status(404).json({
                    message : "Product not found"
                });
            }
            else{
                if(product.isAvailable){
                    res.json(product)
                }else{
                    if(isAdmin(req)){
                        res.json(product)
                    }else{
                        res.status(403).json({
                            message : "Product is not available"
                        })
                    }
                }
            }
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