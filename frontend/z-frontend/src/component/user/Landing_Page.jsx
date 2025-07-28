import React from 'react'
import Nave_bar from './Nave_bar'
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
const Landing_Page = () => {

    const navigate  = useNavigate();


  return (<div className='min-h-screen w-full'>
     
    <div className='h-screen w-full  bg-gradient-to-tl  from-[#141f39] to-black  '>

        <Nave_bar/>

<div className='h-[98%] w-full flex items-center justify-center   flex-col text-[13vh] text-[#d9d6d1] '>
  {/* <div
  className="absolute backdrop-blur-2xl top-[10%] left-[25%] flex z-0 h-[90vh] w-[90vh] rounded-full"
  style={{
    background: 'radial-gradient(circle at center, #7b746b 10%, #000000 50%)',
    }}
    ></div> */}

<div className='z-10'>

AI-Powered Hiring Platform 
</div>

<div className='text-[19px] h-30 w-[50vw] flex flex-col  items-center  justify-center z-10'>
   Our Al-driven platform transforms the recruitment process from job posting to
   <div>

candidate selection. Automate interviews, analyze resumes, and make data-driven

</div>
<div>

hiring decisions
</div>
</div>

<div className='flex gap-2 w-[24vw] mt-3  items-center justify-center h-14 '>
<div className=" px-4 py-2 h-10 w-[18vw] cursor-pointer hover:bg-white/20  rounded-md bg-white/10 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-white text-[16px] flex items-center justify-center gap-2" onClick={()=>navigate("/user/login")}> Candidate Login <MdOutlineKeyboardArrowRight /></div>
<div className=" px-4 py-2 h-10 w-[18vw] cursor-pointer hover:bg-white/20  rounded-md bg-white/10 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-white text-[16px] flex items-center justify-center gap-2" onClick={()=>navigate("/user/login")}> Recruiter Login <MdOutlineKeyboardArrowRight /></div>


</div>

</div>





    </div>
<div >

</div>
 <footer className="bg-gray-900 text-white py-10 px-6 md:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo & Description */}
        <div>
          <img src="" alt="App Logo" className="w-24 mb-4" />
          <p className="text-sm text-gray-400">
            Your smart AI Interviewer – resume analysis, personalized questions, and instant feedback. Crack interviews with confidence. Built by Rishi Goswami.
          </p>
        </div>

        {/* About */}
        <div>
          <h3 className="text-lg font-semibold mb-4">About</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li><a href="#" className="hover:text-white">How it Works</a></li>
            <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white">Terms & Conditions</a></li>
            <li><a href="#" className="hover:text-white">Support</a></li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li><a href="#" className="hover:text-white">Try a Mock Interview</a></li>
            <li><a href="#" className="hover:text-white">Upload Resume</a></li>
            <li><a href="#" className="hover:text-white">Interview Feedback</a></li>
            <li><a href="#" className="hover:text-white">FAQs</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4 text-xl">
            <a href="#" className="hover:text-white" aria-label="GitHub"><FaGithub /></a>
            <a href="#" className="hover:text-white" aria-label="LinkedIn"><FaLinkedin /></a>
            <a href="#" className="hover:text-white" aria-label="Instagram"><FaInstagram /></a>
          </div>
        </div>
      </div>

      <div className="mt-10 border-t border-gray-700 pt-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} AIInterview. All rights reserved.
      </div>
    </footer>
    </div>
  )
}

export default Landing_Page;
