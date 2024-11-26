import { User } from "../models/users.js";
import logger from "../logs/logger.js";
import { comparar } from "../common/bycript.js";
import jwt from 'jsonwebtoken';
import 'dotenv/config';



async function login(req,res) {
    try{
        const {username, password}=req.body;

        const user=await User.findOne({ where:{username} });
        if (!user){
            return res.status(400).json({message:'User not found'})
        }

        if (!(await comparar(password,user.password)))
            return res.status(403).json({message:'Usuario no autorizado'})
        
        const secret=process.env.JW_SECRET;
        const segundos=process.env.JW_EXPIRES_SECONDS;
        
        const token=jwt.sign({userId: user.id},secret,{
            expiresIn:eval(segundos)
        });
        res.json({token});

    } catch (error) {
    logger.error('Error createUser: ' + error);
    res.status(500).json({message: 'Server error'})
}
}

export default {
    login,
}