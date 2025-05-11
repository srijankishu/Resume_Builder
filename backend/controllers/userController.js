import User from "../models/Users.js";
import bcrypt from 'bcryptjs'; 
import jwt from 'jsonwebtoken'


const JWT_SECRET = process.env.JWT_SECRET;

export const Signup= async(req,res)=>{

try{
    const {fullname,email,password,role} = req.body;

    const existingUser = await User.findOne({email});
    if(existingUser){
        return res.status(400).json({
            message:"User already exist!"
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
        fullname,
        email,
        password: hashedPassword,
        role
    })

    await newUser.save();

    res.status(201).json({
        message:"User created sucessfully",
        user: {
            fullname: newUser.fullname,
            email: newUser.email,
            role: newUser.role,
        }
    })
}catch(error){
    console.error("Signup Error:", error.message);
    res.status(500).json({ message: "Server error" });
}

};

export const login = async(req,res)=>{
    
    try{
        const {email,password} = req.body;
        const user = await User.findOne({email});
        
        if(!user){
           return res.status(404).json({
            message:"user not found"
           })
        }

         const isPasswordCorrect = await bcrypt.compare(password, user.password);
          if (!isPasswordCorrect) {
             return res.status(401).json({ message: "Invalid credentials" });
          }

        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1d' });
        
    

        res.status(200).json({
            message:"login sucessful",
            token,
            user:{
                fullname: user.fullname,
                email: user.email,
                role: user.role,
            }
        })
    }catch (error) {
        console.error("Login Error:", error.message);
        res.status(500).json({ message: "Server error" });
    }
}