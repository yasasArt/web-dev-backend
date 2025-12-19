import express from 'express';
import { createUser, getUser, googleLogin, loginUser, sendOTP, validateOTPAndUpdatePassword } from '../controllers/userController.js';

const userRouter = express.Router()

userRouter.post("/",createUser)
userRouter.post("/login", loginUser)
userRouter.get("/", getUser)
userRouter.post("/google-login", googleLogin)
userRouter.get("/send-otp/:email", sendOTP)
userRouter.post("/validate-otp", validateOTPAndUpdatePassword)

export default userRouter  //export default danne apita userRouter eka witrak export krnnd ona nisa