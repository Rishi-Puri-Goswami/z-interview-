import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CiLogin } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';
const ShareScreen = () => {
const params = useParams();
const navigate = useNavigate();

     const url = import.meta.env.VITE_BASE_URL
    console.log( url , "lllllllllllllll");

const {jobid} = params ;
console.log(jobid);

    const [requirements, setrequirements] = useState([])
    const [responsibilities, setresponsibilities] = useState([])
    const [company, setcompany] = useState("")
    const [description, setdescription] = useState("")
    const [industry, setindustry] = useState("")
    const [title, settitle] = useState("")
    const [typeofintreview, settypeofintreview] = useState("")



    useEffect(() => {
      
const fetchjob = async ()=> {

try {
    
    const res = await axios.get(`${url}/user/find_share_job/${jobid}` , {
        withCredentials : true
    })

    if(res.data){
        console.log(res.data.job);
        setcompany(res.data.job.company)
        setindustry(res.data.job.industry)
        setdescription(res.data.job.description)
        setrequirements(res.data.job.requirements)
        setresponsibilities(res.data.job.responsibilities)
        settitle(res.data.job.title)
        settypeofintreview(res.data.job.typeofintreview)
        
    }


} catch (error) {
    console.log("error on find job");
}

}

fetchjob();

    }, [])
    










  return (
    <div  className='h-screen w-full '>

 <div className='min-h-[100vh] w-full gap-10   bg-neutral-800 z-30 p-9  bg-gradient-to-bl from-black to-red-900 flex'>

<div className='  backdrop-blur-3xl   bg-[#0000006f]   text-white p-7 rounded-2xl px-4 flex-col border-[2px] border-neutral-800 md:w-[610px] w-[350px]  min-h-[30vh]  z-40 '>

<div className='h-24 mb-5 w-full  flex-col flex justify-center  '>
<div className='text-3xl font-semibold mb-5 mt-4 '>
About Company
</div>
<div className='text-2xl font-semibold '>
{company}
</div>
<div className='text-[16px] font-medium text-neutral-500 '>
 {description}
</div>
</div>

<div className='text-[19px] font-medium mt-7 text-neutral-100 '>
 Job Title 👉 {title}
</div>

<div className='text-xl font-semibold min-w-28 min-h-28  mb-3  mt-4 border-[1px] border-neutral-800 p-3 rounded-2xl'>
requirements
<div className='min-h-20 w-full flex mt-3  flex-wrap  gap-3'>

{
  
  requirements.length > 0 ? requirements.map((item , index)=>(
    <div key={item} className='min-w-28 min-h-10 p-2 text-orange-600 text-[17px]   bg-[#8783833f] border-[1px]  border-neutral-800  rounded-lg flex items-center justify-center'>
{item}
</div> 
  )) : <div>no match skill</div>
}
  </div>
  
  </div>


<div className='text-xl font-semibold min-w-28 min-h-28  mb-3  mt-7 border-[1px] border-neutral-800 p-3 rounded-2xl'>
Responsibilities
<div className='min-h-20 w-full flex mt-3  flex-wrap  gap-3'>
{
  
responsibilities.length > 0 && responsibilities.map((item , index)=>(
    <div key={item} className='min-w-28 min-h-10 p-2 text-blue-600 text-[17px]   bg-[#8783833f] border-[1px]  border-neutral-800  rounded-lg flex items-center justify-center'>
{item}
</div> 
  )) 

}
  </div>
  </div>



</div>


<div className='  backdrop-blur-3xl   bg-[#0000006f]   text-white p-7 rounded-2xl px-4 flex-col border-[2px] border-neutral-800 md:w-[610px] w-[350px]  h-[40vh]  z-40 '>

<div className='text-2xl font-semibold '>
{company}
</div>

<div className='text-[19px] font-medium mt-7 text-neutral-100 '>
 Job Title 👉 {title}
</div>


<div className='text-[19px] font-medium mt-4 p-2  w-full h-14 items-center justify-start  text-neutral-100 '>
<div onClick={()=>navigate("/user/profile/")} className=' w-[23vh] p-2 text-black flex  items-center justify-center gap-4 rounded-xl h-full bg-white'>
Apply Now
<div className='h-7 w-7 rounded-full  flex p-2 items-center justify-center bg-black '>

<CiLogin className='text-white shrink-0 text-xl  ' />
</div>
</div>
</div>
</div>

<div>
    
</div>


    </div>





    </div>
  )
}

export default ShareScreen