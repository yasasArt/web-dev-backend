import express, { request } from "express"
import mongoose from "mongoose"
import studentRouter from "./routes/studentRouter.js"
import userRouter from "./routes/userRouter.js"

const mongoURI = "mongodb+srv://admin:1234@cluster0.k4ctve7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"//mongodb.net/yasas? ==> api kamthi database eka hadagnn puluwn
mongoose.connect(mongoURI).then(
    ()=>{
        console.log("connected to MongoDB Cluster")
    }
)

const app = express()

app.use(express.json())

app.use('/students', studentRouter)
app.use('/users', userRouter)


app.listen(3000,
    ()=>{
        console.log("server is running")
    }
)
