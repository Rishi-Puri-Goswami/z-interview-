import React, { useCallback, useEffect, useState } from 'react'
import { FaBriefcaseMedical, FaFilter, FaMapMarkerAlt, FaRegCalendarAlt, FaSlideshare  } from 'react-icons/fa'
import { FiShare } from "react-icons/fi";
import { SlCloudUpload } from "react-icons/sl";
import {useDropzone} from"react-dropzone"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  WhatsappShareButton,
  WhatsappIcon,
  LinkedinShareButton,
  LinkedinIcon,
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
} from 'react-share';
import { RxCross2 } from "react-icons/rx";
export const Userpage = () => {

const navigate = useNavigate();
  const [resumeopen, setresumeopen] = useState(false)
  const [jobdata, setjobdata] = useState([])
  const [jobid, setjobid] = useState("")
  const [file, setfile] = useState([])
  const [loaidng, setloading] = useState(false)
  const [jobdetails, setjobdetails] = useState(false)
  const [sharelink, setsharelink] = useState(false)

const url = import.meta.env.VITE_BASE_URL
    console.log( url , "lllllllllllllll");




const onDrop = useCallback((acceptedFiles)=>{

  console.log(acceptedFiles , "sdoskdsodoskokdosdosko");
const file = acceptedFiles[0];
setfile(file)

} , [])


const {getRootProps, getInputProps, acceptedFiles}  = useDropzone({onDrop});



useEffect(() => {
 

  const fetchalljobs = async () =>{

try {

  const res = await axios.get(`${url}/user/jobs` , {
    withCredentials : true
  })

  if(res.data){
    console.log(res.data.job , "user data");
setjobdata(res.data.job);

  }

   if(res.data.status == 202){
navigate("/user/login");
    }

  
} catch (error) {
  console.log("error on fetch all jobs", error);
}

  }
fetchalljobs();
}, [])




const  creatjobs  = async () =>{
setloading(true)
if(!file){
  return console.log("resume is required");
}

    const formData = new FormData();
  formData.append('resume', file); 

  const res = await axios.post(`${url}/user/extract_from_pdg/${jobid}` , 
    formData
  , {withCredentials : true
  })
  

  if(res.data){
    console.log(res.data);
    if(res.data.status == 200){

      navigate(`/user/profile/resumeScore/${res.data.createintreviewid}`)
setloading(false)
    }

  if(res.data.status == 202){
navigate("/user/login");
    }

  }

}



// const sharelink  = () =>{



//    const shareUrl = 'https://yourwebsite.com';
//   const title = 'Check this out!';

//   return (
   
//   );



// }

let data ;

  return (
    <div className='h-screen w-full p-3  flex-col min-h-screen bg-black overflow-hidden overflow-y-scroll scrollbar-hide '>


<div className='w-full h-[20vh]  mt-5 flex mb-2 p-2 rounded-2xl items-center justify-start '>
  <div className='w-full h-full flex-col flex justify-center '>

<div className='text-4xl font-semibold  text-white '>
Job Listings
</div>
<div className='text-[18px] text-neutral-400 mt-3'>
Explore exciting career paths and apply to roles that match your passion and talent
</div>
  </div>
</div>

 <div className="w-full min-h-[37vh] md:min-h-[20vh] p-4 rounded-2xl  border-[1px] border-neutral-800  hover:border-neutral-700 text-white space-y-3">
      
      <div className="flex flex-col  w-full mb-7  md:flex-row gap-4">
     
        <input
          type="text"
          placeholder="Search jobs by title or company..."
          className="flex-1 bg-[#1a1a1aa5]  text-sm text-white placeholder-gray-400 px-4 py-2 rounded-md focus:outline-none border border-gray-700"
        />
     

        <div className="flex items-center bg-[#1a1a1aa5] px-4 py-2 rounded-md border border-gray-700  md:w-[497px]">
          <FaMapMarkerAlt className="mr-2 text-gray-400" />
          <span className="text-sm text-gray-300 flex-1">Filter by location</span>
          <FaFilter className="text-gray-400 ml-2" />
        </div>

    
        <div className="flex items-center bg-[#1a1a1aa5] px-4 py-2 rounded-md border border-gray-700 w-full md:w-[497px]">
          <span className="text-sm text-gray-300 flex-1">1 skill selected</span>
          <FaFilter className="text-gray-400 ml-2" />
        </div>
      </div>

      
      <div className="flex items-center gap-4 text-sm   ">
        <span className="bg-[#2a2a2a] px-3 py-1 rounded-full flex items-center gap-2 text-white">
          JavaScript
          <button className="text-gray-400 hover:text-red-500 text-xs">✕</button>
        </span>
        <button className="text-red-400 ">Clear all filters</button>
      </div>
    </div>

<div className='w-full min-h-16  flex-wrap flex gap-4 mt-3 '> 

{
  jobdata.length > 0 ? 
  jobdata.map((item , index)=>(
 <div  key={item._id} className=" relative  max-w-md md:w-[400px]  w-[340px]    bg-black border-[1px]  hover:border-neutral-600 border-neutral-800 text-white rounded-xl p-6 shadow-md shrink-0">
     
      <div className="flex justify-between items-start">
        <h2 className="text-xl font-bold">{item.title}</h2>
        <button className="text-gray-300 hover:text-white">

    {
      sharelink  && item._id == jobid ? <RxCross2 onClick={()=> { setsharelink(false)  
        setjobid(item._id)}} />:  <FiShare onClick={()=>{ setsharelink(true) 

setjobid(item._id)
       }   
       } className='text-[19px]' />
    }  
        </button>
      </div>
    {
      sharelink && item._id === jobid
      


      && 

      <div className="flex gap-3 md:min-w-[17vh] absolute  border-[1px] border-neutral-600 md:backdrop-blur-[8px]  backdrop-blur-xl rounded-xl items-center justify-center  flex-col left-[120px]  md:left-[200px] z-20   p-3 ">

<div  className='h-6  w-full test-[14px]  font-semibold  '>
Share this job
</div>
<div  className='h-6  min-w-[15vw] text-[12px] text-neutral-500 -mt-2   '>
Help others find this opportunity 

</div>
<div  className='h-6  md:w-[15vw] text-[12px] text-neutral-500 border-[1px] border-neutral-600   overflow-x-scroll  scrollbar-hide rounded-lg flex items-center justify-center -mt-2   '>


{`http://localhost:5173/user/ShareScreen/${item._id}`}
</div>


<div className='flex gap-3'>

      <WhatsappShareButton url={`/user/ShareScreen/${item._id}`} title="chach it out!">
        <WhatsappIcon size={32} round />
      </WhatsappShareButton>

      <LinkedinShareButton url={`/user/ShareScreen/${item._id}`}>
        <LinkedinIcon size={32} round />
      </LinkedinShareButton>

      <FacebookShareButton url={`/user/ShareScreen/${item._id}`}>
        <FacebookIcon size={32} round />
      </FacebookShareButton>

      <TwitterShareButton url={`/user/ShareScreen/${item._id}`} title="chach it out!">
        <TwitterIcon size={32} round />
      </TwitterShareButton>
</div>
    </div>

    }

     
      <div className="flex items-center text-sm text-gray-400 mt-2 space-x-2">
        <FaBriefcaseMedical />
        <span>{item.company}</span>
      </div>

      <div className="flex items-center text-sm text-gray-400 mt-1 space-x-2">
        <FaMapMarkerAlt  />
        <span>Remote</span>
      </div>


    
      <div className="mt-4 text-sm">
        <span className="font-semibold">{item.industry} - {item.company}</span>
        <p className="font-bold mt-1">1. About the Company...</p>
      </div>

   
      <div className="flex flex-wrap gap-2 mt-4">
        {item.requirements.map(skill => (
          <span
          key={skill}
          className="bg-zinc-700 px-3 py-1 text-sm rounded-md"
          >
            {skill}
          </span>
        ))}
      </div>


      <div className="flex justify-between items-center mt-6 gap-6 pt-4 border-t border-zinc-700">
        <div className="flex items-center text-sm text-gray-400 space-x-2">
          <FaRegCalendarAlt />
          <span>Jul 28, 2025</span>
        </div>
        <div className="flex space-x-2 ">
          <button onClick={()=> {setjobdetails(true)
 setjobid(item._id)

          } }  className="border border-gray-500 text-gray-300 px-4 py-1.5 rounded-md hover:bg-gray-700">
            Details
          </button>
          <button
          
          onClick={()=>{setresumeopen(true)  
            
            setjobid(item._id)
            

             
          }}
          className="bg-white text-black px-4 py-1.5 rounded-md hover:bg-gray-200 font-medium">
            Apply
          </button>
        </div>
      </div>
            </div>
    
  ))


  : <div> no jobs for now</div>}

 



 
{ resumeopen && 

 jobdata.map((item , index)=>(

  item._id == jobid &&
 (

    <div className='h-screen w-full  backdrop-blur-[4px]   bg-gradient-to-bl  absolute flex items-center  justify-center top-0 left-0 '>

<div className='bg-[#000000] text-white p-3 rounded-2xl px-4 flex-col border-[2px] border-neutral-800 md:w-[610px] w-[350px] mx-auto h-[80vh] z-40 '>


<div className='h-24 mb-5 w-full  flex-col flex justify-center  '>

<div className='text-2xl font-semibold '>
Apply for {item.industry} 
</div>
<div className='text-[15px] font-medium text-neutral-600 '>
Complete the application form below to apply for this position at {item.company}
</div>
</div>

<div className='h-28 w-full  rounded-xl p-2 px-4 justify-center border-[1px] border-neutral-700 flex flex-col '>

<div className='text-2xl text-neutral-200'>
{item.industry}
</div>
<div className='text-lg text-neutral-400'>
{item.company}
</div>
</div>

<div className='h-[50vh] mt-3 w-full p-2 flex-col gap-1 '>
<div className='text-[17px] text-neutral-100 '>
Resume/CV upload 
</div>



<div  {...getRootProps()}  className='w-full h-[20vh]  p-2   mt-2 rounded-xl border-dashed gap-2 flex flex-col items-center justify-center border-[2px] border-neutral-400 hover:border-neutral-700 '>

<SlCloudUpload className='text-[8vh]' />

<div className='text-[16px] text-neutral-200  '>
  <input {...getInputProps()} />
Drag & drop your resume PDF here, or click to select
</div>



<div className='text-[14px] text-neutral-600'>
 files Size (max 20MB)
</div>

<ul className='  w-[35vh] overflow-x-hidden '>
        {acceptedFiles.map(file => (
          <li key={file.path}>{file.path} - {file.size} bytes</li>
        ))}
      </ul>

</div>




<div className='h-20 w-full  mt-10 flex items-center justify-center gap-3 '>

<div onClick={()=> setresumeopen(false)}  className='h-10 w-32  pointer  rounded-xl bg-[#7d797920]  flex text-white  items-center justify-center p-2 text-[15px] font-semibold border-[1px]  border-neutral-800 ' >
Close
</div>
<div onClick={()=>creatjobs()}  className='h-10 w-32  rounded-xl bg-[#e4e3e3]  text-black flex  items-center justify-center p-2 text-[15px] font-semibold border-[1px]  border-neutral-800 ' >
{loaidng ? <div>Uploadin....</div> : <div>Submit</div> }
</div>
<div>
    
</div>

</div>
</div>



</div>




    </div>
)

 ))


}






{ jobdetails && 

 jobdata.map((item , index)=>(

  item._id == jobid &&
 (

    <div className='min-h-[110vh] w-full   bg-neutral-800 z-30 p-9  bg-gradient-to-bl from-slate-500 to-black  absolute flex items-center  justify-center top-0 left-0 '>

<div className='  backdrop-blur-3xl   bg-[#0000005d]   text-white p-7 rounded-2xl px-4 flex-col border-[2px] border-neutral-800 md:w-[610px] w-[350px] mx-auto  miin-h-[80vh]  z-40 '>

<div className='h-24 mb-5 w-full  flex-col flex justify-center  '>
<div className='text-3xl font-semibold mb-5 mt-4 '>
About Company
</div>
<div className='text-2xl font-semibold '>
{item.company}
</div>
<div className='text-[16px] font-medium text-neutral-500 '>
  {item.description}
</div>
</div>

<div className='text-[19px] font-medium mt-7 text-neutral-100 '>
 Job Title 👉 {item.title}
</div>

<div className='text-xl font-semibold min-w-28 min-h-28  mb-3  mt-4 border-[1px] border-neutral-800 p-3 rounded-2xl'>
Company requirements
<div className='min-h-20 w-full flex mt-3  flex-wrap  gap-3'>
{
  
  item.requirements.length > 0 ? item.requirements.map((item , index)=>(
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
  
  item.responsibilities.length > 0 && item.responsibilities.map((item , index)=>(
    <div key={item} className='min-w-28 min-h-10 p-2 text-blue-600 text-[17px]   bg-[#8783833f] border-[1px]  border-neutral-800  rounded-lg flex items-center justify-center'>
{item}
</div> 
  )) 

}
  </div>
  </div>

<div className='w-full  h-10 flex items-center justify-center  '> 
<div onClick={()=>setjobdetails(false)}  className='h-full w-28 text-xl font-semibold active:scale-[96%]  text-black flex  justify-center items-center rounded-xl bg-white ' >
Close
</div>
</div>




</div>




    </div>
)

 ))


}



    </div>
        </div>
  )
}
