import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { RiRobot3Line } from "react-icons/ri";
import { IoAnalytics } from "react-icons/io5";
import { GiMuscleUp } from "react-icons/gi";
import { LuChartColumnIncreasing } from "react-icons/lu";
import { MdOutlineTipsAndUpdates } from "react-icons/md";
const Aifeedback = () => {
const params = useParams();
const {createintreviewid} = params;
    const url = import.meta.env.VITE_BASE_URL
    console.log( url , "lllllllllllllll");

    const [present, setpresent] = useState("")
    const [overall_analysis, setoverall_analysis] = useState("")
    const [final_tip, setfinal_tip] = useState("")
    const [strenght, setstrenght] = useState([])
    const [improment, setimproment] = useState([])

  useEffect(() => {
  
const fetchfedback = async ()=>{

  try {
    
const res = await axios.get(`${url}/user/givefeedback/${createintreviewid}` , {
  withCredentials : true
})

if(res.data){
  console.log(res.data.ai.feedback);
  setoverall_analysis(res.data.ai.feedback.overall_analysis)
  setstrenght(res.data.ai.feedback.notable_strengths)
  setimproment(res.data.ai.feedback.areas_for_improvement)
  setfinal_tip(res.data.ai.feedback.final_tip)
  setpresent(res.data.ai.feedback.overall_rating)
}

  } catch (error) {
    console.log("error on fetching feedback" , error)
  }


}
fetchfedback();

  }, [])
  


  return (
    <div className='  min-h-screen w-full bg-black   flex-col p-2   '>
<div className='h-12 w-full  flex gap-2 items-center text-[4vw] pl-6 mb-3 font-semibold text-neutral-200'>
Intreview Feedback by Ai <RiRobot3Line  className='    text-blue-800' />
</div>

<div className='min-h-4 p-4 rounded-xl flex flex-col gap-3   w-full mt-10 text-[2vw] pl-6 font-semibold text-neutral-200'>
  <div className='flex gap-3'>

overall_performance {present}0% 
  </div>
<div className='h-2  overflow-hidden  border-[1px]  border-neutral-800 rounded-xl flex items-center  w-full  mt-3 font-semibold text-neutral-200'>
<div className={`h-full   ${present >= 0 && present <= 4 && "bg-red-500" } ${present >= 5 && present <= 7 && "bg-orange-500" }  ${present >= 8 && present <= 10 && "bg-green-500" } rounded-xl`} style={{width:`${present}0%`}}>

</div>
</div>
</div>



<div className='min-h-4 p-4 rounded-xl  w-full mt-3 text-[2vw] pl-6 font-semibold text-neutral-200'>
<div className='flex gap-3  items-center '>

overall_analysis <IoAnalytics className='text-orange-500' />
</div>
<div className='min-h-7 p-2 text-[17px] gap-2 font-medium overflow-hidden  border-[1px]  border-neutral-800 rounded-xl flex items-center  w-full  mt-3  text-neutral-200'>
👉 {overall_analysis}</div>
</div>


<div className='min-h-4 p-4 rounded-xl  w-full mt-3 text-[2vw] pl-6 font-semibold text-neutral-200'>
<div className='flex gap-3  items-center '>

notable_strengths <GiMuscleUp className='text-gray-300' />
</div>

<div className='min-h-7 p-2 text-[17px] font-medium overflow-hidden  border-[1px]  border-neutral-800 rounded-xl flex flex-col justify-center items-start  w-full  mt-3  text-neutral-200'>
{strenght.length > 0 ? strenght.map((item , index)=>(<div className='flex gap-2' key={index}> <div> 👉 </div> {item}</div>)) : <div></div>}


</div>
</div>



<div className='min-h-4 p-4 rounded-xl  w-full mt-3 text-[2vw] pl-6 font-semibold text-neutral-200'>
  <div className='flex gap-3  items-center '>

areas_for_improvement <LuChartColumnIncreasing className='text-green-600'   />
</div>
 
<div className='min-h-7 p-2 text-[17px] font-medium overflow-hidden  border-[1px]  border-neutral-800 rounded-xl flex flex-col items-start justify-center  w-full  mt-3  text-neutral-200'>
{improment.length > 0 ? improment.map((item , index)=>(<div className='flex gap-2' key={index}> <div> 👉 </div> {item}</div>)) : <div></div>}
</div>
</div> 


<div className='min-h-4 p-4 rounded-xl  w-full mt-3 text-[2vw] pl-6 font-semibold text-neutral-200'>
<div className='flex gap-3  items-center '>

final_tip <MdOutlineTipsAndUpdates  className='text-yellow-400'  /></div>

<div className='min-h-7 p-2 text-[17px] font-medium overflow-hidden  border-[1px]  border-neutral-800 rounded-xl flex items-center  w-full  mt-3  text-neutral-200'> 
 👉  {final_tip}</div>
</div>
    </div>
  )
}

export default Aifeedback;

