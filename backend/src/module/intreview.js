import mongoose, { Schema } from "mongoose";

const IntreviewSchema = new Schema({

    userid :{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },

    jobid : {
      type : mongoose.Schema.Types.ObjectId,
      ref : "Manager"
    }
,

     resumeText: {
    type: String,
    required: true,
  },




  transcript : [
    {
      role: {
        type: String,
        enum: ['ai', 'user'],
      },
      content: String,
    },
  ],


    feedback: {
    overall_analysis: String,
    notable_strengths: [String],
    areas_for_improvement: [String],
    overall_rating: Number,
    final_tip: String,
  },


  
  videoUrl: {
    type: String, 
  },


ai_resume_feedback:{

  role : String,
  match_summary:String,
  match_percent:String,
  matched_skills:Array,
  missing_skills:Array,
  partial_skills:Array,
  content:String

}



},{timestamps : true});


export const Intreview = mongoose.model("Intreview" , IntreviewSchema);
