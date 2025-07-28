import React from 'react'
import Nave_bar from './component/user/Nave_bar';
import Landing_Page from './component/user/Landing_Page';
import Login from './component/user/Login';
import {Routes , Route} from "react-router-dom"
import './App.css';
import User_profile from './component/user/User_profile';
import ShareScreen from './component/user/shareScreen';

const App = () => {
  return (
   <div className='h-screen w-full bg-black '>

<Routes>
  <Route  path='/' element={<Landing_Page/>} />
  <Route  path='/user/login' element={<Login/> } />
  <Route  path='/user/profile/*' element={<User_profile/> } />
  <Route  path='/user/ShareScreen/:jobid' element={<ShareScreen/> } />
</Routes>

   </div>
  )
}

export default App;




