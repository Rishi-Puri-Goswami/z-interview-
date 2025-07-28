import React from 'react'
import '@fontsource/inter';
import { IoSearchSharp } from "react-icons/io5";
import { CiGift } from "react-icons/ci";

const Nave_bar = () => {
  return (
    <div className='h-14 w-full backdrop-blur-[0.3px] sticky top-0 flex  flex-row p-2 pr-3 pl-3 justify-between   '>
<div className='h-full w-[10%] text-2xl items-center flex justify-center text-[#f4a659]  '>

Z//

</div>

<div className='h-full w-[15%]  text-[#d9d6d1] justify-between flex flex-row   gap-2   items-center '>

<div className=' rounded-xl  w-[60%] h-full gap-2 text-[14px] font-semibold hover:bg-[#2f32346f] flex items-center justify-center   '>
 
  <CiGift className='text-[16px]' />
Find jobs
</div>
<div className=' rounded-xl w-[60%] h-full text-[14px] gap-2 font-semibold flex hover:bg-[#2f32346f] items-center justify-center   '>
  <IoSearchSharp className='text-[14px]'  />
  How It Works
</div>
</div>

  </div>
  )
}

export default Nave_bar;

