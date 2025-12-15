import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email : {
        type: String, // type eka string(mokkd type eka kiyla ahnnne)
        required: true,
        unique: true // email eka unique wenna one(eka email ekakin ekkenai innd puluwn)

    },

    firstName : {
        type: String,
        required: true
    },
    lastName : {
        type: String,
        required: true
    },
    password : {
        type: String,
        required: true 
    },
    role:{
        type : String,
        default : "customer" 
    },
    isBlocked : {
        type : Boolean,
        default : false //block neh
    },
    isEmailVerified : {
        type : Boolean,
        default : false //email eka verify krnne neh
    },
    image: {
        type : String,
        required : true,
        default : "/default.jpg"
    }
})
const User = mongoose.model("User", userSchema);
export default User;