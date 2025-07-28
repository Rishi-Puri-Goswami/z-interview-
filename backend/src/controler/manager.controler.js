import jwt from "jsonwebtoken";
import { Jobs } from "../module/jobs.module.js";
import { Manager } from "../module/manager.module.js";
import brycpt from "bcrypt"


 const userRegister = async (req  , res )=>{

try {


    const {name , email , password , photourl } = req.body  ;

    if(!name ||  !email ||  !password ||  !photourl){
return res.status(404).json({message : "all field are required"});
    }


    const check_in_database = await Manager.findOne({email});
    if(check_in_database){
        return res.status(400).json({message : "account with  this email already exist"})
    }


    const harsh = await brycpt.hash(password , 10);


    const create_user = await Manager.create({

        name,
        email ,
        password:harsh,
        photourl
    })


    if(!create_user){
        return res.status(400).json({message : "error on create user"})
    }


    return res.status(200).json({message : "user successfully create " , Manager:create_user});


    
} catch (error) {
    console.log("error on register user" , error);
}



}


 const loginuser = async (req , res )=>{


    try {


        const {email , password } = req.body ;


        if(!email || !password){
            return res.status(404).json({message : "all field are required "});
        }


        const check_email = await Manager.findOne({email});
        if(!check_email){
            return res.status(400).json({message: "email or password are wrong"})
        }
 
        const pass  = check_email.password;



       const verify  =  brycpt.compare(password  , pass);

       if(!verify){
      return res.status(400).json({message : "email or password are wrong"})
       }


       const token =  jwt.sign({_id : check_email._id} , process.env.JWT_SERECT_KEY ,  { expiresIn: '1d' } )


       if(!token){
        return res.status(400).json({message : "error on generate token"})
       }


       res.cookie("managertoken" , token , {
        httpOnly : true ,
        maxAge : 1*24*60*60*1000 ,
        sameSite : "none"
       });


       return res.status(200).json({message : "user successfull login " , token , user:check_email});

        
    } catch (error) {
        console.log("error on loging user" , error);
    }


}






const managercreate = async (req, res) => {

    try {

        const managerid = req.manager?._id;

        const { title, level, typeofintreview, company, industry, description, requirements, responsibilities } = req.body;

        if (!title || !level || !typeofintreview || !company || !industry || !description || !requirements || !responsibilities) {
            return res.status(404).json({ message: "all field  are required" });
        }


        const createjobs = await Jobs.create({ 
            managerid,
            title,
             level,
             typeofintreview,
             company,
             industry,
             description,
             requirements,
             responsibilities })


             if(!createjobs){
                          return res.status(400).json({ message: "error on create user"  , createjobs});
             }



             const findmanager = await Manager.findById(managerid);

             if(!findmanager){
                return res.status(200).json({message : "error on find manager id "})
             }

             findmanager.created_jobs_for_intreview.push(createjobs._id);
await findmanager.save()


            return res.status(200).json({ message: " intreview create successfully "  , createjobs });
        
    } catch (error) {
        console.log("error on create job intreview ", error);
    }




}

export {userRegister , loginuser , managercreate}