    import express from "express"
import { loginuser, managercreate, userRegister } from "../controler/manager.controler.js";
import validmanager from "../middleware/managre.middleware.js";
    

    const managerroute = express.Router();



    managerroute.route("/userRegister").post(userRegister);
    managerroute.route("/loginuser").post(loginuser);
    managerroute.route("/managercreate").post( validmanager ,managercreate);
    
    export default managerroute;


