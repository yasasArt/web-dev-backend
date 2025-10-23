import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        productID : {
            type : String,
            required : true,
            unique : true
        },
        name : {
            type : String,
            required : true
        },
        altNames : { //eka product ekakata names godak tiyennd puluwn
            type : [String], //string arry ekk(nam godak tiyna)
            default : []
        },
        description :{
            type : String,
        },
        price : {
            type : Number,
            required : true
        },
        labelledPrice : {
            type : Number,
            required : true
        },
        images : {
            type : [String], //images godak dagnna puluwn
            required : true
        },
        category : {
            type : String,
            required : true,
            default : "No brand"
        },
        model : {
            type : String,
            required : true,
            default : "standard"
        },
        brand : {
            type : String,
            required : true,
            default : "Generic"
        },
        stock : {
            type : Number,
            required : true,
            default : 0
        },
        isAvailable : {
            type : Boolean,
            required : true,
        },
    }
)

const Product = mongoose.model("Product", productSchema); //product model eka hadnwa
export default Product;