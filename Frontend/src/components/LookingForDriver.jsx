
import { ChevronDown, IndianRupee, LocateFixed, MapPin } from 'lucide-react'
import React from 'react'

const LookingForDriver = (props) => {
    return (
        <div>
            <h5 className='absolute top-0 right-0 w-full flex justify-end p-2 cursor-pointer' onClick={() => {
                props.setVehicleFound(false)
            }}> <ChevronDown size={26} /></h5>
            <h3 className='text-2xl font-semibold mb-5'>Looking for a Driver</h3>

            <div className='flex gap-2 justify-between flex-col items-center'>
                <img className='h-20' src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg" alt="" />
                <div className='w-full mt-5'>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <MapPin size={24} className="text-gray-700 mt-1" />
                        <div>
                            <h3 className='text-lg font-medium'>562/11-A</h3>
                            <p className='text-sm -mt-1 text-gray-600'>Kankariya Talab, Ahmedabad</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <LocateFixed size={24} className="text-gray-700 mt-1" />
                        <div>
                            <h3 className='text-lg font-medium'>236/18-V</h3>
                            <p className='text-sm -mt-1 text-gray-600'>J.P Nager,Ahmedabad </p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3'>
                       <IndianRupee size={24} className="text-gray-700 mt-1" />
                        <div>
                            <h3 className='text-lg font-medium'>₹223.34</h3>
                            <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LookingForDriver
