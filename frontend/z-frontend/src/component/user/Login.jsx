import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import {jwtDecode} from "jwt-decode"
import axios from "axios"
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Login = () => {
const navigate = useNavigate();
    // const [name, setname] = useState("");
    // const [email, setemail] = useState("");
    // const [photourl, setphotourl] = useState("");
    // const [isverify, setisverify] = useState("");
    

    const url = import.meta.env.VITE_BASE_URL
    console.log( url , "lllllllllllllll");
const handleSuccess = (credentialResponse) =>{
    const decoded = jwtDecode(credentialResponse.credential);

// console.log(decoded.picture);
// setemail(decoded.email);
// setname(decoded.name);
// setisverify(decoded.email_verified);
// setphotourl(decoded.picture);

if(!decoded){
    return alert("somethink went wrong , please try again decoded")
}


const logindata = async () => {
    try {
        
        console.log("running");
        const res = await axios.post(`${url}/user/loginusergoogle` , {
name:decoded.name , email:decoded.email  , isverify:decoded.email_verified , photourl: decoded.picture
        } , {
            withCredentials : true
        })


        if(res.data){
console.log(res.data.message);

if(res.data.status == 200){

 localStorage.setItem("usertoken", res.data.token )
    navigate("/user/profile");
}
        }

    } catch (error) {
        console.log("somethink went wrong , please try again" , error )
    }
}

logindata();

}



  return (
    <div className="relative min-h-screen bg-cover bg-center  bg-gradient-to-tl  from-[#1d2c50]  to-black  from-[30%]  ">
     
      <div className="absolute inset-0 bg-black/50 backdrop-blur-md" />

      <div className="relative z-10 flex justify-center items-center h-screen">
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl px-8 py-10 w-[90%] max-w-md">
          <h2 className="text-2xl font-semibold text-white mb-6 text-center">Welcome Back</h2>

          <form className="space-y-5">
            <div>
              <label className="text-sm text-white block mb-1">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-2 rounded-md bg-white/10 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-white"
              />
            </div>
            <div>
              <label className="text-sm text-white block mb-1">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-2 rounded-md bg-white/10 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-white"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 rounded-md bg-white text-black font-semibold hover:bg-gray-200 transition"
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 flex items-center justify-center">
            <span className="text-white text-sm">or</span>
          </div>


          <button

            className="mt-4 w-full flex items-center justify-center gap-2 py-2 px-4 rounded-md text-white hover:bg-white/10 transition"
          >
            <GoogleLogin
        onSuccess={handleSuccess}
        onError={()=> console.log("login faild ")}
        useOneTap
      />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
