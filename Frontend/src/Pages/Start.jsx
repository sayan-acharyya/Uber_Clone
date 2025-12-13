import React from 'react'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const Start = () => {
  return (
    <div>
      <div
        className='h-screen w-full bg-cover bg-center flex flex-col justify-between pt-8 
        bg-[url("https://images.unsplash.com/photo-1615929361868-2e41ea1befaf?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")]'
      >
        {/* Logo */}
        <img
          className='w-20 ml-6 drop-shadow-lg'
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="Uber Logo"
        />

        {/* Bottom Card */}
        <div className='bg-white py-6 px-6 rounded-xl mx-5 mb-10 shadow-xl'>
          <h2 className='text-2xl font-bold text-gray-900'>Get Started with Uber</h2>

          <Link to='/login'
            className='w-full font-semibold flex items-center justify-center gap-2 
            bg-black text-white py-3 mt-5 rounded-lg active:scale-95 transition-all'
          >
            Continue <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Start
