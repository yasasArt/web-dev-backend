import User from "../models/User.js";
import bcrypt from "bcrypt"

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
        })
}

export function loginUser(req,res){
    const email = req.body.email
    const password = req.body.password

    User.find({email: email}).then( 
        (users)=>{
            if(users[0] == null){ // user kenek nattm
                message : "User not Found"
            }
            else{
                const user = users[0] //users la innwnma eka gannnwa

                const isPasswordCorrect = bcrypt.compareSync(password, user.password)//user kenage password ekai data base eke thyna password ekai samanaid kiyla balnwa
                res.json({
                    matching : isPasswordCorrect //password eka samana nam true nathnm false
                })
            }
    }
    )//body eken ena email ekta adala email eka tiyna user kenek innwd kiyla blnw
}