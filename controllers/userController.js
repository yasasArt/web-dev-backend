import User from "../models/User.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import axios from "axios";
dotenv.config()

export function createUser(req, res) {

    const data = req.body

    const hashedPassword = bcrypt.hashSync(data.password, 10)//10 kiyla danne hashing rounds eka

    const user = new User({
        email : data.email,
        firstName : data.firstName,
        lastName : data.lastName,
        password : hashedPassword,
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
                res.status(404).json({
                    message : "User not Found"
                });
            }
            else{
                const user = users[0] //users la innwnm eka gannnwa

                const isPasswordCorrect = bcrypt.compareSync(password, user.password)//user kenage password ekai data base eke thyna password ekai samanaid kiyla balnwa
                if(isPasswordCorrect){
                    const payload = {
                        firstName:user.firstName,
                        lastName:user.lastName,
                        email:user.email,
                        role:user.role,
                        isEmailVerified:user.isEmailVerified
                    };
                
                    const token = jwt.sign(payload, process.env.JWT_SECRET,{ // me key+payload eken encript krpu token ekk hambenw.
                         expiresIn :"150h"
                    }) 

                    res.json({
                        // matching : isPasswordCorrect, //password eka samana nam true nathnm false
                        message: "Login Successfully",
                        token : token, //token eka frontend ekta dnnwa
                        role: user.role,
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

export function getUser(req,res){
    if(req.user == null){
        res.status(401).json({
            message : "Unauthorized"
        })
        return
    }
    res.json(req.user)
}

export async function googleLogin(req, res) {
  try {
    const response = await axios.get(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: {
          Authorization: `Bearer ${req.body.token}`,
        },
      }
    );

    const existingUser = await User.findOne({ email: response.data.email });

    if (existingUser == null) {
      const hashedPassword = bcrypt.hashSync("google-login", 10);

      const newUser = new User({
        email: response.data.email,
        firstName: response.data.given_name,
        lastName: response.data.family_name,
        password: hashedPassword,
        image: response.data.picture,
        isEmailVerified: true,
      });

      await newUser.save();

      const payload = {
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        role: newUser.role,
        isEmailVerified: true,
        image: newUser.image,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "150h",
      });

      return res.json({
        message: "Login successful",
        token: token,
        role: newUser.role,
      });
    }

    // ✅ EXISTING USER
    const payload = {
      email: existingUser.email,
      firstName: existingUser.firstName,
      lastName: existingUser.lastName, // ✅ FIX
      role: existingUser.role,
      isEmailVerified: existingUser.isEmailVerified,
      image: existingUser.image,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "150h",
    });

    res.json({
      message: "Login successful",
      token: token,
      role: existingUser.role,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Google login failed",
      error: error.message,
    });
  }
}