import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Userpage } from './Userpage';
import Z_take_intreview from './Z_take_intreview';
import Resumescore from './Resumescore';
import Aifeedback from './Aifeedback';
import { useNavigate } from 'react-router-dom';
const User_profile = () => {

  const naviagte = useNavigate();


  
    const url = import.meta.env.VITE_BASE_URL
    console.log( url , "lllllllllllllll");

  const [name, setname] = useState("")
  const [photo, setphoto] = useState("")

  useEffect(() => {
  
    const finduser = async ()=>{

try {
  
const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/user/finduser` , {

  withCredentials : true 
})

if(res.data){

  console.log(res.data.finduser.photourl)
setname(res.data.finduser.name)
setphoto(res.data.finduser.photourl)

}



} catch (error) {
  console.log("error on find user ", error);
}

    }

    finduser();

   
  }, [])
  



  const Logoutuser = async ()=>{

    try {
      console.log(url , "sds")
const res = await axios.get(`${url}/user/logout` , {
  withCredentials : true
})



if(res.data){
  console.log(res.data);

  if(res.data.status == 200){
   localStorage.clear();
    naviagte("/");
  }
}

    } catch (error) {
      console.log("error on logout user" , error
      )
    }

  }
  
  


  return (
    <div className='h-screen w-full '>
 <div className='h-14 w-full  backdrop-blur-[5px]   sticky top-0 flex z-10 flex-row p-2 pr-3 pl-3 justify-between   '>

<div className='h-full w-[10%] text-2xl items-center flex justify-center text-[#f4a659]  '>

Z//

</div>



<div className='h-full md:w-[15%]  w-[60%]     text-[#d9d6d1] justify-between flex flex-row   gap-2   items-center '>

<div  onClick={()=>{Logoutuser()
}} className=' rounded-xl w-[40%] h-full    cursor-pointer text-red-300 -mr-3  gap-2 text-[14px] font-semibold hover:bg-[#2f32346f] flex items-center justify-center   '>
Logout
</div>
<div className=' rounded-xl w-[40%] h-full text-[14px] gap-2 font-semibold flex hover:bg-[#2f32346f] items-center justify-center   '>
{name}
</div>{console.log(photo , "sdsdsd  ")}
  <div className="h-10 w-10 rounded-full bg-red-50 overflow-hidden">
  <img
    src={photo}
    alt="User Profile"
    className="h-full w-full object-cover"
    referrerPolicy="no-referrer"
  />
</div>
</div>

  </div>




<Routes>

  <Route path="/" element={<Userpage/>} />
  <Route path="intreview/:createintreviewid" element={<Z_take_intreview/>} />
  <Route path="resumeScore/:createintreviewid" element={<Resumescore/>} />
  <Route path="Aifeedback/:createintreviewid" element={<Aifeedback/>} />

</Routes> 

    </div>



  )
}

export default User_profile;
