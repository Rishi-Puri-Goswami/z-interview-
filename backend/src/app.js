import express from "express";
import dotenv from "dotenv";
import cookieparser from "cookie-parser"
import cors from "cors";
import userrouter  from "./routes/user.route.js";
import dbconnect from "./dbconnect/dbconnect.js";
import managerroute from "./routes/manager.route.js";


const app = express();
app.use(express.json());
app.use(cookieparser());
app.use(cors({
    origin : "http://localhost:5173" ,
    credentials : true
}))
dotenv.config({
    path : "../.env"
})

app.get("/" , (req , res)=>{
    res.send("hello from ai");
}
)

app.use("/user" , userrouter );
app.use("/manager" , managerroute )
dbconnect().then( ()=>{

app.on( "error" , (error)=>{
    console.log("error on talk to data base" , error)
})


app.listen(3000 || 4000 , ()=>{
    console.log("app was listing on port 3000")
})

}



).catch((error)=>{
    console.log("error on connect data base on app.js file ::>" , error);
})




