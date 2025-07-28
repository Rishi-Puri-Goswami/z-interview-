import React, { useEffect, useState } from 'react'
import { SlCloudUpload } from 'react-icons/sl';
import { BsRobot } from "react-icons/bs";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
const Resumescore = () => {
const params = useParams();
const {createintreviewid} = params ;
  const navigate = useNavigate();

const url = import.meta.env.VITE_BASE_URL;

console.log(createintreviewid , "uuuuuuuuuuuurrrrrrrrrrrlllllll")

  const [present, setpresent] = useState(60)
  const [constct, setcontect] = useState("")
  const [skill, setskill] = useState([])
  const [missingskill, setmissingskill] = useState([])
  const [intreviewid, setintreviewid] = useState("")


useEffect(() => {
 

  const feedback = async () =>{

try {

  const res = await axios.get(`${url}/user/showresumeresult/${createintreviewid}` , {
    withCredentials : true
  })

  if(res.data){
    console.log(res.data.createintreview._id , "user feedback");
setskill(res.data.createintreview.ai_resume_feedback.matched_skills)
setpresent(res.data.createintreview.ai_resume_feedback.match_percent);
setcontect(res.data.createintreview.ai_resume_feedback.content);
setmissingskill(res.data.createintreview.ai_resume_feedback.missing_skills);
setintreviewid(res.data.createintreview._id);
  }

  
} catch (error) {
  console.log("error on fetch on resume feedback", error);
}

  }
feedback();
}, [])



  return (
     <div className='min-h-screen w-full pt-20 pb-6 bg-black overflow-y-scroll  backdrop-blur-[2px]  absolute flex items-center  justify-center top-0 left-0 '>
    
    <div className='bg-black text-white p-3 rounded-2xl px-4 flex-col border-[2px] border-neutral-800 md:w-[610px] w-[350px] mx-auto min-h-[80vh] z-40 '>
    
    
    <div className='h-24 mb-5 w-full  flex-col flex justify-center items-center  '>
    
    <div className='text-2xl font-semibold '>
    Resume Analysis by ai
    </div>
   
    </div>
    
    <div className='h-28 w-full bg-neutral-900   rounded-xl p-2  items-center  border-[1px] border-neutral-700 flex  '>
    
    <div className={`h-full w-[7vw]  text-[3vw]  flex items-center justify-center font-semibold  ${present >= 0 && present <= 30 && "text-red-700" }  ${present > 30 && present <= 55 && "text-orange-600" }   ${present > 55 && present <= 70 && "text-green-500" }  ${present > 70 && present <= 100 && "text-green-800" }   `}  
 
    >
      {present}%
    </div>

    <div className='w-full h-3 rounded-lg border-[1px]  overflow-hidden  border-neutral-800 '>

<div className={`h-full   rounded-lg  ${present >= 0 && present <= 30 && "bg-red-700" }  ${present > 30 && present <= 55 && "bg-orange-600" }   ${present > 55 && present <= 70 && "bg-green-500" }  ${present > 70 && present <= 100 && "bg-green-800" }   `} style={{ width: `${present}%` }}>

</div>
    </div>
    </div> 
    
    <div className='min-h-[30vh]  mt-3 w-full p-2 flex-col gap-1 '>
<div className=' min-h-16 w-full flex-col p-2 items-center '>
<div className='text-[17px] font-semibold flex items-center gap-2'>
<BsRobot className='text-[23px] text-blue-600' />
AI Analysis
</div>

<div className='min-h-full w-full '>
{constct}
</div>
<div className='h-10 mt-4'>
 Top Matching Skills: O.O
</div>
<div className='min-h-10 w-full  flex-wrap flex gap-2' >

{
  skill.length > 0 ? skill.map((item , index)=>(
    <div key={item} className='min-w-28 min-h-10 p-2 text-green-600 text-[17px]   bg-[#8783833f] border-[1px]  border-neutral-800  rounded-lg flex items-center justify-center'>
{item}
</div> 
  )) : <div>no match skill</div>
}

</div>
<div className='h-10 mt-4'>
  Missing Skills:
</div>
<div className='min-h-10 w-full  flex-wrap flex gap-2' >

{
  missingskill.length > 0 ? missingskill.map((item , index)=>(
    <div key={item} className='min-w-28 min-h-10 p-2 text-[17px] text-red-600  bg-[#8783833f] border-[1px]  border-neutral-800  rounded-lg flex items-center justify-center'>
{item}
</div> 
  )) : <div>no missing skill you are perfect for this job</div>
}

</div>
</div>

    <div className='h-20 w-full  mt-10 flex items-center justify-center gap-3 '>
    
    <div onClick={()=> setresumeopen(false)}  className='h-10 w-32  pointer  rounded-xl bg-[#7d797920]  flex text-white  items-center justify-center p-2 text-[15px] font-semibold border-[1px]  border-neutral-800 ' >
   Back
    </div>

    <div onClick={()=> navigate(`/user/profile/intreview/${intreviewid}`)  }  className='min-h-10 min-w-32  rounded-xl bg-[#e4e3e3]  text-black flex  items-center justify-center p-2 text-[15px] font-semibold border-[1px]  border-neutral-800 ' >
    Create Intreview
    </div>

    <div>
        
    </div>
    
    </div>
    </div>
  
    </div>
  
        </div>


  )
}

export default Resumescore;


