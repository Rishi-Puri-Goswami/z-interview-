import { User } from "../module/user.module.js";
import brycpt from "bcrypt"
import jwt from "jsonwebtoken"
import tesseract from "tesseract.js";
import getGenerativeModel from "./ai.controler.js";
import { Intreview } from "../module/intreview.js";
import { Jobs } from "../module/jobs.module.js";
import clint from "../redis/redis.js";
import cookie from "cookie-parser"
 const userRegister = async (req  , res )=>{

try {


    const {name , email , password , photourl } = req.body  ;

    if(!name ||  !email ||  !password ||  !photourl){
return res.status(404).json({message : "all field are required"});
    }


    const check_in_database = await User.findOne({email});
    if(check_in_database){
        return res.status(400).json({message : "account with  this email already exist"})
    }


    const harsh = await brycpt.hash(password , 10);


    const create_user = await User.create({

        name,
        email ,
        password:harsh,
        photourl
    })


    if(!create_user){
        return res.status(400).json({message : "error on create user"})
    }


    return res.status(200).json({message : "user successfully create " , User:create_user});


    
} catch (error) {
    console.log("error on register user" , error);
}



}

 const loginusergoogle = async (req , res )=>{


    try {


        const {email , name , photourl , isverify } = req.body ;


        if(!email || !name || !photourl || !isverify ){
            return res.status(404).json({message : "all field are required "});
        }


        const finduser = await User.findOne({email});

        if(finduser){



       const token =  jwt.sign({_id : finduser._id} , process.env.JWT_SERECT_KEY ,  { expiresIn: '1d' } )


       if(!token){
        return res.status(400).json({message : "error on generate token"})
       }

 res.cookie("usertoken" , token , {
        httpOnly : true ,
        maxAge : 1*24*60*60*1000 ,
        sameSite : "none",
        secure: true
       });

return res.status(200).json({message : "login successfull" , status : 200 , token})

        }

        if(!finduser){

const create = await User.create({

  name ,
  email,
  photourl,
  isverify

})


if(!create){
  return res.json({message : "error in create user"});
}


       const token =  jwt.sign({_id : create._id} , process.env.JWT_SERECT_KEY ,  { expiresIn: '1d' } )


       if(!token){
        return res.status(400).json({message : "error on generate token"})
       }


       res.cookie("usertoken" , token , {
        httpOnly : true ,
        maxAge : 1*24*60*60*1000 ,
        sameSite : "none",
        secure: true
       });

        }



       return res.status(200).json({message : "user successfull login" , token , status : 200});
  
    } catch (error) {
        console.log("error on loging user" , error);
    }


}

 const extract_from_pdg = async (req  , res )=>{

try {
    const userid = req.user?._id ;
    const {jobid} = req.params;
    const pdf = req.file.buffer ;

    if(!pdf){
        return res.status(404).json({message : "resume are required"});
    }

if(!userid){
        return res.status(404).json({message : "all field are required"});
}

     const result = await tesseract.recognize(pdf, "eng", {
      logger: (m) => console.log(m) 
    });


const findjob = await Jobs.findById(jobid);


if(!findjob){
    return res.status(400).json({message : "error on find job create by manager"});
}

const resume = result.data.text;

if(!resume){
    return res.status(400).json({message : "error on extract text from resume"});
}


const data ={
    question_amount:findjob.question_amount ,
    title:findjob.title,
    level:findjob.level,
    typeofintreview:findjob.typeofintreview,
    company:findjob.company,
    industry:findjob.industry,
    description:findjob.description,
    requirements:findjob.requirements,
    responsibilities:findjob.responsibilities,
    resume
}

// const prompt = 


const chatHistory = [
  {
    role: "user",
    parts: [
      {              
       text: `You are an advanced AI trained in candidate-job matching and professional interviewing. Your role is to:
1. Carefully analyze the candidate’s resume.
2. Compare it against the provided job details.
3. Output how well the resume aligns with the job in terms of skills, experience, and responsibilities.
4. Then, begin the interview by asking a highly relevant first question.

🎯 Task 1: Resume Matching Evaluation
You must:
- Read the full job role, requirements, and responsibilities.
- Extract all **technical and behavioral skill keywords**.
- Then compare those against the candidate's resume content (projects, experience, skills).
- Determine which skills/tools/experiences **match**, which are **missing**, and which are **partially relevant**.
- Output a **summary of how well the resume matches**, and provide a **match percentage** (from 0% to 100%) based on depth and relevance.

🎯 Task 2: Interview Kickoff
After evaluating the resume match:
- Craft a single, smart, relevant **opening question** to start the interview.
- Base this question on **skills that match**, or dig deeper into **the most relevant experience or project**.
- Avoid generic intros like “Tell me about yourself.”

📌 Job Information:
- Total Questions: ${findjob.question_amount}
- Title: ${findjob.title}
- Level: ${findjob.level}
- Interview Type: ${findjob.typeofintreview}
- Company: ${findjob.company}
- Industry: ${findjob.industry}
- Description: ${findjob.description}
- Requirements:\n${findjob.requirements}
- Responsibilities:\n${findjob.responsibilities}

📝 Candidate Resume:
${resume}

📤 Output Format:
Return a JSON object ONLY in this format:

{
  "role": "ai",
  "match_summary": "Your evaluation summary of how well the resume matches the job, including matching and missing skills.",
  "match_percent": 88, // integer from 0–100
  "matched_skills": ["React", "Node.js", "MongoDB", ...],
  "missing_skills": ["Docker", "GraphQL", ...],
  "partial_skills": ["CI/CD", "Unit Testing", ...],
  "content": "here you give the feedback about the resume"
}

Do NOT include explanations, markdown, or extra comments. Output the JSON only.
`
      }
    ]
  },
];


const aires = await getGenerativeModel(chatHistory)



if(!aires){
    return res.status(400).json({message : "error on generate question by ai"});
}




const cleaned = aires.replace(/```json\n?|```/g, '').trim();


const aiResponse = JSON.parse(cleaned);



const createintreview  = await Intreview.create({
    userid,
    jobid,
    resumeText : resume,

  ai_resume_feedback:{ role : aiResponse.role,
  match_summary:aiResponse.match_summary,
  match_percent:aiResponse.match_percent,
  matched_skills:aiResponse.matched_skills,
  missing_skills:aiResponse.missing_skills,
  partial_skills:aiResponse.partial_skills,
  content:aiResponse.content
},
})

console.log({ role : aiResponse.role,
  match_summary:aiResponse.match_summary,
  match_percent:aiResponse.match_percent,
  matched_skills:aiResponse.matched_skills,
  missing_skills:aiResponse.missing_skills,
  partial_skills:aiResponse.partial_skills,
  content:aiResponse.content
});



const key = `user:${userid}:${createintreview._id}:data`
await clint.set(key  ,JSON.stringify({ data ,createintreview , aiResponse}) , "EX" , 86400);


findjob.userintreviewid = createintreview._id;
await findjob.save();

if(!createintreview){
    res.status(400).json({message : "error on create intreview"});
}





    return res.status(200).json({message : "intreview create successfylly" , data , createintreview  , status : 200 , createintreviewid:createintreview._id });

} catch (error) {
    console.log("error on extract text from pdf in server  " , error)
}
}

const continueInterview = async (req, res) => {
  try {

    const userid = req.user?._id;
    const {createintreviewid} = req.params;
console.log("user idddddddddddd"  , userid)
    if(!userid){
      return res.status(200).json({message : "not login"})
    }

    const { message } = req.body;

    const key = `user:${userid}:${createintreviewid}:data`;

    const userdata = await clint.get(key);
    console.log(JSON.parse(userdata) , "redis data");
console.log(message);

    if (!userdata) {
      return res.status(400).json({ message: "user data not found" });
    }

    let cashed = JSON.parse(userdata);
    let { createintreview } = cashed;
    let { data } = cashed;

    let usermessage = {
      role: "user",
      content: message,
    };

    createintreview.transcript.push(usermessage);

const chatHistory = [
  {
    role: "user",
    parts: [
      {    

        text: `You are a highly professional AI interviewer designed to conduct role-specific interviews in exactly 5 questions. You are NOT allowed to go beyond 5 questions. Do not mention anything about "number of questions depending on the candidate" — stick to 5.

Job Role: ${data.title}  
Level: ${data.level}  
Interview Type: ${data.typeofintreview}  
Company: ${data.company}  
Industry: ${data.industry}  
Job Description: ${data.description}  
Responsibilities: ${data.responsibilities}  
Requirements: ${data.requirements}

The candidate’s resume:
${data.resume}

🧠 Your Task:
- Ask **only 7 structured, thoughtful, technical questions** — one per turn.
- Each question should be **based on the resume** and **aligned to the job description or responsibilities**.
- Use the **candidate’s previous answer** to decide the next follow-up question.
- Make each question count — no fluff or generic “Tell me about yourself”-style questions.

🎯 Rules:
1. Begin with a strong, role-relevant first question based on resume + requirements.
2. Each new question must be shaped by the candidate’s previous answer.
3. If the candidate goes off-topic, gently steer them back with a polite reminder like:
   - *"Thank you. Let’s bring the focus back to your experience related to the job role."*
4. Never repeat the same question or say “I will ask more questions later”.
5. NEVER say anything like: *“The number of questions depends on your answers”*. You are to ask 7 questions. No more, no less.
6. If the candidate does not answer the last question or tries to skip it, respond politely but firmly with something like:

    “Before we move forward, could you please respond to the previous question? It's important for evaluating your fit for the role.”
OR
“Let’s address the last question first — your answer will help guide the next steps of the interview.”




🎤 Tone:
- Act like a human tech interviewer: smart, professional, conversational but to the point.
- Focus on their problem-solving, experience, tools, and critical thinking related to the job.
- After the fifth question, thank the candidate and **end the interview** with some small feedback  .
- If the candidate gives an irrelevant, unserious, or uninterested answer (e.g. joking, going off-topic, or clearly not taking the interview seriously), than give him the replay base on her ans and  you may respond with a polite but savage replay.
-     If the candidate does not answer the last question or tries to skip it, respond politely but firmly with something like:

    “Before we move forward, could you please respond to the previous question? It's important for evaluating your fit for the role.”

OR

    “Let’s address the last question first — your answer will help guide the next steps of the interview.”

Keep the tone respectful, but maintain control of the flow like a real interviewer would.

🚫 Forbidden:
- Do not ask general intro questions.
- Do not talk about how many questions you might ask — you must ask only 5.
- Do not say "this is not a test" or "this is just a conversation."
- take it like this was a real intreview 
You are simulating a real job interview to evaluate the candidate’s fitness for the role. Begin now.

`


      }
    ]
  },

  ...createintreview.transcript.map((msg) => ({
    role: msg.role === "ai" ? "model" : "user",
    parts: [{ text: msg.content }]   
  }))
];


    
    const aiReply = await getGenerativeModel(chatHistory);

    if (!aiReply) {
      return res.status(400).json({ message: "no ai reply" });
    }

    let aireply = {
      role: "ai",
      content: aiReply,
    };

    createintreview.transcript.push(aireply);

    await clint.set(key, JSON.stringify(cashed), "EX", 86400);

    console.log(cashed);
    return res.status(200).json({ai:aiReply}) ;
  } catch (error) {
    console.log("error in continueInterview:", error);
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

const finduser = async (req , res )=> {
  try {

   const userid = req.user?._id ;

   if(!userid){
    return res.status(400).json({message : "user id not provide"});
   }
  
   const finduser = await User.findById(userid).select("-password");

  
if(!finduser){
  return res.status(400).json({message : "error on find user"});
}

return res.status(200).json({message : "user find" , finduser});
    
  } catch (error) {
    console.log("error on finding user" , error)
  }
}

const jobs = async (req , res) =>{

  try {

    const  job = await Jobs.find();

    if(!job){
      return res.status({message : "error on fetch jobs"});
    }

    
      return res.status(200).json({message : "fetch successfully " , job});

    
  } catch (error) {
    console.log("error on fetch jobs" , error)
  }

}


const showresumeresult =  async (req , res) =>{

  try {
    
      const userid = req.user?._id;
      const {createintreviewid} = req.params;
      if(!userid){
        return res.status(400).json({message : "user id not found"})
      }
    const key = `user:${userid}:${createintreviewid}:data`;
    const userdata = await clint.get(key);

    const data = JSON.parse(userdata)

    const {createintreview} = data ;

    if(!data){
        return res.status(400).json({message : "data from redis not found"});
    }

return res.status(200).json({message : "resume ai feedback " , createintreview});

  } catch (error) {
    console.log("error on showing resume result" , error)
  }

}


const givefeedback = async (req , res)=>{


  try {

    const userid = req.user?._id;
const {createintreviewid} = req.params ;

const key = `user:${userid}:${createintreviewid}:data`
 const dataa = await clint.get(key);
const feedbakdata = JSON.parse(dataa);
const { data ,createintreview , aiResponse} = feedbakdata ;

const { ai }= feedbakdata;

if(ai){
  return res.status(200).json({message : "fetch from redis" , ai:JSON.parse(ai)});
}


const chatHistory = [
  {
    role: "user",
    parts: [
      {              
       text:`
🧠 You are a highly advanced AI interviewer and resume analyst.

🎯 Your task is to **analyze the complete interview** and **resume** in relation to the job role, and then generate detailed **feedback** using the provided structure.

---

📁 JOB DETAILS:
- Job Title: ${data.title}
- Company: ${data.company}
- Interview Type: ${data.typeofintreview}
- Level: ${data.level}
- Industry: ${data.industry}
- Description: ${data.description}
- Requirements: ${data.requirements}
- Responsibilities: ${data.responsibilities}
 - description : ${data.description}
---

📄 CANDIDATE RESUME TEXT:
${createintreview.resumeText}

---

💬 INTERVIEW TRANSCRIPT:
${JSON.stringify(createintreview.transcript)}

---

✅ OBJECTIVES:

1. Carefully analyze the full interview conversation (transcript), the resume, and the job details.
2. Understand how the candidate communicated, their technical depth, project relevance, behavior, clarity, and skills alignment.
3. Identify matched skills, missing skills, and partially demonstrated skills between the resume and job requirements.
4. Give **two sets of feedback** as per the structure below:

---

📤 OUTPUT FORMAT:
Return only a valid **JSON object** in this format:


  "feedback": {
    "overall_analysis": "Summary of how the candidate performed in the interview.",
    "notable_strengths": ["List key strengths observed in the interview."],
    "areas_for_improvement": ["List areas where the candidate could improve."],
    "overall_rating": 8 , // Rating out of 10 "*don't give the value in decimal*"
    "final_tip": "A motivational or improvement tip based on the interview."
  },
---
📌 RULES:
- Be fair, unbiased, and professional.
- Do not make up skills or information not present in the data.
- If data is insufficient, politely mention that.
- Do not include any extra explanation or markdown, only output the JSON.
`


      }
    ]
  },
];

const aires = await getGenerativeModel(chatHistory)

const cleaned = aires.replace(/```json\n?|```/g, '').trim();

if(!aires){
  return res.status(400).json({message : "error on create in ai responce"});
}



await clint.set(key ,JSON.stringify({ data ,createintreview , aiResponse , ai:cleaned}) , "EX" , 86400, );

console.log("ai " , JSON.parse(cleaned));
  return res.status(200).json({message : "ai feedback" , ai:JSON.parse(cleaned)});




    
  } catch (error) {
    console.log("error on create the feedback from ai " , error)
  }
}


const logout = async (req , res) =>{

  try {

    const userid = req.user?._id;
    if(!userid){
          return res.status(200).json({message : "user id required"});
    }
 await res.clearCookie('usertoken'); 
 
   return res.status(200).json({message : "user logout successfully" , status : 200})
  

  } catch (error) {
    console.log("error on logout user" , error)
  }

}



const find_share_job = async (req  , res) =>{

  try {
    
const {jobid} = req.params;

if(!jobid){
  return res.status(404).json({message : "job id missing"})
}

const findjob = await  Jobs.findById(jobid);

if(!jobid){
  return res.status(404).json({message : "error on find job"});
}

  return res.status(200).json({message : "job successfully find" , job:findjob});


  } catch (error) {
    console.log("error on find job " , error)
  }


}



const searchjob  = () =>{

  try {
    
    

  } catch (error) {
    console.log("error on search job " , error);
  }

}



export { userRegister , loginusergoogle , extract_from_pdg ,continueInterview , finduser ,jobs , showresumeresult , givefeedback ,logout ,  find_share_job }

