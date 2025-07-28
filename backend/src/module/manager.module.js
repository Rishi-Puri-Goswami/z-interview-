import mongoose, { Schema } from "mongoose";

const managerschema = new Schema({

name : {
    type : String ,
    required : true
},

email : {
    type : String,
    required : true
},
password : {
    type : String,
    required : true
}
,


created_jobs_for_intreview  : [
    {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Jobs"
    }
]


}, { timestamps : true });

export const Manager = mongoose.model("Manager" , managerschema);




