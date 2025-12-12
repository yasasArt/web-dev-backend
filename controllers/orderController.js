import { json } from "express";
import Order from "../models/Order.js";
import Product from "../models/Product.js";   // FIX: product model import
import {isAdmin} from "./userController.js";

export async function createOrder(req, res) {
    //ORD00001
    if (req.user == null) {  // FIX: req.User → req.user
        return res.status(402).json({
            message: "Unauthorized"
        });
    }

    try {
        const latestOrder = await Order.findOne().sort({ date: -1 }) //data tika sort krnw

        let orderId = "ORD000001" //order id kiyla variable ekk hdgnnw

        if (latestOrder != null) { //api dna oder ekta amtr twa oders thiynw nm api anthima order eke id eka generate krgnnw
            let latestOrderId = latestOrder.orderId; //ORD0000012 - antima id eka gnnw
            let latestOrderNumberString = latestOrderId.replace("ORD", ""); //0000012 - id eke ORD kotsa ain krnw
            let latestOrderNumber = parseInt(latestOrderNumberString); //12 (0000012 wge String ekk number ekk widiyt convert krnw )

            let newOrderNumber = latestOrderNumber + 1; //13 - last oder ekta ekk ekatu krla aluth oder eka hdgnnw
            let newOrderNumberString = newOrderNumber.toString().padStart(6, "0"); // "000013"

            orderId = "ORD" + newOrderNumberString; //ORD0000013 - order id eka me widiyt update krgnnw
        }

        const items = []
        let total = 0

        for (let i = 0; i < req.body.items.length; i++) {

            const product = await Product.findOne({ productID: req.body.items[i].productID }) // FIX: product → Product

            if (product == null) { // product eka database eke tiyna ekkd blnw
                return res.status(400).json({   // FIX: Status → status
                    message: `product with ID ${req.body.items[i].productID} not found`  // FIX: item → items
                })
            }

            items.push({ //api hapu items kiyna arry ekta me products tika dnw
                productID: product.productID,
                name: product.name,
                price: product.price,
                quantity: req.body.items[i].quantity,
                image: product.images[0]
            })

            total += product.price * req.body.items[i].quantity   // FIX: req.body,item → req.body.items
        }

        let name = req.body.name //oder eke body eka atule namak liyla ewla tiynwd blnw
        if (name == null) {
            name = req.user.firstName + " " + req.user.lastName  // FIX: req.user not req.User
        }

        const newOrder = new Order({
            orderId: orderId,
            email: req.user.email,
            name: name,
            address: req.body.address,
            total: total,
            items: items,
            phone: req.body.phone,
        })

        await newOrder.save()

        // for (let i =0; i< items.length; i++){
        //     await Product.UpdateOne(
        //         { productId :Items[i].productID },
        //         { $inc : {stock : items[i].quantity}}  // me widiyt puluwn stock ekk manage krgnnd
        //     )
        // }

        return res.status(200).json({
            message: "Order placed successfully",
            orderId: orderId
        });

    } catch (error) {
        return res.status(500).json({   // FIX: Status → status
            message: "Error Placing order",
            error: error.message,        // FIX: error,message → error.message
        })
    }
}
export async function getorders(req, res) {
    if (req.user == null) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }

    // Admin can see all orders
    if (isAdmin(req)) {
        const orders = await Order.find().sort({ date: -1 });
        return res.json(orders);
    }

    // Normal user: only their orders
    const orders = await Order.find({ email: req.user.email }).sort({ date: -1 });
    return res.json(orders);
}

