import express, { request } from "express"
import mongoose from "mongoose"
import studentRouter from "./routes/studentRouter.js"
import userRouter from "./routes/userRouter.js"
import jwt from "jsonwebtoken"

const mongoURI = "mongodb+srv://admin:1234@cluster0.k4ctve7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"//mongodb.net/yasas? ==> api kamthi database eka hadagnn puluwn
mongoose.connect(mongoURI).then(
    ()=>{
        console.log("connected to MongoDB Cluster")
    }
)

const app = express()

app.use(express.json())

app.use(
    (req, res, next) => {
        const authorizationHeader = req.header("Authorization"); //header eke thyna authorization kiyana eka gannnwa

        if (authorizationHeader != null) {

            const token = authorizationHeader.replace("Bearer ", "");

            jwt.verify(token, "secretkey96$2025",
                (error, content) => {

                    if (content == null) { 

                        console.log("invalid token");

                        res.json({
                            message: "Invalid Token"
                        })

                    } else {
                        
                        req.user = content;
                        next();
                    }
                }
            )
        }else{
            next();
        } 
    }
)

app.use('/students', studentRouter)
app.use('/users', userRouter)

app.listen(3000,
    ()=>{
        console.log("server is running")
    }
)
