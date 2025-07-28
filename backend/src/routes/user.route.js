    import express from "express"
    import { continueInterview, extract_from_pdg, find_share_job, finduser, givefeedback, jobs, loginusergoogle, logout, showresumeresult, userRegister } from "../controler/user.controler.js";
import upload from "../middleware/multer.js";
import validuser from "../middleware/user.middleware.js";
    const userrouter = express.Router();



    userrouter.route("/userRegister").post(userRegister);
    userrouter.route("/loginusergoogle").post(loginusergoogle);
    userrouter.route("/extract_from_pdg/:jobid").post( validuser  , upload.single("resume") , extract_from_pdg );
    userrouter.route("/continueInterview/:createintreviewid").post( validuser  ,  continueInterview );
    userrouter.route("/givefeedback/:createintreviewid").get( validuser  ,  givefeedback );
    userrouter.route("/logout").get( validuser  ,  logout );
    userrouter.route("/jobs").get( validuser  ,  jobs );
    userrouter.route("/finduser").get( validuser  ,  finduser );
    userrouter.route("/showresumeresult/:createintreviewid").get( validuser  ,  showresumeresult );
    userrouter.route("/find_share_job/:jobid").get( find_share_job );
    
    export default userrouter;



