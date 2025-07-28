import mongoose, { Schema } from "mongoose";

const JobsSchema = new Schema({


    managerid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Manager",
        required: true
    },
    
    userintreviewid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }

    ,

    question_amount: {
        type :Number,
        default : 5
    }
    ,

    title: {
        type: String,
        required: true
    },
    level: {
        type: String,
        enum: ["High-level", "Medium-level", "Easy-level"]
    },

    typeofintreview: {
        type: String,
        required: true
    },

    company: {
        type: String,
        required: true
    },

    industry: {
        type: String,
        required: true
    },

    description:
    {
        type: String,
        required: true
    }
    ,
    requirements: [
    String
],
    responsibilities: [

           String

    ],

}, { timeseries: true });

export const Jobs = mongoose.model("Jobs", JobsSchema);




