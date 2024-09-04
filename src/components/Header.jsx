import React from 'react'
import { SiLinuxcontainers } from "react-icons/si";
const Header = () => {
  return (
    <div className='bg-purple-800 p-3 flex justify-between items-center px-7'>
      <div>
        <div className='flex justify-between gap-x-12 items-center'>
            <div>
              <SiLinuxcontainers size={30} color='white' className='inline-block'/>
              <p className='inline-block text-xl font-bold text-white ps-3'>CRUD<span className='text-2xl text-red-500'>.</span></p>

            </div>
            <div>
              <input type="text" placeholder='Search' className='p-2 rounded-md w-80'/>
            </div>
        </div>
      </div>
      <div>
        <button className='bg-red-500 text-white p-2 rounded-sm'>Logout</button>
      </div>

    </div>
  )
}

export default Header