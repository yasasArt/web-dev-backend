import User from "../models/User.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export function createUser(req, res) {

    const data = req.body

    const hashedPassword = bcrypt.hashSync(data.password, 10)//10 kiyla danna hashing rounds eka

    const user = new User({
        email : data.email,
        firstName : data.firstName,
        lastName : data.lastName,
        password : hashedPassword,
        role : data.role,
    }) // aluthin ena userwa user kenek widiyta hadgnnwa


    user.save().then(
        ()=>{
            res.json({
                message : "User Created Successfully"
            })
        }
    ).catch(err => {
        res.status(500).json({ message: "Error creating user", error: err.message });
    });
}

export function loginUser(req,res){
    const email = req.body.email
    const password = req.body.password

    User.find({email: email}).then( 
        (users)=>{
            if(users[0] == null){ // user kenek nattm
                return res.json({
                    message : "User not Found"
                });
            }
            else{
                const user = users[0] //users la innwnma eka gannnwa

                const isPasswordCorrect = bcrypt.compareSync(password, user.password)//user kenage password ekai data base eke thyna password ekai samanaid kiyla balnwa
                if(isPasswordCorrect){
                    const payload = {
                        firstName:user.firstName,
                        lastName:user.lastName,
                        email:user.email,
                        role:user.role,
                        isEmailVerified:user.isEmailVerified
                    };
                
                    const token = jwt.sign(payload, "secretkey96$2025",{
                         expiresIn :"150h"
                    }) //payload eka token ekata convert krnwa

                    res.json({
                        // matching : isPasswordCorrect, //password eka samana nam true nathnm false
                        message: "Login Successfully",
                        token : token //token eka front end ekta dnnwa
                    });
                } 
                else{
                    res.status(401).json({
                        message: "Password is incorrect"
                    });
                }
            }
        }
    ).catch(err => {
        res.status(500).json({ message: "Error logging in", error: err.message });
    });
}

export function isAdmin(req){
    if(req.user == null){
       
        return false
     }
    if(req.user.role != "Admin"){
        
        return false
    }
    return true

}