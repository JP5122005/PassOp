import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-800 text-white '>
        <div className="mycontainer flex justify-between items-center px-4 py-5 h-14">
        <div className="logo font-bold text-white text-2xl">

            <span className='text-green-700'></span>&lt;
            Pass 
            <span className='text-green-700'>Op</span>/&gt;
            </div>
        
        <button className='text-white bg-green-700 my-5 on hover:bg-green-600 rounded-full flex justify-between items-center ring-white ring-1'>
        <img className='invert w-10 p-0'src="/icons/github.png" alt="github" />
        <span className='font-bold px-2'>GitHub</span>
        </button>
        </div>
    </nav>
  )
}

export default Navbar
