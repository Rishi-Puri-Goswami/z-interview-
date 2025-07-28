import jwt from "jsonwebtoken"
import { User } from "../module/user.module.js";
const validuser = async (req , res , next )=>{

    try {
        const token = req.cookies?.usertoken;
        if(!token){
            return res.status(200).json({message : "invalid user no token provied" , status : 202});
        }

       const decoded =  jwt.verify(token , process.env.JWT_SERECT_KEY);

if(!decoded){
    return res.status(400).json({message : "error during decoded token"});
}

const userid = decoded._id ;

if(!userid){
 return res.status(400).json({message : "user id not found"});
}

const finduser = await User.findById(userid).select("-password");

if(!finduser){
 return res.status(202).json({message : "in valid user" ,  status : 202});
}

req.user = finduser ;

next();
        
    } catch (error) {
        console.log("error in manager middleware " , error)
    }

}

export default validuser ;

