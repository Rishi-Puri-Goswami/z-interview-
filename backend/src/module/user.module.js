import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({

name : {
    type : String , 
    required : true
},

email : {
    type  : String ,
    required : true
},
password : {
    type : String ,  
},
photourl :{
    type : String,
    default : ""
},
isverify :{
    type : Boolean,
    default : false
},

totalintreview : [
    {
        type : mongoose.Schema.Types.ObjectId ,
        ref : "Intreview"
    }
]

})


export const User = mongoose.model("User" , userSchema);
