import jwt from "jsonwebtoken"
import { Manager } from "../module/manager.module.js";
const validmanager = async (req , res , next )=>{

    try {

        const token = req.cookies?.managertoken;
        if(!token){
            return res.status(400).json({message : "invalid user no token provied"});
        }

       const decoded =  jwt.verify(token , process.env.JWT_SERECT_KEY);

if(!decoded){
    return res.status(400).json({message : "error during decoded token"});
}

const userid = decoded._id ;

if(!userid){
 return res.status(400).json({message : "user id not found"});
}

const finduser = await Manager.findById(userid).select("-password");

if(!finduser){
 return res.status(400).json({message : "user not found"});
}

req.manager = finduser ;

next();
        
    } catch (error) {
        console.log("error in manager middleware " , error)
    }

}

export default validmanager ;

