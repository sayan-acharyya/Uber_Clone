import React from 'react'
import { House, IndianRupee, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
const Riding = () => {
    return (
        <div className='h-screen'>
            <img
                className="w-16 absolute left-5 top-5 z-20"
                src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
                alt="logo"
            />
            <Link to='/home' className='fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full'>
                <House />
            </Link>
            <div className='h-1/2 '>
                <img
                    className='h-full w-full object-cover'
                    src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />
            </div>
            <div className='h-1/2 p-4'>
                <div className='flex items-center justify-between'>
                    <img className='h-12' src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg" alt="" />
                    <div className='text-right'>
                        <h2 className='text-lg font-medium capitalize'>Rakib Alam</h2>
                        <h4 className='text-xl font-semibold -mt-1 -mb-1'>WB 3021/93/96</h4>
                        <p className='text-sm text-gray-600'>Maruti Suzuki Alto</p>

                    </div>
                </div>

                <div className='flex gap-2 justify-between flex-col items-center'>
                    <div className='w-full mt-5'>

                        <div className='flex items-center gap-5 p-3 border-b-2'>
                            <MapPin />
                            <div>
                                <h3 className='text-lg font-medium'>562/11-A</h3>
                                <p className='text-sm -mt-1 text-gray-600'>City Center, Durgapur</p>
                            </div>
                        </div>
                        <div className='flex items-center gap-5 p-3'>
                            <IndianRupee />
                            <div>
                                <h3 className='text-lg font-medium'>231 </h3>
                                <p className='text-sm -mt-1 text-gray-600'>Cash Payment</p>
                            </div>
                        </div>
                    </div>
                </div>
                <button className='w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg'>Make a Payment</button>
            </div>
        </div>
    )
}

export default Riding