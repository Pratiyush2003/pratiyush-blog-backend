import express from 'express';
import User from '../models/User.js';
import bcrypt from "bcryptjs"
import 'dotenv/config';
import jwt from 'jsonwebtoken'
import fetchUser from '../middleware/fetchUser.js';
const router = express.Router();



router.post('/signup', async (req, res) => {
        const {  userEmail , userPassword } = req.body
        try {
           // validation
           if(!userEmail || !userPassword){
            return res.status(400).json({error : 'all fields are required'})
           }

            //email validation
            if(!userEmail.includes('@')){
                return res.status(400).json({error : "Please Enter a valid email"})
            }

            //find unique user with email
            const user = await User.findOne({userEmail});
            if(user){
                return res.status(400).json({error : "user already exists"})
            }

            //generate salt
            const salt = await bcrypt.genSalt(10);

            //hash password
            const hashedPassword = await bcrypt.hash(userPassword , salt)

            const newUser = await User({
                userEmail,
                userPassword : hashedPassword
            });

            await newUser.save();
            res.status(200).json({success : "Signup successfull"})

        } catch (error) {
            console.log(error)
            res.status(500).send("Internal server error")
        }
})

router.post("/login", async (req, res) => {
    const {  userEmail , userPassword } = req.body

            try {
            //validation
            if(!userEmail || !userPassword){
                return res.status(400).json({message : "user not found"})
            }
            //Email validation
            if(!userEmail.includes("@")){
                return res.status(400).json({error : "Please enter a valid email"})
            } 
            //find unique user with email
            const user = await User.findOne({ userEmail });

            //if user not exist with that email
            if(!user){
                return res.status(400).json({error : "user not found"})
            }

            //mathching user password to hash password with bcrypt.compare()
            const doMatch = await bcrypt.compare(userPassword , user.userPassword)
            console.log(doMatch);

            if(doMatch){
                const token = jwt.sign({userId : user.id}, process.env.JWT_SECRET , {
                    expiresIn : '7d'
                })
                res.status(201).json({token})
            }else{
                res.status(404).json({error : "Email and password not found"})
            }

            } catch (error) {
                console.log(error);
                res.status(500).send("Internal server error")
            }
})

router.get('/getuser', fetchUser , async (req ,res) => {
        try {
            const userId = req.userId;
            const user = await User.findById(userId).select("-userPassword")
            res.send(user)
        } catch (error) {
            console.log(error);
            res.status(500).send("Internal server error")
        }
})

export default router 